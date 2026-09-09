---
name: paper-entry-conventions
description: Style and formatting rules for adding or editing a research paper entry under src/assets/data/papers/ — title case, author-initial formatting, consortium/consortia wording, frontmatter fields, and tags. Use whenever adding a new paper, converting an ongoing study to published, or reviewing existing paper metadata for consistency.
---

# Paper entry conventions

Every research paper on the site is one Markdown file in
`src/assets/data/papers/`, loaded dynamically by
`src/services/researchService.js` and rendered on the Research page
(`src/views/ResearchView.vue`) and the individual paper page
(`src/views/PaperView.vue`). Follow these rules so every entry reads
consistently regardless of which journal or preprint server it came from.

Not every `.md` file in that folder is a paper — a few (`noa-radiology.md`,
`2026-coelho-radiology.md`) are news-post drafts for a different site/feed,
using a different frontmatter shape entirely (`title:`/`date:`/`description:`/
`picture:`/`groups:`, no `---` fences, no `tags:`). Don't confuse the two
formats — a paper entry always uses the fenced frontmatter block described
below.

## File naming

`<firstauthorlastname><year>_<short-slug>.md`, all lowercase, underscore
between the year and the slug. Examples: `twilt2025_eur_urol.md`,
`spaans2026_chimera.md`, `coelho2026.md` (slug omitted when the author+year
alone is unambiguous).

## Frontmatter fields

```yaml
---
tags: PUBLISHED
order: 3
date: 2025-06-13
authors: J. J. Twilt, A. Saha, J. S. Bosma, ..., M. de Rooij, on behalf of the PI-CAI consortium
publication_details: JAMA Netw. Open 2025;8;(6):e2515672.
publication_link: https://doi.org/10.1001/jamanetworkopen.2025.15672
---
```

- **`tags`** — exactly `PUBLISHED` or `ONGOING` (uppercase). These two values
  are the only real filter tabs; don't invent a third tag value — see "Under
  review" below for how to flag a study without adding a new tab.
- **`order`** — PUBLISHED papers only, integer, controls display order on the
  Research page (lower = earlier). When inserting a paper into the middle of
  the sequence, renumber the papers after it rather than reusing a number.
  ONGOING papers have no `order`; they just sort by their own logic.
- **`date`** — `YYYY-MM-DD`. For ONGOING studies without a firm date, use the
  date the entry itself was drafted/last revised.
- **`authors`** — see below. Long lists may wrap across multiple physical
  lines in the YAML value for readability in the source file — that's fine,
  `researchService.js` reassembles wrapped lines into one string.
- **`publication_details`** — the journal citation string (e.g.
  `Lancet Oncol. 2024;25(7):879–87`), or `Arxiv` for a preprint with no
  journal yet. Leave blank for an ONGOING study with nothing to cite yet.
  This string also drives the journal-logo lookup in `ResearchView.vue`
  (`journalLogos`, matched by substring) — if you add a paper from a journal
  with a logo asset that isn't in that map yet, add a new entry there (mind
  the ordering: more specific keys like `"imaging cancer"` must be checked
  before broader ones like `"radiology"`, since the lookup returns the first
  substring match).
- **`publication_link`** — DOI link once published, arXiv abstract URL for a
  preprint, or blank if there's genuinely nothing to link yet. Never
  fabricate or guess a DOI/URL — leave it blank and ask if you don't have it.
- **`study_protocol_link`** — optional, only when a separate registered
  protocol exists (e.g. a Zenodo DOI).
- **`under_review: true`** — optional. Marks a study as being under peer
  review right now. This does **not** change its `tags` and does **not**
  create a new filter tab — it stays filed under `ONGOING`, but its badge on
  the card displays "UNDER REVIEW" (amber) instead of "ONGOING" (pink). Only
  add this when the study has actually been submitted for review, not merely
  "in progress."

## Title (the `# Heading`)

Use headline-style Title Case for every paper title, regardless of how the
journal itself stylizes it (many medical journals use sentence case in their
own metadata — that's fine there, but titles on this site are re-cased for
consistency across the list; the words themselves are never changed, only
capitalization).

Rules:
- Capitalize the first and last word of the title, always.
- Capitalize the first word after a colon (subtitle), always — e.g.
  `...Prostate Cancer: A Simulation Study`, not `...Prostate Cancer: a
  Simulation Study`.
- Capitalize all nouns, verbs (including gerunds like *Using*, *Evaluating*,
  *Scaling*), adjectives, and adverbs.
- Lowercase articles (`a`, `an`, `the`), coordinating conjunctions (`and`,
  `or`, `for`, `nor`, `but`, `so`, `yet`), and short prepositions (`in`, `on`,
  `at`, `to`, `of`, `by`, `up`, `off`, `out`, `per`, `via`) — *unless* one of
  these is the first/last word or immediately follows a colon. Longer
  prepositions spelled out in full (`Versus`, `Towards`, `Between`) are
  capitalized; their abbreviated forms (`vs`) are not.
- Hyphenated compounds capitalize **both** halves when both are meaningful
  words: `AI-Driven`, `MRI-Based`, `Multi-Center`, `Non-Inferiority`,
  `Semi-Autonomous`. Don't leave the second half lowercase (`AI-driven`).
- Preserve a title's own deliberate acronym-spelling stylization as a named
  exception — e.g. `Unified beNchmarks for Imaging in COmputational
  Pathology, Radiology and Natural Language (UNICORN)` keeps its internal
  capitals that spell out the acronym, even though they break the rules
  above; only the *other*, non-stylized words in that title still follow
  normal Title Case (`Pathology`, `Language`, not `pathology`, `language`).
- Acronyms/initialisms and domain terms keep their established casing
  exactly (`AI`, `MRI`, `PI-RADS`, `PI-CAI`, `csPCa`, `bpMRI`) — never
  re-case these to fit the surrounding Title Case.

## Author names

Format: initials separated by spaces, each followed by a period, then the
full last name — `J. S. Bosma`, not `J.S. Bosma`. Preserve every initial
given in the source (`A. B. C. D. Ng`, `P. E. Z. Larson` — don't truncate to
just the first). Preserve diacritics (`Fütterer`, `Jäderling`, `Rouvière`)
and multi-word surnames (`de Rooij`, `van Ginneken`, `van den Bergh`,
`Pham Minh`) exactly as published, lowercase name particles kept lowercase
even mid-list.

Joint-authorship markers (`*` for joint first authors, `†` for joint senior
authors) are appended directly to the relevant names, with a trailing note
at the end of the author string: `... PI-CAI consortium — *joint first
authors, †joint senior authors`.

### Consortium credit line

A consortium credit at the end of the author list **must** be phrased as
`on behalf of the <NAME> consortium` (or `consortia` for multiple) — never
just the bare name tacked onto the list. This has slipped before (several
existing entries had bare `PI-CAI consortium` at the end with no "on behalf
of the", and had to be fixed after the fact), so treat it as a required
field shape, not a style suggestion:

- ✅ `..., M. de Rooij, on behalf of the PI-CAI consortium`
- ❌ `..., M. de Rooij, PI-CAI consortium`

**`consortium`/`consortia` is always lowercase** — never
`Consortium`/`Consortia`, even though it follows a proper noun like `PI-CAI`
or `CHIMERA`. This applies everywhere the word appears, not just in the
author credit line — including inside abstract body text (e.g. "...developed
within the international PI-CAI consortium."). Ordinary prose mentions of a
consortium elsewhere in the abstract (e.g. "developed within an
international consortium") don't need the "on behalf of" phrasing — that
phrasing is specifically for the author-list credit line.

Multiple consortia are joined with em dashes (`—`), no spaces around them:
`PI-CAI—PRIME—STHLM3-MRI—IP1-PROSTAGRAM—ProCAncer-I—COMFORT consortia`.

When reviewing or adding a paper, grep the file for `consortium|consortia`
and check every match: the author-list one needs "on behalf of the", none of
them should be capitalized.

## Abstract structure

Keep whatever section structure the actual paper/journal uses for its
abstract (`Background`/`Purpose`/`Materials and Methods`/`Results`/
`Conclusion` for a Radiology-style paper; `Background and objective`/
`Methods` for a shorter structured summary of an ongoing study, etc.) as
`###` subheadings under a single `## Abstract` heading. Don't invent a
different structure than the source uses — just keep the same title-case and
consortium rules above wherever those terms appear inside the abstract text
itself.

## Quick checklist for a new entry

1. File named per the convention above, in `src/assets/data/papers/`.
2. Frontmatter has `tags`, `date`, `authors` (and `order` if PUBLISHED).
3. Title is Title Case per the rules above.
4. Authors use spaced initials, full diacritics/multi-word surnames intact.
5. Any consortium credit line in the author list reads `on behalf of the
   <NAME> consortium`, not a bare name; `consortium`/`consortia` lowercase
   everywhere it appears.
6. `publication_details`/`publication_link` filled in if known, left blank
   (never guessed) if not — check the journal-logo map if it's a new journal.
7. Abstract uses `##`/`###` headings matching the source's own structure.
