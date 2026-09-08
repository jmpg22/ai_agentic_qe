# AGENTS.md — ai_agentic_qe persistent memory

This file is read at the start of every session. It's the map: what this project is, how the agentic QA pipeline is organized, which skill or agent to reach for, and what each config file holds. Detail lives in the referenced files — this is the index, not a restatement of them.

## 1. What this project is

A Playwright + TypeScript end-to-end testing framework (`tests/`), currently pointed at a sandbox target (`https://playwright.dev`) purely to try out the agentic QA pipeline below. No CI yet, no issue tracker, no real application behind it — see `.context/master-test-plan.md` for the honest current state.

## 2. Context loading map

| When... | Read... |
| --- | --- |
| Any pipeline stage starts | `.agents/project.yaml` (variables), the relevant `.claude/skills/<stage>/SKILL.md` |
| Deciding what's in/out of scope, or risk level | `.context/business/business-feature-map.md`, `.context/master-test-plan.md` |
| Writing or reviewing a spec/page-object | `.claude/skills/test-automation/references/architecture.md` |
| Filing or reading any note (test plan, report, bug, regression run) | `.claude/skills/qa-obsidian-notes/SKILL.md` |
| Deciding whether to dispatch a subagent | `.claude/skills/agentic-qa-core/references/staff-roles.md` |

## 3. Skills

| Skill | Trigger | Stage |
| --- | --- | --- |
| `agentic-qa-core` | (loaded by other skills, no direct command) | Shared doctrine — staff roles, test design, defect notes |
| `shift-left-testing` | `/shift-left-testing` | 0 — pre-sprint requirement/risk review |
| `sprint-testing` | `/sprint-testing` | 1-3 — plan, execute, report |
| `test-documentation` | `/test-documentation` | 4 — ROI verdict, test-case record |
| `test-automation` | `/test-automation` | 5 — plan, code, review a Playwright spec |
| `regression-testing` | `/regression-testing` | 6 — full-suite run, GO/CAUTION/NO-GO |
| `playwright-cli` | `/playwright-cli` | Ad-hoc browser exploration (already-installed CLI) |
| `qa-obsidian-notes` | (loaded by other skills) | Vault taxonomy — where/how every note gets filed under `docs/` |

Utility commands (`.claude/commands/`): `/master-test-plan`, `/business-feature-map`, `/sync-ai-memory` — refresh one context file without a full pipeline run.

## 4. Staff (subagents)

Five roles under `.claude/agents/`, mapped to Plan / Code / Review / Exploration / Bulk — see `.claude/skills/agentic-qa-core/references/staff-roles.md` for the full breakdown of when to dispatch each.

| Agent | Role | Owns |
| --- | --- | --- |
| `qa-test-architect` | Plan | Risk analysis, ATP outlines, ROI verdicts |
| `qa-automation-engineer` | Code | Playwright specs + page objects |
| `qa-code-reviewer` | Review | POM adherence, flake risk, naming (read-only — no Write) |
| `qa-exploratory-tester` | Exploration | Manual/exploratory passes, bug notes |
| `qa-regression-analyst` | Bulk | Full-suite runs, failure classification, verdicts |

## 5. Tool resolution

| Tag | Resolves to |
| --- | --- |
| `[ISSUE_TRACKER_TOOL]` | Not configured — no issue tracker on this project. Findings become Obsidian bug notes instead (`docs/Bugs/`, via `qa-obsidian-notes`). |
| `[TMS_TOOL]` | Not configured — no TMS. Test cases live as Obsidian notes instead (`docs/Test-Plans/`, `type: test-case`). |

If a real tracker/TMS gets added later, add the resolution here and in `.agents/project.yaml` — the skills above already reference `qa-obsidian-notes` rather than hardcoding "no tracker," so the swap is localized to this table, `project.yaml`, and whichever skill(s) need a new integration skill (see `turn_test_engine`'s `zephyr-scale`/`acli` skills for the shape of what that looks like).

## 6. Jira -> sprint-testing CI trigger

`.github/workflows/jira-qa-trigger.yml` polls Jira every 15 minutes for tickets tagged with the `JIRA_LABEL` label (any project/status) and runs `/sprint-testing` against each one automatically (Claude Code GitHub Action), opening a PR and commenting the result back on the ticket. Setup and what happens inside that run: `.claude/skills/agentic-qa-core/references/jira-ci-trigger.md`. This is CI-only glue — it doesn't change how `[ISSUE_TRACKER_TOOL]` / `[TMS_TOOL]` resolve for local/manual runs (see section 5 above, still unconfigured).

## 7. Notes vault (Obsidian)

`docs/` is the vault — open it directly in Obsidian (File → Open folder as vault), no setup needed. Taxonomy and frontmatter conventions: `.claude/skills/qa-obsidian-notes/SKILL.md`. If the **Desktop Commander** plugin (with its `obsidian-vault` skill) is installed, prefer it for actually reading/writing notes; without it, plain file tools work identically since these are just markdown files.

## 8. Architecture quick-reference

`BasePage` (`tests/page-objects/base.page.ts`) → domain `Page` class (extends `BasePage`, one per page/flow) → spec file (`tests/*.spec.ts`). Import alias `@/*` → `tests/*` (from `tsconfig.json`). Full detail: `.claude/skills/test-automation/references/architecture.md`.

## 9. Daily workflow

You decide which stage runs and when to move to the next one — nothing chains automatically:

```
/shift-left-testing   (review a requirement before building/testing)
        v you confirm scope
/sprint-testing        (plan -> execute -> report, manual/exploratory)
        v you review the ATR + bug notes
/test-documentation     (ROI verdict per case)
        v you confirm which cases become "Candidate"
/test-automation        (plan -> code -> review a Playwright spec)
        v you review the diff + local run
/regression-testing     (GO / CAUTION / NO-GO)
```

See `docs/00-Start-Here.md` for the non-technical walkthrough of all of this.
