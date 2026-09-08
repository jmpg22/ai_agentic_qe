---
name: qa-obsidian-notes
description: Note taxonomy and frontmatter conventions for this project's Obsidian vault (docs/). Resolves where and how every pipeline skill files a test plan, test report, bug, or regression run as a linked Obsidian note. Use whenever a skill needs to create, update, or link a note under docs/.
---

# qa-obsidian-notes — docs/ as the vault

`docs/` in this repo doubles as an Obsidian vault: open the folder directly in Obsidian (File → Open folder as vault) and every note below renders with working backlinks, tags, and frontmatter-based queries. No `.obsidian/` config is checked in — Obsidian creates its own on first open, so nothing here is Obsidian-version-specific.

If the **Desktop Commander** plugin's `obsidian-vault` skill is installed, use it to actually read/write the vault (it knows how to talk to a running Obsidian instance or the vault files directly). This skill is the *taxonomy* — what goes where, what frontmatter to use — not a competing implementation. Without that plugin installed, write the files directly with normal file tools; the notes are still plain markdown either way.

## Folder taxonomy

| Folder | Holds | Filed by |
| --- | --- | --- |
| `docs/Test-Plans/` | ATP outlines (shift-left), test case notes with ROI verdicts | `shift-left-testing`, `test-documentation` |
| `docs/Test-Reports/` | ATR narrative reports from a sprint-testing pass | `sprint-testing` |
| `docs/Bugs/` | Defect notes — see `agentic-qa-core/references/defect-notes-doctrine.md` for required fields | `sprint-testing`, `regression-testing` |
| `docs/Regression-Runs/` | One note per CI/local regression run with the GO/CAUTION/NO-GO verdict | `regression-testing` |

## Frontmatter — every note gets one

```yaml
---
type: test-plan   # test-plan | test-case | test-report | bug | regression-run
status: draft      # draft | active | done | open | fixed  (meaning depends on type)
created: 2026-09-08
tags: [qa, sprint-testing]
---
```

`type` is what makes these queryable as a lightweight TMS from inside Obsidian (`type: test-case AND status: open`, e.g.) — never skip it.

## Linking

Use `[[wikilinks]]` to connect a spec back to its Test Case note, a bug to the Test Report that found it, a Regression Run to every bug it reopened. This is the traceability layer that a real TMS would give you via ticket IDs — here it's just Obsidian's backlink graph, so link generously rather than relying on filenames matching.

## Naming

`YYYY-MM-DD--short-slug.md`, e.g. `2026-09-08--get-started-link-404.md`. Sortable by date at a glance, still human-readable.

## Test Case IDs (used by `test-automation` for spec traceability)

Since there's no Zephyr/Jira key to annotate a spec's `test()` title with, use the Test Case note's filename (without the date prefix) as the id: `test('get-started-link-navigation: ...', ...)`. It's a real, clickable link back to `docs/Test-Plans/<date>--get-started-link-navigation.md` for anyone who opens the vault.
