# Kingdom Hearts II Final Mix readiness

Status: **Implemented journal; October 1 complete audit review integrated. Exact residual evidence limits remain.**

The [forty-finding resolution ledger](../games/kh2fm/research-resolution-2026-10-01.md) is the current research queue. Original findings and row-level occurrences remain in the historical [audit appendix](../games/kh2fm/research_audit.md); old September warnings are not active blockers after their documented resolution. All specified modules remain MVP.

Specification: [KHII Final Mix](../games/kingdom-hearts-ii-final-mix.md). Canonical evidence: [research pack](../games/kh2fm/README.md) and [inspection manifest](../games/kh2fm/sources-and-legacy-audit.md). Research is community-source evidence, not a retail executable verification. App acceptance and factual evidence are tracked separately.

## Accepted decisions and answer log

| ID | Decision | Answer / status |
|---|---|---|
| KH2-D01 | Edition baseline | Modern Final Mix, Steam is the user's platform; no original/PS2 compatibility. Accepted. |
| KH2-D02 | Main purpose | Locate/acquire collectibles; ordinary plot and biography flags are not world totals or release blockers. Accepted 2026-09-18. |
| KH2-D03 | Linked views | Compact marks and expanded rows share stable saved state bidirectionally across worlds, search and Data Jiminy. Accepted 2026-09-18. |
| KH2-D04 | Spoilers | Show directly; no warnings, hiding or reveal controls. Accepted 2026-09-18. |
| KH2-D05 | Availability filtering | No Available Now or progress-gate tracking/filter. Keep relevant prerequisites in text. Accepted 2026-09-18. |
| KH2-D06 | Inventory | Opt-in; ingredient owned/required x/y when enabled. Core collection tracking must work without inventory setup. Accepted 2026-09-18. |
| KH2-D07 | Validation | App/functionality acceptance, Apple browser/iPhone/iPad first; Android follow-up. No user gameplay/playthrough gate. Accepted 2026-09-18. |
| KH2-D08 | Visual / assets | KH1/2 green Journal family; only production screenshot/map images deferred, not text/media support. Accepted. |

No additional user decision blocks this research. Facts below are research/engineering work, not questions the user must answer.

## Current coverage and remaining work

| Area | Integrated evidence | Exact residual / boundary |
|---|---|---|
| Collectibles | 301 Sora treasures, 144 puzzle pieces, sixteen prologue chests, forty maps, sixteen document relations, thirteen reports and eighteen magic grants | All 301 treasure routes, six assembly grids and 31 reward areas integrated; Daylight27 roof/pillar locator resolved by inspected HD gameplay; three per-ID Mineshaft locators remain in KH2-003 |
| Synthesis | Sixty materials/ranks, 54 collection goals, thirty base/59 outputs, Moogle thresholds, Bright and discount rules | Optional discount controls are engineering only (KH2-022); base-cost planner remains explicit |
| Equipment/abilities | 131 equipment identities and 167 scoped AP/effect/acquisition definitions | Dark Anklet conversation/cutoff resolved; incomplete stage/room shop predicates (KH2-006) |
| Forms/summons | Five FM Form curves, Final/Anti activation rules, four charms and supported summon behavior | Full FM thresholds and charm caps integrated (KH2-009 closed) |
| Challenges/records | Twelve Mushroom strategies/rank tables; twenty optional boss records; eight cups/120 rounds; 29 minigames; 21 Limits; Mickey rescue guidance | VII/XII named-event gates and25MP Pain/Panic costs integrated (KH2-013/015 closed) |
| Gummi | 54 mission-mode goals, 27 normal rank/treasure tables, forty main and nineteen Teeny dependencies | Shared Material/G inventory and all automatic Teeny dependencies supplied; no invented Steam denominator (KH2-018 closed) |
| Bestiary | 127  source groups / 227 edition-scoped contexts; individual-source Journal rosters of 82 Heartless and eleven Nobodies | I–XII base sheets and selected script overrides integrated; complete effective phase model/XIII internal sheet remain partial (KH2-019) |
| Platforms/provenance | Fifty Steam goals, explicit legacy-source limits and future-release distinction | No claim of October 8 edition parity, retail verification or recovered historical source metadata |

The resolution ledger controls the current status of all forty IDs. These counts overlap by acquisition; they are not a global percentage denominator. Engineering UI/device acceptance is separate from the evidence queue.

## Engineering acceptance fixtures

These are required engineering scenarios; completion of the research ledger alone does not prove all are tested. The shared resolution log records the actual commands and results from this pass. Follow [shared validation](../testing-and-content-validation.md).

| ID | Test | Expected result |
|---|---|---|
| KH2-E01 | Toggle treasure in compact list, inspect expanded row/search/Data Jiminy, then reverse toggle | Every view and count agree on one saved acquisition ID |
| KH2-E02 | Offline relaunch, backup/import and content rename/reorder | Progress stays attached; no duplicate or lost checks |
| KH2-E03 | Filter remaining/area/search and switch world alias Hollow Bastion/Radiant Garden | Full applicable category denominator and identity remain unchanged |
| KH2-E04 | Finish Data challenge then inspect treasure 46 | Chest remains unchecked until opened/marked; Proof index links the same acquisition |
| KH2-E05 | Check five Torn Pages through item index | Only the five linked treasure acquisitions change; no aggregate double count |
| KH2-E06 | Mark all puzzle pieces; leave assembly incomplete | World piece count can be complete while assembly/reward goals remain pending |
| KH2-E07 | Switch Sora/prologue scope | No leakage between 39 Sora treasures and 16 prologue leads |
| KH2-E08 | Disable inventory, then enable and enter stock | Checklists work both ways; enabled recipe ingredients show owned/required and correct nonnegative shortages |
| KH2-E09 | Four Lucky Rings, base already created, no discounts | Raw material multiplication matches the explicit six-material fixture in research |
| KH2-E10 | Apply verified Energy/Moogle/Serenity cases, including odd quantities and multiple crafts | Correct per-craft rounding/modifier costs/output; unresolved recipes cannot show certified totals |
| KH2-E11 | Compare 301 treasures, world collectibles, official Journal and Steam goal tracks | Labels and sets are distinct; no false trophy guarantee |
| KH2-E12 | Remove every production image; use touch/keyboard/screen reader on Apple browser/iPhone/iPad | Directions remain usable, check controls labelled, opening details does not accidentally toggle; Android follow-up |
| KH2-E13 | Simulate storage failure and conflicting open views | Consistent rollback/retry state and accessible error handling |
| KH2-E14 | Inspect spoilers and prerequisite presentation | All content visible; no reveal prompts, Available Now or saved plot-gate filter |

## Data Jiminy evidence/evaluation set (memories currently empty)

Future rebuilt per-game Copperminds must ground these answers in acquisition IDs/source rows and retain current saved state:

- Where is Twilight Town Daylight 23, and is it Roxas-only? Correct Sora/Other Twilight Town scope.
- I defeated all Data members; why is treasure 46 missing? Explain chest appearance versus opening.
- Which five chests contain Torn Pages? Return the existing acquisition records.
- Can I farm Serenity Crystals from Sorcerers in Final Mix? Correct the original-game source contamination.
- What makes four Lucky Rings cost this amount? State quantity, modifier, discount and inventory assumptions.
- Does beating Xigbar give the final Magnet element in Final Mix? Correct to Luxord.
- Where are all seven Orichalcum+ sources? Distinguish three chests and four rewards.
- Does 100% World collectibles prove the Journal trophy? Explain the separate goal set.
- What is the Shock Charm recipe? Use the corroborated Lost Illusion 1, Remembrance Gem 1 / Stone 3, and Tranquility Gem 1 / Stone 3; do not restore the aggregate table reversal.
- How do Form level 7 and standard Glide level 3 relate? State the correct scopes.

Answer evaluation, offline SLM performance, app build, responsive UI and persistence migrations remain engineering work. No feature is validated simply because this research pack exists.

October2 follow-up: [actual evidence and exact residuals](../games/kh2fm/gap-closure-2026-10-02.md). Ledger remains31 closed/3 partial with6 separately classified nonfactual limitations.
