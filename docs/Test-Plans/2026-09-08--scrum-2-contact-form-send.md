---
type: test-plan
status: done
created: 2026-09-08
tags: [qa, sprint-testing, scrum-2, contact-form]
ticket: SCRUM-2
target: https://academybugs.com/contact-us-form/?pid=4434
---

# ATP — SCRUM-2 "Send button returns an error page"

Plan phase of the [[2026-09-08--scrum-2-contact-form-send-atr|SCRUM-2 sprint-testing pass]]. No shift-left ATP existed for this ticket, so scope was derived directly from the Jira story.

## Ticket under test

| | |
| --- | --- |
| Key | SCRUM-2 (Story, Priority High, status QA, sprint "SCRUM Sprint 0", due 2026-09-18) |
| Summary | Send button returns an error page |
| AC1 | The user can send a message by clicking **Send**. |
| AC2 | The **Send** button does not return an error page. |
| Target | `https://academybugs.com/contact-us-form/?pid=4434` |

## Under-the-hood observations that shaped the plan

Captured during planning, before execution:

- Form markup: `<form id="contact-form" action="/examples/actions/confirmation.php" method="post">` with `first_name`, `last_name`, `email` (all `required`), `subject` and `message` (**no** `required` attribute), and `<button type="button" id="submit-contact-form">Send</button>`.
- Because the button is `type="button"`, the form never natively submits and HTML5 `required` validation never fires on click. Everything depends on the page's own `validateForm()`.
- `validateForm()` validates all five fields — including `subject` and `message`, which the markup declares optional.
- The click handler, when `validateForm()` returns true, **removes** `#contact-form` from the DOM and appends a red box `#wpforms-confirmation-1122` reading "Oops! Something went wrong." It never POSTs to the form's action URL.

## Test cases

Slugs double as Test Case IDs (`qa-obsidian-notes` naming rule) and as spec titles if these reach `/test-automation`.

### `contact-form-valid-submission-sends-message`
Risk: **Critical** — this is AC1 + AC2.
1. Cold-load the contact form page.
2. Fill first name `Jordan`, last name `Reyes`, email `jordan.reyes@example.com`, subject `Question about pricing`, message `Please send me your rate card.`
3. Click **Send**.

Expected: the message is sent and a success confirmation is shown; no error box.

### `contact-form-empty-required-fields-blocks-submission`
Risk: **High** — validation is the only gate, since native validation can't fire.
1. Cold-load the contact form page.
2. Leave every field empty.
3. Click **Send**.

Expected: submission blocked, each empty required field flagged, form stays editable, no error box.

### `contact-form-partial-required-fields-blocks-submission`
Risk: **Medium** — partial fill is the most common real user state; entered data must survive.
1. Cold-load the contact form page.
2. Enter first name `Jordan`, email `jordan.reyes@example.com`, message `Test body.`; leave last name empty.
3. Click **Send**.

Expected: submission blocked, missing last name flagged, already-entered values retained, no error box.

### `contact-form-invalid-email-format-rejected`
Risk: **High** — `type="email"` gives no protection here, so this rests entirely on `validateForm()`.
1. Cold-load the contact form page.
2. Fill all fields validly except email = `jordan.reyes@`.
3. Click **Send**.
4. Repeat with email = `not-an-email`.

Expected: both rejected with an email-format message; no error box.

### `contact-form-blank-optional-fields-still-sends`
Risk: **Medium** — decides whether the defect is confined to the submit handler.
1. Cold-load the contact form page.
2. Fill the three required fields; leave `subject` and `message` blank.
3. Click **Send**.
4. Repeat with only `message` blank, then only `subject` blank.

Expected: all three variations send successfully — fields without a `required` attribute must not block submission.

### `contact-form-send-issues-no-post-to-action-url`
Risk: **Critical** — distinguishes "cosmetic error banner" from "message silently discarded"; drives severity.
1. Start capturing network traffic.
2. Cold-load the contact form page and fill all fields validly.
3. Click **Send**.
4. Inspect for any request to `/examples/actions/confirmation.php`.

Expected (per AC1): a POST to the action URL is issued and returns success.

### `contact-form-error-state-allows-retry-without-reload`
Risk: **High** — recoverability; "Oops" reads as "try again", so there must be something to try again with.
1. Cold-load the contact form page, fill all fields validly, click **Send**.
2. With the error box shown, look for the form fields and the **Send** button.
3. Attempt to re-enter data and resubmit.
4. Reload the page and confirm the form returns.

Expected: the form survives the failure so the user can retry without a manual reload.

## Ambiguities flagged to product

1. **Email-format strictness is not in the ACs.** `contact-form-invalid-email-format-rejected` tests behaviour the ticket never defines — treat a gap there as an ambiguity, not automatically a defect.
2. **`subject` / `message` optionality is contradictory** between the markup (no `required`) and `validateForm()` (validates them). The ticket doesn't say which is intended.
3. **Target is off-map.** `academybugs.com` appears in neither `.context/business/business-feature-map.md` nor `.context/master-test-plan.md`, both of which still list `https://playwright.dev` as the only configured target. Coverage accounting is wrong until those are refreshed.
4. **`?pid=4434` is dropped** on redirect to `https://academybugs.com/contact-us-form/`. Observed, outside the ACs, deliberately not made a case.
5. **Deliberately-buggy third-party sandbox.** Other planted defects are expected nearby; anything outside the Send flow belongs in its own bug note, not in this ticket's verdict.

## Results

See [[2026-09-08--scrum-2-contact-form-send-atr]]. No ROI verdicts assigned here — that's `/test-documentation`'s call.
