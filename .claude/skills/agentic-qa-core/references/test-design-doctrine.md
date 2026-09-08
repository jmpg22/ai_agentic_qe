# Test design doctrine

Rules every test case and spec in this project follows, whether it's a manual case in an Obsidian note or a Playwright spec.

## Naming

A test's name states the scenario and the expected outcome, not the mechanism: `"rejects login with an expired session token"`, not `"test login 3"`. Someone reading only the name should know what broke if it fails.

## One assertion focus per test

A test proves one thing. If it takes five `expect()` calls to describe unrelated behavior, split it. Multiple assertions checking facets of the *same* outcome (e.g. a form's success toast text and its visibility) are fine in one test.

## Data independence

A test creates or requests the data it needs and doesn't depend on another test having run first or left state behind. Playwright's `fullyParallel: true` (already set in `playwright.config.ts`) makes order-dependent tests fail unpredictably — treat any test that only passes in a specific order as a bug in the test, not in the app.

## Flake-resistance

- No hardcoded `waitForTimeout` — wait for the actual condition (`waitForLoadState`, an element becoming visible, a network response).
- Prefer role/text-based locators (`getByRole`, `getByText`) over brittle CSS selectors tied to a specific class name or DOM position.
- A test that's flaky more than once is a `qa-code-reviewer` finding, not something to retry into silence.

## ROI verdicts (used by `/test-documentation`)

Every test case gets one of three verdicts:

- **Candidate** — worth automating: runs often, high business risk if it breaks silently, stable enough to not fight the framework constantly.
- **Manual** — keep it manual: one-off, exploratory by nature, or the ROI of automating it doesn't clear the maintenance cost.
- **Deferred** — not now: valid case, but lower priority than what's already in the automation backlog. Revisit later, don't lose track of it.
