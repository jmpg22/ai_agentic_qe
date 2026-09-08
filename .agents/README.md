# `.agents/` — agentic QA pipeline variables

Context that the skills under `.claude/skills/` read so they don't have to guess URLs, target scope, or architecture conventions each time.

## Files

| File | What it holds |
| --- | --- |
| `project.yaml` | Project identity, environments, architecture convention, Obsidian vault config, staff pointer |

Full test scope/coverage detail lives in `.context/`, not here — `project.yaml` is short-lived config values, `.context/` is the actual business/test knowledge.

## Variable syntax

- `{{VAR_NAME}}` — static value from `project.yaml`.
- `{{environments.<env>.<var>}}` — value specific to one environment.
- `[TAG_TOOL]` — pseudocode each skill resolves to a concrete tool. Today there's no `[ISSUE_TRACKER_TOOL]` / `[TMS_TOOL]` resolution — this project has neither Jira nor Zephyr. See `AGENTS.md`'s tool-resolution table.

## When to edit `project.yaml` by hand

- The target environment changes from the `sandbox` (playwright.dev) placeholder to a real application — update `environments.sandbox` (or add a new env) and `.context/business/business-feature-map.md` together.
- CI changes (a new trigger, a matrix, secrets get added) — keep `ci.configured`/`ci.workflow`/`ci.triggers` in sync with `.github/workflows/playwright.yml` so `regression-testing` knows what's actually running.
- A real issue tracker or TMS gets added later — add an `issue_tracker:`/`tms:` block here (see `turn_test_engine`'s `project.yaml` for the shape, if you want a reference) and update `AGENTS.md`'s tool-resolution table to match. (Note: `jira_ci_trigger` already exists below for the narrower CI-only Jira-polling flow — that's separate from a full pipeline-wide tracker integration.)

## Active environment per session

`testing.default_env` is the default (currently the only one: `sandbox`). If a second environment gets added, use whichever the user asks for that session without editing this file.
