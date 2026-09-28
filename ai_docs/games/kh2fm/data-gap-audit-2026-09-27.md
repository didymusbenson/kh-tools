# KH2FM data gap audit — 2026-09-27

This pass updates the live catalog, not just its coverage labels. `src/games/kh2fm/generate.py` consumes the research files below; regenerate with `python3 src/games/kh2fm/generate.py`. Existing entry and recipe IDs are preserved so saved checks, stock and plans remain attached. Five synthesis-source enemy records were added, taking that index from 62 to 67.

Evidence is a review of community references and the original project workbook, **not an independent in-game playtest**. Final Mix reward tables take precedence over original KHII tables. “Unknown” player stock remains a valid saved state and is not changed to zero.

## Changes delivered

| Area | Change | Evidence / limits |
|---|---|---|
| Materials | All 60 materials have acquisition guidance. The 48 ordinary/Serenity material types now have enemy or conditional reward sources and representative post-game rooms. Dark/Bright sources and FM Serenity sources filled in. | [Material source data](verified-material-sources.json), individual enemy rewards, and the [post-game enemy census](https://docs.google.com/spreadsheets/d/10FIa9A_SwhF_i4eFv8hzKAHSHb5Et36SAQPOsx5_spg/edit#gid=0). Rooms are examples, not an exhaustive spawn table or a claim of story-stage availability. |
| Conditional materials | Bulky Vendor HP bands and reaction rewards, Mushroom V S-rank farm, seven finite Orichalcum+ acquisitions, repeatable Illusion sources, and shop deposit thresholds. | [Bulky Vendor](https://www.khwiki.com/Bulky_Vendor), [Tranquility](https://www.khwiki.com/Tranquility), [Orichalcum](https://www.khwiki.com/Orichalcum), [Illusion](https://www.khwiki.com/Illusion), [Moogle Shop](https://www.khwiki.com/Moogle_Shop). Repeatable drops are distinguished from finite chests/collector rewards. |
| Treasures | Restored the original workbook's 277 room-relative directions, wrote the 24 missing Cavern/Garden locators, and corrected/clarified selected shared-room directions, including the chests outside Pooh's house. | [Treasure directions](treasure-locations.json), [original workbook](https://docs.google.com/spreadsheets/d/1-HNv1dK8_lQ7ibC1q4jwWOdiKXNCYbLh2SBrI0K4ZGo/edit), [Cavern walkthrough](https://www.gamerguides.com/kingdom-hearts-hd-25-remix/guide/kingdom-hearts-ii-final-mix/side-quests/cavern-of-remembrance), and per-entry overrides. This closes missing text; many legacy directions remain brief and have not been individually re-established from a modern screenshot. Do not describe all 301 as newly verified exact routes. |
| Puzzle pieces | Collection instructions for all 144, including the 16 blank wiki landmarks. Growth abilities describe a working route, not a proven minimum. | [Puzzle routes](verified-puzzle-locations.json), [KH Wiki](https://www.khwiki.com/Puzzle), [KHGuides](https://www.khguides.com/kh2/collectibles/puzzle-pieces/), and [WalkthroughWizard](https://walkthroughwizard.com/all-posts/rpgs/kingdom-hearts-series/kingdom-hearts-2-all-puzzle-piece-locations/). Adapted wiki location prose is CC BY-SA 4.0; attribution ships with the app. |
| Assembly | Explain how the guide's piece numbering maps to the completed picture: left-to-right across each row, top-to-bottom. All six assembly records explain placing/rotating pieces and separately claiming the reward. | KH Wiki's explicit numbering convention. Not a new tile editor or a per-current-board rotation-count solution. |
| Synthesis | Correct Mythril Crystal's upgrade material to Serenity Stone ×1; corroborate Shock Charm's Gem 1 / Stone 3 quantities for both families; verify Firagun's Serenity Shard modifier and base-first Creations instructions. | [Recipe research](synthesis-recipes.md), item pages, [Gamer Guides](https://www.gamerguides.com/kingdom-hearts-hd-25-remix/guide/kingdom-hearts-ii-final-mix/side-quests/item-synthesis), [Japanese recipe table](https://kyokugen.info/kh2/kh2_gouseiitem.html). The Moon/Star conflict remains explicit. |
| Cups | Titan opens after Olympus episode two. Cerberus Paradox names Valor/Wisdom/Master LV5; Hades names those plus Final LV7 and Summons LV7, with Space Paranoids episode two complete. Limit is not part of these named level checks. | [Final Mix Paradox guide](https://www.gamerguides.com/kingdom-hearts-hd-25-remix/guide/kingdom-hearts-ii-final-mix/olympus-coliseum/paradox-cups), [Olympus Coliseum](https://www.khwiki.com/Olympus_Coliseum), and individual cup pages. |
| Gummi | All 54 mission records have S-rank targets and rewards; all 27 EX constraints are explicit. | [Mission data](verified-gummi-missions.json) cites each route. The 9 mission-three targets use Final Mix scores, which differ from original KHII. |

## Corrections that affect farming or planning

Aggregate material pages disagree with some individual enemy reward tables. The catalog follows the latter's Final Mix reward values; source-resolution notes are preserved in the material JSON.

| Material / enemy | Before | Corrected base chance |
|---|---:|---:|
| Frost Gem / Fortuneteller | 8% | 10% |
| Lightning Gem / Armored Knight | 12% | 4% |
| Lightning Gem / Surveillance Robot | 8% | 6% |
| Lightning Crystal / Devastator | 4% | 12% |
| Lightning Crystal / Strafer | 6% | 8% |
| Dark Gem / Gargoyle Warrior | absent | 10% |
| Bright Stone / Driller Mole | absent | 3% |

Aerial Champ's 8% Remembrance Stone drop was missing from the family summary and is now included. Final Mix does not use the original Nobody Serenity tables. Serenity Crystal uses the Bulky Vendor's Prime Capsule or synthesis; its synthesis recipe uses nine Bright Crystals. Lingering Will's repeat victories grant Manifest Illusion; first victory rewards are different. Manifest Illusion is also the all-A-rank material collector reward, not the all-S-rank reward.

The two newly populated rows above differed from aggregate source candidates (Gargoyle Warrior 8%, Driller Mole 4%); they were not previously displayed in the app. The five existing changed rates and new omitted drops have regression fixtures.

## Remaining research, stated narrowly

- **Moon Amulet / Star Charm:** Moon item page gives A/22; Star's recipe block gives S/22 and Serenity Crystal. The Japanese table also gives Crystal; other English tables give Gem or contradictory combined modifiers. The planner keeps the explicit Crystal candidate and a visible conflict note. A modern recipe-menu capture would settle this. Rank-based automatic discounts remain disabled.
- **Optional discounts:** Energy plus Moogle-discount stacking/rounding is not modelled. Ultima's mandatory Energy Crystal and per-ingredient rounding are included and tested. No claim of an optimized shopping total.
- **Legacy chest directions:** Restored text ranges from useful landmarks to short left/right descriptions. Modern-image confirmation and richer orientation are still useful work; restoration is not proof of every route. The Cavern's new prose is source-reviewed but not playtested.
- **Catalog scope:** Roxas's 16 prologue chests, full combat tactics, full equipment/ability matrices, all Mushroom rank tables, lower-rank Gummi prizes/treasures/blueprint dependencies, and the complete Steam-specific achievement set remain unrepresented or partial. Existing coverage text continues to say so. These are catalog expansions, distinct from missing facts on the records enriched here.

## Validation

- Existing entry and recipe IDs compared with the pre-audit generated catalog: none removed or renamed.
- Counts preserved: 301 Sora treasures, 144 pieces, 60 materials, 59 synthesis outputs, 54 Gummi mission/mode records; bestiary source index expanded by five.
- Regression fixtures cover the corrected rates, missing Aerial Champ source, FM Serenity distinction, conditional rewards, Mythril/Ultima/Shock recipes, preserved Moon/Star warning, FM Gummi scores/constraints and cup requirements.
- Generator output is deterministic. App tests, production build and browser smoke results are recorded in the implementation log after execution.
