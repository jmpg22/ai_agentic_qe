---
name: agentic-qa-core
description: Shared reference material for the agentic QA pipeline (staff roles, test-design rules, defect-note conventions). Not invoked directly — the other pipeline skills load its references/ on demand.
---

# agentic-qa-core

This skill has no direct command. It's a shelf of references the other pipeline skills (`shift-left-testing`, `sprint-testing`, `test-documentation`, `test-automation`, `regression-testing`) pull from so the same rules aren't repeated five times.

## References

| File | What it covers | Read it when... |
| --- | --- | --- |
| `references/staff-roles.md` | The five-agent "staff": Test Architect, Automation Engineer, Code Reviewer, Exploratory Tester, Regression Analyst — what each owns, when to dispatch it as a subagent | Deciding whether a step should run inline or be delegated to `.claude/agents/` |
| `references/test-design-doctrine.md` | How to write a test case that's actually worth keeping: naming, one assertion focus, data independence, flake-resistance | Any skill producing test cases or specs (`sprint-testing`, `test-documentation`, `test-automation`) |
| `references/defect-notes-doctrine.md` | What a bug note needs to be actionable without a ticket system: repro steps, evidence, severity, environment | `sprint-testing` (filing findings), `regression-testing` (classifying failures) |

## Why no issue tracker

This project doesn't have Jira/Zephyr/Linear wired up — by design, to keep the sandbox self-contained. Everything a tracker would normally hold (test cases, bug reports, run history) lives instead as Obsidian-flavored markdown notes in `docs/`, via `/qa-obsidian-notes`. If a real tracker gets added later, only `[ISSUE_TRACKER_TOOL]` / `[TMS_TOOL]` resolution in `AGENTS.md` and `.agents/project.yaml` need to change — the skills below already reference those tags rather than hardcoding "write an Obsidian note."
