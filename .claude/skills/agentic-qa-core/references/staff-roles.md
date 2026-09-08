# The QA staff — five roles, five subagents

Real QA teams split work by role. This project mirrors that with five Claude Code subagents under `.claude/agents/`, so a "staff" of specialized agents does the work instead of one generalist doing everything inline. You (the person running Claude Code, or orchestrating from Cowork) decide when to dispatch one — nothing here auto-chains.

| Role | Subagent file | Owns | Typical trigger |
| --- | --- | --- | --- |
| **Plan** | `qa-test-architect` | Risk analysis, ATP (test plan) outlines, ROI verdicts (Candidate/Manual/Deferred) | Start of `/shift-left-testing`, `/sprint-testing` planning phase, `/test-documentation` |
| **Code** | `qa-automation-engineer` | Writing/maintaining Playwright specs and page objects | `/test-automation`'s code phase |
| **Review** | `qa-code-reviewer` | Reviewing a spec/page-object diff for POM adherence, flakiness, naming | `/test-automation`'s review phase, before any spec is considered done |
| **Exploration** | `qa-exploratory-tester` | Manual/exploratory passes against the running app, filing bug notes | `/sprint-testing`'s execute phase |
| **Bulk / Regression** | `qa-regression-analyst` | Running the full suite, classifying failures, GO/CAUTION/NO-GO | `/regression-testing` |

## When to actually dispatch a subagent vs. work inline

Dispatch one when the step is heavy, repetitive, or benefits from a narrower tool set than your main session has (e.g. the reviewer shouldn't have `Write` access — it should only be able to point out problems). Skip dispatch for a quick one-off question or a single-file tweak; just do it inline.

You (the human) always review a subagent's report before triggering the next stage. Two subagents shouldn't touch the same file at the same time — if `qa-automation-engineer` is mid-edit on a spec, don't also send `qa-code-reviewer` at that same file until the edit lands.

## How to dispatch

From Claude Code: describe the task and name the role ("use the qa-automation-engineer subagent to..."), or let auto-selection match the subagent's `description` field. From Cowork: ask directly — "have the regression analyst run the suite and classify failures" — and Claude spawns the matching agent.
