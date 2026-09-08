---
name: test-automation
description: Plan, write, and review a Playwright spec (and any page-object support it needs) for a Candidate test case. Use with /test-automation, or whenever the user wants a test case turned into real automated coverage.
---

# test-automation — stage 5

Turns a Candidate test case into a working Playwright spec, following this project's Page Object Model. Read `references/architecture.md` first if this is the first spec being written past `tests/example.spec.ts` — it documents the intended growth pattern, not just what exists today.

## Phase 1 — Plan

1. Pull the Candidate case from `docs/Test-Plans/` (or take one directly from the user).
2. Decide what page object(s) the spec needs: does one already exist under `tests/page-objects/`, or does this scenario need a new domain page class extending `BasePage`?
3. Delegate to `qa-test-architect` for the plan when a new page object hierarchy is involved — getting the abstraction right the first time avoids rework later.

## Phase 2 — Code

1. Write the domain page object (if new) extending `BasePage` — see `references/architecture.md` for the pattern.
2. Write the spec under `tests/`, mirroring the target's structure once one exists (today: flat under `tests/`, since there's only `example.spec.ts`).
3. `test()` title starts with the Test Case note's id (see `qa-obsidian-notes`): `test('get-started-link-navigation: clicking Get started opens Installation', ...)`.
4. Follow `agentic-qa-core/references/test-design-doctrine.md` — no hardcoded waits, role/text locators, one assertion focus.
5. Delegate to `qa-automation-engineer` for anything beyond a small, obvious change.

## Phase 3 — Review

1. Run the spec locally (`npx playwright test <file>`) — don't hand off a spec that hasn't been run at least once.
2. Delegate to `qa-code-reviewer` for a second pass: POM adherence, flake risk, naming, whether an existing page object should have been reused instead of duplicating a locator.
3. Fix what the review flags before considering the spec done.

## Output

A passing spec, any new/updated page object it needed, and the Test Case note in `docs/Test-Plans/` updated with the spec's path (see `test-documentation`'s traceability note).
