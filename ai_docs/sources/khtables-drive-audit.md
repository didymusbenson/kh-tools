# KHTABLES Drive Source Audit

## Purpose

This audit records what was found in the legacy Google Drive folder named **KHTABLES**. It is a planning artifact, not a claim that the data is accurate, licensed for reuse, or complete.

Audit date: 2026-09-18

## Folder inventory

| File | Type | Apparent game | Planning value | Treatment |
|---|---|---|---|---|
| KHBBS Tables | Google Sheet | Birth by Sleep Final Mix | High | Extract domain model and verify all facts |
| KH FM TABLES | Google Sheet | Kingdom Hearts Final Mix | High | Extract completion categories and candidate records |
| Untitled document | Google Doc | Kingdom Hearts II Final Mix | Medium | Large SQL/data dump; use as discovery evidence |
| KH2 USEFUL JOINS | Google Doc | Kingdom Hearts II Final Mix | High | Preserve intended user questions and entity relationships |
| KH2 SETUP | Google Doc | Kingdom Hearts II Final Mix | Medium | Schema and data dump with TODOs |
| KH2 Procedures | Google Doc | Kingdom Hearts II Final Mix | Low | Discard implementation; retain entity names only |
| kh create tables | Google Doc | Kingdom Hearts II Final Mix | Medium | Schema evolution and intended future scope |
| Kh2FM tables | Google Sheet | Kingdom Hearts II Final Mix | High | Extract candidate datasets and gaps |
| KHDB SETUP SQL SCRIPT | Google Doc | Kingdom Hearts II Final Mix | Medium | Older schema/data snapshot |
| KH3D DATABASE PROJECT | Google Sheet | Dream Drop Distance | High | Strong relational prototype for Spirits, commands, and Links |

## Useful legacy relationships

The old database work models relationships that remain product-relevant:

- Item → item type
- Recipe → product
- Recipe → ingredient → quantity
- Material → enemy or special acquisition rule → drop rate
- Enemy → world/area
- World → area
- Treasure chest → contents → area → instructions
- Puzzle → piece → area → movement requirement
- Weapon → type → stats → ability → acquisition
- Magic tier → acquisition event
- Character → ability
- Mission/minigame → location → requirement → strategy
- Spirit → recipe → synthesis materials → probability/rank
- Spirit → board unlock → LP price
- Spirit pair attributes → Dual Link/Link Style

These relationships should inform the new content model without preserving the SQL Server schema.

## Data-quality findings

- Implementation columns and generated SQL are embedded beside content in several sheets.
- Some intended tabs are empty.
- TODO comments explicitly acknowledge missing areas and weak sources.
- Typos and inconsistent canonical names are common.
- Platform and edition applicability is rarely explicit.
- Some text appears copied from third-party guides or wikis.
- Source links are sparse and do not provide record-level provenance.
- Helper calculations are hand-maintained and may drift.
- Several datasets are broad but incomplete.
- Database-oriented lookup structures obscure user-facing concepts.
- Controller-button glyphs are missing from some Dream Drop Distance descriptions.

## Migration rule

Do not bulk-import this material directly into production data.

For each candidate record:

1. Identify the canonical game edition and platform applicability.
2. Confirm the canonical name and aliases.
3. Verify the fact against an acceptable source.
4. Rewrite descriptive text when reuse rights are unclear.
5. Store record-level provenance.
6. Normalize relationships into the new domain model.
7. Validate completeness against an independent category checklist.
8. Preserve uncertainty explicitly until resolved.

## Immediate specification impact

This source set establishes initial per-game specifications for:

- Kingdom Hearts Final Mix
- Kingdom Hearts II Final Mix
- Birth by Sleep Final Mix
- Dream Drop Distance

It does not establish that these are the only games in product scope.
