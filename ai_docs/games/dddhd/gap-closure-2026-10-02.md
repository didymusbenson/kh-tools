# DDD HD factual gap closure — 2026-10-02

Scope: modern unmodified Steam Dream Drop Distance HD. Starting ledger: 7 resolved, 17 partial, 1 blocked. Investigating DDD-001, 003, 004, 005, 006, 007, 009, 011, 013, 014, 015, 017, 018, 019, 020, 021, 022, 025. Historical 3DS evidence, HD evidence, and mods are kept distinct. Stable checklist IDs and Data Jiminy remain untouched.

Initial checkpoint: scope recorded before further research. Evidence, implementation results, exact residuals and validation will be appended as research proceeds. No additional finding is yet claimed resolved.

## Implemented checkpoint

- DDD-001: [Sora Grid](https://tamaki-game.com/kh3d-sora-grid) and [Riku Grid](https://tamaki-game.com/kh3d-riku-grid) full HD guide text inspected. Added access actions to 11 stable chest IDs: both characters' #21, #35, #37, #38 and Riku #43–45. The generator propagates those routes and citations to acquisition references. This narrows access gaps without claiming complete earliest-access/movement minima.
- DDD-020: [HD retrospective](https://marathonrecaps.wordpress.com/2022/05/29/kingdom-hearts-ddd-flick-and-pick/) full text gives current-character Sweet Dreams delivery and repeating Secret Cup for the other character. Added that practical route to the Keyblade and cup, separating star ranks from the Keyblade condition. Minimum final-round-only replay and Steam event details remain unverified.
- DDD-005: [PS4 player testing thread](https://gamefaqs.gamespot.com/boards/181154-kingdom-hearts-hd-28-final-chapter-prologue/74929561) indexed excerpt reports rubbing Tubguin Ace's face from Hot Springs to Whirlpool. Added as explicitly player-reported guidance; canonical missing cells remain unfilled because direct forum access is restricted and Steam corroboration is absent.
- Fresh source exclusion: [Steam AP Spirit implementation](https://github.com/LuxMake/KHDDD-AP/blob/aae4da6f2658154866f9e88dde14506c9a576de8/io_packages/KHDDD/Items/Spirits.lua) explicitly copies physical stats for Catanuki, Beatalike and Tubguin Ace from other breeds. These are mod substitutions, not recovered vanilla values. [Kyroo handler](https://github.com/LuxMake/KHDDD-AP/blob/aae4da6f2658154866f9e88dde14506c9a576de8/io_packages/KHDDD/Locations/LocationHandler.lua) force-writes encounter events for solo seeds; it does not certify vanilla save/reload HP behavior.

Focused generation and `validate-audit.py` pass: 1,283 entries, 263 formulas, 438 chests, 54 boards/1,144 nodes, 54 Steam achievements, stable IDs preserved. `git diff --check` passed. Research continues across remaining families; no whole family newly closed at this checkpoint.

## Full-scope investigation results

No whole finding has sufficient evidence for new closure: **7 resolved, 17 partial, 1 blocked**. The fresh sources narrow player guidance and explicitly reject mod substitutions. Detailed source-access labels and exact evidence still needed are in [gap-evidence-2026-10-02.json](gap-evidence-2026-10-02.json).

| Finding | Result | Next evidence |
|---|---|---|
| DDD-001 | 11 Grid chest access actions integrated; 438 IDs preserved. | Complete per-chest earliest event, minimum movement and returnability matrix; the 437-ID earliest-access residual is not reduced merely by new route actions. |
| DDD-003 | Jestabocky reciprocal connection remains uncertified. | Unmodified HD Jestabocky board screenshot or identified board bytes proving A-3/B-3 edge and checkpoint edition. |
| DDD-004 | Aura Lion C-7/D-7 red-secret ambiguity remains blocked. | Species-labelled HD red-secret node and transformation target, including coordinates and LV30 path. |
| DDD-005 | Added one explicitly PS4-player-reported Tubguin interaction; all 15 unknown numeric fields and five unverified body cells remain explicit. | Vanilla species parameter rows with base-stat conversion semantics; independent HD corroboration for the five missing interaction cells. |
| DDD-006 | 141 omitted probabilities remain unknown; no automatic100% assumption. | HD recipe outcome probability table or identified vanilla synthesis routine for unmarked combinations. |
| DDD-007 | Initial-level malformed cells and Risky Winds transformation remain unverified. | Correct table for malformed level cells and a vanilla HD weather odds rule, including50% boundary and recipe-item behavior. |
| DDD-009 | No guaranteed new material loop or expiration yield asserted. | Edition-labelled drop records plus room mapping, vendor stock limits and exact expiration/repeat reward quantities. |
| DDD-011 | Strike Raid remains22/24 seconds, not certified. | Unmodified HD command cooldown definition or independent exact timing accounting for haste. |
| DDD-013 | Action names retained; no guessed Steam keyboard/controller mapping. | Steam default binding/config reference for each Link action and gauge duration, separated from remapping. |
| DDD-014 | No new HD portal landmark routes certified. | HD landmark/activation-state atlas keyed to the existing346 identities. |
| DDD-015 | First-clear/repeat/bonus transitions remain separate unknowns. | Vanilla HD award transition data with first, repeat, bonus success and failure cases. |
| DDD-017 | Transcribed the complete published match-score tables, rank thresholds, cup-prize points and 19 Rush LV milestones into canonical inputs and runtime. Speed Cup time group remains explicitly absent; spendable Medal payout matrix remains unknown. Exposed Secret Cup LV15+other-cups versusLV17 source conflict. | HD equivalence, Speed Cup time group, Secret Cup minimum unlock and spendable Medal payouts. |
| DDD-018 | No universal Steam toy bindings or breed-optimal route invented. | Steam training input/scoring and size parameter semantics; breed-specific efficient training evidence. |
| DDD-019 | Lord Kyroo save/reload HP persistence remains unknown. | Vanilla HD saved boss-HP field plus load/exit transition, not mod-maintained encounter flags. |
| DDD-020 | HD character-specific Sweet Dreams delivery now has independent full-page corroboration; practical replay route integrated. | Exact minimum replay scope (final round versus whole cup) and Steam retrigger behavior for already-completed cups. No automatic second-character ownership. Shared checklist type IDs remain unchanged. |
| DDD-021 | Daring Diver and released-instance aggregation remain partial. | Award aggregation code or explicit HD reports demonstration distinguishing course bests/repeats and released Spirit flags. |
| DDD-022 | All54 observed Steam keys retained; public names/requirements do not certify internal counters. | Steam internal unlock/counter semantics. PSN/Xbox/Epic native identifiers are outside this Steam-only closure scope, retained as future portability work. |
| DDD-025 | No promise that Theater wrong-answer replay always repairs the ending. | HD trigger/retrigger decision table for wrong answers, boss replays, saved clear data and credits letters. |

## Final extraction and validation

The complete available Flick Rush scoring reference is now canonical in `continuation-facts.json`: four time groups covering nine cups, HP and attack thresholds, block cap, match ranks, every cup-prize threshold, and all 19 Rush LV milestones. The generator displays relevant tables on each cup and milestones on Flick Rush Fever. Speed Cup is omitted from the source time table; no group was guessed. Spendable Medal yields remain null and are explicitly distinguished from cup-prize points. A newly discovered Secret Cup minimum-unlock conflict is visible instead of the old unconditional LV15 claim.

No accessible supplied table found in this pass was left as a mere extraction lead. Actual missing implementation evidence is species-labelled vanilla board/command/synthesis/event data, a complete HD route atlas, and precise Steam bindings/scoring/counter transition references. PSN/Xbox/Epic native schemas are future portability work, not a condition for Steam completion. No playthrough was performed or requested.

Final focused generator and all `validate-audit.py` checks pass, including stable IDs, 11 route-source joins, reverse Gravity Strike acquisition, separate Sweet Dreams ownership guidance, all cup prize thresholds and preserved unknown vanilla stats. A first added assertion used the wrong `HP` key; corrected to canonical `hp` and reran successfully. Generated content is deterministic across a second generation. `git diff --check` passes. Shared build/app tests remain with the coordinator.
