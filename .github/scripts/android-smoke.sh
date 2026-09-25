#!/usr/bin/env bash
# Android smoke test, run by reactivecircus/android-emulator-runner from
# .github/workflows/android.yml. It lives in its own file because the action
# runs each line of its `script:` input as a separate `sh -c` call: multi-line
# if-blocks fail with a syntax error and variables don't carry between lines.
# Expects the release APK at ./apk/app-release.apk; writes logcat.txt and
# screen.png to the working directory.

# NOTE: this script intentionally does NOT use `set -e`. Past runs
# had the emulator-runner action lose ADB shortly after launch,
# which would abort the script before it captured the verdict.
# Now: launch, capture milestones + screenshot immediately, then
# do best-effort post-launch work. The job's exit code reflects
# ONLY the milestone grep on logcat — not adb survival.
set +e
set -x

ENDGROUP="::endgroup::"

echo "::group::Device info"
adb devices
adb shell getprop ro.build.version.sdk
adb shell getprop ro.product.cpu.abi
echo "$ENDGROUP"

echo "::group::Start logcat buffer"
adb logcat -c
adb logcat -v time > logcat.txt &
LOGCAT_PID=$!
echo "$ENDGROUP"

echo "::group::Install APK"
ls -la apk/
adb install -r -d apk/app-release.apk
INSTALL_RC=$?
if [[ "$INSTALL_RC" -ne 0 ]]; then
  echo "::error::adb install failed (rc=$INSTALL_RC)" >&2
  kill $LOGCAT_PID 2>/dev/null
  exit 1
fi
echo "$ENDGROUP"

echo "::group::Launch MainActivity (-W blocks until Displayed)"
adb shell am start -W -n com.dicy/.MainActivity
echo "$ENDGROUP"

# JS evaluate fires within milliseconds of Displayed historically,
# but give it a small buffer in case the emulator is slow.
sleep 5

echo "::group::Capture screenshot (immediately after launch — adb may die later)"
adb shell screencap -p /sdcard/screen.png
adb pull /sdcard/screen.png ./screen.png
ls -la screen.png || echo "no screenshot"
echo "$ENDGROUP"

# Best-effort: let more logs accumulate for richer diagnostics on
# failure. If adb dies here, we already have screenshot + the
# critical milestone window in logcat.
echo "::group::Best-effort: 10s for richer logs"
sleep 10
echo "$ENDGROUP"

echo "::group::Stop logcat collection"
kill $LOGCAT_PID 2>/dev/null
sleep 1
wc -l logcat.txt
echo "$ENDGROUP"

echo "::group::Verdict from logcat (the only thing the exit code depends on)"
STARTED=0
grep -q "Displayed com.dicy/.MainActivity" logcat.txt \
  && { echo "  [ok] MainActivity Displayed"; STARTED=$((STARTED + 1)); } \
  || echo "  [missing] MainActivity Displayed"
grep -qE 'ReactNativeJS.*Running "dicy"' logcat.txt \
  && { echo "  [ok] ReactNativeJS evaluated entry module"; STARTED=$((STARTED + 1)); } \
  || echo "  [missing] ReactNativeJS Running \"dicy\""
FATAL=0
if grep -E "FATAL EXCEPTION" logcat.txt | grep -q "com.dicy"; then
  echo "::error::com.dicy hit a FATAL EXCEPTION" >&2
  grep -B2 -A40 -E "FATAL EXCEPTION" logcat.txt | head -300
  FATAL=1
elif grep -qE "AndroidRuntime.*com\.dicy.*FATAL" logcat.txt; then
  echo "::error::com.dicy hit an AndroidRuntime FATAL" >&2
  grep -B2 -A40 -E "AndroidRuntime.*com\.dicy" logcat.txt | head -300
  FATAL=1
fi
echo "$ENDGROUP"

if [[ "$STARTED" -eq 2 ]] && [[ "$FATAL" -eq 0 ]]; then
  echo "VERDICT: PASS — app boot verified"
  exit 0
fi
echo "::error::VERDICT: FAIL — startup milestones not reached or fatal hit" >&2
echo "Last 200 logcat lines:"
tail -200 logcat.txt
exit 1
