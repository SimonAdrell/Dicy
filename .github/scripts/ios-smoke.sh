#!/usr/bin/env bash
# Boot an iOS simulator, install the Release build, launch it and decide
# PASS/FAIL. Writes screen.png, sim.log, crash.txt and verdict.txt.
set -uo pipefail

APP=ios/build/Build/Products/Release-iphonesimulator/dicy.app
BID=$(/usr/libexec/PlistBuddy -c 'Print CFBundleIdentifier' "$APP/Info.plist")
echo "Bundle id: $BID"

UDID=$(xcrun simctl list devices available -j | python3 -c '
import json, sys
d = json.load(sys.stdin)["devices"]
ios = sorted((k for k in d if "iOS" in k), key=lambda k: [int(x) for x in k.split("iOS-")[-1].split("-")])
for rt in reversed(ios):
    for dev in d[rt]:
        if dev["name"].startswith("iPhone"):
            print(dev["udid"]); sys.exit()
')
echo "Simulator: $UDID"
xcrun simctl boot "$UDID"
xcrun simctl bootstatus "$UDID" -b

xcrun simctl install "$UDID" "$APP"

xcrun simctl spawn "$UDID" log stream --level debug --style compact \
  --predicate 'process == "dicy"' > sim.log 2>&1 &
LOGPID=$!
sleep 2

xcrun simctl launch "$UDID" "$BID"
sleep 25
xcrun simctl io "$UDID" screenshot screen.png

ALIVE="no"
xcrun simctl spawn "$UDID" launchctl list | grep -q "UIKitApplication:$BID" && ALIVE="yes"

kill "$LOGPID" 2>/dev/null

CRASH="none"
REPORT=$(ls -t ~/Library/Logs/DiagnosticReports/dicy*.ips 2>/dev/null | head -1)
if [ -n "$REPORT" ]; then
  CRASH=$(basename "$REPORT")
  head -c 20000 "$REPORT" > crash.txt
fi

JSERR="none"
if grep -qE "Unhandled JS Exception|RCTFatal|TypeError|ReferenceError|Invariant Violation" sim.log; then
  JSERR=$(grep -m1 -E "Unhandled JS Exception|RCTFatal|TypeError|ReferenceError|Invariant Violation" sim.log | cut -c1-200)
fi

if [ "$ALIVE" = "yes" ] && [ "$CRASH" = "none" ]; then V=PASS; else V=FAIL; fi
{
  echo "### Verdict: $V"
  echo ""
  echo "| Check | Result |"
  echo "| --- | --- |"
  echo "| App process alive 25 s after launch | \`$ALIVE\` |"
  echo "| Crash report | \`$CRASH\` |"
  echo "| JS error in log | \`$JSERR\` |"
  echo ""
  echo "Screenshot: \`screen.png\` in the run artifacts / ci-ios-smoke-latest release."
} > verdict.txt
cat verdict.txt

[ "$V" = "PASS" ]
