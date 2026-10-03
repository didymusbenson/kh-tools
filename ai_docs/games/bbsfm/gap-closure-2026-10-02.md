# BBS Final Mix factual gap investigation — October 2, 2026

**Current player-goal review (2026-10-02):** all 21 remaining factual families reviewed; 19 optional-precision families deferred and 2 real episode/Steam-award troubleshooting families retained open. Evidence still counts 17 partial and 4 researched-open; deferral is not factual verification. The 12 prior closures and 5 separate limitations remain accounted for. [Complete decisions](practical-review-2026-10-02.md) · [Deferred details and reasons](future-improvements.md).

Scope: modern Steam HD Final Mix. Starting IDs: BBS-001, BBS-002, BBS-003, BBS-006, BBS-010, BBS-011, BBS-012, BBS-013, BBS-015, BBS-016, BBS-018, BBS-019, BBS-021, BBS-022, BBS-025, BBS-027, BBS-028, BBS-029, BBS-030, BBS-031, BBS-032. Counts remain 17 partial and four researched-open factual families; none is falsely closed. The 12 prior closures and five nonfactual limitations are unchanged. Stable IDs and Data Jiminy exclusion are preserved.

## Applied subfield improvements

- All 108 shops normalized with numeric price/currency/character, eight named-world milestones and 95 explicitly supported prior-acquisition alternatives. Fire Dash conflict remains visible.
- All seven Command Boards now contain 17 opponent variants and 288 command/level rows; 39 unspecified Skull quantities remain null. All 45 bonus panels are retained.
- Added 22 unique D-Link finisher action summaries, with an explicit Rumble Rave gap. Generic Finish is not misrepresented by a disambiguation page.
- All 14 ice-cream quantity lists independently corroborated; runtime distinguishes making eight recipes from unverified purchase/story substitutes.
- Combined Threat normal entrance clarified as Arena 7 plus Radiant Garden. Time to Chill cross-file/ticket exceptions and conflicting HP evidence remain visible.

## Evidence and exact residuals

The following are concrete inspections, not a claim that publicly documented binary formats supplied retail values. No game assets or user saves were available in this worktree. Modified-game repositories were read only; none was installed or executed. Independently authored Japanese guides are distinguished from KHWiki, while copied/mod-derived tables are not counted as independent retail certification.

### BBS-001

Inspected Archipelago Locations.py chest inventory and Rules.py alongside existing routes. Its memory offsets and modified world flags are not physical approach directions. No unsupported route was imported.

Remaining: Remaining room-only directions require a vanilla walkthrough or direct route observation; a reward-memory address does not supply a save-point approach.

Sources: [Locations.py](https://github.com/gaithernOrg/ArchipelagoKHBBS/blob/HEAD/worlds/khbbs/Locations.py), [Rules.py](https://github.com/gaithernOrg/ArchipelagoKHBBS/blob/HEAD/worlds/khbbs/Rules.py).

### BBS-002

OpenKH ITB documents a Report ID byte in each eight-byte chest record; inspected Archipelago chest offsets, which do not contain that Reports sequence.

Remaining: Need unmodified Steam per-character common archive ITB values and a Reports UI comparison for 374 main chests; source order is still not official numbering.

Sources: [itb.html](https://openkh.dev/bbs/file/type/itb.html).

### BBS-003

Inspected Archipelago access rules, including advanced-logic jumps and optional movement comments. Those rules assume modified world availability and do not certify vanilla minimum movement levels.

Remaining: Need character/room traversal observations at the disputed minimum levels under vanilla progression; alternate-route completeness remains open.

Sources: [Rules.py](https://github.com/gaithernOrg/ArchipelagoKHBBS/blob/HEAD/worlds/khbbs/Rules.py).

### BBS-006

Independent Japanese command-charge table confirms Aerora plus Ignite but omits levels. OpenKH CmdCharge records have two minimum-level bytes.

Remaining: Need original Steam Menu/Camp.arc CmdCharge record for Aerora/Ignite: Ignite minimum 1 versus 3 remains unresolved.

Sources: [commandcharge-magic.htm](https://kouryakutsushin.com/khbbs/commandcharge-magic.htm), [CmdCharge.html](https://openkh.dev/bbs/file/type/CmdCharge.html).

### BBS-010

Normalized all 108 shop records and eight named-world milestones; 95 rows have explicitly sourced previously-obtained alternatives. Independent Japanese shop lists Fire Dash 150, agreeing with table rather than conflicting acquisition prose. Inspected Steam shop mod: it overwrites gates, so zero gates are not retail evidence.

Remaining: The full shop milestone table is now normalized. Remaining: first-acquisition alternatives not documented on 13 rows, complete non-shop acquisitions and mode conditions, plus Fire Dash conflicting prose. Missing evidence is original shop gate data or direct first-acquisition observation.

Sources: [Moogle_Shop](https://www.khwiki.com/Moogle_Shop), [shop.htm](https://kouryakutsushin.com/khbbs/shop.htm), [BBS-All-Commands-Shop](https://github.com/d4hy/BBS-All-Commands-Shop), [cmdShop.html](https://openkh.dev/bbs/file/type/cmdShop.html).

### BBS-011

Inspected EPD, PRIZEBOXDATA and room-format leads; outer drop chance and inner reward percentages are separate data. Randomizer resources list assets but do not supply vanilla tables.

Remaining: Need joined unmodified EPD/PRIZEBOXDATA/room spawn values plus character and reset observations; published world rates do not certify complete room routes.

Sources: [epd.html](https://openkh.dev/bbs/file/type/epd.html), [PRIZEBOXDATA.html](https://openkh.dev/bbs/file/type/PRIZEBOXDATA.html), [Birth-by-Sleep-Randomizer](https://github.com/Truthkey/Birth-by-Sleep-Randomizer).

### BBS-012

Japanese tables corroborate Collision Magnet maximum 4, Homing Slide 4, High Jump 4, Barrier 3 and all five Illusions 3, but omit CP curves. OpenKH executable CommandParam documents maxLevel, baseCP and CP increment fields.

Remaining: Need inspected Steam CommandParam rows for Collision Magnet, Homing Slide, High Jump, Barrier and five Illusions; format documentation alone is not actual retail CP values.

Sources: [attack-command.htm](https://kouryakutsushin.com/khbbs/attack-command.htm), [action-command.htm](https://kouryakutsushin.com/khbbs/action-command.htm), [illusion-command.htm](https://kouryakutsushin.com/khbbs/illusion-command.htm), [CommandParam.html](https://openkh.dev/bbs/executable/CommandParam.html).

### BBS-013

Japanese material guide describes Chaos as varied/random and Secret Gem as raising command level, without weighted outcomes. OpenKH AbiPattern documents eight ability IDs and a chance array but explicitly leaves use incompletely understood.

Remaining: Need the retail ability-pattern values plus selection logic/conditional execution; neither eight slots nor random wording proves a uniform distribution.

Sources: [mixitem.htm](https://kouryakutsushin.com/khbbs/mixitem.htm), [AbiPattern.html](https://openkh.dev/bbs/file/type/AbiPattern.html).

### BBS-015

Japanese material guide recommends Trench for ordinary crystals; it is not a full character/room/reset or timed yield comparison. EPD and PRIZEBOXDATA identify the missing nested drop joins.

Remaining: Need complete vanilla enemy-room-character inventory, reset rules and measured route costs before exhaustive or fastest-farm claims.

Sources: [mixitem.htm](https://kouryakutsushin.com/khbbs/mixitem.htm), [epd.html](https://openkh.dev/bbs/file/type/epd.html), [PRIZEBOXDATA.html](https://openkh.dev/bbs/file/type/PRIZEBOXDATA.html).

### BBS-016

Inspected nested drop formats; neither EPD nor PRIZEBOXDATA documentation identifies the runtime Lucky Strike transformation. Randomizer/mod writes cannot establish it.

Remaining: Need edition-specific ability application code or controlled drops sufficient to discriminate candidate probability formulas; existing formula remains community-sourced.

Sources: [epd.html](https://openkh.dev/bbs/file/type/epd.html), [PRIZEBOXDATA.html](https://openkh.dev/bbs/file/type/PRIZEBOXDATA.html).

### BBS-018

OpenKH Weapon records document critical damage and reach bytes. Inspected Archipelago keyblade Lua, which deliberately writes new stats rather than preserving originals.

Remaining: Need original Steam Weapon rows, particularly Pixie Petal critical multiplier 1.35 versus 1.5 and FM reach values; patched stats cannot certify vanilla values.

Sources: [Weapon.html](https://openkh.dev/bbs/executable/Weapon.html), [bbsAPKeybladeStats.lua](https://github.com/gaithern/KH-BBS-AP-LUA/blob/HEAD/bbsAPKeybladeStats.lua).

### BBS-019

Independently reconciled all 14 ingredient quantity lists with Japanese FM guide and retained source name per recipe. Corrected runtime Sweetstack wording to make all eight eligible recipes rather than equating every obtain route. OpenKH iceShop exposes createCount but no achievement predicate.

Remaining: Numeric recipes have independent corroboration. Remaining: whether purchased/story-awarded substitutes satisfy each current Steam completion flag; requires actual predicate or controlled save comparison.

Sources: [ice-shop.htm](https://kouryakutsushin.com/khbbs/ice-shop.htm), [iceShop.html](https://openkh.dev/bbs/file/type/iceShop.html).

### BBS-021

Independent guide explicitly distinguishes HD/PSP columns and states story requirements supplement Arena Level. Normal Combined Threat now requires Level 7 plus Radiant Garden; Time to Chill retains published Level 13 and Aqua clear-data condition. Inspected ArenaData format and a mod that forces Arena 30; neither supplies original cross-file logic.

Remaining: Need precise character-specific Time to Chill exceptions and ticket bypass of story/clear-data conditions. Arena/story conditions are not automatically contradictory; only those exact alternatives remain unverified.

Sources: [arenamode.htm](https://kouryakutsushin.com/khbbs/arenamode.htm), [ArenaData.html](https://openkh.dev/bbs/file/type/ArenaData.html), [bbsMaxLevelArena.lua](https://github.com/gaithern/KH-BBS-AP-LUA/blob/HEAD/bbsMaxLevelArena.lua).

### BBS-022

Independent mixed-edition guide lists Time to Chill max HP without an amount, so cannot resolve +5/+10. Its Lights Lessons +10 additionally differs from existing HD +15; runtime now preserves this edition ambiguity.

Remaining: Need original Steam bonus rows or before/after HP observations for Time to Chill and Lights Lessons; mixed-column guide is not decisive modern numeric evidence.

Sources: [arenamode.htm](https://kouryakutsushin.com/khbbs/arenamode.htm), [mission.html](https://openkh.dev/bbs/file/type/mission.html).

### BBS-025

Independent PSP-FM mission guide corroborates inclusive published three-star scores 40/90/70/350 and two-minute survival. OpenKH generic EXB format does not identify the game comparator.

Remaining: Current Steam exact equality remains untested. Inclusive tables now have independent older-edition support; strict prose conflict is retained and aiming beyond threshold remains conservative.

Sources: [battlemisssion.htm](https://kouryakutsushin.com/khbbs/battlemisssion.htm), [exb.html](https://openkh.dev/bbs/file/type/exb.html).

### BBS-027

Extracted all seven board pages: 17 opponent variants, 288 command/level records, with all 39 Skull quantities explicitly null. Generator publishes these inventories alongside existing 45 bonus panels.

Remaining: Remaining: unspecified Skull quantities, independently certified Menu/Arena deck differences and acquisition exceptions, AI behavior and current Steam confirmation. Inventory counts are not random draw probabilities.

Sources: [Keyblade_Board](https://www.khwiki.com/Keyblade_Board), [Royal_Board](https://www.khwiki.com/Royal_Board), [Toon_Board](https://www.khwiki.com/Toon_Board), [Spaceship_Board](https://www.khwiki.com/Spaceship_Board), [Skull_Board](https://www.khwiki.com/Skull_Board), [Hunny_Pot_Board](https://www.khwiki.com/Hunny_Pot_Board), [Secret_Board](https://www.khwiki.com/Secret_Board).

### BBS-028

Independent finish guide states eligible parent must be equipped. KingdomSaveEditor maps 15 finisher records containing Id, Status and Experience, but does not implement the equipped-switch handler.

Remaining: Need vanilla switching handler or controlled save differences before/after switching away and back; separate saved experience fields do not prove pause or reset.

Sources: [finish-command.htm](https://kouryakutsushin.com/khbbs/finish-command.htm), [Finisher.cs](https://github.com/Xeeynamo/KingdomSaveEditor/blob/master/KHSave.LibBbs/Models/Finisher.cs), [SaveKhBbs.FinalMix.cs](https://github.com/Xeeynamo/KingdomSaveEditor/blob/master/KHSave.LibBbs/SaveKhBbs.FinalMix.cs).

### BBS-029

Inspected all 24 distinct linked finisher page targets. Added 22 concrete action summaries and an explicit Rumble Rave missing-details note; generic Finish page does not supply character-specific mechanics. Corrected obsolete progression text now that decks/probabilities are indexed.

Remaining: Pete emblem chances/gauge values, generic character Finish mechanics, Rumble Rave timing/input/power, complete damage/frame values and exhaustive exceptions remain absent. Published action summaries are not full damage certification.

Sources: [D-Link](https://www.khwiki.com/D-Link), [Rumble_Rave](https://www.khwiki.com/Rumble_Rave), [Finish](https://www.khwiki.com/Finish).

### BBS-030

Inspected independent Arena attack/recovery guide and UltimateMod source inventory. Guide separates some HD mechanics but mixes shared PSP/HD tactics; mod changes encounters. Neither provides complete vanilla attack/stat tables.

Remaining: Full per-character boss recovery/attack coverage remains incomplete; exact Unknown unknown fields need original enemy parameters and action logic, with current Steam encounter validation.

Sources: [arenamode.htm](https://kouryakutsushin.com/khbbs/arenamode.htm), [BBSUM_Mod](https://github.com/Truthkey/BBSUM_Mod), [epd.html](https://openkh.dev/bbs/file/type/epd.html).

### BBS-031

Inspected FinalMix save difficulty and finisher structures and Steam randomizer warnings about version-dependent executable offsets. Data layout does not implement episode aggregation.

Remaining: Need current Steam save-selection/aggregation code or controlled mixed-difficulty clear-file matrix; no replay/deletion workaround is certified.

Sources: [SaveKhBbs.FinalMix.cs](https://github.com/Xeeynamo/KingdomSaveEditor/blob/master/KHSave.LibBbs/SaveKhBbs.FinalMix.cs), [Birth-by-Sleep-Randomizer](https://github.com/Truthkey/Birth-by-Sleep-Randomizer).

### BBS-032

Retrieved public Steam achievements HTML: no hidden labels observed, which is not an API boolean. Found an August 2024 first-person Steam Collector report: three 140-point albums did not unlock until a later Terra run. This is Steam anecdote, not merely PS3 evidence.

Remaining: Raw API hidden booleans, precise mixed-save aggregation and current-build Collector behavior remain uncertified. One Steam report does not establish prevalence, cause or a reliable replay workaround.

Sources: [?l=english](https://steamcommunity.com/stats/2552430/achievements/?l=english), [](https://steamcommunity.com/app/2552430/discussions/0/4514381183278271486/).

## Validation and publication

Both offline BBS generators pass: 1,653 entries, 492 recipes (468 meld groups and 24 character-specific ice-cream recipes), 187 command identities, 46 finish nodes. Focused BBS tests pass 14/14, including shop milestone/conflict propagation and board/D-Link/recipe/Arena regression coverage. All entry and recipe ID sets match the initial scope checkpoint; JSON parsing and whitespace checks pass. Coordinator runs integrated checks. Initial scope checkpoint `252be0f` and shop correction `0fe326f` were pushed to `research/finish-bbsfm-gaps-2026-10-01`; subsequent implementation and final reconciliation are on the same branch. This report identifies missing retail data and controlled observations precisely; it does not claim all accessible guides are exhausted or that every family is complete.
