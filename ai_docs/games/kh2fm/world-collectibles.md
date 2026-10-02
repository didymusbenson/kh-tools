# KH2FM world collectibles and acquisition rules

Research snapshot: 2026-10-01. Apply the accepted [collectible compendium and linked views contract](../../content/collectible-compendium-and-linked-views.md). The following are measured category inventories, not a claim that every acquisition route has been playtested. The map inventory and recipe-document relationships are now normalized in `verified-audit-expansion.json`.

## Numbered treasures and puzzle pieces

The workbook's 301 treasure rows and 144 puzzle rows reconcile to the community KHII/Final Mix world tables below. Counts refer to Sora's collection. The separate prologue scope is explained afterwards. Hollow Bastion and Radiant Garden share a stable world ID; a rename must not reset progress.

| World | Numbered treasures | Puzzle pieces | Community evidence |
|---|---:|---:|---|
| Twilight Town, including Tower and Other Twilight Town | 39 | 20 | [World table](https://www.khwiki.com/Game:Twilight_Town) |
| Hollow Bastion / Radiant Garden, including Cavern of Remembrance | 46 | 23 | [World table](https://www.khwiki.com/Game:Radiant_Garden) |
| Beast's Castle | 21 | 9 | [World table](https://www.khwiki.com/Game:Beast%27s_Castle) |
| Olympus Coliseum | 20 | 9 | [World table](https://www.khwiki.com/Game:Olympus_Coliseum) |
| Agrabah | 26 | 14 | [World table](https://www.khwiki.com/Game:Agrabah) |
| The Land of Dragons | 21 | 10 | [World table](https://www.khwiki.com/Game:The_Land_of_Dragons) |
| 100 Acre Wood | 20 | 6 | [World table](https://www.khwiki.com/Game:100_Acre_Wood) |
| Pride Lands | 25 | 10 | [World table](https://www.khwiki.com/Game:Pride_Lands) |
| Disney Castle | 8 | 5 | [World table](https://www.khwiki.com/Game:Disney_Castle) |
| Timeless River | 7 | 3 | [World table](https://www.khwiki.com/Game:Timeless_River) |
| Halloween Town | 14 | 8 | [World table](https://www.khwiki.com/Game:Halloween_Town) |
| Port Royal | 21 | 13 | [World table](https://www.khwiki.com/Game:Port_Royal) |
| Space Paranoids | 14 | 4 | [World table](https://www.khwiki.com/Game:Space_Paranoids) |
| The World That Never Was | 19 | 7 | [World table](https://www.khwiki.com/Game:The_World_That_Never_Was) |
| Atlantica | 0 numbered treasure rows | 3 | [World table](https://www.khwiki.com/Game:Atlantica) |
| **Measured category totals** | **301** | **144** | Counts independently summed from the inspected tables |

[All treasure candidate records](treasure-candidates.md) and [all puzzle candidate records](puzzle-candidates.md) retain workbook row provenance. The compact mark, expanded row, search result and Data Jiminy answer use one stable acquisition ID and one persisted state. Display numbering is not a persistence key. Filters never reduce these complete category denominators.

## Scope, duplicate prevention and access

- The Twilight Town source additionally lists **16 unnumbered Roxas prologue chests**. These are not the 39 Sora entries. Preserve them as a separate, time-limited prologue acquisition scope; do not make their absence prevent Sora's treasure list from reaching 100%. The workbook lacks these 16 rows; the modern canonical `verified-prologue-chests.json` supplies their day/room directions and separate scope. Do not assign them fabricated official Journal numbers.
- Legacy Daylight piece 23 is mislabeled `Twilight Town (Roxas)`. It belongs to Sora's visit to the Other Twilight Town's Mansion: Computer Room. It must remain available in Sora's 20-piece world set.
- Radiant Garden treasure 46 contains **Proof of Nonexistence**. All 13 Data defeats cause its chest to appear; clearing the challenge does not mean the chest is open. The challenge and acquisition are separate records, but the Proof item and its chest are the same collectible acquisition in aggregate. [Replica Data](https://www.khwiki.com/Organization_XIII_Replica_Data).
- Treasure-contained maps, recipes, summon charms, Torn Pages and Orichalcum+ link to their treasure record. A recipe/map index must not create a second counted acquisition. Directly awarded maps/reports need their own acquisition records, not story-progress checkboxes.
- Equipment, crafted outputs, cups, optional battle clear states, score records and Gummi goals have separate totals. Acquiring their collectible rewards can satisfy linked item records without adding the challenge itself to the world's collectible denominator.
- No blanket “everything is missable” or “everything is returnable” flag is accepted. Prologue scope, temporary world closures and endgame access require record-level rules. An unchecked item means uncollected, not inaccessible.

## Puzzle sets and assembly

| Puzzle | Pieces | Completion reward |
|---|---:|---|
| Awakening | 12 | AP Boost |
| Heart | 12 | Serenity Crystal |
| Duality | 12 | Rare Document |
| Frontier | 12 | Manifest Illusion |
| Daylight | 48 | Executive's Ring |
| Sunset | 48 | Grand Ribbon |

Collection alone does not finish a puzzle: pieces must be arranged and sometimes rotated in Jiminy's Journal. Store collected pieces separately from puzzle assembly and reward receipt. The 144-piece denominator must not count placements or the same reward again. The source numbers pieces left-to-right by rows. All six boards now have visually inspected gameplay references in `verified-assembly.json`: Awakening/Heart/Duality/Frontier are three columns by four rows; Daylight/Sunset are six by eight. Awakening and Daylight use placement without rotation; the other four allow rotation. Row-major numbers and upright-artwork landmarks guide placement; starting rotations depend on saved board state. [Puzzle](https://www.khwiki.com/Puzzle).

Useful route evidence already recovered: Awakening 1 is above Merlin's bed; Awakening 5 is granted by the mandatory Wardrobe piece scene after the new clothes. Sunset 30 is in the blue-orb Mineshaft segment; Sunset 32/36/40 occupy the white-orb Glide route. Legacy requirements are candidate routes, not guaranteed minimums: community descriptions allow alternative movement combinations. Daylight 14 (Starry Hill) now has a source-supported working movement route; no theoretical minimum is claimed. The October pass enriches the previously sparse thirteen landmarks; its exact residuals are listed in KH2-003.

Growth ability levels refer to **standard Sora** unless a route explicitly says to transform. Form level and standard ability level are different values. Include form, ability level, approach landmark and accessible alternate route in the expanded row.

## Torn Pages and other linked acquisition indexes

The five Torn Pages already appear in treasure records: Disney Castle Library (#8); Pride Lands Oasis (#24); Hollow Bastion Crystal Fissure (#17); The Land of Dragons Throne Room (#14); Agrabah Ruined Chamber (#25). A Torn Pages index references these five existing IDs and their current state, rather than adding five to the aggregate a second time. 100 Acre Wood availability uses delivered-page progress as an access prerequisite, while its world counter remains collectible-based. These locations were checked in the five linked world tables above.

Recipe-document inventory: ten original recipe documents plus six Final Mix additions are evidenced. Base documents are Mega, Star, Recovery, Skill, Guard, Style, Moon, Queen, King and Ultimate. Add Book of Shadows, Cloaked Thunder, Strength Beyond Strength, Road to Discovery, Eternal Blossom and Rare Document. The five silhouette documents are defeat rewards; Rare Document is Duality's assembly reward. Each unlocks linked synthesis outputs. World-chest documents retain their treasure identity. [Recipe](https://www.khwiki.com/Recipe).

## Secret Ansem Reports — acquisition, not narrative transcript

Use one report record per page. The required data is how the page is received; copying its lore is unnecessary. These 13 report acquisitions are present in the generated catalog, although they were absent from the legacy table. Final Mix mapping:

| Report | Acquisition |
|---:|---|
| 1 | Finish the 1,000 Heartless battle |
| 2 | Station Plaza encounter with Mickey |
| 3 | Defeat Xigbar |
| 4 | Defeat Xaldin |
| 5 | First Demyx battle, Olympus |
| 6 | Second Grim Reaper battle |
| 7 | Defend Hollow Bastion's gate with Leon |
| 8 | Defeat Roxas |
| 9 | Defeat Luxord |
| 10 | Reach the Other Twilight Town |
| 11 | Riku regains his usual appearance |
| 12 | Defeat Saïx |
| 13 | First Xemnas battle |

Evidence: [Ansem's Reports](https://www.khwiki.com/Ansem%27s_Reports), acquisition sentences and Final Mix/International footnotes only. The Japanese-original 8/9/12 allocation must not overwrite the modern Final Mix mapping. All thirteen report areas and eighteen magic-grant areas are now normalized from explicit Final Mix world Rewards/Bonus tables in `verified-reward-areas.json`.

## Location-writing queue

All 301 treasures and 144 puzzle pieces have directions; the October source-by-source route review is recorded in KH2-002/003. The old assertion that 24 Cavern locators are blank is historical: all have routes and the Cavern has a consolidated access record. The 40-map index comprises 25 chest aliases and 15 direct grants. All sixteen recipe documents link their actual acquisition (ten chests, five Silhouettes, Duality assembly), retaining one saved acquisition identity. All 31 report/magic event-area mappings are complete under KH2-005. Source world tables alone are not proof of exact landmarks.

Text directions and media-capable records remain MVP. Only acquiring production screenshots/map images is deferred. Store optional media refs, alt text and anchors now; demonstrate usable directions with every image absent.
