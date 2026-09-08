# AI Agentic QE - Playwright TypeScript Framework

Automated end-to-end testing framework built with [Playwright](https://playwright.dev/) and TypeScript.

---

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Install Playwright Browsers
Install required browser binaries (Chromium, Firefox, WebKit):
```bash
npx playwright install
```
*(Or install only Chromium: `npx playwright install chromium`)*

---

## Running Tests

### Run all tests in headless mode
```bash
npm test
```

### Run tests on a specific browser
```bash
npx playwright test --project=chromium
```

### Run tests in headed mode (visible browser)
```bash
npm run test:headed
```

### Run tests in interactive UI mode
```bash
npm run test:ui
```

### Run tests in debug inspector mode
```bash
npm run test:debug
```

### View test report
```bash
npm run test:report
```

### Generate code with Playwright Codegen
```bash
npm run codegen
```

---

## Project Structure

```
ai_agentic_qe/
├── .gitignore              # Git ignore rules
├── package.json            # Node dependencies and NPM test scripts
├── tsconfig.json           # TypeScript configuration
├── playwright.config.ts    # Playwright configuration
├── tests/
│   ├── example.spec.ts     # Sample test suite
│   └── page-objects/       # Page Object Model (POM) directory
│       └── base.page.ts    # Base page abstraction
└── README.md               # Project documentation
```

---

## Agentic QA pipeline (Claude Code)

This project runs its QA process with Claude Code skills and a small "staff" of subagents instead of ad-hoc prompting. **New here and not technical?** Start with [`docs/00-Start-Here.md`](docs/00-Start-Here.md) — plain-language walkthrough, no coding knowledge needed.

For the technical reference: `AGENTS.md` is the persistent memory (loaded every session), `.claude/skills/` holds the pipeline, `.claude/agents/` holds the five-role QA staff, `.agents/project.yaml` holds project variables, `.context/` holds business/test context, and `docs/` doubles as an Obsidian notes vault (test plans, reports, bugs, regression runs).

| Stage | Skill | What it does |
| --- | --- | --- |
| 0 — Shift-Left | `/shift-left-testing` | Pre-sprint review of a requirement for testability and risk |
| 1-3 — Sprint testing | `/sprint-testing` | Plan -> execute -> report a manual/exploratory pass |
| 4 — Documentation | `/test-documentation` | ROI verdict: Candidate / Manual / Deferred |
| 5 — Automation | `/test-automation` | Plan -> code -> review a Playwright spec (BasePage -> Page -> spec pattern) |
| 6 — Regression | `/regression-testing` | Full-suite run, classifies failures, emits GO / CAUTION / NO-GO |

Staff (subagents under `.claude/agents/`): `qa-test-architect` (Plan), `qa-automation-engineer` (Code), `qa-code-reviewer` (Review), `qa-exploratory-tester` (Exploration), `qa-regression-analyst` (Bulk/regression).

No issue tracker or TMS is wired up here on purpose — test cases, bugs, and run history live as Obsidian notes in `docs/` instead (`/qa-obsidian-notes`). This project currently points at a sandbox target (`https://playwright.dev`) rather than a real application — swap that in `.agents/project.yaml` and `.context/business/business-feature-map.md` whenever a real target is ready.

**CI**: `.github/workflows/playwright.yml` runs the suite (chromium/firefox/webkit) on every push/PR to `main`, plus manual `workflow_dispatch`. No secrets required today — nothing needs authenticating against the public sandbox target.
