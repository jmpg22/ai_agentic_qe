---
name: test-documentation
description: Assign an ROI verdict (Candidate/Manual/Deferred) to test cases and file them as the project's test-case record. Use with /test-documentation, or after a sprint-testing pass to decide what gets automated next.
---

# test-documentation — stage 4

Turns test cases from a sprint-testing pass (or any ad-hoc case the user describes) into the project's durable test-case record, with a verdict on whether automating it is worth it.

## Process

1. Gather the case(s) — from a `docs/Test-Reports/` note, or given directly.
2. For each one, apply the ROI rubric in `agentic-qa-core/references/test-design-doctrine.md` and assign: **Candidate**, **Manual**, or **Deferred**.
3. Delegate the verdict pass to `qa-test-architect` when there's more than a handful of cases — this is exactly the kind of batch judgment call that role owns.

## Output

- **Candidate / Manual cases** → filed via `/qa-obsidian-notes` as a Test Case note under `docs/Test-Plans/` (`type: test-case`), with the verdict in frontmatter (`verdict: candidate|manual`) and a link back to the sprint-testing report it came from.
- **Deferred cases** → same note type, `verdict: deferred`, plus one line on why — still filed, not dropped, so nothing gets silently forgotten.
- Candidate cases get their filename (the id `test-automation` will reference) chosen now, per the naming convention in `qa-obsidian-notes` — this is what a future spec's `test()` title links back to.

## Traceability

Test Case note → (later) Playwright spec is a two-way link: the note gets a line added once the spec exists (`automated_in: "[[tests/.../foo.spec.ts]]"` isn't a real Obsidian link since it's not a vault file, so just note the relative path as plain text), and the spec's `test()` title carries the case's id per `qa-obsidian-notes`.
