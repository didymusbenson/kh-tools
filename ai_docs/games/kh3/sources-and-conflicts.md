# KH3 inspected sources, coverage and conflicts

Research date: 2026-09-18. [Index](README.md). “Inspected” means returned content was read or programmatically bounded and checked as described. It does not mean an in-game test, an official endorsement, or permission to copy guide prose/images. No production screenshots were acquired.

## Repository and KHTABLES baseline

Repository: `didymusbenson/kh-tools`, branch `mobile-friendly`. The initial recursive tree read was complete (`truncated: false`) at tree commit `1d23c5d3da810285c5fecc11c1926118348025f8`. No `AGENTS.md`, KH3 game implementation or KH3 dataset path appeared. Existing KH3 sources were the scope document and readiness stub, both read in full, alongside `ai_docs/sources/khtables-drive-audit.md`. The tree contains older KHFM CSVs and BBS seed data; their presence is not KH3 coverage.

The supplied KHTABLES inventory contains ten files: four sheets (KHFM, KH2FM, BBS, KH3D/DDD) and six documents already classified as KH2 work by the shared audit. There is **no dedicated KH3 file**. To check ambiguous titles, the following documents were fetched directly through Drive and their full returned text scanned for KH3-specific terms (KH3 excluding KH3D, Kingdom Hearts III, Lucky Emblem, Flantastic, Arendelle, San Fransokyo, Toy Box, Re Mind, Gummiphone):

| Drive document | Returned coverage | Result |
|---|---:|---|
| [Untitled document](https://docs.google.com/document/d/1YuSnSRKxt3GJ-Vs-cq72JjapDApMc2wd_VoE_nRVG2I/edit) | 240,256 characters; 1,905 lines | No KH3 markers; KH2FM Mushroom XIII/puzzles/equipment data |
| [kh create tables](https://docs.google.com/document/d/1l6nJG8HNlWQR6aMObO5O6Ygc0DnbrEzK5ZWGVZ5SRk8/edit) | 12,200 characters; 313 lines | No KH3 markers; KH2-style puzzle/limit/weapon schema and TODOs |
| [KHDB SETUP SQL SCRIPT](https://docs.google.com/document/d/1u9TXxWL-3heKoh7Uf50BqL0BsUEtaLuHsKfZbmRSUdw/edit) | 214,477 characters; 1,703 lines | No KH3 markers; KH2FM material/enemy/puzzle/weapon data |

Total scanned ambiguous-document coverage: 466,933 characters. These are legacy-source observations, not KH3 gameplay evidence. No useful KH3 records were identified. This agent did **not** re-read every cell in the other games’ four spreadsheets or all three explicitly KH2-named documents; absence of a dedicated/reusable KH3 source is the supported conclusion, not a proof that no incidental KH3 phrase can exist anywhere in Drive. KH3D names Dream Drop Distance and must not be misclassified as KH3.

## Primary public sources

| Source | Inspected scope | What it supports |
|---|---|---|
| [Square Enix Re Mind](https://www.jp.square-enix.com/kingdom/kh3/dlc/index.html) | Product metadata, platform/date fields, DLC feature descriptions/image alt text, purchase prerequisites | PS4/Xbox DLC dates, paid expansion, 13 Limitcut bosses, creative/Premium features |
| [Steam KH3 product](https://store.steampowered.com/app/2552450/KINGDOM_HEARTS_III__Re_Mind_DLC/) | Release date, About, feature count | Steam 2024-06-13 release, bundled Re Mind, Dead of Night, 51 achievements |
| [Steam achievement list](https://steamcommunity.com/stats/2552450/achievements/) | Full public list returned; visible descriptions inspected | Published visible predicates; hidden descriptions remain blank |
| [Square Enix Collection](https://www.jp.square-enix.com/kingdom/collection/) | 2026 product/date/platform sections and KH3 bonuses | **Announced**, not shipped, 2026-10-08 native releases; Long Night/Midnight Blue/Phantom Green bonuses |
| [Square Enix cloud notice](https://support.jp.square-enix.com/news.php?drt=1781017200&id=19066&la=0&n=2&tag=ab4073e28135a1345b861beefd8b6a2c459e1ed4) | Full notice, dated 2026-06-10 JST | Sales end, service end, affected packages and stated save-transfer support |

The upcoming-build announcements do not establish unchanged chest numbering, achievement sets, performance, or save behavior. Regional product details still need target-store confirmation.

## Community world-table coverage

All table rows in the following numbered chest/emblem sections were extracted and inspected for number, contents and area. Consecutive numbering and count sums were checked. Notes were sampled for important acquisition conditions; they were not treated as complete text routes. Other-game sections on shared world pages were excluded.

| KHWiki page | Numbered rows inspected | Additional coverage |
|---|---|---|
| [Olympus](https://www.khwiki.com/Game:Olympus) | Chests 1–32; emblems 1–12 | Rewards inspected; ingredient/source layout sampled |
| [Twilight Town](https://www.khwiki.com/Game:Twilight_Town) | Chests 1–10; emblems 1–9 | KH3 rewards inspected; shop/ingredient structure sampled |
| [Toy Box](https://www.khwiki.com/Game:Toy_Box) | Chests 1–29; emblems 1–11 | Rewards inspected; Gigas/emblem exception |
| [Corona](https://www.khwiki.com/Game:Kingdom_of_Corona) | Chests 1–28; emblems 1–9 | Rapunzel reward condition inspected; ingredients sampled |
| [Monstropolis](https://www.khwiki.com/Game:Monstropolis) | Chests 1–22; emblems 1–11 | Revisit exceptions/rewards inspected; ingredients sampled |
| [Arendelle](https://www.khwiki.com/Game:Arendelle) | Chests 1–25; emblems 1–11 | Rewards/ingredient table structure inspected |
| [Caribbean](https://www.khwiki.com/Game:The_Caribbean) | Chests 1–56; emblems 1–13 | Rewards inspected; 106 ingredient-source rows not individually validated |
| [San Fransokyo](https://www.khwiki.com/Game:San_Fransokyo) | Chests 1–36; emblems 1–11 | Night access; reward table inspected |
| [100 Acre Wood](https://www.khwiki.com/Game:100_Acre_Wood) | Emblems 1–3; no KH3 chest table | KH3 rewards/three ingredient activity rows inspected structurally |
| [Keyblade Graveyard](https://www.khwiki.com/Game:Keyblade_Graveyard) | KH3 chests 1–6 | Rewards and Re Mind bonus levels inspected |
| [The Final World](https://www.khwiki.com/Game:The_Final_World) | KH3 chest 1 | Re Mind Yozora reward inspected |
| [Scala ad Caelum](https://www.khwiki.com/Game:Scala_ad_Caelum) | Re Mind chests 1–9 | Notes all empty; detailed routes absent |

## Community category-source coverage

| Source | Inspected content / limit |
|---|---|
| [Lucky Emblem](https://www.khwiki.com/Lucky_Emblem) | All world counts/numbered table sections and reward thresholds; used to compare selected world rows |
| [Classic Kingdom](https://www.khwiki.com/Classic_Kingdom) | All 23 KH3 acquisition identities; Union χ section explicitly excluded from KH3 requirements |
| [Photo Missions](https://www.khwiki.com/Photo_Missions) | All 20 subject/reward/unlock rows and footnotes |
| [Synthesis](https://www.khwiki.com/Synthesis) | KH3 24 material-type unlock rows, 20 photo rows, forge-start levels and shared-stock description; not all item recipes |
| [Kingdom Key](https://www.khwiki.com/Kingdom_Key) | KH3 stats and all ten upgrade transitions, summed independently |
| [Ultima Weapon](https://www.khwiki.com/Ultima_Weapon) | KH3 recipe/unlock, forge values; other games excluded |
| [Orichalcum](https://www.khwiki.com/Orichalcum) | KH3 drops/chests/rewards/postcard route; all seven Orichalcum+ events accounted for |
| [Wellspring](https://www.khwiki.com/Wellspring) | KH3 drop rows; sample farm relationships, no exhaustive efficiency comparison |
| [Illusory](https://www.khwiki.com/Illusory), [Evanescent](https://www.khwiki.com/Evanescent), [Fluorite](https://www.khwiki.com/Fluorite) | Acquisition/rate/reward rules; base versus first-clear distinction |
| [Ingredients](https://www.khwiki.com/Ingredients) | All 59 ingredient names; source/recipe columns inspected as a table, not every source route verified |
| [Le Grand Bistrot](https://www.khwiki.com/Le_Grand_Bistrot) | Four cooking minigames, star thresholds, 28 dishes/ingredient lists; complete recipe-edge transcription still open |
| [Cuisine](https://www.khwiki.com/Cuisine) | Dish/plus variants and stat-table structure; full bonus/duration model not certified |
| [Flantastic Seven](https://www.khwiki.com/Flantastic_Seven) | All seven locations, upper reward scores, ingredients and abilities |
| [Frozen Slider](https://www.khwiki.com/Frozen_Slider), [Festival Dance](https://www.khwiki.com/Festival_Dance), [Flash Tracer](https://www.khwiki.com/Flash_Tracer), [Verum Rex](https://www.khwiki.com/Verum_Rex:_Beat_of_Lead) | Access, rank thresholds, reward sections; strategy completeness not certified |
| [Battlegate](https://www.khwiki.com/Battlegate) | All 15 gate identities, report/equipment rewards and selfie thresholds |
| [Golden Herc Figure](https://www.khwiki.com/Golden_Herc_Figure), [Forest Clasp](https://www.khwiki.com/Forest_Clasp) | Full acquisition/location conditions |
| [Starlight Way](https://www.khwiki.com/Starlight_Way), [Misty Stream](https://www.khwiki.com/Misty_Stream), [The Eclipse](https://www.khwiki.com/The_Eclipse) | Map battle/constellation tables; resource rates; treasure/sphere/reward sections located, not completely normalized |
| [Gummi Missions](https://www.khwiki.com/Gummi_Missions) | Full returned KH3 table scanned for global goals/constellations; final completion predicate opaque |
| [Schwarzgeist](https://www.khwiki.com/Schwarzgeist), [Omega Machina](https://www.khwiki.com/Omega_Machina) | Access conditions; no combat testing |
| [Re Mind](https://www.khwiki.com/Kingdom_Hearts_III_Re_Mind), [Recreated Data](https://www.khwiki.com/Real_Organization_XIII%27s_Recreated_Data) | Episode/features and all thirteen boss rewards/locks; narrative content not imported |
| [Premium Menu](https://www.khwiki.com/Premium_Menu) | Unlocks, code/merit sections, boss points and rank table; uncertainty preserved |
| [Proof](https://www.khwiki.com/Proof), [KH3 patch history](https://www.khwiki.com/Kingdom_Hearts_III#Patch_update_data) | Proof/Keyblade conditions, selected free updates; latest installed builds not audited |
| [Long Night](https://www.khwiki.com/Long_Night), [Integrum Masterpiece](https://www.khwiki.com/Kingdom_Hearts_Integrum_Masterpiece) | Leads only; future edition and cloud claims followed to primary Square Enix sources |

No generic KHWiki link is an assertion of primary evidence. Published rates/thresholds are community facts awaiting game verification where consequential.

## Conflicts and normalization decisions

| ID | Evidence | Required treatment |
|---|---|---|
| KH3-C01 | Synthesis says no crafted-item markers; KH3 v1.04 history says checkmarks added | Treat old statement as stale; confirm modern UI and cite version |
| KH3-C02 | Toy Box emblem 8 listed as 2F on Lucky Emblem page, 3F on world table | Verify standing point versus target location; retain UFO landmark, do not silently select one floor |
| KH3-C03 | Forest Clasp item page says before first Shore; world page says before Rapunzel leaves party | Use conservative pre-Shore notice; exact missability trigger requires testing |
| KH3-C04 | Premium Menu rank-B value marked uncertain | Do not publish a certified full rank calculator; A rank and rounding/repeat-score behavior need verification |
| KH3-C05 | Flan tables use `>`; many user expectations use “at least” | Exact-equality fixture required for all seven upper thresholds |
| KH3-C06 | Synthesis mentions five cooking minigames; Le Grand Bistrot describes four | Do not propagate five; use four provisionally and verify in-game controls |
| KH3-C07 | Trial/Trail, Horseshoe Isle/Island, Petit/Petite, Bandana/Bandanna differ | Preserve aliases and source spelling; canonical English UI pass required |
| KH3-C08 | Ultima upgrade tables include low-level rows although first synthesis starts at 10 | Tag acquisition mode/New Game+ before computing material cost |

## Retrieval failures and exclusions

Broad web searches returned largely irrelevant results and were not used as game evidence. PowerPyx collectible, synthesis-material and Re Mind guide URLs failed via web open. An official NA press link returned 401 and the old NA DLC route returned unrelated site text; the Japanese official DLC page was usable. `Gummi_Missions_(KHIII)`, `Gummi_constellation`, `New_Game_Plus` and the guessed collection title failed; use the successfully inspected main/zone pages instead. `Keyblade_Forge` redirects to Synthesis and `Little_Chef` to Remy; neither redirect supplies an independent source. Do not count redirect aliases as corroboration.
