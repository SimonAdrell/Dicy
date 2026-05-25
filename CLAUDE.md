# Dicy

React Native 0.77 (bridgeless / new-arch) Android app.

## Android smoke-test workflow

`.github/workflows/android.yml` builds a release APK, boots it in a
real Android 14 emulator on GitHub Actions, and asserts the app reaches
the "MainActivity Displayed" + `ReactNativeJS: Running "dicy"` startup
milestones.

### Triggers

Two ways to fire it:

1. **`workflow_dispatch`** — Actions tab → "Run workflow", or
   `gh workflow run android.yml --ref <branch>`.
2. **PR `smoke-test` label** — applying the `smoke-test` label to a PR
   fires it against the PR's head ref. Removing and re-adding the label
   re-triggers. This is the only path Claude Code can use, since it
   has no `workflow_dispatch` API access.

   **How Claude applies the label** (via the GitHub MCP tools): call
   `mcp__github__issue_write` with `method: "update"`, `issue_number:
   <PR number>` (PRs are issues for this API), and `labels: ["smoke-test",
   ...any existing labels...]`. The `labels` field replaces — so first
   call `mcp__github__issue_read` with `method: "get_labels"` to read
   the current set, then send the union back. To retrigger after a
   completed run, do the same call without `smoke-test` (to remove it),
   then again with it (to re-add). The workflow gates on
   `github.event.label.name == 'smoke-test'`, so other labels added in
   the same call don't fire spurious runs.

It does **not** run on push or on regular PR open/update.

### Where the verdict surfaces

Three independent surfaces, in order of resilience:

1. **Job step summary** — always written; visible in the Actions UI
   without downloading anything.
2. **PR comment** — only when triggered by label; posted by the bot.
3. **`ci-smoke-latest` rolling prerelease** — `logcat.txt` +
   `screen.png` uploaded as assets, publicly downloadable without auth.
   Best-effort; the verdict surfaces above don't depend on it.

### Reading a failed run

**A red job status does NOT necessarily mean the app crashed.** The
`reactivecircus/android-emulator-runner` action sometimes loses ADB
shortly after `am start` returns. The script captures the screenshot
and milestones immediately after launch and exits purely on the logcat
verdict — but the action's wrapper can still mark the job failed for
adb reasons unrelated to the app.

When triaging: read the job summary first. If verdict says **PASS**,
the app booted — ignore the red X. If **FAIL**, the milestone table
shows whether Displayed, JS-running, or a FATAL EXCEPTION is the
actual problem.

**When opening a PR for Android-affecting changes, ask the user whether
they want the smoke-test label applied before merging.** Don't apply
it unprompted.

## Linting — run this before pushing

**Always run lint before committing or opening a PR.** The lint CI workflow
(`.github/workflows/lint.yml`) runs on every PR push and will block merging if
it fails — catching issues there is much slower than catching them locally.

```bash
npm run lint        # ESLint across the whole project
npm run lint:fix    # ESLint with auto-fix
npm run format      # Prettier auto-format src/
```

**Pre-commit hook:** after `npm install`, husky automatically runs
`lint-staged` on every `git commit` — staged `.ts/.tsx` files are
ESLint-fixed and Prettier-formatted before the commit lands. If ESLint
cannot auto-fix a violation, the commit is blocked with a clear error.

### Rules that catch common issues

| ESLint rule | What it prevents |
|---|---|
| `react/no-array-index-key` | Array index as JSX key (causes subtle re-render bugs) |
| `@typescript-eslint/no-unused-vars` | Unused imports and variables |

**SonarCloud** (`.github/workflows/` triggers on PR) catches additional
issues that ESLint doesn't cover, including:
- `Readonly<>` on component prop types (S6759)
- Trailing zeros in numeric literals e.g. `0.10` → `0.1` (S7748)
- `.sort()` called inline inside JSX (S4043)

Fix any SonarCloud findings before requesting review. Check open issues at
`https://sonarcloud.io/project/issues?id=SimonAdrell_Dicy&pullRequest=<PR#>&issueStatuses=OPEN`.

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
