# KH2FM inspected-source manifest and legacy audit

Snapshot: 2026-09-18. This records what was actually fetched and examined. Public sources are community/secondary unless explicitly marked official. No in-game verification, licensed screenshot collection, or application implementation was performed.

## Repository

Read `ai_docs/games/kingdom-hearts-ii-final-mix.md`, `ai_docs/readiness/kingdom-hearts-ii-final-mix.md`, `ai_docs/readiness/README.md`, `ai_docs/sources/khtables-drive-audit.md`, the accepted linked-collectible contract, `games/kh2fm.html`, and relevant headings/content in `bosstables.html` on `mobile-friendly`. A complete recursive tree read found no AGENTS.md and no KH2-specific repository dataset; `games/kh2fm.html` contains placeholder menu links. Root AGENTS.md also returned 404. GitHub search for KH2 returned no content results, so branch-explicit reads and the tree were used.

## Native workbook

[Kh2FM tables](https://docs.google.com/spreadsheets/d/1-HNv1dK8_lQ7ibC1q4jwWOdiKXNCYbLh2SBrI0K4ZGo/edit), native spreadsheet metadata inspected before values. Each listed bounded range was returned completely (not a first-250-row sample); content columns are explicitly narrower than grids where adjacent columns contain generated SQL. Empty trailing rows are omitted by Sheets responses. Headers were read separately as A1:H8, except the tab-name recovery below.

| Exact tab | sheetId | Grid rows × cols | Complete requested content range | Returned coverage / meaning |
|---|---:|---:|---|---|
| `Accessories ` | 1651577509 | 998 × 25 | `A1:Y998` | 35 rows: 2 headings + 33 accessories |
| `Colosseum tournaments` | 949344144 | 1026 × 26 | `A1:Z1026` | No values |
| `Puzzle Pieces` | 723125155 | 970 × 31 | `A1:F970` | 145 rows: header + 144 pieces |
| `enemies` | 1866381744 | 1001 × 25 | `A1:Y1001` | 82 descriptive cells; no area/drop table |
| `Abilities` | 1501269065 | 1000 × 26 | `A1:Z1000` | No values |
| `Mushroom XIII` | 1435320466 | 1000 × 26 | `A1:Z1000` | No values |
| `Nobodies` | 84499435 | 1000 × 26 | `A1:Z1000` | No values; Nobody prose exists inside enemies |
| `Magic unlocks` | 711814028 | 1000 × 26 | `A1:C1000` | 19 rows: header + 18 grant candidates |
| `achievements` | 1808064822 | 1000 × 25 | `A1:B1000` | 52 rows: header + 51 trophy candidates |
| `Armor` | 381544563 | 997 × 25 | `A1:C997` | 35 rows: header + 34 armor candidates |
| `Missions and Minigames` | 1787941072 | 1000 × 26 | `A1:D1000` | 89 rows including world headings, continuation rows and records |
| `Treasures` | 0 | 987 × 28 | `A1:E987` | 302 rows: header + 301 treasures |
| `Keyblades` | 1454667282 | 857 × 24 | `A1:G857` | 25 rows: header + 24 weapons |
| `Shields` | 675714158 | 925 × 25 | `A1:F925` | 13 rows: header + 12 weapons |
| `Staves` | 136513289 | 924 × 25 | `A1:F924` | 13 rows: header + 12 weapons |
| `Synthesis items` | 1775656014 | 1007 × 26 | `A1:H1007` | 77 rows incl. blank separators/helper columns; 60 material candidates |
| `Synthesis recipes*` | 1749272648 | 1027 × 28 | `A1:G1027` | 56 rows; 25 populated base ingredient rows, then incomplete/SQL placeholders |
| `SAMPLE QUERIES` | 1776778304 | 1001 × 28 | `A1:AB1001` | 9 rows; a workflow example, with unknown enemy locations |
| `Absent silhouettes` | 1808788994 | 1000 × 26 | `A1:Z1000` | No values |
| `Orichalcum plus` | 516887532 | 997 × 26 | `A1:C997` | 8 rows: header + 7 acquisition sources |

The first `Accessories ` read failed because the connector trimmed the trailing space. Metadata was reread, then the exact quoted tab name `'Accessories '` succeeded. **Accessories is not empty.** There are five actually empty tabs, not six.

Treasure and puzzle core columns were fully extracted and all IDs/counts checked. The public world tables were compared by world/number/content; locator prose was not wholesale migrated. SQL helper columns beyond the listed content ranges were not fully reviewed. Equipment descriptions mix editions, and record strategies include unresolved “See here” placeholders. These are candidate sources, not completed modern guidance.

## Six native SQL documents

Full readable text was fetched for each. Complete text was scanned for schema names, inserts, relationships, links and TODOs; representative records and every surfaced TODO/relationship were reviewed. The large dumps were not executed and were not manually certified statement-by-statement. Character counts below measure decoded connector text, including line endings.

| Document | Characters / lines | Extracted value and limits |
|---|---|---|
| [Untitled document](https://docs.google.com/document/d/1YuSnSRKxt3GJ-Vs-cq72JjapDApMc2wd_VoE_nRVG2I/edit) | 240256 / 1905 | 53 recipe inserts; 245 ingredient procedure calls; 301 chests; 144 pieces; 7 ability placeholders |
| [KH2 USEFUL JOINS](https://docs.google.com/document/d/1pnvzTgYvCS7rVTuuwAJvAM0Y6glByv0W6t_pmcf5FpM/edit) | 3849 / 82 | Recipe → quantity → drop source → enemy → world; optional special source left join |
| [KH2 SETUP](https://docs.google.com/document/d/1OAxV2n3R-tg8GhPCHTZ1WDm6nvkoqVHaxcUpDWFwttU/edit) | 249938 / 2131 | 21 CREATE TABLE statements; 301 chests; 144 pieces; 18 magic grants; 7 Orichalcum+ rules |
| [KH2 Procedures](https://docs.google.com/document/d/1SxiyqGgtuBZnvYEAdTT1eijf1Bl-dPzXQnxmjfaWbYY/edit) | 3896 / 116 | Insert wrappers only; SR_INSERT targets ITEMLOOKUP rather than recipe table, so not trustworthy implementation |
| [kh create tables](https://docs.google.com/document/d/1l6nJG8HNlWQR6aMObO5O6Ygc0DnbrEzK5ZWGVZ5SRk8/edit) | 12200 / 313 | Schema evolution adds characters, limits, missions and abilities; some declarations are commented-out proposals |
| [KHDB SETUP SQL SCRIPT](https://docs.google.com/document/d/1u9TXxWL-3heKoh7Uf50BqL0BsUEtaLuHsKfZbmRSUdw/edit) | 214477 / 1703 | Older 26-recipe snapshot; same 301 chests/144 pieces; missing acquisition modules |

Shared dump counts include 60 material inserts, 134 drop rows, 138 enemy-world rows, 167 area rows, 82 enemy descriptions and 48 weapons. These are statement counts, not proof of unique correct records. TODOs explicitly request enemy **areas**, remaining recipes, weapon values/abilities and unfinished systems. Several weapon stats are zero placeholders; only seven abilities are inserted. Chests are joined by area name alone, which risks collisions between identically named rooms in different worlds. Proposed IDs must include game/world/character context.

A linked GameFAQs guide points at original KHII, not Final Mix: `https://gamefaqs.gamespot.com/ps2/915410-kingdom-hearts-ii/faqs/42870`. That legacy link was recorded, not used as modern verification. Preserve useful relationships while discarding SQL Server procedures and generated statements.

## Public evidence actually retrieved

Every page below was fetched successfully and its title checked; relevant section/table extraction was reviewed to the extent stated in the coverage column. Topic rows identify how deeply it contributed. A multi-game page was scoped to KHII or KHII Final Mix before facts were used. Large general pages were selectively inspected, not certified in full. The source summaries and extracted factual tables in this pack are original research notes, not permission to republish source prose.

| Retrieved page | Coverage |
|---|---|
| [AP_Boost](https://www.khwiki.com/AP_Boost) | KHII/Final Mix item recipe, acquisition or material-source section as applicable |
| [Abilities_(KHII)](https://www.khwiki.com/Abilities_(KHII)) | Action/Growth/support row counts; Growth and version/character scope examples |
| [Absent_Silhouette](https://www.khwiki.com/Absent_Silhouette) | Locations, unlock/reward rules, Journal targets and source caveats |
| [Accessory](https://www.khwiki.com/Accessory) | Inventory structure/name lists; not all item-specific acquisitions |
| [Acrisius](https://www.khwiki.com/Acrisius) | KHII/Final Mix item recipe, acquisition or material-source section as applicable |
| [Ansem_Report](https://www.khwiki.com/Ansem_Report) | Thirteen KHII acquisition sentences and version footnotes; no lore transcription |
| [Armor](https://www.khwiki.com/Armor) | Inventory structure/name lists; not all item-specific acquisitions |
| [Blazing](https://www.khwiki.com/Blazing) | KHII/Final Mix item recipe, acquisition or material-source section as applicable |
| [Blizzaga_Armlet](https://www.khwiki.com/Blizzaga_Armlet) | KHII/Final Mix item recipe, acquisition or material-source section as applicable |
| [Blizzard](https://www.khwiki.com/Blizzard) | KHII grant-source lists; edition differences |
| [Blueprint](https://www.khwiki.com/Blueprint) | KHII sample/special tables; forty main models counted, twelve special sources extracted |
| [Bond_of_Flame](https://www.khwiki.com/Bond_of_Flame) | KHII/Final Mix item recipe, acquisition or material-source section as applicable |
| [Bright](https://www.khwiki.com/Bright) | KHII/Final Mix item recipe, acquisition or material-source section as applicable |
| [Bulky_Vendor](https://www.khwiki.com/Bulky_Vendor) | KHII/Final Mix item recipe, acquisition or material-source section as applicable |
| [Cavern_of_Remembrance](https://www.khwiki.com/Cavern_of_Remembrance) | Selective structural/access reference; full guide not extracted |
| [Centurion](https://www.khwiki.com/Centurion) | KHII/Final Mix item recipe, acquisition or material-source section as applicable |
| [Cerberus_Cup](https://www.khwiki.com/Cerberus_Cup) | Locations, unlock/reward rules, Journal targets and source caveats |
| [Cerberus_Paradox_Cup](https://www.khwiki.com/Cerberus_Paradox_Cup) | Locations, unlock/reward rules, Journal targets and source caveats |
| [Chest](https://www.khwiki.com/Chest) | Selective structural/access reference; full guide not extracted |
| [Circle_of_Life](https://www.khwiki.com/Circle_of_Life) | KHII/Final Mix item recipe, acquisition or material-source section as applicable |
| [Cure](https://www.khwiki.com/Cure) | KHII grant-source lists; edition differences |
| [Dark](https://www.khwiki.com/Dark) | Disambiguation only; rejected as material evidence |
| [Decisive_Pumpkin](https://www.khwiki.com/Decisive_Pumpkin) | KHII/Final Mix item recipe, acquisition or material-source section as applicable |
| [Defense_Boost](https://www.khwiki.com/Defense_Boost) | KHII/Final Mix item recipe, acquisition or material-source section as applicable |
| [Dense](https://www.khwiki.com/Dense) | KHII/Final Mix item recipe, acquisition or material-source section as applicable |
| [Draw_Ring](https://www.khwiki.com/Draw_Ring) | KHII/Final Mix item recipe, acquisition or material-source section as applicable |
| [Drive_Form](https://www.khwiki.com/Drive_Form) | Acquisition, EXP unit and Growth progression |
| [Drive_Recovery](https://www.khwiki.com/Drive_Recovery) | KHII/Final Mix item recipe, acquisition or material-source section as applicable |
| [Elixir](https://www.khwiki.com/Elixir) | KHII/Final Mix item recipe, acquisition or material-source section as applicable |
| [Energy](https://www.khwiki.com/Energy) | KHII/Final Mix item recipe, acquisition or material-source section as applicable |
| [Expert's_Ring](https://www.khwiki.com/Expert%27s_Ring) | KHII/Final Mix item recipe, acquisition or material-source section as applicable |
| [Fatal_Crest](https://www.khwiki.com/Fatal_Crest) | KHII/Final Mix item recipe, acquisition or material-source section as applicable |
| [Fenrir](https://www.khwiki.com/Fenrir) | KHII/Final Mix item recipe, acquisition or material-source section as applicable |
| [Final_Form](https://www.khwiki.com/Final_Form) | Acquisition, EXP unit and Growth progression |
| [Firaga_Bangle](https://www.khwiki.com/Firaga_Bangle) | KHII/Final Mix item recipe, acquisition or material-source section as applicable |
| [Firagun_Bangle](https://www.khwiki.com/Firagun_Bangle) | KHII/Final Mix item recipe, acquisition or material-source section as applicable |
| [Fire](https://www.khwiki.com/Fire) | KHII grant-source lists; edition differences |
| [Follow_the_Wind](https://www.khwiki.com/Follow_the_Wind) | KHII/Final Mix item recipe, acquisition or material-source section as applicable |
| [Frost](https://www.khwiki.com/Frost) | KHII/Final Mix item recipe, acquisition or material-source section as applicable |
| [Frozen_Pride](https://www.khwiki.com/Frozen_Pride) | KHII/Final Mix item recipe, acquisition or material-source section as applicable |
| [Full_Bloom](https://www.khwiki.com/Full_Bloom) | KHII/Final Mix item recipe, acquisition or material-source section as applicable |
| [Game:100_Acre_Wood](https://www.khwiki.com/Game:100_Acre_Wood) | KHII treasure/puzzle counts and contents; selected acquisition/reward rows |
| [Game:Agrabah](https://www.khwiki.com/Game:Agrabah) | KHII treasure/puzzle counts and contents; selected acquisition/reward rows |
| [Game:Atlantica](https://www.khwiki.com/Game:Atlantica) | KHII treasure/puzzle counts and contents; selected acquisition/reward rows |
| [Game:Beast's_Castle](https://www.khwiki.com/Game:Beast%27s_Castle) | KHII treasure/puzzle counts and contents; selected acquisition/reward rows |
| [Game:Disney_Castle](https://www.khwiki.com/Game:Disney_Castle) | KHII treasure/puzzle counts and contents; selected acquisition/reward rows |
| [Game:Halloween_Town](https://www.khwiki.com/Game:Halloween_Town) | KHII treasure/puzzle counts and contents; selected acquisition/reward rows |
| [Game:Olympus_Coliseum](https://www.khwiki.com/Game:Olympus_Coliseum) | KHII treasure/puzzle counts and contents; selected acquisition/reward rows |
| [Game:Port_Royal](https://www.khwiki.com/Game:Port_Royal) | KHII treasure/puzzle counts and contents; selected acquisition/reward rows |
| [Game:Pride_Lands](https://www.khwiki.com/Game:Pride_Lands) | KHII treasure/puzzle counts and contents; selected acquisition/reward rows |
| [Game:Radiant_Garden](https://www.khwiki.com/Game:Radiant_Garden) | KHII treasure/puzzle counts and contents; selected acquisition/reward rows |
| [Game:Sephiroth](https://www.khwiki.com/Game:Sephiroth) | Selective structural/access reference; full guide not extracted |
| [Game:Space_Paranoids](https://www.khwiki.com/Game:Space_Paranoids) | KHII treasure/puzzle counts and contents; selected acquisition/reward rows |
| [Game:The_Land_of_Dragons](https://www.khwiki.com/Game:The_Land_of_Dragons) | KHII treasure/puzzle counts and contents; selected acquisition/reward rows |
| [Game:The_World_That_Never_Was](https://www.khwiki.com/Game:The_World_That_Never_Was) | KHII treasure/puzzle counts and contents; selected acquisition/reward rows |
| [Game:Timeless_River](https://www.khwiki.com/Game:Timeless_River) | KHII treasure/puzzle counts and contents; selected acquisition/reward rows |
| [Game:Twilight_Town](https://www.khwiki.com/Game:Twilight_Town) | KHII treasure/puzzle counts and contents; selected acquisition/reward rows |
| [Garnet_Ring](https://www.khwiki.com/Garnet_Ring) | KHII/Final Mix item recipe, acquisition or material-source section as applicable |
| [Genji_Shield](https://www.khwiki.com/Genji_Shield) | KHII/Final Mix item recipe, acquisition or material-source section as applicable |
| [Goddess_of_Fate_Cup](https://www.khwiki.com/Goddess_of_Fate_Cup) | Locations, unlock/reward rules, Journal targets and source caveats |
| [Guardian_Soul](https://www.khwiki.com/Guardian_Soul) | KHII/Final Mix item recipe, acquisition or material-source section as applicable |
| [Gull_Wing](https://www.khwiki.com/Gull_Wing) | KHII/Final Mix item recipe, acquisition or material-source section as applicable |
| [Gummi_Missions](https://www.khwiki.com/Gummi_Missions) | KHII mission mechanics and route inventory; full numeric reward/EX table not normalized |
| [Gummi_Ship](https://www.khwiki.com/Gummi_Ship) | Selective structural/access reference; full guide not extracted |
| [Hades_Paradox_Cup](https://www.khwiki.com/Hades_Paradox_Cup) | Locations, unlock/reward rules, Journal targets and source caveats |
| [Hero's_Crest](https://www.khwiki.com/Hero%27s_Crest) | KHII/Final Mix item recipe, acquisition or material-source section as applicable |
| [Hidden_Dragon](https://www.khwiki.com/Hidden_Dragon) | KHII/Final Mix item recipe, acquisition or material-source section as applicable |
| [Item_synthesis](https://www.khwiki.com/Item_synthesis) | KHII synthesis rules, recipe-document list and ingredient conflicts |
| [Keyblade](https://www.khwiki.com/Keyblade) | Inventory structure/name lists; not all item-specific acquisitions |
| [Kingdom_Key](https://www.khwiki.com/Kingdom_Key) | KHII/Final Mix item recipe, acquisition or material-source section as applicable |
| [Lightning](https://www.khwiki.com/Lightning) | KHII/Final Mix item recipe, acquisition or material-source section as applicable |
| [Limit_Form](https://www.khwiki.com/Limit_Form) | Acquisition, EXP unit and Growth progression |
| [Lingering_Will](https://www.khwiki.com/Lingering_Will) | Selective structural/access reference; full guide not extracted |
| [Lucid](https://www.khwiki.com/Lucid) | KHII/Final Mix item recipe, acquisition or material-source section as applicable |
| [Lucky_Lucky](https://www.khwiki.com/Lucky_Lucky) | KHII/Final Mix item recipe, acquisition or material-source section as applicable |
| [Mage_Earring](https://www.khwiki.com/Mage_Earring) | KHII/Final Mix item recipe, acquisition or material-source section as applicable |
| [Magnet](https://www.khwiki.com/Magnet) | KHII grant-source lists; edition differences |
| [Manifest_Illusion](https://www.khwiki.com/Manifest_Illusion) | KHII/Final Mix item recipe, acquisition or material-source section as applicable |
| [Master_Form](https://www.khwiki.com/Master_Form) | Acquisition, EXP unit and Growth progression |
| [Mega-Potion](https://www.khwiki.com/Mega-Potion) | KHII/Final Mix item recipe, acquisition or material-source section as applicable |
| [Meteor_Staff](https://www.khwiki.com/Meteor_Staff) | KHII/Final Mix item recipe, acquisition or material-source section as applicable |
| [Midnight_Anklet](https://www.khwiki.com/Midnight_Anklet) | KHII/Final Mix item recipe, acquisition or material-source section as applicable |
| [Monochrome](https://www.khwiki.com/Monochrome) | KHII/Final Mix item recipe, acquisition or material-source section as applicable |
| [Moon_Amulet](https://www.khwiki.com/Moon_Amulet) | KHII/Final Mix item recipe, acquisition or material-source section as applicable |
| [Mushroom_XIII](https://www.khwiki.com/Mushroom_XIII) | Locations, unlock/reward rules, Journal targets and source caveats |
| [Mysterious_Abyss](https://www.khwiki.com/Mysterious_Abyss) | KHII/Final Mix item recipe, acquisition or material-source section as applicable |
| [Mythril](https://www.khwiki.com/Mythril) | KHII/Final Mix item recipe, acquisition or material-source section as applicable |
| [Mythril_Crystal](https://www.khwiki.com/Mythril_Crystal) | KHII/Final Mix item recipe, acquisition or material-source section as applicable |
| [Mythril_Ring](https://www.khwiki.com/Mythril_Ring) | KHII/Final Mix item recipe, acquisition or material-source section as applicable |
| [Oathkeeper](https://www.khwiki.com/Oathkeeper) | KHII/Final Mix item recipe, acquisition or material-source section as applicable |
| [Oblivion](https://www.khwiki.com/Oblivion) | KHII/Final Mix item recipe, acquisition or material-source section as applicable |
| [Organization_XIII_Replica_Data](https://www.khwiki.com/Organization_XIII_Replica_Data) | Locations, unlock/reward rules, Journal targets and source caveats |
| [Pain_and_Panic_Cup](https://www.khwiki.com/Pain_and_Panic_Cup) | Locations, unlock/reward rules, Journal targets and source caveats |
| [Pain_and_Panic_Paradox_Cup](https://www.khwiki.com/Pain_and_Panic_Paradox_Cup) | Locations, unlock/reward rules, Journal targets and source caveats |
| [Petite_Ribbon](https://www.khwiki.com/Petite_Ribbon) | KHII/Final Mix item recipe, acquisition or material-source section as applicable |
| [Photon_Debugger](https://www.khwiki.com/Photon_Debugger) | KHII/Final Mix item recipe, acquisition or material-source section as applicable |
| [Power](https://www.khwiki.com/Power) | KHII/Final Mix item recipe, acquisition or material-source section as applicable |
| [Power_Band](https://www.khwiki.com/Power_Band) | KHII/Final Mix item recipe, acquisition or material-source section as applicable |
| [Proof_of_Nonexistence](https://www.khwiki.com/Proof_of_Nonexistence) | KHII/Final Mix item recipe, acquisition or material-source section as applicable |
| [Recipe](https://www.khwiki.com/Recipe) | KHII synthesis rules, recipe-document list and ingredient conflicts |
| [Reflect](https://www.khwiki.com/Reflect) | KHII grant-source lists; edition differences |
| [Remembrance](https://www.khwiki.com/Remembrance) | KHII/Final Mix item recipe, acquisition or material-source section as applicable |
| [Rumbling_Rose](https://www.khwiki.com/Rumbling_Rose) | KHII/Final Mix item recipe, acquisition or material-source section as applicable |
| [Save_the_King](https://www.khwiki.com/Save_the_King) | KHII/Final Mix item recipe, acquisition or material-source section as applicable |
| [Save_the_Queen](https://www.khwiki.com/Save_the_Queen) | KHII/Final Mix item recipe, acquisition or material-source section as applicable |
| [Serenity](https://www.khwiki.com/Serenity) | KHII/Final Mix item recipe, acquisition or material-source section as applicable |
| [Shadow_Archive](https://www.khwiki.com/Shadow_Archive) | KHII/Final Mix item recipe, acquisition or material-source section as applicable |
| [Shield](https://www.khwiki.com/Shield) | Inventory structure/name lists; not all item-specific acquisitions |
| [Shock_Charm](https://www.khwiki.com/Shock_Charm) | KHII/Final Mix item recipe, acquisition or material-source section as applicable |
| [Sleeping_Lion](https://www.khwiki.com/Sleeping_Lion) | KHII/Final Mix item recipe, acquisition or material-source section as applicable |
| [Soldier_Earring](https://www.khwiki.com/Soldier_Earring) | KHII/Final Mix item recipe, acquisition or material-source section as applicable |
| [Staff](https://www.khwiki.com/Staff) | Inventory structure/name lists; not all item-specific acquisitions |
| [Star_Charm](https://www.khwiki.com/Star_Charm) | KHII/Final Mix item recipe, acquisition or material-source section as applicable |
| [Star_Seeker](https://www.khwiki.com/Star_Seeker) | KHII/Final Mix item recipe, acquisition or material-source section as applicable |
| [Summon](https://www.khwiki.com/Summon) | Selective structural/access reference; full guide not extracted |
| [Summon_charm](https://www.khwiki.com/Summon_charm) | KHII grant-source lists; edition differences |
| [Sweet_Memories](https://www.khwiki.com/Sweet_Memories) | KHII/Final Mix item recipe, acquisition or material-source section as applicable |
| [Synthesis_material](https://www.khwiki.com/Synthesis_material) | KHII table counted (60); family/rank cross-check only |
| [Thundaga_Trinket](https://www.khwiki.com/Thundaga_Trinket) | KHII/Final Mix item recipe, acquisition or material-source section as applicable |
| [Thunder](https://www.khwiki.com/Thunder) | KHII grant-source lists; edition differences |
| [Titan_Cup](https://www.khwiki.com/Titan_Cup) | Locations, unlock/reward rules, Journal targets and source caveats |
| [Titan_Paradox_Cup](https://www.khwiki.com/Titan_Paradox_Cup) | Locations, unlock/reward rules, Journal targets and source caveats |
| [Tranquility](https://www.khwiki.com/Tranquility) | KHII/Final Mix item recipe, acquisition or material-source section as applicable |
| [Twilight](https://www.khwiki.com/Twilight) | KHII/Final Mix item recipe, acquisition or material-source section as applicable |
| [Two_Become_One](https://www.khwiki.com/Two_Become_One) | KHII/Final Mix item recipe, acquisition or material-source section as applicable |
| [Ultima_Weapon](https://www.khwiki.com/Ultima_Weapon) | KHII/Final Mix item recipe, acquisition or material-source section as applicable |
| [Valor_Form](https://www.khwiki.com/Valor_Form) | Acquisition, EXP unit and Growth progression |
| [Winner's_Proof](https://www.khwiki.com/Winner%27s_Proof) | KHII/Final Mix item recipe, acquisition or material-source section as applicable |
| [Wisdom_Form](https://www.khwiki.com/Wisdom_Form) | Acquisition, EXP unit and Growth progression |
| [Wishing_Lamp](https://www.khwiki.com/Wishing_Lamp) | KHII/Final Mix item recipe, acquisition or material-source section as applicable |

Official sources inspected: [Steam product page](https://store.steampowered.com/app/2552430/KINGDOM_HEARTS_HD_15_25_ReMIX/) (release, included game, collection-wide achievements and language/save notice); [Steam achievements](https://steamcommunity.com/stats/2552430/achievements) (collection-wide list, hidden requirements blank); [Square Enix collection announcement](https://www.jp.square-enix.com/kingdom/collection/) (2026-10-08 announced editions, not shipped verification at this date).

Failed/unusable lookups were not facts: `Underworld_Coliseum`, `Secret_Ansem's_Report`, `Gummi_Missions_(KHII)`, `List_of_Gummi_Ship_blueprints_(KHII)`, `List_of_weapons_(KHII)`, `List_of_armor_(KHII)`, `List_of_accessories_(KHII)`, `List_of_abilities_(KHII)`, `Gummi_Ship_blueprint`, `List_of_synthesis_materials`, `Dark_(material)` and `Firagun_Bangle_(KHII)`. Canonical working pages were found through grounded wiki links or successful world/topic pages. Broad web search returned irrelevant results and was not used as evidence.

## Confidence terminology

- **Legacy lead**: retrieved user's old source; edition/provenance insufficient.
- **Community corroborated**: current community page supports a fact; not primary or game execution evidence.
- **Conflicting**: sources disagree; preserve candidates and block affected numeric certification.
- **Complete index**: all measured candidate records are enumerated; exact instructions/verification may still be partial.
- **Validated app behavior**: requires application tests; none were run because this task is research only.
