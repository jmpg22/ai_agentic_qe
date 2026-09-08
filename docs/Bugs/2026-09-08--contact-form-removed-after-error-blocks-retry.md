---
type: bug
status: open
severity: major
created: 2026-09-08
found_in: sprint-testing
ticket: SCRUM-2
related_case: "[[Test-Plans/2026-09-08--scrum-2-contact-form-send]]"
tags: [qa, bug, scrum-2, contact-form]
---

# Contact Us form is deleted from the page when the error appears, so the user cannot retry without reloading

Found during [[2026-09-08--scrum-2-contact-form-send-atr|the SCRUM-2 sprint-testing pass]]. Same handler as [[2026-09-08--contact-form-send-shows-error-and-never-submits]], but a separate defect: even once the submit path is fixed, a genuine failure would still leave the user with no way to retry.

## Steps to reproduce

1. Cold-load `https://academybugs.com/contact-us-form/?pid=4434`.
2. Fill every field with valid data (First Name `Jordan`, Last Name `Reyes`, Email `jordan.reyes@example.com`, Subject `Question about pricing`, Message `Please send me your rate card.`).
3. Click **Send** and wait for the "Oops! Something went wrong." box.
4. Look for the form fields and the **Send** button on the page.

## Expected vs. actual

**Expected** — after a failed send, the form stays on the page with the user's input intact so they can correct something and press **Send** again.
**Actual** — the form element is removed from the DOM. No fields, no **Send** button, and the typed message is gone. The only recovery is a manual page reload, which also discards everything the user typed.

## Evidence

- Post-click DOM state, read directly from the page: `#contact-form` absent, `#submit-contact-form` absent, `#wpforms-confirmation-1122` present. Reproduced 3/3 times.
- A page reload does restore the form (empty), confirming this is client-side DOM removal, not a server error page.
- **No screenshot retained** — same reason as [[2026-09-08--contact-form-send-shows-error-and-never-submits]]: `test-results/` is wiped per run and the target stopped responding to the runner before a re-capture.

## Environment

- Browser project: `chromium` (Playwright 1.63.0, Desktop Chrome device profile)
- URL: `https://academybugs.com/contact-us-form/?pid=4434`
- Date: 2026-09-08 · repo commit `1b36b39`

## Severity

**Major** — a dead end rather than a data-integrity problem, but it turns a "please try again" message into an unrecoverable state and loses the user's composed message. It would still be wrong on a real, transient backend failure.

## Suggested fix direction

Render the error box *alongside* the form (or above it) rather than calling `jQuery('#contact-form').remove()`, and preserve the entered values.
