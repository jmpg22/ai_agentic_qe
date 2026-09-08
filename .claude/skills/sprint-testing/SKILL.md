---
name: sprint-testing
description: Plan, execute, and report a manual/exploratory testing pass for one feature or ticket. Use with /sprint-testing, or whenever the user wants a feature tested end-to-end before it's automated or shipped.
---

# sprint-testing — stages 1-3

The core manual-testing loop: plan what to test, actually run it against the app, report what happened. Three phases, one skill, because they're always run together in sequence within a session (unlike the pipeline stages around it, which each need a human checkpoint before the next one starts).

## Phase 1 — Plan

1. Pull scope from the shift-left ATP note if one exists (`docs/Test-Plans/`), otherwise start from what the user describes directly.
2. Write out concrete test cases: scenario, steps, expected result. Follow `agentic-qa-core/references/test-design-doctrine.md` naming and independence rules even for manual cases — they'll be reused as spec names later if automated.
3. Delegate to `qa-test-architect` for anything beyond a couple of cases.

## Phase 2 — Execute

1. Run each case against the target (today: `https://playwright.dev`, per `.context/business/business-feature-map.md` — swap in the real target once one exists).
2. Use `/playwright-cli` for ad-hoc navigation/inspection rather than guessing at selectors.
3. Delegate to `qa-exploratory-tester` for anything beyond the planned cases — exploratory testing exists precisely to find what the plan didn't anticipate.
4. Capture evidence (screenshot/trace) for anything that fails — Playwright already does this automatically (`screenshot: 'only-on-failure'`, `trace: 'on-first-retry'` in `playwright.config.ts`).

## Phase 3 — Report

1. Draft the ATR: what was tested, what happened, what was out of scope.
2. For each finding, file a bug note via `/qa-obsidian-notes` under `docs/Bugs/`, following `agentic-qa-core/references/defect-notes-doctrine.md` for required fields.
3. File the ATR itself under `docs/Test-Reports/` (`type: test-report`), linking every bug note found and every test case note covered.
4. Close-out: list of case notes exercised, links to any bug notes filed, and a one-line summary of what's ready for `/test-documentation` next.

## Boundaries

This stage doesn't write Playwright code — even a case marked obviously worth automating gets flagged for `/test-automation` later, not built inline here.
