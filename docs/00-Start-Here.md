---
type: guide
tags: [qa, getting-started]
---

# Start here — how this QA setup works (no technical background needed)

Welcome. This folder (`docs/`) is a **notes vault** for [Obsidian](https://obsidian.md) — a free note-taking app. Everything the AI does — test plans, test reports, bugs it finds, release checks — gets written here as readable notes you can open, search, and click through, instead of living only inside a chat log.

You don't need to know how to code to use any of this. You just need to know what to *ask for*, and where to look at what came back.

## 1. Open this folder in Obsidian (optional, but recommended)

1. Download Obsidian for free: [obsidian.md](https://obsidian.md).
2. Open it, choose **"Open folder as vault"**, and select this `docs` folder.
3. That's it — every note below will show up in the left sidebar, and clicking a blue `[[link]]` inside a note jumps to the note it points to.

You can also just open these `.md` files in any text editor or in the Claude/Cowork app itself — Obsidian just makes the links between notes clickable and searchable.

## 2. What each folder is for

| Folder | Think of it as... |
| --- | --- |
| `Test-Plans/` | "What are we going to test, and is it worth automating?" |
| `Test-Reports/` | "What happened when someone actually tested it?" |
| `Bugs/` | "What's broken, and how do I see it happen again?" |
| `Regression-Runs/` | "Is everything still working before we ship?" |

You never have to create these notes yourself — the AI files them automatically as part of doing the work below. This table is just so that when you open one, you know what you're looking at.

## 3. The five "people" doing the work

Think of this setup as a small QA team made of AI agents, each with one job:

| Name | Job, in plain terms |
| --- | --- |
| **Test Architect** | Decides what needs testing and whether it's worth automating |
| **Automation Engineer** | Writes the actual automated tests |
| **Code Reviewer** | Double-checks the Automation Engineer's work before it's considered done |
| **Exploratory Tester** | Manually pokes around the app looking for things nobody thought to test |
| **Regression Analyst** | Runs everything before a release and gives a clear "safe to ship or not" answer |

You don't need to call these by name — just describe what you want, in plain language, and the right one gets involved.

## 4. What to actually type or say

You don't need special commands. Just describe what you want in your own words. A few examples:

> "I have a new feature — here's what it should do: [describe it]. Can you review it before we build it?"
→ This runs the **shift-left review** — catches confusing or untestable requirements early.

> "Test the get-started flow on playwright.dev and tell me what you find."
→ This runs a **testing pass** — plans a few checks, actually tries them, and reports back with anything broken.

> "Which of the things we just tested are worth turning into automated tests?"
→ This decides what's worth **automating** vs. keeping manual, and why.

> "Turn that into an automated test."
→ Writes the actual test code, runs it, and has it double-checked before calling it done.

> "Are we safe to release? Run everything."
→ Runs the full test suite and gives you a clear **GO / CAUTION / NO-GO** answer, with reasons.

This also happens automatically every time code is pushed to GitHub — you can watch it run under the repository's **Actions** tab, no setup needed on your end.

## 9. Tickets get tested automatically when you tag them

Separately from the above: every 15 minutes, this project checks Jira for any ticket carrying a specific label (ask whoever set this up which one — it doesn't matter what status the ticket is in). When it finds one, it automatically runs a testing pass on it, comments on the ticket to say it started, and later comments again with what it found — plus opens a pull request in the repo with the details. You don't have to do anything to trigger this; just add that label to a ticket and check back on it (or the repository's **Pull requests** tab) in a little while.

(Whoever's driving the technical setup needs to configure this once — see `.claude/skills/agentic-qa-core/references/jira-ci-trigger.md` — but once it's set up, it just runs.)

If you're not sure what to ask for, just describe your situation in plain language — "we just built X, what should I do next?" — and you'll get pointed in the right direction.

## 5. How to read a GO / CAUTION / NO-GO verdict

After a full test run, you'll get one of three answers:

- **GO** — everything's fine, safe to move forward.
- **CAUTION** — something's not perfect, but it's minor. You decide if it's worth waiting on.
- **NO-GO** — something important is broken. Don't ship until it's addressed.

The full reasoning is always saved as a note in `Regression-Runs/` if you want the details later.

## 6. Where bugs go

Any time something is found to be broken, a note appears in `Bugs/` with: what's wrong, the exact steps to see it happen, what *should* have happened instead, and (when available) a screenshot. You don't need to write any of this yourself — just ask "what bugs have we found?" and you'll get pointed to the relevant notes.

## 7. If something feels stuck

This project is a sandbox for trying the whole setup out — today it's pointed at a public demo site (playwright.dev), not a real product. If you want to point it at your actual application instead, just say so — that's a one-line change for whoever's driving the AI side, not something you need to figure out yourself.

## 8. Where the "serious" documentation lives (if you ever need it)

Everything above is the practical, day-to-day version. The technical reference — for whoever configures or extends this setup — lives in `AGENTS.md` at the project root, and inside the `.claude/skills/` and `.claude/agents/` folders. You shouldn't need to open those for normal day-to-day use.
