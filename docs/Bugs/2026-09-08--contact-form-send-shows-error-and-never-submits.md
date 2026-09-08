---
type: bug
status: open
severity: blocker
created: 2026-09-08
found_in: sprint-testing
ticket: SCRUM-2
related_case: "[[Test-Plans/2026-09-08--scrum-2-contact-form-send]]"
tags: [qa, bug, scrum-2, contact-form]
---

# Contact Us form shows "Oops! Something went wrong." on a valid Send and never transmits the message

Confirms the defect reported in Jira **SCRUM-2**, and extends it: the message is not merely *reported* as failed, it is never sent at all. Found during [[2026-09-08--scrum-2-contact-form-send-atr|the SCRUM-2 sprint-testing pass]].

## Steps to reproduce

1. Cold-load `https://academybugs.com/contact-us-form/?pid=4434` (redirects to `https://academybugs.com/contact-us-form/`).
2. Enter First Name `Jordan`, Last Name `Reyes`.
3. Enter Email `jordan.reyes@example.com`.
4. Enter Subject `Question about pricing`.
5. Enter Message `Please send me your rate card.`
6. Click **Send**.

## Expected vs. actual

**Expected** — the message is submitted and a success confirmation is displayed (SCRUM-2 AC1 + AC2).
**Actual** — the form disappears and a red box reading "Oops! Something went wrong." is displayed; no HTTP request is made to the form's action URL, so the message is silently discarded.

## Evidence

- Post-click DOM state, read directly from the page: `#wpforms-confirmation-1122` present with text `"Oops! Something went wrong."`; `#contact-form` gone. Reproduced 3/3 times (initial run + 2 automatic retries).
- Network capture during a valid Send: **zero** requests to `/examples/actions/confirmation.php` (the form's own `action`). Also reproduced 3/3.
- **No screenshot retained.** Playwright captured one (`test-results/scrum-2-exec-*-id-submission-sends-message-chromium*/test-failed-1.png`, plus a trace), but `test-results/` is wiped at the start of every run and the target site became unreachable from the runner before a re-capture could be made — see the ATR's Environment notes. Re-capture with the steps above once the site responds again.

## Environment

- Browser project: `chromium` (Playwright 1.63.0, Desktop Chrome device profile)
- URL: `https://academybugs.com/contact-us-form/?pid=4434`
- Date: 2026-09-08 · repo commit `1b36b39`

## Severity

**Blocker** — the contact form's only purpose is submitting a message, and no message can be submitted by any input combination. The user is also actively misinformed: "Oops! Something went wrong." implies a transient failure, when in fact nothing was ever attempted.

## Root cause (observed in page source, for the fix)

The inline handler on the page:

```js
jQuery(document).on('click', 'button', function (e) {
  if (jQuery(this).prop('id') == 'submit-contact-form') {
    if (validateForm()) {
      console.log('form valid');
      wait(1000);
      var contactFormParent = jQuery('#contact-form').parent();
      jQuery('#contact-form').remove();
      contactFormParent.append('<div ... id="wpforms-confirmation-1122"><p>Oops! Something went wrong.</p></div>');
    }
  }
});
```

On a **valid** form it removes the form and renders the failure box unconditionally. It never calls `submit()` and never issues a request, so `action="/examples/actions/confirmation.php"` is dead code — the `<button>` is `type="button"`, so the form has no native submit path either.

## Related

- [[2026-09-08--contact-form-removed-after-error-blocks-retry]] — the same handler's `remove()` also makes the error unrecoverable.
