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