---
type: test-report
status: done
created: 2026-09-08
tags: [qa, sprint-testing, scrum-2, contact-form]
ticket: SCRUM-2
target: https://academybugs.com/contact-us-form/?pid=4434
verdict: SCRUM-2 not fixed — reproduced, and worse than reported
---

# ATR — SCRUM-2 "Send button returns an error page"

Sprint-testing pass (plan → execute → report) against Jira **SCRUM-2**. Plan: [[2026-09-08--scrum-2-contact-form-send]].

## Headline

**SCRUM-2 reproduces, and the ticket understates it.** The Send button doesn't just show an error — it never sends anything. No HTTP request leaves the page, so every message typed into this form is silently discarded while the user is told "Oops! Something went wrong." Both acceptance criteria fail.

Neither AC is met:

| AC | Result |
| --- | --- |
| AC1 — the user can send a message by clicking **Send** | ❌ Fail — no request is ever made to the form's action URL |
| AC2 — the **Send** button does not return an error page | ❌ Fail — "Oops! Something went wrong." is rendered every time |

## What was tested

Seven planned cases from [[2026-09-08--scrum-2-contact-form-send]], executed against `https://academybugs.com/contact-us-form/?pid=4434` on `chromium` (Playwright 1.63.0, Desktop Chrome profile), 2026-09-08, repo commit `1b36b39`.

| # | Case | Result | What happened |
| --- | --- | --- | --- |
| 1 | `contact-form-valid-submission-sends-message` | ❌ **Fail** | Form vanished; red box "Oops! Something went wrong." Reproduced 3/3. |
| 2 | `contact-form-empty-required-fields-blocks-submission` | ✅ Pass | Blocked, five × "This field is required.", form intact, no error box. |
| 3 | `contact-form-partial-required-fields-blocks-submission` | ✅ Pass | Blocked, missing fields flagged, already-entered values retained. |
| 4 | `contact-form-invalid-email-format-rejected` | ✅ Pass | `jordan.reyes@` and `not-an-email` both rejected with "Please enter a valid email address." |
| 5 | `contact-form-blank-optional-fields-still-sends` | ❌ **Fail** | Blocked — Subject and Message are validated as required despite carrying no `required` attribute. |
| 6 | `contact-form-send-issues-no-post-to-action-url` | ❌ **Fail** | Zero requests to `/examples/actions/confirmation.php` on a valid Send. Reproduced 3/3. |
| 7 | `contact-form-error-state-allows-retry-without-reload` | ❌ **Fail** | Form and **Send** button removed from the DOM; only a page reload restores them (empty). Reproduced 3/3. |

**4 failed, 3 passed.** Validation-side behaviour (cases 2-4) is actually solid; everything on the submit path is broken.

## Bugs filed

| Note | Severity |
| --- | --- |
| [[2026-09-08--contact-form-send-shows-error-and-never-submits]] | **Blocker** — the SCRUM-2 defect, plus the finding that nothing is transmitted |
| [[2026-09-08--contact-form-removed-after-error-blocks-retry]] | **Major** — the error state deletes the form, so the user cannot retry |
| [[2026-09-08--contact-form-optional-fields-blocked-as-required]] | **Minor** — Subject/Message rejected as required though marked optional (outside SCRUM-2's ACs) |

Cases 1, 6 and 7 share one root cause — the `#submit-contact-form` click handler fakes a failure instead of submitting:

```js
if (validateForm()) {
  jQuery('#contact-form').remove();
  contactFormParent.append('<div ... >Oops! Something went wrong.</div>');
}
```

It is filed as two notes rather than one because the DOM removal is a defect in its own right: fixing the submit path would still leave a real backend failure unrecoverable.

## Observations that are not bugs

- `?pid=4434` is dropped on redirect to `https://academybugs.com/contact-us-form/`. Outside SCRUM-2's ACs and harmless to the flow; noted only so a later reader isn't surprised the URL changes.
- The **Send** button is `type="button"`, so HTML5 `required` never fires and *all* validation depends on the page's own `validateForm()`. That's the reason cases 2-4 pass — the custom validation is doing the work the browser normally would.

## Out of scope

- Anything on `academybugs.com` outside the Contact Us form. It's a deliberately-buggy training site; other planted defects near this page were not hunted and are not part of this verdict.
- Whether email-format strictness is *correct* — the ACs never define it. Case 4 is reported as observed behaviour, not as a pass against a stated requirement.
- No Playwright specs were added to the suite. Sprint-testing doesn't write automation (skill boundary); execution ran through a scratch harness that was deleted afterwards.

## Environment notes / limitations

- Chromium only. Cross-browser (firefox/webkit) confirmation was **not** completed: partway through the pass, `academybugs.com` stopped responding to this runner entirely (`net::ERR_ABORTED` in the browser, `curl` timing out against the site root too), which looks like rate-limiting after the pass's repeated page loads. Nothing suggests the defect is browser-specific — it's a plain inline jQuery handler — but that's inference, not a measurement.
- No screenshots survived. Playwright captured them, but `test-results/` is wiped at the start of every run and the site became unreachable before a re-capture. All evidence in the bug notes is post-click DOM state and network capture read straight from the page during completed runs — reproducible, but text rather than images. Re-capture is flagged in the two notes that need it.
- Case 5's result rests on one clean execution plus direct corroboration from case 3 and the page source; a confirmatory re-run was blocked by the same outage.

## Close-out — ready for `/test-documentation`

Case notes exercised (slugs reusable as spec titles): `contact-form-valid-submission-sends-message`, `contact-form-empty-required-fields-blocks-submission`, `contact-form-partial-required-fields-blocks-submission`, `contact-form-invalid-email-format-rejected`, `contact-form-blank-optional-fields-still-sends`, `contact-form-send-issues-no-post-to-action-url`, `contact-form-error-state-allows-retry-without-reload`.

One line for the next stage: **SCRUM-2 should go back to development, not to automation** — but `contact-form-valid-submission-sends-message` and `contact-form-send-issues-no-post-to-action-url` are the two cases worth an ROI verdict now, so there's a regression guard the moment the fix lands. Before any of this reaches `/test-automation`, `.context/business/business-feature-map.md` and `.context/master-test-plan.md` need refreshing — both still name `https://playwright.dev` as the only target, so this pass ran entirely off-map.
