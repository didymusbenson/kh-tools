# Research audit — October 1, 2026

The user requested an exhaustive scan for incomplete, unverified, unresearched, hedged and disputed game data. Six high-reasoning agents audited all seven games against repository baseline **`f933ab1`**, with separate per-game deliverables. These are audits of the existing repository evidence, not new external research or certifications of game facts.

## Per-game reports

| Game | Report | Finding groups (baseline; live status below) |
|---|---|---|
| KH1 Final Mix | [research_audit.md](../games/kh1fm/research_audit.md) | 20: 16 active content gaps, 2 lower-priority detail questions, 2 provenance limitations; historical resolutions separately listed |
| Re:Chain of Memories HD | [research_audit.md](../games/recom/research_audit.md) | 32: 18 factual/extraction gaps, 2 integration/provenance, 8 resolved groups, 3 nonfactual groups, 1 caveat-propagation defect |
| KH2 Final Mix | [research_audit.md](../games/kh2fm/research_audit.md) | 40: 21 open factual/coverage, 4 researched but unintegrated, 10 resolved/historical, 3 provenance/edition, 2 engineering/excluded |
| Birth by Sleep Final Mix | [research_audit.md](../games/bbsfm/research_audit.md) | 38: 25 open, 4 partly answered, 4 answered but unintegrated, 5 provenance/nonfactual/history categories |
| Dream Drop Distance HD | [research_audit.md](../games/dddhd/research_audit.md) | 25: 21 open, 2 mixed extraction/verification, 2 researched but unintegrated |
| KH0.2 | [research_audit.md](../games/kh02/research_audit.md) | 18: 16 open factual questions, 1 provenance/integration, 1 researched but unintegrated |
| KH3 / Re Mind | [research_audit.md](../games/kh3/research_audit.md) | 35: 34 open/mixed and 1 researched but unintegrated; historical/provenance/nonfactual ledgers separately listed |

These counts are **issue families, not counts of wrong facts**. Some concern missing catalogs or useful detail, some concern source provenance, and some account for resolved historical wording. Each report provides exact affected IDs/fields and occurrence locations; repeated generated copies are not independent evidence. Classification boundaries vary slightly by game, so totals are not an accuracy ranking.

## What was inspected

Game specifications, readiness workbooks, dedicated research packs, shared research/source notes, source manifests, conflict and closure audits, implementation reports, relevant UI/reference notes, canonical and generated data, import/generation code, relevant tests and legacy inputs. Agents inspected missing fields and data relationships as well as explicit hedge language. The reports describe their exclusions, source-to-runtime lineage and complete repeated-record appendices.

Historical limitations were checked against later work. For example, the later Re:CoM roster/CP audit and KH2 data closures resolve many earlier missing-data claims. The absence of personal gameplay validation does not itself establish a factual defect or require a user playthrough.

## Findings that affect the next research pass

- **Already researched, not integrated:** several answers exist in source/research records but were omitted or remain quarantined in runtime data. These can be investigated before repeating external research.
- **Location precision:** many records have a valid item/area census but lack the landmarks, approach, access conditions or replay behavior needed for practical guidance.
- **Exact predicates:** achievement counters, character/episode ownership, unlock rules, save retention and probabilistic outcomes require more than copying a display name or broad summary.
- **Provenance gaps:** some source URLs remain only in developer tables, some transformations discard caveats or citations, and source manifests do not always include later references.
- **Stale language:** closed questions and old implementation limitations still appear in earlier documents. Reports retain those occurrences and mark the later resolution rather than calling them unanswered again.

The initial audit did not rewrite guide facts. Follow-up corrections are now tracked in [the resolution pass](research-resolution-2026-10-01.md) and each per-game audit. Copperminds remain empty.

## Current closure ledger — October 1

- **BBS:** BBS-007/008/017 closed; BBS-006 narrowed to the exact minimum Ignite level. The Archraven Shop 1–4 transcription is also fixed within the still-open BBS-015 route/coverage finding. Nine character-scoped meld groups restored. [Evidence and integration](../games/bbsfm/research-resolution-2026-10-01.md).
- **Re:CoM:** COM-018 closed as a false gap after checking edition differences; COM-019 integrated for all 13 Riku sleights. COM-032 partially corrected; remaining mushroom/encounter questions stay open. [Evidence and integration](../games/recom/research-resolution-2026-10-01.md).
- **Other five games:** no findings changed in this pass.

The baseline counts above are preserved for audit history; use dated per-finding statuses and this ledger for the current backlog.

## Concurrent work and reference stability

During the audit, the user requested a Sources & Research home-modal requirements draft and clarified that Data Jiminy's memories should be flushed while its infrastructure remains intact. Those changes are separately documented in [the modal draft](../content/sources-and-research-modal.md) and [Data Jiminy's reset](../data-jiminy.md#current-knowledge-reset--2026-10-01).

Audit path/line references are anchored to **`f933ab1`**, before those changes. Consult that revision when lines in shared docs or tooling have moved. Findings use stable record IDs alongside line locations so follow-up edits can be traced without relying on current line numbers alone.
