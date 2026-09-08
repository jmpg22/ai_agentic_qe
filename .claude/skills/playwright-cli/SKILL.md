---
name: playwright-cli
description: Ad-hoc browser exploration and codegen using the Playwright CLI already installed in this project. Use with /playwright-cli, or whenever a skill needs to inspect a live page (locators, structure, network) before writing a case or a spec.
---

# playwright-cli — ad-hoc exploration

This project already has the Playwright CLI available via `npx playwright` (see `package.json` scripts). This skill is a pointer to the commands worth reaching for during exploration, execution, or debugging — not a new tool to install.

## Commands

```bash
# Record a session as generated Playwright code — best way to find real locators
npm run codegen -- https://playwright.dev

# Run a single spec, headed, so you can see what's happening
npx playwright test tests/example.spec.ts --headed

# Interactive UI mode — step through, inspect locators, time-travel debug
npm run test:ui

# Step-through debugger
npm run test:debug

# Open the HTML report from the last run (pass/fail, traces, screenshots)
npm run test:report
```

## When to reach for this

- **`sprint-testing` execute phase** — inspecting the target before writing manual case steps, or reproducing a suspected bug interactively.
- **`test-automation` code phase** — codegen a rough interaction, then clean it up to match `references/architecture.md`'s page-object pattern rather than committing generated code as-is.
- **`regression-testing`** — `test:debug` or `--headed` reruns on a failure that needs a closer look before it's classified.

## Gotcha

Codegen output is a starting point, not a deliverable — it inlines selectors directly in the test body. Always move locators into the right page-object class before considering a spec done; see `test-automation/references/architecture.md`.
