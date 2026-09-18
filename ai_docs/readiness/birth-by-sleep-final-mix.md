# Birth by Sleep Final Mix readiness

Status: **Research foundation established; content remains partial/conflicted; no app implementation claimed.** Audited 2026-09-18. [Specification](../games/birth-by-sleep-final-mix.md) · [Research pack](../games/bbsfm/README.md) · [Shared readiness method](README.md).

Apply the [collectible compendium contract](../content/collectible-compendium-and-linked-views.md), [first-class synthesis/inventory contract](../content/synthesis-and-inventory.md), and [app/content validation contract](../testing-and-content-validation.md). All specified content and features remain MVP; missing production screenshot/map images are the sole accepted content deferral.

## Accepted user decisions

| ID | Answer | Implication |
|---|---|---|
| BBS-D01 | Modern HD Final Mix; user plays Steam | No PSP/non-FM compatibility work; Steam rules/achievements are the initial gameplay baseline |
| BBS-D02 | Collectible/acquisition compendium | World percentages exclude narrative story and character biography flags |
| BBS-D03 | Compact and detailed checks share saved state | Same record ID in world/index/search/Data Jiminy surfaces |
| BBS-D04 | Spoilerific | No warnings, hidden spoilers or reveal controls |
| BBS-D05 | No Available Now/progress-gate tracking | Prerequisites are text; no milestone-input availability filter |
| BBS-D06 | Optional inventory, owned/required x/y on recipes | Melding remains first-class with or without inventory |
| BBS-D07 | App testing, not required user gameplay | Validate data sources/calculations and app behavior; do not require a manual game playthrough |
| BBS-D08 | Apple browser/iPhone/iPad first; Android follow-up | Initial responsive, touch, accessibility and offline smoke/acceptance plan |
| BBS-D09 | BBS blue Reports visual treatment | Preserve approved blue journal; 0.2 variation belongs to its own spec |

No blocking product questions remain from this audit. The work below consists of research/source-validation and engineering tasks, not requests for the user to supply game facts.

## Source and content readiness

| ID / category | Before audit | Added evidence | Current gate |
|---|---|---|---|
| BBS-R01 Baseline | Unpinned family draft | Steam collection source and official 2026 announcement | **Missing/partial:** precise supported build and current Steam-specific behavior need source validation; announced October editions are not shipped evidence |
| BBS-R02 Legacy audit | Claimed 297 melding rows | Full actual grids: 296 outcomes, 112 ability mappings, 150 catalog entries, nine materials; original repo seed/UI read | **Verified extraction:** data itself is not certified; no 0.2 data found |
| BBS-R03 Main treasures | Absent | 374 numbered chest candidates: T122/V130/A122; every candidate has world/character/area/source | **Missing/partial:** exact directions, access timing, returnability and independently checked Reports order/counts |
| BBS-R04 Tutorial / Secret | Absent | One unnumbered tutorial acquisition; eight BBS Secret Episode chests, separated from 0.2 | **Missing/partial:** Secret Gem Lower-vs-Upper Zone conflict and precise directions |
| BBS-R05 Stickers | Absent | 60 pickups, 20 per character; FM 20/40/70/110/140 reward tiers | **Missing/partial:** all text directions and optimal placement regions; world table omits Ventus Mine Entrance Balloon |
| BBS-R06 Reports | Absent | Letter + I–XII, character/event/chest mapping | **Source-inspected:** link acquisitions to existing chest/event IDs; source validation pending |
| BBS-R07 Melding | Legacy lead | Existing 8,669-line artifact reused; 296 outcomes / 99 result names, levels, character rates, ownership footnotes | **Conflicted:** two aggregate-source rows quarantined; probability audit finds three 200% groups |
| BBS-R08 Abilities | Wide old matrix | 112 relationships reused; 30 ability stack caps, 28 meldable | **Missing/partial:** final learning/CP/random-crystal rule checks and source reconciliation |
| BBS-R09 Materials / farms | Nine materials, blank locations | Prices/gates and conditional Shop-Level drop examples | **Missing/partial:** full enemy-area-character routes, all rate intervals, Lucky Strike formula; Spiderchest/Fleeting disagreement |
| BBS-R10 Command catalog / acquisition | 150 old rows | 108 command-shop candidates plus recipe/chest/board/reward leads | **Missing/partial:** complete modern catalog, all alternate sources, CP/mastery and HD exclusions; 99 meld results are not catalog completeness |
| BBS-R11 Keyblades | Absent | 24 forms with scoped stats and acquisition; T16/V15/A15 main plus Aqua episode forms | **Source-inspected/partial:** normalize reach/passives and independent modern roster validation |
| BBS-R12 Ice cream | Absent | 14 recipes; eight per character; 42 flavor leads; exact per-character ingredient totals | **Missing/partial:** normalized Prize Pod spots/spawn/reset conditions; independent recipe verification |
| BBS-R13 Finish / D-Link / Style / Shotlock | Scope only | 30 finish definitions normalized into 42 predicate rows; character/parent/metric/target | **Missing/partial:** complete linked acquisition/usage records for the other command families |
| BBS-R14 Mirage Arena | Scope only | 16 battles, 29 FM level conditions, HD bonus predicates and reward links | **Missing/partial:** normalize ticket/clear-file AND/OR rules and source conflicts; Ringer Ticket 205 vs 250 |
| BBS-R15 Minigames / Unversed | Scope only | Nine mission rank targets, four racing courses, five songs/thresholds, seven boards and Fruitball reward leads | **Missing/partial:** complete panel inventories, mode-specific acquisition, strategies and exact rank-boundary source validation |
| BBS-R16 Episodes / optional bosses | Scope only | Final/Secret unlock table, five optional boss leads plus Dark Hide; BBS/0.2 separation | **Missing/partial:** mixed-difficulty/save aggregation and complete access facts; no mandatory story walkthrough |
| BBS-R17 Achievements | Overlay named | Public 197-entry Steam collection list inspected; community 46-entry BBSFM/PS roster | **Missing/partial:** scoped Steam IDs/hidden predicates; one-character vs all-character requirements; platform roster parity not assumed |

Evidence lives in the [manifest](../games/bbsfm/source-manifest.json) and linked tables. “Source-inspected” means referenced facts were inspected; no in-game certification or complete guide is implied.

## Engineering readiness and acceptance

| ID | Required behavior / validation | Status |
|---|---|---|
| BBS-E01 | Shared stable record state; toggle compact/detail both ways; offline relaunch and character/episode isolation | Not implemented |
| BBS-E02 | Fixed full-world denominators under search/Remaining filters; no report/chest/reward double-counting; incomplete evidence cannot claim certified 100% | Not implemented |
| BBS-E03 | Bidirectional meld query by unordered ingredients, minimum levels, character, crystal and previously obtained Shotlocks | Rules drafted; conflicts block certification |
| BBS-E04 | Probability sums and names; conditional ownership reweighting; no abilities on Shotlocks; correct crystal/type join | Candidate audit performed; production calculation fixtures required |
| BBS-E05 | Optional inventory x/y; duplicate-ingredient quantities; retained action-command copy; consume inputs/material atomically only for recorded actual outcome; exact undo | Not implemented |
| BBS-E06 | Inventory disabled: reference/calculations fully usable; no implicit balances or progress-gate tracking | Not implemented |
| BBS-E07 | Recipe totals: one eligible ice cream of each kind yields ingredient quantity sums T174/V178/A183; test alternatives/previously owned output separately | Arithmetic checked; production calculation fixtures required |
| BBS-E08 | Data Jiminy explains source uncertainty and character/episode/modern rules; retrieval points to canonical details | Question fixtures drafted; SLM/Coppermind not implemented |
| BBS-E09 | Blue Reports layout, accessible check labels, touch separation between open/toggle, readable matrix/recipe cards | Direction accepted; Apple mobile checks pending |
| BBS-E10 | No-image directions, optional media rendering, offline asset availability and graceful failures | Data and implementation incomplete |
| BBS-E11 | Backup/import/migrations preserve game/character/episode IDs, quantities and checks; errors roll back every view consistently | Not implemented |
| BBS-E12 | Spoilers directly visible; no warnings/reveal controls; no Available Now controls | Must be checked in initial Apple smoke/acceptance |

Strong formula validation is a core melding requirement, not optional UI polish. Use the malformed 200% Mine Square case and mislabeled 20% Magnet Spiral case as regression fixtures; summing to 100% alone is insufficient. The optional inventory must not turn a probability preview into a guaranteed inventory gain.

## Next authorized work

1. Resolve quarantined meld rows against independent modern sources, document the resolution and validate all input-pair probability groups and output identities.
2. Complete precise collectible text directions and official-order evidence; resolve missing sticker and Secret Gem area conflicts without inventing facts.
3. Finish command/Shotlock/D-Link/Style acquisitions, materials/Prize Pods, board panel modes and modern shop exceptions.
4. Normalize Steam achievements and episode unlock/save aggregation from sources; retain the separation from world collectibles.
5. Implement and test the shared app state, first-class melding/inventory, Data Jiminy and Apple mobile behavior. Android follows the first Apple acceptance pass.

## Answer log

- 2026-09-18: Audited all KHBBS sheet grids and relevant repository files; corrected 297 to 296 actual outcome rows.
- 2026-09-18: Reused the existing melding artifact rather than recreating it; found and quarantined two source defects.
- 2026-09-18: Added concrete inventories and challenge/acquisition tables; retained honest missing-detail/source gates.
- 2026-09-18: Applied collectible-only scope, linked checklist state, spoilerific behavior, no availability tracking, opt-in inventory, first-class melding and app-focused Apple testing.
