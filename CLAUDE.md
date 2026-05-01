# Dicy

React Native 0.77 (bridgeless / new-arch) Android app.

## Android smoke-test workflow

`.github/workflows/android.yml` builds a release APK and boots it in a
real Android 14 emulator on GitHub Actions, asserts the app reaches the
"MainActivity Displayed" + `ReactNativeJS: Running "dicy"` startup
milestones, and publishes `logcat.txt` + `screen.png` as a rolling
prerelease (`ci-smoke-latest`) so the output is downloadable without auth.

The workflow is **manual-trigger only** (`workflow_dispatch:`) — it does
**not** run on push or PR. Trigger it from the Actions tab or
`gh workflow run android.yml --ref <branch>`.

**When opening a PR for Android-affecting changes, ask the user whether
they want the smoke-test workflow run against the PR branch before
merging.** Don't run it unprompted.

## Notable past fixes (read before debugging launch crashes)

- `MainApplication.kt` must call
  `SoLoader.init(this, OpenSourceMergedSoMapping)` (not
  `SoLoader.init(this, false)`). RN 0.77 ships a single merged
  `libreactnative.so` that contains many sub-libraries; without the
  mapping, `ReactActivityDelegate.onCreate` force-finishes
  `MainActivity` with `dlopen failed: library "libreact_featureflagsjni.so" not found`.
- `android/gradle.properties` sets `org.gradle.jvmargs=-Xmx4096m -XX:MaxMetaspaceSize=1024m`;
  the previous 2 GB heap OOM'd during the Jetifier transform of
  `react-android-0.77.x`.
