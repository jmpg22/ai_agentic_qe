# Jira -> sprint-testing CI trigger

`.github/workflows/jira-qa-trigger.yml` polls Jira every 15 minutes for every ticket tagged with the `JIRA_LABEL` label (any project, any status — the label is the sole selection criterion, deliberately, so tagging a ticket is what opts it in). For each one found, it labels the ticket `ai-qa-picked-up` too (so the next poll skips it), posts a "testing started" comment, then runs `/sprint-testing` against it inside a GitHub Actions job via the Claude Code GitHub Action, on a fresh branch.

The JQL is `labels = "$JIRA_LABEL" AND labels != "ai-qa-picked-up"`. That plain `!=` is safe here specifically because it's ANDed with `labels = "$JIRA_LABEL"` — a ticket matching that always has a non-empty `labels` field, so Jira's well-known `!=` gotcha (a plain `labels != "x"` also excludes issues with *no* labels at all, which bit an earlier version of this query when it filtered by status instead) doesn't apply. If this ever goes back to selecting by status/project instead of a label, that exclusion needs `OR labels is EMPTY` added back — see the workflow's git history for the exact fix if so.

If you're reading this because a CI run pointed you here: your job is to run sprint-testing for the ticket, then finish the two things below yourself before you're done.

## What's already available in that CI run

- `JIRA_SITE`, `JIRA_EMAIL`, `JIRA_TOKEN` — environment variables, already set. Basic auth: `-u "$JIRA_EMAIL:$JIRA_TOKEN"`.
- `Read`, `Write`, `Edit`, `Bash`, `Grep`, `Glob` tools.
- A full checkout of the repo, Node deps installed, Playwright browsers installed.

## 1. Open a pull request with what you found

Create a branch named `qa/<ticket-key>` if you're not already on one, commit everything you created or changed (notes under `docs/`, any spec/page-object changes), push it, and open a pull request against `main` summarizing what was tested and what was found. Use `gh pr create` if available, or the GitHub API directly.

## 2. Comment the result back on the Jira ticket

Jira Cloud's v3 comment endpoint needs the body in Atlassian Document Format (ADF), not plain text:

```bash
curl -sS -X POST \
  -u "$JIRA_EMAIL:$JIRA_TOKEN" \
  -H "Content-Type: application/json" \
  --data '{
    "body": {
      "type": "doc",
      "version": 1,
      "content": [
        {"type": "paragraph", "content": [{"type": "text", "text": "YOUR SUMMARY HERE"}]}
      ]
    }
  }' \
  "https://$JIRA_SITE/rest/api/3/issue/<TICKET_KEY>/comment"
```

Write a real summary: what was tested, what passed, what bugs (if any) were found and their severity, and a link to the pull request you opened. Don't just say "see PR."

## Failure mode to know about

The `ai-qa-picked-up` label gets added *before* this job runs, so if this run fails, times out, or is cancelled, the ticket won't be picked up again automatically on the next poll. Remove the label from the ticket manually to have it retried.

## Testing this without waiting for a real ticket

Three ways, all do the real thing (not a dry run):

- **Manual run**: Actions tab -> Jira QA Trigger -> Run workflow, with the `ticket_key` input set to a specific ticket — skips the label filter and processes just that one ticket, whether or not it's tagged.
- **Push to an open PR that touches this workflow file** (or this doc): the `pull_request` trigger (types `opened`/`synchronize`/`reopened`) fires on every push to that PR, scoped by `paths:` to changes in `.github/workflows/jira-qa-trigger.yml` and this file. Good for iterating on the trigger itself without waiting on the 15-minute schedule or merging first.
- **Merge that PR into `main`**: the `push` trigger (same `paths:` scoping) fires again once the change lands on `main`, so you get a second confirmation the merged version still works, not just the PR's copy.

None of these are made safe by being scoped to a PR or to `main` — they're scoped by file path, not by risk. All three still poll real Jira and can act on real tickets.
