# KH2FM audit follow-up — 2026-09-28

This follows the [September 27 audit](data-gap-audit-2026-09-27.md). The user requested several usable Final Mix references, including GameFAQs, and corrections in the working journal. Research changed live data, not merely its confidence labels. Existing entry/recipe IDs and player inventory semantics are preserved.

## Resolved and delivered

| Audit item | Result |
|---|---|
| Moon Amulet / Star Charm | Rank **A**, upgrade **Serenity Gem ×1**. Replaces the previous Crystal candidate and removes the conflict warning. |
| Petite Ribbon / Ribbon | **Three** raw Mythril Crystals. Two is the once-halved quantity. Corrects our September 27 assertion that two was the FM base cost. |
| Orichalcum collector reward | **55** different materials in FM, plus the separate 1,000-total-material reward. The 45-type reward is AP Boost; the old 45-type Orichalcum rule was original KHII. |
| Steam achievements | All **50 KH2FM goals**, up from 23, including hidden goals and names duplicated in other games. No PlayStation platinum. KH2 Gummi Ship Collector requires **all blueprints**, correcting the imported KH1 threshold of 30. |
| Roxas prologue | **16 separate checkable records**, with day, room, directions and missability. Their category does not change Sora’s 301 treasures or Twilight Town’s 39 Sora treasures. Checklist ordering is not native Journal numbering. |
| Mushroom reward ranks | All **12 challenge rank tables**, separate material and weapon thresholds, material quantities and weapon probabilities. Mushroom IV has no A/S reward tier. Mushroom XIII retains its separate reward-claim instructions. |
| Chest directions | **17 locators clarified** with station cardinal directions, Tower entry orientation, secret-door stairs, Wastelands bends and Port Royal landing landmarks. Spooky Cave AP Boost #14 is the right branch; Orichalcum #15 the left branch. The original workbook reversed these. |
| Optional synthesis discounts | Halving, per-craft rounding up, Moogle rank levels and stacking corroborated. This closes the broad factual uncertainty; adding optional discount state/calculation remains implementation work. The current Workshop continues to state its raw-cost assumptions, with mandatory Ultima Energy already applied. |

Generated source data: [Steam goals](verified-steam-achievements.json), [Roxas chests](verified-prologue-chests.json), [Mushroom ranks](verified-mushroom-ranks.json), [treasure directions](treasure-locations.json), [recipes](synthesis-recipes.md). Longer instructions render as paragraphs and flow through the existing notes pages.

## Sources compared, and their limits

| Reference | Useful evidence | Edition / quality handling |
|---|---|---|
| [Freedom-Kona, Ability Guide, GameFAQs #48143](https://gamefaqs.gamespot.com/ps2/935702-kingdom-hearts-ii-final-mix-plus/faqs/48143) | Actual FM equipment additions, Moon upgrade, synthesis quantities and collector list | Early translation uses **Goo** for the English Stone tier and **Stone** for Gem. Its Moon “Stone” modifier therefore corroborates Serenity Gem. Do not translate that word in isolation. |
| [UltimaterializerX, Bestiary/Synthesis, GameFAQs #42870](https://gamefaqs.gamespot.com/ps2/915410-kingdom-hearts-ii/faqs/42870) | Explicit raw versus halved recipe columns; Moon rank A/Gem; Petite 3→2; rank discount levels and additional Energy halving | Original KHII, despite appearing under FM listings. Used for unchanged shared recipe mechanics, **not FM Serenity drops**. |
| [YuGiOhFm2002 / YuGiOhAngel, Treasure Chest Guide, GameFAQs #42381](https://gamefaqs.gamespot.com/ps2/915410-kingdom-hearts-ii/faqs/42381) | Room-relative and compass locators; prologue chest inventory | Original-game chest geography is useful. Existing FM item identities and the extra Cavern records are retained. Not a new claim that all 301 routes were reverified. |
| [Spirit_Slash3r walkthrough, GameFAQs #42793](https://gamefaqs.gamespot.com/ps2/915410-kingdom-hearts-ii/faqs/42793) | Roxas’s three Central Station chest positions and return train access | Used narrowly for the unchanged prologue layout. |
| [Quest Guide, Star Charm](https://quest.guide/kingdom-hearts-2/items/40) | Modern FM Star Charm recipe lists Gem | Corroborates the GameFAQs translation and recipe-table rank. |
| [30somethinggaming, FM Synthesis](https://30somethinggaming.com/synthesis-guide-kingdom-hearts-2-final-mix/) | Petite/Ribbon raw Mythril Crystal count 3 | Its Shock Charm quantities disagree with the stronger source comparison from September 27; those rows were not imported. |
| [Gamer Guides, Prologue](https://www.gamerguides.com/kingdom-hearts-hd-25-remix/guide/kingdom-hearts-ii-final-mix/walkthrough/prologue) | Day-three, day-five and day-six chest routes | Modern FM walkthrough, checked against [Twilight Town’s separate Roxas table](https://www.khwiki.com/Game:Twilight_Town). Gamer Guides acknowledges licensing some GameFAQs authors; matching authors are not counted as independent corroboration. |
| [Gamer Guides, Mushroom XIII](https://www.gamerguides.com/kingdom-hearts-hd-25-remix/guide/kingdom-hearts-ii-final-mix/side-quests/the-mushroom-xiii) | All S thresholds and weapon A thresholds | Supports the [KH Wiki rank/reward tables](https://www.khwiki.com/Mushroom_XIII). Lower C–E bands are sourced to the wiki, not falsely described as independently duplicated. |
| [Steam global achievements](https://steamcommunity.com/stats/2552430/achievements/), [Exophase Steam partition](https://www.exophase.com/game/kingdom-hearts-hd-1-5-2-5-remix-steam/achievements/), [Steam per-game checklist](https://steamcommunity.com/sharedfiles/filedetails/?id=3269543411) | Platform names, 50-entry KH2 partition, hidden descriptions and duplicate-name scopes | Primary Steam list mixes all 197 compilation achievements and hides some descriptions. Partition/conditions cross-checked against both secondary lists. |
| [heorotlinea FM synthesis video](https://www.youtube.com/watch?v=30GuarhSuoA&t=1515s) | Description identifies level 9, all materials, collection lists and recipes as Synthesis Notes completion requirements | Video description inspected; **no claim that a Moon/Star recipe-menu frame was captured**. |

GameFAQs full-page access was robots-blocked; indexed passages remained readable. Findings above come from the retrieved passages, not a claim of full-document access. The Japanese Kyokugen synthesis page has an original-KHII core and FM addendum, plus its own discrepancies. Its Crystal row was not sufficient to override the FM Gem evidence. A web page being cross-listed under “Final Mix” is not edition verification.

## Additional recipe-table corroboration

The maintained [KH2Randomizer repository](https://github.com/tommadness/KH2Randomizer/tree/ac28071c1e7eff7393df54c91196fe4f43c727e9) includes an input recipe table at `static/synthesis.bin`. Its `Module/zipper.py` reads that table before replacing randomized output/ingredient fields. This is supplementary evidence, **not a claim of a personally extracted retail executable**. [OpenKH’s mixdata documentation](https://github.com/OpenKH/OpenKh/blob/master/docs/kh2/file/type/mixdata.md) defines its MIRE records and rank values.

At pinned commit `ac28071c1e7eff7393df54c91196fe4f43c727e9`:

- Recipe item 476 → output 35 / upgrade 36 (Moon/Star), rank byte 2 = A, raw Orichalcum 3. The explicit Gem modifier is corroborated by the guides; it is not a standalone field in this table.
- Recipe item 475 → output 306 / upgrade 304 (Petite/Ribbon), rank A, raw Mythril Crystal 3, Orichalcum/Dense Stone/Dense Shard 1 each.
- The accompanying MICO collector input has Orichalcum (item 377) at unique-material count 55 and total-material count 1,000. The [Moogle Shop FM collection table](https://www.khwiki.com/Moogle_Shop) corroborates the edition difference.

The optional-discount facts are now separated from implementation scope. Energy and an applicable Moogle reduction each halve a per-craft ingredient count, rounding up. Rank reductions unlock at level 5/C, 6/B, 7/A and 9/S. Sequential rounding of positive integer quantities is equivalent to rounding the combined quarter once; rounding after multiplying several crafts is not equivalent. The Workshop has no saved Moogle-level/optional-Energy state, so it must not silently apply these discounts or add arbitrary modifier costs.

## Remaining work after this pass

This is a completed source-comparison pass, not a claim of a complete combat encyclopedia.

1. **Remaining legacy chest routes:** the 17 changed records are identified by their added GameFAQs provenance. Other brief workbook locators are unchanged. Continue world by world; do not mark all 301 newly verified because every row now has text.
2. **Optional discount implementation:** add explicit Moogle and Energy choices, model first-craft/Creations eligibility and modifier costs, and test stock allocation and rounding for multiple crafts. Raw planning is still the live contract.
3. **Equipment / abilities / combat:** the named legacy candidate inventories still need complete modern acquisition/stat/AP tables. Freedom-Kona provides a useful FM equipment/ability reference, but untranslated tiers and occasional recipe errors require per-row checking. Bestiary remains a 67-enemy material-source index.
4. **Gummi completion beyond S ranks:** normal/EX S targets and prizes are present; lower-rank prizes, route treasure enemies and the complete blueprint dependency list are not. The corrected Steam goal no longer claims that the twelve represented special blueprints or 30 arbitrary blueprints finish it.
5. **Mushroom secondary details:** all rank bands and material/weapon prizes are supplied. Full combat strategies and prize-orb/munny quantities are outside this addition; the wiki itself flags ambiguity in orb quantities. Those values were not imported.

No user screenshot or playthrough is required to continue these tasks. No unresolved Moon/Star warning remains in player data. “Unknown” player inventory is valid user state and is preserved.

## Validation

- All **93 tests in 10 files pass**, including new recipe, prologue scope, Steam edition, collector threshold, Mushroom-rank and cave-orientation fixtures.
- Production build and TypeScript checks pass; only the existing bundle-size advisory remains.
- Generator checks maintain 301 Sora treasures, 144 pieces, 60 materials and 59 recipes. Expanded Steam total 50; new prologue total 16.
- Saved entry and recipe IDs are checked against the prior committed catalog; content updates do not clear checks, stock or material targets.
- Browser and publication results are recorded in the [implementation log](../../implementation/kh2fm-rollout.md).
