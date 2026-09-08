---
type: bug
status: open
severity: minor
created: 2026-09-08
found_in: sprint-testing
ticket: SCRUM-2
related_case: "[[Test-Plans/2026-09-08--scrum-2-contact-form-send]]"
tags: [qa, bug, scrum-2, contact-form]
---

# Subject and Message are rejected as required even though the form does not mark them required

Side finding from [[2026-09-08--scrum-2-contact-form-send-atr|the SCRUM-2 sprint-testing pass]] — outside SCRUM-2's acceptance criteria, filed separately so it isn't lost when SCRUM-2 closes.

## Steps to reproduce

1. Cold-load `https://academybugs.com/contact-us-form/?pid=4434`.
2. Enter First Name `Jordan`, Last Name `Reyes`, Email `jordan.reyes@example.com`.
3. Leave **Subject** and **Message** blank.
4. Click **Send**.

## Expected vs. actual

**Expected** — Subject and Message carry no `required` attribute, so a message with only the three required fields should be accepted.
**Actual** — submission is blocked and "This field is required." is shown against Subject and Message.

## Evidence

- Directly observed on the partial-fill case (`contact-form-partial-required-fields-blocks-submission`): with First Name, Email and Message filled and Last Name + Subject blank, the page rendered **two** "This field is required." messages — one of them for Subject, which the markup declares optional.
- The blank-optional-fields case was blocked (no submission attempt) in its one clean execution; a confirmatory re-run could not be completed because the target site stopped responding mid-pass (see the ATR's Environment notes). The mechanism below makes the behaviour unambiguous regardless.
- Page source — `validateForm()` runs the same `validateAndModifyContactFormField(...)` check over all five fields, including `subject` and `message`:

```js
validateAndModifyContactFormField(validationObj, subject, 'subject_error', 'subject');
validateAndModifyContactFormField(validationObj, message, 'msg_error', 'message');
```

## Environment

- Browser project: `chromium` (Playwright 1.63.0, Desktop Chrome device profile)
- URL: `https://academybugs.com/contact-us-form/?pid=4434`
- Date: 2026-09-08 · repo commit `1b36b39`

## Severity

**Minor** — it does not block the (already broken) send path and the validation message is at least clear, but the form contradicts itself: fields presented as optional cannot be left blank. Needs a product decision on which side is right — make the fields genuinely optional, or mark them `required` in the markup.
