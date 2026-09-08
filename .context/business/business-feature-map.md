---
type: context
last_updated: 2026-09-08
---

# Business / feature map

## Current target: sandbox placeholder

This project's only configured target today is `https://playwright.dev` (`.agents/project.yaml` → `environments.sandbox`), used purely to exercise the pipeline itself. There is no real business domain behind it yet — treat every area below as a placeholder to replace, not a real feature inventory.

| Area | What it is here | Risk if broken | Real equivalent (fill in once a real target exists) |
| --- | --- | --- | --- |
| Docs homepage | playwright.dev's landing page | None (sandbox) | — |
| Get started flow | Homepage -> Installation docs navigation | None (sandbox) | — |

## When a real target replaces the sandbox

1. Update `.agents/project.yaml`'s `environments` block first (new base URL, credentials handling if needed).
2. Rewrite this table with the real application's actual areas (e.g. Auth, Checkout, Settings — whatever the domain is) and an honest risk rating per area (this is what `shift-left-testing` and `qa-test-architect` read to prioritize).
3. Run `/business-feature-map` to have this refreshed properly instead of hand-editing piecemeal, once there's enough real information to redo it in one pass.
