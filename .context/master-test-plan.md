---
type: context
last_updated: 2026-09-08
---

# Master test plan — ai_agentic_qe

## Scope

This project currently tests a single sandbox target: `https://playwright.dev` (the sample suite's target — see `tests/example.spec.ts`). It exists to try out the agentic QA pipeline itself before pointing the same pipeline at a real application.

## Current coverage

| Area | Cases | Automated | Notes |
| --- | --- | --- | --- |
| Docs homepage | 2 | Yes (`tests/example.spec.ts`) | Title check, Get started -> Installation navigation |

Everything else is unautomated / untested — there's nothing else to cover until a real target is set.

## Open risks

- **CI runs on every push/PR to `main`** via `.github/workflows/playwright.yml` (chromium/firefox/webkit, report + trace artifacts uploaded). No secrets configured — none are needed while the target is the public sandbox.
- **No real target yet.** Coverage above is a smoke test of the pipeline, not of a product. Don't read "2 cases" as a signal of project maturity.

## How this file gets updated

Run `/master-test-plan` after any change to `tests/`, or after a `regression-testing`/`sprint-testing` run that changes what's covered. Don't hand-edit the coverage table without a run backing it up — it should always reflect what's actually testable today, not aspirationally.
