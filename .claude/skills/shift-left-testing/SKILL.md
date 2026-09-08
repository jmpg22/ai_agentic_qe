---
name: shift-left-testing
description: Pre-sprint review of a requirement or user story for testability and risk, before any code is written. Use with /shift-left-testing, or whenever the user pastes in a requirement, acceptance criteria, or feature description and wants it reviewed before building/testing starts.
---

# shift-left-testing — stage 0

Catches ambiguous or untestable requirements before they turn into wasted sprint-testing effort. Runs against whatever the user gives it directly — a pasted requirement, a feature description, a link to a spec — since this project has no issue tracker to pull from.

## Process

1. **Read the requirement as given.** Don't invent missing detail; flag it instead.
2. **Testability pass** — for each acceptance criterion, ask: could a test actually verify this as written? Flag anything subjective ("the page should load fast") that needs a measurable threshold, and anything with an implicit but unstated precondition.
3. **Risk pass** — cross-check against `.context/business/business-feature-map.md` and `.context/master-test-plan.md`: does this touch a high-risk area (payment, auth, data integrity)? Note it if so — it changes how deep `sprint-testing` should go later.
4. **Delegate to `qa-test-architect`** (see `agentic-qa-core/references/staff-roles.md`) for the actual ATP outline when the requirement is non-trivial — a single small tweak can stay inline.

## Output

An ATP (test-plan) outline note filed via `/qa-obsidian-notes` under `docs/Test-Plans/` — `type: test-plan`, `status: draft` — listing: scenarios to cover, open questions back to whoever owns the requirement, and the risk level found in step 3. Don't mark it `active` until a human confirms the scope is right.

## Boundaries

This stage never touches code or runs tests — it's a review of the requirement text itself. If there's nothing written down yet (just a verbal idea), ask for at least a one-paragraph description before running this.
