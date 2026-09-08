---
name: regression-testing
description: Run the full Playwright suite, classify failures, and emit a GO/CAUTION/NO-GO verdict. Use with /regression-testing, or before anything that should be gated on the suite being healthy (a release, a merge to main).
---

# regression-testing — stage 6

The gate before anything ships. Runs the whole suite, tells you not just pass/fail counts but *why* anything failed and whether that's safe to ignore.

## Process

1. Run the suite: locally with `npx playwright test` (all three projects — chromium/firefox/webkit — unless scoped down), or read the results from the latest `.github/workflows/playwright.yml` run on GitHub Actions (Actions tab → run → download the `playwright-report` / `test-results` artifacts) when checking a push/PR instead of running locally.
2. Read the results from `playwright-report/` / `test-results/` — don't just eyeball the terminal summary, the HTML report has the trace/screenshot evidence for anything that failed.
3. Classify every failure:
   - **Application bug** — the app genuinely misbehaved. File a bug note per `agentic-qa-core/references/defect-notes-doctrine.md`.
   - **Flaky test** — same test, inconsistent result across reruns, no evidence of an app problem. Flag it as a `qa-code-reviewer` follow-up (per `test-design-doctrine.md`'s flake-resistance rule), don't just rerun until green.
   - **Environment issue** — e.g. a target site was down, a browser binary missing. Note it, don't classify it as a product bug.
4. Delegate the run + classification to `qa-regression-analyst` for anything beyond a quick smoke check — this is its dedicated role.

## Verdict

- **GO** — everything passed, or every failure is classified environment/flaky with no app-bug findings.
- **CAUTION** — non-blocking app bugs found (minor/cosmetic severity), or flaky tests present but nothing new broke.
- **NO-GO** — any blocker/major-severity app bug found, or a previously-passing suite now fails for reasons that trace back to the app.

## Output

A Regression Run note filed via `/qa-obsidian-notes` under `docs/Regression-Runs/` (`type: regression-run`): total tests, pass/fail/skip counts per browser project, the classified failure list, links to every bug note (new or reopened), and the verdict with a one-sentence reason. That note is what turns this run into regression history instead of a one-off terminal log.
