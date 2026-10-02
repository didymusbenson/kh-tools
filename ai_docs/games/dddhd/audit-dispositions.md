# DDD current audit dispositions

2026-10-01 follow-through against all 25 baseline findings. **1 blocked, 19 partial, 5 resolved.** Partial means supported corrections were integrated while a named source defect or missing statement remains. Blocked means the disputed fact itself could not be resolved. Original audit findings/appendices are historical baseline evidence. Data Jiminy remains empty.

Canonical factual inputs and generators were changed. Sources are documentary evidence, not a claimed playtest. Indexed-only or blocked evidence is explicitly identified. Every consulted catalog URL is enumerated in `audit-dispositions.json`; raw-source hashes appear in `source-inspection-manifest.json`.

## DDD-001 — partial

All 438 pickup landmarks integrated from the complete KH13 location table, reconciled by HD item/area identity; all 51 KHWiki notes and existing longer approaches retained. Directions also reach command, material, recipe-item and training-item acquisition references. Map compass convention and available access actions are explicit.

Remaining / closure basis: The 438-row location guide supplies pickup landmarks, not exhaustive entrance-to-chest walking routes, earliest story access, minimum movement abilities or returnability. Its residualCoverage lists 437 IDs without an explicit earliest-access statement (Cell Tornado Strike has one); existing KHWiki access notes remain separately retained. Full KH13 and GamerGuides were consulted. GameFAQs 64798 direct access returned HTTP403/web restriction; indexed excerpts share KH13 lineage and are not independent verification. Two Curaga/Doubleflight source-number conflicts are enumerated in chest-route-enrichment.json; item-specific landmarks are independently corroborated.

Consulted: [Game:Country_of_the_Musketeers](https://www.khwiki.com/Game:Country_of_the_Musketeers); [Game:La_Cit%C3%A9_des_Cloches](https://www.khwiki.com/Game:La_Cit%C3%A9_des_Cloches); [Game:Prankster%27s_Paradise](https://www.khwiki.com/Game:Prankster%27s_Paradise); [Game:Symphony_of_Sorcery](https://www.khwiki.com/Game:Symphony_of_Sorcery); [Game:The_Grid](https://www.khwiki.com/Game:The_Grid); [Game:The_World_That_Never_Was](https://www.khwiki.com/Game:The_World_That_Never_Was); [Game:Traverse_Town](https://www.khwiki.com/Game:Traverse_Town); [77497](https://gamefaqs.gamespot.com/ps4/181154-kingdom-hearts-hd-28-final-chapter-prologue/faqs/77497); all 14 URLs are enumerated in the JSON ledger.

## DDD-002 — partial

All 438 legacy location rows reconciled to current HD item/area identities: 400 exact joins, 20 quantity-notation normalizations, 16 explicit replacements (14 Treasure→Candy Goggles plus La Cité Tunnels #35/#36), and two uniquely identified Curaga/Doubleflight number remaps. Existing stable IDs and HD table order retained. Explicit HD Spirit formula selection is also integrated.

Remaining / closure basis: The two Riku Delusive Beginning pickups conflict in source order: Curaga is KH13 #3/current table #2; Doubleflight is KH13 #2/current table #3. GamerGuides independently confirms pickup landmarks but not HD Reports numbering. No complete independent HD Reports-image sequence was available in consulted sources; source labels are not certified as in-game order.

Consulted: [Game:Country_of_the_Musketeers](https://www.khwiki.com/Game:Country_of_the_Musketeers); [Game:La_Cit%C3%A9_des_Cloches](https://www.khwiki.com/Game:La_Cit%C3%A9_des_Cloches); [Game:Prankster%27s_Paradise](https://www.khwiki.com/Game:Prankster%27s_Paradise); [Game:Symphony_of_Sorcery](https://www.khwiki.com/Game:Symphony_of_Sorcery); [Game:The_Grid](https://www.khwiki.com/Game:The_Grid); [Game:The_World_That_Never_Was](https://www.khwiki.com/Game:The_World_That_Never_Was); [Game:Traverse_Town](https://www.khwiki.com/Game:Traverse_Town); [Kingdom_Hearts_Dream_Drop_Distance_HD](https://www.khwiki.com/Kingdom_Hearts_Dream_Drop_Distance_HD); all 12 URLs are enumerated in the JSON ledger.

## DDD-003 — partial

All 54 boards extracted: 1,144 nodes with reciprocal edges, quotas, costs, conditional transformations and disposition references. Live Cyber Yog nodes classify both Thunder Screens as Stat abilities; legacy import remains historical.

Remaining / closure basis: Two precise source defects remain: Aura Lion red-secret coordinate conflict (DDD-004); Jestabocky B-3 has a Left direction to missing A-3. Base SVG was inspected and is a four-way cross. Neither defect is silently repaired.

Consulted: [Aura_Lion](https://www.khwiki.com/Aura_Lion); [Beatalike](https://www.khwiki.com/Beatalike); [Catanuki](https://www.khwiki.com/Catanuki); [Cera_Terror](https://www.khwiki.com/Cera_Terror); [Chef_Kyroo](https://www.khwiki.com/Chef_Kyroo); [Cyber_Yog](https://www.khwiki.com/Cyber_Yog); [Drak_Quack](https://www.khwiki.com/Drak_Quack); [Drill_Sye](https://www.khwiki.com/Drill_Sye); all 57 URLs are enumerated in the JSON ledger.

## DDD-004 — blocked

Conflict propagated to Aura Lion, Faith, Curaga and Second Chance; table costs and level-30 gate retained.

Remaining / closure basis: Aura Lion grid/table says Red C-7, 250 LP, and D-7 Level 30; transformation footnote says Red D-7. Independent 2012 FAQ is 3DS, and the HD trophy guide gives total LP rather than a coordinate-certified HD image. None resolves the conflicting coordinate.

Consulted: [Aura_Lion](https://www.khwiki.com/Aura_Lion); [64749](https://gamefaqs.gamespot.com/3ds/997779-kingdom-hearts-3d-dream-drop-distance/faqs/64749); [](https://www.playstationtrophies.org/forum/topic/283696-kingdom-hearts-dream-drop-distance-hd-~-trophy-guide-amp-roadmap/).

## DDD-005 — partial

All 54 four-disposition tables, base stats and normal/rare form flags extracted; nine Spirit-only breeds explicitly distinguished from absent enemy data.

Remaining / closure basis: 15 base-stat fields are ??? across Beatalike, Catanuki and Tubguin Ace. Five body-part instructions are blank: Beatalike two, Tubguin Ace two, Woeflower one. Individual pages retain these blanks; the 3DS FAQ cannot fill new HD breeds.

Consulted: [Aura_Lion](https://www.khwiki.com/Aura_Lion); [Beatalike](https://www.khwiki.com/Beatalike); [Catanuki](https://www.khwiki.com/Catanuki); [Cera_Terror](https://www.khwiki.com/Cera_Terror); [Chef_Kyroo](https://www.khwiki.com/Chef_Kyroo); [Cyber_Yog](https://www.khwiki.com/Cyber_Yog); [Drak_Quack](https://www.khwiki.com/Drak_Quack); [Drill_Sye](https://www.khwiki.com/Drill_Sye); all 56 URLs are enumerated in the JSON ledger.

## DDD-006 — partial

263 formulas retained; 37 shared ingredient events cross-linked. The 54 marked recipe-item formulas receive the explicit 100% rule; nulls are never defaulted wholesale.

Remaining / closure basis: 141 unmarked formulas retain unreported odds. SynthKH3D has no probability default establishing 100%; absence of chance/success fields is not proof. Risky Winds wording is separately ambiguous (DDD-007).

Consulted: [Aura_Lion](https://www.khwiki.com/Aura_Lion); [Beatalike](https://www.khwiki.com/Beatalike); [Catanuki](https://www.khwiki.com/Catanuki); [Cera_Terror](https://www.khwiki.com/Cera_Terror); [Chef_Kyroo](https://www.khwiki.com/Chef_Kyroo); [Cyber_Yog](https://www.khwiki.com/Cyber_Yog); [Drak_Quack](https://www.khwiki.com/Drak_Quack); [Drill_Sye](https://www.khwiki.com/Drill_Sye); all 56 URLs are enumerated in the JSON ledger.

## DDD-007 — partial

Exact extra-material rank thresholds, weaker-ingredient rule, bonus-level formula, rank/stat correction and 105 command-donation rows integrated as references and command details.

Remaining / closure basis: Spirit initial-level table has average-level 20→27 and malformed 30–01 row; its Risky Winds 50% wording does not distinguish relative versus percentage-point shifts. These prevent certified initial-level/odds optimization; no optimality inferred from legacy BEST BASE.

Consulted: [Spirit](https://www.khwiki.com/Spirit); [Drop_System](https://www.khwiki.com/Drop_System); [64749](https://gamefaqs.gamespot.com/3ds/997779-kingdom-hearts-3d-dream-drop-distance/faqs/64749).

## DDD-008 — partial

54 independent recipe-item ownership goals plus 176 Moogle/Medal stock rows; all finite chest joins. Frootz/Kab LV7 500/400; R&R LV2 200/160; Beatalike LV8 1000/800; Tubguin LV2 200/160.

Remaining / closure basis: Complete shop and individual command pages disagree on prices (e.g. Quick Blitz 100 versus 400); runtime flags discovered conflicts. Recipe ownership and formula availability stay separate. Recipe talk prices corroborated by indexed HD guide; full PSN page itself returned 403, so not claimed fully inspected.

Consulted: [Recipe](https://www.khwiki.com/Recipe); [Talk:Recipe](https://www.khwiki.com/Talk:Recipe); [Moogle_Shop](https://www.khwiki.com/Moogle_Shop); [Quick_Blitz](https://www.khwiki.com/Quick_Blitz); [](https://www.playstationtrophies.org/forum/topic/284269-comprehensive-reports-and-collection-guide/).

## DDD-009 — partial

All 37 materials joined to chests, normal/rare worlds, portals and shop stock; all 17 material-family pages inspected, non-3DS tutorial/expiration clauses integrated.

Remaining / closure basis: Ordinary enemy sources are mostly world lists, not room-level spawn walks. Expiration pages name breeds but omit quantities. Rampant page also contains an unresolved Ultimania Dungeon comment. Portal first/repeat item semantics not uniformly described.

Consulted: [Brilliant](https://www.khwiki.com/Brilliant); [Charming](https://www.khwiki.com/Charming); [Dulcet](https://www.khwiki.com/Dulcet); [Epic](https://www.khwiki.com/Epic); [Fleeting](https://www.khwiki.com/Fleeting); [Grim](https://www.khwiki.com/Grim); [Intrepid](https://www.khwiki.com/Intrepid); [Lofty](https://www.khwiki.com/Lofty); all 79 URLs are enumerated in the JSON ledger.

## DDD-010 — resolved

All 19 rare-form records now use DDDRworlds, never DDDNworlds. Spirit-only forms are excluded. Runtime Dream Piece parsing does not import 3DS Treasure Goggles toy text.

Remaining / closure basis: No remaining extraction defect in this finding; deeper room navigation remains DDD-009.

Consulted: [Aura_Lion](https://www.khwiki.com/Aura_Lion); [Beatalike](https://www.khwiki.com/Beatalike); [Catanuki](https://www.khwiki.com/Catanuki); [Cera_Terror](https://www.khwiki.com/Cera_Terror); [Chef_Kyroo](https://www.khwiki.com/Chef_Kyroo); [Cyber_Yog](https://www.khwiki.com/Cyber_Yog); [Drak_Quack](https://www.khwiki.com/Drak_Quack); [Drill_Sye](https://www.khwiki.com/Drill_Sye); all 54 URLs are enumerated in the JSON ledger.

## DDD-011 — partial

All 124 commands audited for mechanics extraction: all 88 Attack/Magic/Item slot/use fields, 78 of 79 applicable Attack/Magic reloads, all player acquisition/default assertions, complete chest/shop/54-board joins and donation bonuses. The other 45 commands are consumables or non-reloading movement/defense/reprisal/Flowmotion actions, not missing reload values. Exact-tier Fire 12/18/26, Cure 20/24/30, Thunder 12/18/26, Balloon 12/18/26 and Spark 12/20/36 now survive generation; Spark Dive is 22 seconds and one slot.

Remaining / closure basis: Strike Raid is the sole unresolved applicable reload: the same DDD source infobox says 22 seconds while its DDD prose says 24. Quick Blitz retains the independent 100-versus-400 shop-price conflict. Shared tier-page reloads were parser omissions, now corrected; they are not research blockers.

Consulted: [Deck_Command_(KH3D)](https://www.khwiki.com/Deck_Command_(KH3D)); [Moogle_Shop](https://www.khwiki.com/Moogle_Shop); [Quick_Blitz](https://www.khwiki.com/Quick_Blitz); [Blizzard_Edge](https://www.khwiki.com/Blizzard_Edge); [Dark_Break](https://www.khwiki.com/Dark_Break); [Slot_Edge](https://www.khwiki.com/Slot_Edge); [Blitz](https://www.khwiki.com/Blitz); [Meteor_Crash](https://www.khwiki.com/Meteor_Crash); all 127 URLs are enumerated in the JSON ledger.

## DDD-012 — resolved

All 43 maximum stacks sourced from live Abilities table and all 54 board providers rebuilt. Scan/EXP Zero defaults and Proud/Critical-only EXP Zero integrated. Ability Ace requires enabled Support/Spirit stacks including EXP Zero, then leaving menu; Stat abilities excluded.

Remaining / closure basis: No remaining catalog/provider/default gap in this finding. Aura topology caveat is maintained under DDD-004.

Consulted: [Abilities_(KH3D)](https://www.khwiki.com/Abilities_(KH3D)); [77497](https://gamefaqs.gamespot.com/ps4/181154-kingdom-hearts-hd-28-final-chapter-prologue/faqs/77497); [Aura_Lion](https://www.khwiki.com/Aura_Lion); [Beatalike](https://www.khwiki.com/Beatalike); [Catanuki](https://www.khwiki.com/Catanuki); [Cera_Terror](https://www.khwiki.com/Cera_Terror); [Chef_Kyroo](https://www.khwiki.com/Chef_Kyroo); [Cyber_Yog](https://www.khwiki.com/Cyber_Yog); all 56 URLs are enumerated in the JSON ledger.

## DDD-013 — partial

43 Link entries cover 27 single attacks, seven dual attacks, five single styles, three normal dual styles, plus story-only Nightmare Clash. All breed mappings, full pair tables and wildcard exclusions preserved; per-Link gauge rates imported where present.

Remaining / closure basis: All 43 individual technique pages consulted. Their button vocabularies are predominantly 3DS, not a verified Steam controller/keyboard crosswalk; some lack gauge duration. No universal HD input mapping is invented.

Consulted: [Link_System](https://www.khwiki.com/Link_System); [Meow_Wounce](https://www.khwiki.com/Meow_Wounce); [Roll_Call](https://www.khwiki.com/Roll_Call); [Whirling_Bronco](https://www.khwiki.com/Whirling_Bronco); [Fly-By_Knight](https://www.khwiki.com/Fly-By_Knight); [Hammer_Throw](https://www.khwiki.com/Hammer_Throw); [Flame_Thrower](https://www.khwiki.com/Flame_Thrower); [Decussation](https://www.khwiki.com/Decussation); all 44 URLs are enumerated in the JSON ledger.

## DDD-014 — partial

All 78 Specials have forecast/enemy/bonus/unlock/reward data; 11 Secret areas/HP rewards retained.

Remaining / closure basis: World templates mostly identify areas, not exact landmark approaches. Not every reward cell separates first-clear delivery from repeat/bonus delivery. The HD goal guide is not a comprehensive 89-route/reward-state matrix.

Consulted: [Game:Country_of_the_Musketeers](https://www.khwiki.com/Game:Country_of_the_Musketeers); [Game:La_Cit%C3%A9_des_Cloches](https://www.khwiki.com/Game:La_Cit%C3%A9_des_Cloches); [Game:Prankster%27s_Paradise](https://www.khwiki.com/Game:Prankster%27s_Paradise); [Game:Symphony_of_Sorcery](https://www.khwiki.com/Game:Symphony_of_Sorcery); [Game:The_Grid](https://www.khwiki.com/Game:The_Grid); [Game:The_World_That_Never_Was](https://www.khwiki.com/Game:The_World_That_Never_Was); [Game:Traverse_Town](https://www.khwiki.com/Game:Traverse_Town); [Portal](https://www.khwiki.com/Portal); all 9 URLs are enumerated in the JSON ledger.

## DDD-015 — partial

316 Battle/Friend forecast configurations grouped into 257 source-number identities; combined portal catalog 346. All seven bonus types explicitly enumerated for Brave Challengers; timed thresholds remain variants of one type.

Remaining / closure basis: The full source census is extracted. Precise approach landmarks remain absent from many world portal rows, and source-number suffixes are retained instead of inventing Journal numbering.

Consulted: [Game:Country_of_the_Musketeers](https://www.khwiki.com/Game:Country_of_the_Musketeers); [Game:La_Cit%C3%A9_des_Cloches](https://www.khwiki.com/Game:La_Cit%C3%A9_des_Cloches); [Game:Prankster%27s_Paradise](https://www.khwiki.com/Game:Prankster%27s_Paradise); [Game:Symphony_of_Sorcery](https://www.khwiki.com/Game:Symphony_of_Sorcery); [Game:The_Grid](https://www.khwiki.com/Game:The_Grid); [Game:The_World_That_Never_Was](https://www.khwiki.com/Game:The_World_That_Never_Was); [Game:Traverse_Town](https://www.khwiki.com/Game:Traverse_Town); [Portal](https://www.khwiki.com/Portal); all 9 URLs are enumerated in the JSON ledger.

## DDD-016 — resolved

The Grid HD Dive reward is Candy Goggles. World A-rank prize is awarded once when either character first earns A; seven-course Divewing requirement remains per character. All 14 course thresholds preserved.

Remaining / closure basis: No remaining reward identity/sharing gap.

Consulted: [Dive_Mode](https://www.khwiki.com/Dive_Mode); [Game:The_Grid](https://www.khwiki.com/Game:The_Grid); [Divewing](https://www.khwiki.com/Divewing).

## DDD-017 — partial

All ten cups/27 match lineups and available medal cells extracted, complete Medal stock joined; evolved-card and reserve-reload tactics added.

Remaining / closure basis: Some cup source medal fields are blank and per-rank medal tables are not complete. Flick Rush mechanics page retains 3DS input terminology rather than complete Steam bindings; these blanks remain explicit.

Consulted: [Flick_Rush](https://www.khwiki.com/Flick_Rush); [Moogle_Shop](https://www.khwiki.com/Moogle_Shop); [Training_Cup](https://www.khwiki.com/Training_Cup); [Beginner%27s_Cup](https://www.khwiki.com/Beginner%27s_Cup); [Rainbow_Cup](https://www.khwiki.com/Rainbow_Cup); [Digital_Cup](https://www.khwiki.com/Digital_Cup); [Tin_Pin_Cup](https://www.khwiki.com/Tin_Pin_Cup); [Speed_Cup](https://www.khwiki.com/Speed_Cup); all 12 URLs are enumerated in the JSON ledger.

## DDD-018 — partial

24 training/treat acquisition references plus HD Balloon/Water Barrel/Candy Goggles controls and reward types; Reality Shift world map and HD activation cautions integrated.

Remaining / closure basis: Full Training Toy and Reality Shift pages and individual shifts inspected. They provide PS4 bindings or old touch instructions, not all Steam input schemes. Treat preference/random reward tables do not establish every requested breed-specific efficient training route.

Consulted: [Training_Toy](https://www.khwiki.com/Training_Toy); [Reality_Shift](https://www.khwiki.com/Reality_Shift); [Kingdom_Hearts_Dream_Drop_Distance_HD](https://www.khwiki.com/Kingdom_Hearts_Dream_Drop_Distance_HD); [Slingshot](https://www.khwiki.com/Slingshot); [Faithline](https://www.khwiki.com/Faithline); [Code_Break](https://www.khwiki.com/Code_Break); [Bubble_Burst](https://www.khwiki.com/Bubble_Burst); [Wonder_Comic](https://www.khwiki.com/Wonder_Comic); all 12 URLs are enumerated in the JSON ledger.

## DDD-019 — partial

Lord Kyroo 70-second escape, shared retained HP, Riku→Sora→Riku loop, room-exit reset, skipped Nave alternative and finishing-character HP reward integrated; Julius location/clear-data entry and character rewards retained.

Remaining / closure basis: Lord Kyroo source defines timeout/room-exit behavior but does not define save-reload persistence. No save experiment is fabricated.

Consulted: [Lord_Kyroo](https://www.khwiki.com/Lord_Kyroo); [Julius](https://www.khwiki.com/Julius); [77497](https://gamefaqs.gamespot.com/ps4/181154-kingdom-hearts-hd-28-final-chapter-prologue/faqs/77497).

## DDD-020 — partial

All 15 Keyblade source pages read; 13 eligible types per character preserved. Per-character Dive/portal/Julius conditions and all stat rows integrated.

Remaining / closure basis: Sweet Dreams shared Flick Rush reward delivery has indexed HD forum corroboration, but full forum request returns 403 and 3DS forum accounts conflict; ownership is not automatically copied to both characters.

Consulted: [Kingdom_Key](https://www.khwiki.com/Kingdom_Key); [Way_to_the_Dawn](https://www.khwiki.com/Way_to_the_Dawn); [Skull_Noise](https://www.khwiki.com/Skull_Noise); [Guardian_Bell](https://www.khwiki.com/Guardian_Bell); [Dual_Disc](https://www.khwiki.com/Dual_Disc); [Ferris_Gear](https://www.khwiki.com/Ferris_Gear); [Ocean%27s_Rage](https://www.khwiki.com/Ocean%27s_Rage); [Knockout_Punch](https://www.khwiki.com/Knockout_Punch); all 16 URLs are enumerated in the JSON ledger.

## DDD-021 — partial

All 18 HD trophy rows reconciled. Stat Builder exact 5/3/3/3 simultaneous party stacks; Ribbit Reaper ordinary or boss form; Keyblade Conqueror both characters.

Remaining / closure basis: Dream Pleaser partial/released-instance flags and Daring Diver best-score versus repeat-score accumulation are not unambiguously established. KHWiki text and cumulative HD guide wording do not resolve every internal counter; no total catalog closed from Stat Builder alone.

Consulted: [Trophies](https://www.khwiki.com/Trophies); [77497](https://gamefaqs.gamespot.com/ps4/181154-kingdom-hearts-hd-28-final-chapter-prologue/faqs/77497); [](https://www.playstationtrophies.org/forum/topic/284269-comprehensive-reports-and-collection-guide/); [](https://www.gamerguides.com/kingdom-hearts-3d-dream-drop-distance/guide/walkthrough/extras/trophy-conditions-and-tips/).

## DDD-022 — partial

Official Steam 69 partitioned into all 54 DDD goals plus 15 0.2. Exact public DDD names/requirements replace the selected15 subset; Ability Ace mode exception applied.

Remaining / closure basis: Public Steam HTML exposes neither native API achievement keys nor every internal unlock counter. PSN/Xbox/Epic identifiers and unreleased Oct8 editions are not inferred from Steam labels. Stable app IDs remain separate.

Consulted: [?l=english](https://steamcommunity.com/stats/2552440/achievements/?l=english); [Trophies](https://www.khwiki.com/Trophies); [77497](https://gamefaqs.gamespot.com/ps4/181154-kingdom-hearts-hd-28-final-chapter-prologue/faqs/77497).

## DDD-023 — resolved

Catanuki Spark Raid/Vanish, Beatalike Ars Arcanum and Tubguin Dark Firaga now appear in reverse providers from complete boards. Scan/EXP Zero show defaults; Defense commands show acquisition.

Remaining / closure basis: No remaining known-provider/default omission.

Consulted: [Catanuki](https://www.khwiki.com/Catanuki); [Beatalike](https://www.khwiki.com/Beatalike); [Tubguin_Ace](https://www.khwiki.com/Tubguin_Ace); [Abilities_(KH3D)](https://www.khwiki.com/Abilities_(KH3D)).

## DDD-024 — resolved

All 438 pickup landmarks, all 51 world notes, separate rare worlds, all board conditions and per-record world/command/recipe sources survive generation. Explicit HD formula selector and source hashes are retained. Source manifest records inspected factual evidence without storing guide prose.

Remaining / closure basis: No remaining enumerated extraction/provenance omission; actual blank source fields remain in the other findings.

Consulted: [Game:Country_of_the_Musketeers](https://www.khwiki.com/Game:Country_of_the_Musketeers); [Game:La_Cit%C3%A9_des_Cloches](https://www.khwiki.com/Game:La_Cit%C3%A9_des_Cloches); [Game:Prankster%27s_Paradise](https://www.khwiki.com/Game:Prankster%27s_Paradise); [Game:Symphony_of_Sorcery](https://www.khwiki.com/Game:Symphony_of_Sorcery); [Game:The_Grid](https://www.khwiki.com/Game:The_Grid); [Game:The_World_That_Never_Was](https://www.khwiki.com/Game:The_World_That_Never_Was); [Game:Traverse_Town](https://www.khwiki.com/Game:Traverse_Town); [Aura_Lion](https://www.khwiki.com/Aura_Lion); all 67 URLs are enumerated in the JSON ledger.

## DDD-025 — partial

All 15 Keyblade stat rows and secret-ending criteria/replay reference integrated. Clear-data/NG+ state rules added.

Remaining / closure basis: Another Guardian of Light is DDD/DHD tagged but does not independently document every HD re-trigger path after wrong final answers. Published trophy counts and replayable letters are not proof of every recovery combination.

Consulted: [Another_Guardian_of_Light](https://www.khwiki.com/Another_Guardian_of_Light); [Game_Clear_Data](https://www.khwiki.com/Game_Clear_Data); [77497](https://gamefaqs.gamespot.com/ps4/181154-kingdom-hearts-hd-28-final-chapter-prologue/faqs/77497).
