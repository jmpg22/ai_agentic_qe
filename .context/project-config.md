---
type: context
last_updated: 2026-09-08
---

# Project configuration — single-project, no siblings

Unlike a multi-repo setup (one QA repo testing several sibling application repos), `ai_agentic_qe` tests only itself right now — the "target" (`playwright.dev`) is an external public site, not a sibling repo this suite has any relationship to beyond hitting its URL.

## Target repos

None declared. If this project later starts driving tests against a real application that lives in its own repo (the way `turn_test_engine` drives tests against five sibling repos), declare it here:

```markdown
| Repo | Path/URL | Confidence | Notes |
| --- | --- | --- | --- |
| <name> | <git URL or local path> | high/medium/low | what it is, why this suite tests it |
```

Read-only from this project's side, same as any other split-sibling-repo setup — this suite never edits a target repo's code, only tests against what it deploys.

## Refreshing this file

Run `/project-discovery` (not yet added to this project — copy it over from `turn_test_engine`'s `.claude/skills/project-discovery/` if/when a real multi-repo target set shows up) or update this file by hand for a single new target.
