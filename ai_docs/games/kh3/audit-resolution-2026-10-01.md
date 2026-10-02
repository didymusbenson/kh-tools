# KH3 / Re Mind audit resolution — 2026-10-01

This is the current disposition of every KH3-001–KH3-035 finding. It supersedes the repository-only baseline prose and its historical occurrence appendices. **15 partial, 17 resolved, 3 conflicted; 35 investigated; no unattempted finding marked blocked.** Partial means supported work is integrated and the specific evidence boundary below remains. Conflicted means consulted sources disagree. Neither is full completion.

Canonical lineage: `src/games/kh3/content.json` → `src/games/kh3.ts` → registry/runtime. The JSON is the maintained canonical input, not a generated duplicate. All original 656 IDs remain. Current content contains **1900 entries and 286 recipe actions**. Historical per-world chest/emblem counts are unchanged; mixed category totals are not physical collectible denominators. Data Jiminy remains empty.

The machine-readable companion is [audit-dispositions.json](audit-dispositions.json). All source URLs below were investigated on this pass; evidence limitations identify where a full read was unavailable or where the source itself lacks a predicate. Per-entry sources in canonical content retain individual equipment, material and Classic-game URLs.

## Integrated coverage

| Family | Implemented coverage |
|---|---|
| Base and DLC collectibles | 245 base chests, 90 emblems, 335 pickup landmarks and guide directions; 9 Re Mind routes; 10 Slider prizes |
| Workshop | 88 synthesis recipes/history records; 60 materials; 25 type/first-material goals and 27 shop goals |
| Equipment | 22 Keyblade level/property catalogs; 220 source forge transitions; 170 applicable forge actions including NG+ Ultima; 129 non-Keyblade items; 25 party/temporary references |
| Cooking/records | 59 ingredients; 298 world source rows; 56 dish effect variants; 23 Classic controls; 54 Game Records; 81 base adversaries |
| Gummi | 46 missions; 33 battles; 9 spheres; 374 parts/cosmetics; 52 blueprints; 45 physical fragments; 19 abilities; 13 special weapons; 9 constellation routes |
| Optional/DLC | 15 gate encounters; 14 DLC strategies; 28 codes; 9 merits; 34 PRO boss scores; 7 hidden Steam predicates |

## Per-finding evidence and disposition

### KH3-001 — partial

Systematically reconciled all 335 base records with eleven complete numbered PowerPyx world guides and targeted GamerGuides checks. Added directions to 64 empty records and four reward-only Classic Kingdom records; 82 directions added/expanded/corrected overall, including the two San Fransokyo eastern-tower corrections. All 245 chests and 90 emblems have pickup landmarks, stable IDs and per-record guide provenance. Added post-clear recovery, explicit camera/night/story gates and Sandbar lagoon approach.

**Remaining boundary:** Spatial pickup-direction coverage is complete, not a claim of 335 save-point narratives or a universal earliest-access graph. route-enrichment.json enumerates 316 IDs without proven minimum story gates and the specific Arendelle chest 24 disagreement (GamerGuides requires revisit; PowerPyx says easier). Original console guides align with current base identities but are not modern Steam capture authority; aliases remain KH3-002. No direction remains unresearched or area-only because a wiki cell was blank.

**Consulted:**

- https://www.khwiki.com/Game:Olympus
- https://www.khwiki.com/Game:Twilight_Town
- https://www.khwiki.com/Game:Toy_Box
- https://www.khwiki.com/Game:Kingdom_of_Corona
- https://www.khwiki.com/Game:Monstropolis
- https://www.khwiki.com/Game:Arendelle
- https://www.khwiki.com/Game:The_Caribbean
- https://www.khwiki.com/Game:San_Fransokyo
- https://www.khwiki.com/Game:100_Acre_Wood
- https://www.khwiki.com/Game:Keyblade_Graveyard
- https://www.khwiki.com/Game:The_Final_World
- https://www.khwiki.com/Lucky_Emblem
- https://www.powerpyx.com/kingdom-hearts-3-arendelle-collectible-locations-treasures-lucky-emblems/
- https://www.powerpyx.com/kingdom-hearts-3-final-world-collectible-locations-treasures-lucky-emblems/
- https://www.powerpyx.com/kingdom-hearts-3-hundred-acre-wood-collectible-locations-treasures-lucky-emblems/
- https://www.powerpyx.com/kingdom-hearts-3-keyblade-graveyard-collectible-locations-treasures-lucky-emblems/
- https://www.powerpyx.com/kingdom-hearts-3-kingdom-of-corona-collectible-locations-treasures-lucky-emblems/
- https://www.powerpyx.com/kingdom-hearts-3-monstropolis-collectible-locations-treasures-lucky-emblems/
- https://www.powerpyx.com/kingdom-hearts-3-olympus-collectible-locations-treasures-lucky-emblems/
- https://www.powerpyx.com/kingdom-hearts-3-san-fransokyo-collectible-locations-treasures-lucky-emblems/
- https://www.powerpyx.com/kingdom-hearts-3-the-caribbean-collectible-locations-treasures-lucky-emblems/
- https://www.powerpyx.com/kingdom-hearts-3-toy-box-collectible-locations-treasures-lucky-emblems/
- https://www.powerpyx.com/kingdom-hearts-3-twilight-town-collectible-locations-treasures-lucky-emblems/
- https://www.gamerguides.com/kingdom-hearts-iii/guide/the-gummiphone/treasures/olympus
- https://www.gamerguides.com/kingdom-hearts-iii/guide/the-gummiphone/treasures/arendelle
- https://www.gamerguides.com/kingdom-hearts-iii/guide/the-gummiphone/treasures/san-fransokyo
- https://www.gamerguides.com/kingdom-hearts-iii/guide/the-gummiphone/lucky-emblems/olympus
- https://www.powerpyx.com/kingdom-hearts-3-collectibles-guide-treasures-lucky-emblems/

### KH3-002 — partial

Preserved stable IDs and searchable Trial/Trail, Horseshoe Isle/Island, Petit/Petite and Bandana/Bandanna aliases; corrected source typographical material/equipment names.

**Remaining boundary:** The community tables establish aliases, not a captured modern English Steam label authority. Strength/Power and all regional ingredient aliases are not completely reconciled; no bulk rename was inferred.

**Consulted:**

- https://www.khwiki.com/Game:The_Caribbean
- https://www.khwiki.com/Game:Olympus
- https://www.khwiki.com/Accessory
- https://www.khwiki.com/Armor
- https://www.khwiki.com/Ingredients

### KH3-003 — resolved

Independent guides agree: use the 3F bench to reach the hanging red-and-white UFO and photograph its hatch. Replaced the conflicting runtime floor note.

**Remaining boundary:** None within this finding; full-world route audit remains KH3-001.

**Consulted:**

- https://www.gamesradar.com/kingdom-hearts-3-lucky-emblem-locations/3/
- https://camzillasmom.com/complete-guide-to-toy-box-lucky-emblems-in-kingdom-hearts-3/
- https://www.khwiki.com/Game:Toy_Box

### KH3-004 — partial

All nine Re Mind chest routes integrated. Added separate-episode save guidance, console alternate-load controls, same-DLC-save base progression and warning to preserve Re Mind Scala before Limitcut overwrite.

**Remaining boundary:** GamerGuides describes console controls and episode overwrite boundaries; it does not establish every Steam keyboard/controller glyph, replay/overwrite edge or cloud-transfer interaction. Those exact save-control cases remain uncertified.

**Consulted:**

- https://www.gamerguides.com/kingdom-hearts-iii/guide/re-mind-dlc/re-mind/scala-ad-caelum
- https://www.gamerguides.com/kingdom-hearts-iii/guide/re-mind-dlc
- https://www.khwiki.com/Kingdom_Hearts_III_Re_Mind

### KH3-005 — conflicted

Retained four activities and conservative completion before first Shore visit, distinct from the nonmissable Rapunzel photo. Forest Clasp stats integrated.

**Remaining boundary:** Item page says before first reaching Shore; Corona world reward description says before Rapunzel leaves. Neither reviewed page resolves the exact event flag or explicitly retracts the other cutoff. Conservative advice is not a resolved trigger.

**Consulted:**

- https://www.khwiki.com/Forest_Clasp
- https://www.khwiki.com/Game:Kingdom_of_Corona

### KH3-006 — resolved

Added ten individually checkable Slider prize routes. Completion of the run retains prizes; ten cannot all be collected in one run. Corrected translated reward names to Orichalcum+ and Master Treasure Magnet.

**Remaining boundary:** None for the ten-prize scope.

**Consulted:**

- https://www.khwiki.com/Frozen_Slider
- https://samurai-gamers.com/kingdom-hearts-3/goofy-curling-mini-game-guide/
- https://www.cheatcc.com/articles/kingdom-hearts-3-cheats-codes-cheat-codes-walkthrough-guide-faq-unlockables-for-playstation-4-ps4-ps4/

### KH3-007 — resolved

All 20 unlock milestones and actionable target/save-point approaches; camera acknowledgment, success notification, twelve teammate identities, Zeus statue alternative, day/night and Demon Tower gate constraints. Corrected preliminary robot/cactuar floor assignments against the independent guide.

**Remaining boundary:** No pixel-perfect acceptance measurement is required to supply an actionable source-grounded camera predicate.

**Consulted:**

- https://www.khwiki.com/Photo_Missions
- https://www.powerpyx.com/kingdom-hearts-3-moogle-photo-missions-locations/

### KH3-008 — resolved

Full 88-output recipe catalog, exact quantities and unlocks, explicit + variants, 88 separate synthesis-history records. Recipe materials resolve to canonical entries. Corrected Hungry Shield typo to Hungry Shard and Acrisis to Acrisius.

**Remaining boundary:** None for the 88-recipe scope. Ether uses the complete independent recipe table because its individual wiki page lacks the KHIII recipe table.

**Consulted:**

- https://www.powerpyx.com/kingdom-hearts-3-synthesis-items-list/
- https://www.khwiki.com/Synthesis
- https://www.khwiki.com/Ether
- https://www.khwiki.com/Clockwork_Shield
- https://www.khwiki.com/Acrisius

### KH3-009 — partial

Integrated 24 material-type unlock thresholds, first-material Ether goal and 27 material shop goals with exact 30/25/20 deposit thresholds and 100/200/300 prices.

**Remaining boundary:** These are the 52 sourced goals, not proof of every in-game Collector Goal menu row. The Synthesis and item pages do not provide a closed menu-ordered Collector Goals inventory including any non-recipe discovery rewards. No universal denominator is certified.

**Consulted:**

- https://www.khwiki.com/Synthesis
- https://www.powerpyx.com/kingdom-hearts-3-synthesis-items-list/
- https://www.khwiki.com/Blazing
- https://www.khwiki.com/Frost
- https://www.khwiki.com/Lightning
- https://www.khwiki.com/Lucid
- https://www.khwiki.com/Pulsing
- https://www.khwiki.com/Soothing
- https://www.khwiki.com/Writhing
- https://www.khwiki.com/Betwixt
- https://www.khwiki.com/Twilight

### KH3-010 — partial

All 60 material identities and KHIII acquisition/drop data; ordinary Orichalcum has a separate ID, retaining the old Orichalcum+ ID. Added shop thresholds and selected gate farm approaches.

**Remaining boundary:** Family obtainment tables supply source sets/rates, but some chest/Gummi entries remain area-only. A complete alternative-source route graph, source quantities and every unlock cannot be inferred from item names. Intentional non-enemy empty drops are not defects.

**Consulted:**

- https://www.khwiki.com/Blazing
- https://www.khwiki.com/Frost
- https://www.khwiki.com/Lightning
- https://www.khwiki.com/Lucid
- https://www.khwiki.com/Pulsing
- https://www.khwiki.com/Writhing
- https://www.khwiki.com/Betwixt
- https://www.khwiki.com/Twilight
- https://www.khwiki.com/Mythril
- https://www.khwiki.com/Sinister
- https://www.khwiki.com/Soothing
- https://www.khwiki.com/Wellspring
- https://www.khwiki.com/Hungry
- https://www.khwiki.com/Fluorite
- https://www.khwiki.com/Damascus
- https://www.khwiki.com/Adamantite
- https://www.khwiki.com/Electrum
- https://www.khwiki.com/Evanescent
- https://www.khwiki.com/Illusory
- https://www.khwiki.com/Orichalcum

### KH3-011 — partial

Lucky Strike multiplier 1 + 0.3 × active-party copies, repeat gate routes for five crystals, shop-visit postcard lottery and Twilight mailbox; no repeatable Orichalcum+ claim.

**Remaining boundary:** Consulted sources establish named encounter repeats and random postcards; they do not establish all asteroid reset conditions/timing or measured comparative efficiency. No fastest-farm ranking was added.

**Consulted:**

- https://www.khwiki.com/Lucky_Strike
- https://www.khwiki.com/Prize_Postcard
- https://www.khwiki.com/Battlegate
- https://gamefaqs.gamespot.com/ps4/718920-kingdom-hearts-iii/faqs/76812/side-quests-and-mini-games
- https://www.khwiki.com/Damascus
- https://www.khwiki.com/Adamantite

### KH3-012 — resolved

22 blade catalogs: initial level, all eleven STR/MAG levels, abilities/forms/shotlocks and 220 source transitions. 160 ordinary Steam forge actions plus ten distinct NG+ Ultima actions; other-platform keys are reference-only.

**Remaining boundary:** None for currently applicable blades. Future Long Night is outside the shipped 2026-10-01 denominator.

**Consulted:**

- https://www.khwiki.com/Weapons_(KHIII)
- https://www.khwiki.com/Kingdom_Key
- https://www.khwiki.com/Ultima_Weapon
- https://www.khwiki.com/Starlight
- https://www.khwiki.com/Oathkeeper
- https://www.khwiki.com/Oblivion
- https://www.khwiki.com/Dead_of_Night

### KH3-013 — partial

128 new non-Keyblade equipment records plus existing Forest Clasp with stats/acquisition; 25 encounter/party weapon references separated from collectable ownership.

**Remaining boundary:** Armor/Accessory/Weapons overview and linked item pages were extracted. Some acquisition cells list a shop without its precise story stock transition; random medal ability variants do not have a normalized exhaustive roll distribution. Thus 129 items is represented coverage, not certification of all alternative acquisitions.

**Consulted:**

- https://www.khwiki.com/Weapons_(KHIII)
- https://www.khwiki.com/Armor
- https://www.khwiki.com/Accessory
- https://www.khwiki.com/Junior_Medal
- https://www.khwiki.com/Master_Medal
- https://www.khwiki.com/Star_Medal
- https://www.khwiki.com/Forest_Clasp

### KH3-014 — partial

Steam Dead of Night is included; five other shipped platform-exclusive blades have full properties and reference-only eligibility. PS5/Xbox Series changes are explicitly future on audit date.

**Remaining boundary:** Regional historical preorder/storefront entitlement availability is not established for every country/account. The forthcoming native editions are not shipped evidence. Do not fold all exclusive keys into Steam collection.

**Consulted:**

- https://www.khwiki.com/Midnight_Blue
- https://www.khwiki.com/Phantom_Green
- https://www.khwiki.com/Dawn_Till_Dusk
- https://www.khwiki.com/Elemental_Encoder
- https://www.khwiki.com/Advent_Red
- https://www.khwiki.com/Dead_of_Night
- https://store.steampowered.com/app/2552450/KINGDOM_HEARTS_III__Re_Mind_DLC/
- https://www.square-enix.com/kingdomhearts/collection/en-us/

### KH3-015 — partial

Reprocessed 298 world ingredient rows, preserving alternate yields and quantities; 51 ordinary ingredients have object/area sources. Eight reward-only ingredients remain linked to Flan/Hunny minigames; all 59 identities retained.

**Remaining boundary:** Tables give object types and appearance odds, not unique object coordinates, every replenishment timer or all shop-stock transitions. During initial Little Chef gathering, alternate quantities in notes are retained rather than silently treated as normal yields.

**Consulted:**

- https://www.khwiki.com/Ingredients
- https://www.khwiki.com/Game:Twilight_Town
- https://www.khwiki.com/Game:The_Caribbean
- https://www.khwiki.com/Game:100_Acre_Wood
- https://www.khwiki.com/Flantastic_Seven

### KH3-016 — resolved

56 normal/+ dish effects, five course assignments, six cumulative full-course bonus pools/durations, four original cooking-control guides and ingredient consumption/Chef Extraordinaire behavior. Existing 28 recipes retained.

**Remaining boundary:** None for the meal-effect/control scope.

**Consulted:**

- https://www.khwiki.com/Cuisine
- https://www.khwiki.com/Le_Grand_Bistrot

### KH3-017 — resolved

Four cooking methods identified and documented: chopping, egg cracking, flambé and pepper grinding. Five is the number of meal courses, not cooking controls.

**Remaining boundary:** Stale terminology gap; no fifth cooking minigame invented.

**Consulted:**

- https://www.khwiki.com/Le_Grand_Bistrot
- https://www.khwiki.com/Cuisine
- https://www.khwiki.com/Synthesis

### KH3-018 — conflicted

All seven lower/upper reward tiers, routes, post-world access, first-time abilities and repeat fruit; safe aim-above wording remains.

**Remaining boundary:** KHWiki prints strict > thresholds while GameFAQs includes exact threshold equality, e.g. 20,000+. Neither is decisive boundary evidence; equality is still unresolved for all seven.

**Consulted:**

- https://www.khwiki.com/Flantastic_Seven
- https://gamefaqs.gamespot.com/ps4/718920-kingdom-hearts-iii/faqs/76812/side-quests-and-mini-games

### KH3-019 — resolved

23 original controls/play descriptions, any registered result rather than an invented high-score target, golf lower-is-better distinction, completion-stamp check. Acquisition stays joined to 18 chest IDs plus five Twilight records.

**Remaining boundary:** None for the scoped acquisition/record rules; no arbitrary numerical target imposed.

**Consulted:**

- https://www.khwiki.com/Classic_Kingdom
- https://www.xboxachievements.com/game/kingdom-hearts-3-x1/achievement/165280-classically-trained.html

### KH3-020 — partial

Full published five-course rank/reward tables, two harvest rank/quantity tables, independent Hunny 20k/40k/60k honey quantities and all eight score-record units.

**Remaining boundary:** The individual Pooh page is a 404/redlink; independent Honey guide resolves reward quantities but not all rank-label wording. Random medal ability distributions and all cross-minigame reward variants remain unnormalized after reviewing medal pages.

**Consulted:**

- https://www.khwiki.com/Festival_Dance
- https://www.khwiki.com/Frozen_Slider
- https://www.khwiki.com/Verum_Rex:_Beat_of_Lead
- https://www.khwiki.com/Flash_Tracer
- https://www.khwiki.com/Tigger's_Vegetable_Spree
- https://www.khwiki.com/Lumpy's_Fruit_Parade
- https://www.khwiki.com/Pooh's_Hunny_Harvest
- https://www.destinyislands.com/kh3/items/ingredients/honey/
- https://www.khwiki.com/Junior_Medal
- https://www.khwiki.com/Master_Medal
- https://www.khwiki.com/Star_Medal

### KH3-021 — resolved

81 base adversaries and complete 54 Game Records: 29 shotlocks, five attractions, five links, seven Flan results and eight other minigames. Corrected Munny Popcat typo; omitted source prose incorrectly conflating shotlocks with formchange gauge.

**Remaining boundary:** None for base journal scope; DLC bosses remain separately categorized.

**Consulted:**

- https://www.powerpyx.com/kingdom-hearts-3-adversaries-locations-list/
- https://www.powerpyx.com/kingdom-hearts-3-all-game-records-list/
- https://www.khwiki.com/Weapons_(KHIII)

### KH3-022 — partial

222/333 Sora copy +5 HP rewards, Olympus rescue rewards, nine Leviathan levels with cumulative white-crab requirements, Black Pearl access and 14 naval fleet reward rows.

**Remaining boundary:** World tables do not fully establish repeat quantities/replay opportunity for every rescue/copy event; naval reward tables are not a complete spawn/reset model. Those exact repeat conditions remain open.

**Consulted:**

- https://www.khwiki.com/Game:Olympus
- https://www.khwiki.com/Game:The_Final_World
- https://www.khwiki.com/Game:The_Caribbean
- https://www.khwiki.com/Leviathan_(ship)
- https://www.khwiki.com/Ghost_Ship
- https://www.khwiki.com/Treasure_Ship

### KH3-023 — resolved

All 15 gate approaches, level/difficulty/enemy counts, first-clear vs repeat drops, infinite adds for gates 2/8/11, selfie thresholds and original Dark Inferno defensive/punish guide.

**Remaining boundary:** None for scoped gate inventory/guidance; broader farm-efficiency research is KH3-011.

**Consulted:**

- https://www.khwiki.com/Battlegate
- https://www.khwiki.com/Dark_Inferno
- https://gamefaqs.gamespot.com/ps4/718920-kingdom-hearts-iii/faqs/76812/side-quests-and-mini-games

### KH3-024 — partial

33 battles, nine spheres/gear sequences, 374 parts and 52 blueprints, plus all 45 physical fragments with 90 inspected images. 44 fragments have written approaches; STR-13 has a verified visual landmark with its exact embarkation route retained as unknown. A wrong-zone STR-04 overview image is explicitly rejected.

**Remaining boundary:** STR-13 exact embarkation route remains unresolved because the independent text has a corrupted sphere glyph. Full sphere flight approaches remain incomplete. Rotated screenshots do not establish numerical world coordinates; no such values are invented. Physical fragment inventory and image review are now complete.

**Consulted:**

- https://www.khwiki.com/Starlight_Way
- https://www.khwiki.com/Misty_Stream
- https://www.khwiki.com/The_Eclipse
- https://www.khwiki.com/Gummi_blocks_(KHIII)
- https://www.khwiki.com/Blueprint
- https://gamefaqs.gamespot.com/ps4/718920-kingdom-hearts-iii/faqs/76812/gummi-ship
- https://game8.jp/kh3/255829
- https://blog.rebosoku.com/archives/kh3gummi_piece1.html
- https://blog.rebosoku.com/archives/kh3gummi_piece2.html
- https://www.trueachievements.com/game/Kingdom-Hearts-3/walkthrough/21

### KH3-025 — resolved

All 46 Gummi mission identities with predicates/rewards. Nine constellation records reused, avoiding duplicate collection units. Completionist requires all other 45 missions.

**Remaining boundary:** None for the mission menu; broader physical Gummi catalog remains KH3-024.

**Consulted:**

- https://www.khwiki.com/Gummi_Missions
- https://www.neoseeker.com/kingdom-hearts-iii/gummiship/Gummi_Missions

### KH3-026 — resolved

Nine constellation flight landmarks and camera framing guidance, joined to mission completion/blueprint rewards. Omega supplemented because the first guide omits its text section.

**Remaining boundary:** None for the nine constellation scope.

**Consulted:**

- https://www.khwiki.com/Gummi_Missions
- https://www.gamesradar.com/kingdom-hearts-3-constellations-guide/
- https://www.gosunoob.com/kingdom-hearts-3/constellation-locations-stargazer-trophy/
- https://www.powerpyx.com/kingdom-hearts-3-constellation-photograph-locations/

### KH3-027 — partial

19 Gummi abilities, 374 part properties, all 13 special weapons with damage/recharge/effects/unlocks, Teeny block-sharing guidance and level 99 base cost 1,000. First-clear guidance and a separately identified community-supported A-rank Schwarzgeist replay route are integrated.

**Remaining boundary:** Full level-by-level cost/AP-cap progression is absent from consulted sources; level 99 is a supported endpoint. The A-rank replay route uses prior-clear Golden Highwind and is community-reported rather than a guaranteed optimal build. Special-weapon extraction and basic Teeny behavior are no longer missing.

**Consulted:**

- https://www.khwiki.com/Gummi_Abilities
- https://www.khwiki.com/Gummi_blocks_(KHIII)
- https://www.khwiki.com/Special_Weapon
- https://www.khwiki.com/Schwarzgeist
- https://www.khwiki.com/Omega_Machina
- https://www.gamesradar.com/kingdom-hearts-3-schwarzgeist-guide/
- https://www.trueachievements.com/game/Kingdom-Hearts-3/walkthrough/20
- https://www.trueachievements.com/game/Kingdom-Hearts-3/walkthrough/21
- https://gamefaqs.gamespot.com/boards/718920-kingdom-hearts-iii/77443018
- https://gamefaqs.gamespot.com/boards/718920-kingdom-hearts-iii/77500087
- https://gamefaqs.gamespot.com/ps4/718920-kingdom-hearts-iii/faqs/76812/gummi-ship
- https://gamefaqs.gamespot.com/ps4/718920-kingdom-hearts-iii/faqs/77432/ship-building-tips
- https://gamefaqs.gamespot.com/ps4/718920-kingdom-hearts-iii/faqs/77432/teeny-ships

### KH3-028 — resolved

14 encounter-specific original defensive/opening guides, 11→13 unlock order and rewards, temporary character equipment references; Data Greeting/Slideshow access and Secret-clear Quadratum unlock kept non-collectible.

**Remaining boundary:** None for scoped encounter/access guidance. Platform save-control edge cases remain KH3-004.

**Consulted:**

- https://www.khwiki.com/Kingdom_Hearts_III_Re_Mind
- https://www.khwiki.com/Data_Greeting
- https://www.khwiki.com/Real_Organization_XIII%27s_Recreated_Data
- https://www.khwiki.com/Game:Ansem
- https://www.khwiki.com/Game:Xemnas
- https://www.khwiki.com/Game:Xigbar
- https://www.khwiki.com/Game:Luxord
- https://www.khwiki.com/Game:Larxene
- https://www.khwiki.com/Game:Marluxia
- https://www.khwiki.com/Game:Saïx
- https://www.khwiki.com/Game:Terra-Xehanort
- https://www.khwiki.com/Game:Dark_Riku
- https://www.khwiki.com/Game:Vanitas
- https://www.khwiki.com/Game:Young_Xehanort
- https://www.khwiki.com/Game:Xion
- https://www.khwiki.com/Game:Master_Xehanort
- https://www.khwiki.com/Game:Yozora

### KH3-029 — partial

All 28 code effects, all 9 merit predicates and explicit unlock stages, Gummi Meister permanence and 34 PRO boss scores are integrated. EZ menu access need only be unlocked; no active EZ code is required except Survival, which requires Survival on and other EZ battle codes off.

**Remaining boundary:** Consulted Premium Menu and guide describe restrictions but do not establish a modern Steam per-achievement code eligibility matrix or persistence for every previously activated code. Community Steam replies contradict each other and even mention a nonexistent Critical achievement; those claims were rejected.

**Consulted:**

- https://www.khwiki.com/Premium_Menu
- https://gamefaqs.gamespot.com/ps4/718920-kingdom-hearts-iii/faqs/76812/premium-menus
- https://www.playstationtrophies.org/forum/topic/314514-kingdom-hearts-iii-re-mind-~-trophy-guide-amp-roadmap/
- https://steamcommunity.com/app/2552450/discussions/0/4844274928139708304/

### KH3-030 — conflicted

All 34 boss base/max scores and 13 rank references, maximum 530,000, A 364,125 corroborated by Steam guide; uncertainty explicit for B.

**Remaining boundary:** KHWiki annotates B at 320,000 with uncertainty, TrueAchievements indexed walkthrough says 325,000. Direct walkthrough 403. Best-score replay replacement/eligibility is not fully established; no calculator assumes disputed rank or unsupported overwrite logic. Rounding is not a gap for listed integer-star/base-score combinations.

**Consulted:**

- https://www.khwiki.com/Premium_Menu
- https://steamcommunity.com/sharedfiles/filedetails/?id=3274428775
- https://www.trueachievements.com/game/Kingdom-Hearts-3/walkthrough/26

### KH3-031 — resolved

All seven hidden Steam achievement predicates populated from independently readable Steam community guide, with explicit description provenance.

**Remaining boundary:** Official public global page hides them; community provenance is visible, not represented as official API extraction.

**Consulted:**

- https://steamcommunity.com/sharedfiles/filedetails/?id=3273467210
- https://steamcommunity.com/stats/2552450/achievements

### KH3-032 — partial

Steam/Xbox 51 versus PlayStation 52 including platinum distinction; modern Steam bundle and future 2026-10-08 release/cloud sunset facts are dated.

**Remaining boundary:** Epic achievement endpoint returned 403, not proof of no achievements. Full per-platform predicate equivalence, every current shipped build ID and exact cloud transfer steps are not established. Official cloud notice promises transfer but does not supply final procedure; forthcoming builds remain unshipped.

**Consulted:**

- https://store.steampowered.com/app/2552450/KINGDOM_HEARTS_III__Re_Mind_DLC/
- https://www.trueachievements.com/game/Kingdom-Hearts-3/achievements
- https://psnprofiles.com/trophies/8675-kingdom-hearts-iii
- https://store.epicgames.com/en-US/achievements/kingdom-hearts-iii
- https://steamdb.info/app/2552450/patchnotes/
- https://www.square-enix.com/kingdomhearts/collection/en-us/
- https://support.jp.square-enix.com/news.php?drt=1781017200&id=19066&la=0&n=2&tag=ab4073e28135a1345b861beefd8b6a2c459e1ed4

### KH3-033 — resolved

Crafted-history checkmarks were added in patch 1.04; separate synthesized history is now represented for all 88 recipes. Removed old absence claim from active status.

**Remaining boundary:** Historical absence claim is stale; no user playthrough gate is required.

**Consulted:**

- https://openkh.dev/kh3/updates.html
- https://www.khinsider.com/news/KH3-Critical-Mode-adds-various-QOL-updates-including-save-carry-over-more-photo-slots-15162

### KH3-034 — resolved

NG+ keys, proofs, selfie poses and six post-clear abilities, level-zero carryover, ordinary newly synthesized Ultima level10 versus NG+ Ultima level0 and its separate ten-step ladder.

**Remaining boundary:** No invented universal NG+ inventory carryover; episode save lineage is separately KH3-004.

**Consulted:**

- https://www.khwiki.com/Game_Clear_Data
- https://www.khwiki.com/Weapons_(KHIII)
- https://www.khwiki.com/Ultima_Weapon
- https://www.khwiki.com/Kingdom_Hearts_III

### KH3-035 — resolved

Integrated 18 Lucky Emblem rewards, four difficulty-specific secret-movie rules, five Bistrot star rewards, three gate selfie milestones, complete Gummi mission goals and six free-update abilities.

**Remaining boundary:** Research-integration gap closed for the enumerated scope; other catalog families retain their own dispositions.

**Consulted:**

- https://www.khwiki.com/Lucky_Emblem
- https://www.khwiki.com/Le_Grand_Bistrot
- https://www.khwiki.com/Battlegate
- https://www.khwiki.com/Gummi_Missions
- https://www.khwiki.com/Kingdom_Hearts_III

## Extraction and validation notes

- KHIII sections selected explicitly on shared world/material/ability pages; older-game tables excluded. Starlight forge rows require KHIII item images to avoid Union χ materials.
- Greek sphere names receive explicit numerical IDs; alternate ingredient yields are split while retaining full source cell and appearance context.
- Source misspellings (Hungry Shield, Acrisis, Lighting, Manny Pop) were cross-checked and corrected; future platform announcements are not current entitlements.
- 88 synthesis outputs cross-checked against the independent catalog and individual product recipe tables. No derived first-crafted completion from ownership.
- Targeted `tests/kh3-content.test.ts` verifies stable IDs, category visibility, ingredient resolution, catalog denominators and the ordinary/NG+ Ultima distinction. Targeted run on 2026-10-01: **4 tests passed**. All 656 baseline IDs remain; no duplicate entry/recipe IDs or unresolved recipe ingredients. Root runs shared validation.

## Historical material

[research_audit.md](research_audit.md) retains the full baseline occurrence appendices and original question scopes. Those excerpts, line numbers and baseline counts describe the original revision, not the current data. The September research pages preserve evidence history below explicit historical markers; current status always comes from this ledger.
