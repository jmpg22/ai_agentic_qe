# Defect notes doctrine

Without a ticket system, a bug note is only as useful as it is reproducible from cold. Every note filed under `docs/Bugs/` (via `/qa-obsidian-notes`) needs:

| Field | Why it's mandatory |
| --- | --- |
| **Title** | Symptom, not root cause: "Get started link 404s from the Playwright docs homepage", not "broken link bug" |
| **Steps to reproduce** | Numbered, starting from a known state (a fresh page load, not "continue from the previous test") |
| **Expected vs. actual** | One line each — what should have happened, what did |
| **Environment** | Browser project (`chromium`/`firefox`/`webkit`), URL, and date/commit if known |
| **Evidence** | Path to the screenshot/trace Playwright captured (`test-results/`, `playwright-report/`) — link it, don't paste it inline |
| **Severity** | Blocker / Major / Minor / Cosmetic — sets triage order, not a promise about who fixes it |

## Frontmatter (so Obsidian can query/filter these)

```yaml
---
type: bug
status: open        # open | triaged | fixed | wontfix
severity: major
found_in: sprint-testing   # which skill/run found it
related_case: "[[Test-Plans/<case-note>]]"
---
```

## What doesn't get filed here

A test failing because the test itself is wrong (bad locator, stale assumption) is a fix to the spec, not a bug note. Only file when the *application* behaves incorrectly.
