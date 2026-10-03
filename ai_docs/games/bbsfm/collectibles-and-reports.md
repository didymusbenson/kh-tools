# Collectibles, Reports and counting

Current follow-up (2026-10-01): all 60 album placement landmarks, all 374 main chest source-route/landmark joins, five-song FM complete rank/prize tables, nine mission rank tables with character tactics, and Fruitball/racing reward guides are integrated through `research-enrichment.json`. Aqua’s Tower chest4 is corrected to Mega Magic Recipe. Full earliest-access/Reports-order certification remains separate; older missing-placement/table statements below are historical. See the current per-ID resolution ledger.

## Measured chest inventory

These are counts of numbered rows in the inspected community world tables, restricted to the Terra/Ventus/Aqua tabs. They are source-extraction totals; independent exact Reports-slot reconciliation remains unverified and is deferred under BBS-002. The supported lookup uses character, world, room and reward.

| World source | Terra | Ventus | Aqua |
|---|---:|---:|---:|
| [Land of Departure](https://www.khwiki.com/Game:Land_of_Departure) | 4 | 0 | 4 |
| [Dwarf Woodlands](https://www.khwiki.com/Game:Dwarf_Woodlands) | 13 | 14 | 18 |
| [Castle of Dreams](https://www.khwiki.com/Game:Castle_of_Dreams) | 11 | 13 | 8 |
| [Enchanted Dominion](https://www.khwiki.com/Game:Enchanted_Dominion) | 10 | 19 | 14 |
| [Radiant Garden](https://www.khwiki.com/Game:Radiant_Garden) | 14 | 16 | 16 |
| [Disney Town](https://www.khwiki.com/Game:Disney_Town) | 16 | 18 | 17 |
| [Olympus Coliseum](https://www.khwiki.com/Game:Olympus_Coliseum) | 4 | 4 | 4 |
| [Deep Space](https://www.khwiki.com/Game:Deep_Space) | 19 | 16 | 14 |
| [Neverland](https://www.khwiki.com/Game:Neverland) | 20 | 17 | 16 |
| [Mysterious Tower](https://www.khwiki.com/Game:Mysterious_Tower) | 4 | 4 | 4 |
| [Keyblade Graveyard](https://www.khwiki.com/Game:Keyblade_Graveyard) | 7 | 9 | 7 |
| **Main-episode total** | **122** | **130** | **122** |

The [Realm of Darkness BBS table](https://www.khwiki.com/Game:Realm_of_Darkness) adds eight Aqua **Secret Episode** chests in a separate episode scope. Its later 0.2 table is excluded. Ventus's tutorial Sliding Dash chest at Mountain Path is unnumbered and explicitly absent from Reports; retain it as an acquisition lead outside the Reports-style world denominator. Later editions including HD retain ruined Land of Departure for main-save return; the original-Japanese permanent-loss warning does not apply. Aqua’s separate Final Episode cannot enter it. Complete its Terra/Aqua chests on their main saves; do not treat the main-save chests as permanently missable. [Land of Departure source](https://www.khwiki.com/Game:Land_of_Departure).

## One record, many views

Use `profile + game=bbsfm + character + episode + collectible_id` for state. The compact checkmark and expanded detail row use the identical ID and value. World pages, indexes, search and Data Jiminy subscribe to that value. Hiding acquired items does not change the denominator. Each chest or sticker counts once, irrespective of its reward quantity. A report inside a chest is linked to that chest; adding a report page must not add a second world collectible. Sticker pickup and album placement/points are distinct states on a linked record; rewards do not become extra world pickups.

`collectible-inventory.csv` has 443 records: 382 counted chest candidates, 60 sticker candidates, and one excluded tutorial acquisition. Stable IDs include character and episode. `source_position` is the source table's number, not a claim of audited Reports numbering. Sticker IDs use name + area because repeated names are real; no official number has been invented.

## Sticker inventory and rewards

The [Sticker Album](https://www.khwiki.com/Sticker_Album) gives **20 pickups per character (60 total)**. Correct placement yields seven points each; all 20 optimally placed yield 140. Acquiring everything is therefore not the same as earning every album reward.

| Final Mix points | Terra | Ventus | Aqua |
|---:|---|---|---|
| 20 | Pulsing Crystal | Wellspring Crystal | Ignite |
| 40 | Fireworks | Fireworks | Shimmering Crystal |
| 70 | Limit Storm | Collision Magnet | Stop Barrier |
| 110 | Sonic Blade | Salvation | Deep Freeze |
| 140 | Rhythm Mixer | Rhythm Mixer | Rhythm Mixer |

Do not import the original game's 20/40/60/80/100 thresholds. All 60 pickup notes and 60 individual placement regions are now in `research-enrichment.json` and rendered in the guide. The 28 blank text-table cells were filled by visually inspecting KHRealm’s three completed album images. Each placement uses illustrated landmarks plus seven-point feedback; pickup completion remains independent.

## Report acquisitions

Thirteen acquisitions comprise the Letter plus Reports I–XII. Source: [Xehanort's Report](https://www.khwiki.com/Xehanort%27s_Report). These concise event labels are acquisition conditions, not an ordinary story checklist.

| Entry | Character | Acquisition |
|---|---|---|
| Letter | Ventus | Leave Land of Departure |
| I | Ventus | Deep Space, Launch Deck chest |
| II | Terra | Radiant Garden, Braig victory |
| III | Aqua | Radiant Garden, Merlin's House chest |
| IV | Aqua | Mysterious Tower, Yen Sid conversation |
| V | Terra | Mirage Arena, Sinister Sentinel victory |
| VI | Aqua | Enchanted Dominion, Maleficent victory |
| VII | Aqua | Keyblade Graveyard, Ventus-Vanitas victory |
| VIII | Terra | Land of Departure, Eraqus victory |
| IX | Ventus | Leave Destiny Islands |
| X | Ventus | Keyblade Graveyard, Vanitas victory |
| XI | Terra | Keyblade Graveyard, Terra-Xehanort victory |
| XII | Ventus | Keyblade Graveyard, Seat of War chest |

## Precise acquisition examples and unresolved details

| Record | Concrete direction / prerequisite | Source and status |
|---|---|---|
| Terra, Dwarf Woodlands, Fission Firaga chest #9 | From the Courtyard arch, jump outward, Air Slide, then attack in midair to extend reach. | [World table](https://www.khwiki.com/Game:Dwarf_Woodlands); community lead |
| Ventus, Dwarf Woodlands, Soothing Crystal chest #4 | Revisit Flower Glade after the Mad Treant encounter. | [World table](https://www.khwiki.com/Game:Dwarf_Woodlands); timing evidenced; approach is across the Flower Glade from the Deep Woods exit |
| Ventus, Dwarf Woodlands, Balloon Sticker | Mine Entrance, beside the stairs. | [Album](https://www.khwiki.com/Sticker_Album); missing from the world-page sticker table |
| Aqua, Deep Space, Dale Sticker | Southernmost cell on the eastern side of Turo Prison Block; High Jump and Air Slide are the listed access tools. | [Album](https://www.khwiki.com/Sticker_Album); validate minimum levels |
| Aqua, Secret Episode, Secret Gem #5 | Lower Zone: climb the raised pillars before entering Upper Zone. | [HD walkthrough](https://www.gamerguides.com/kingdom-hearts-hd-25-remix/guide/birth-by-sleep-final-mix/aquas-story/secret-episode) corroborates the world table; isolated material-page Upper Zone label superseded. |

October 1: Terra’s Flying Balloon Sticker in Passage belongs to Castle of Dreams; its historical ID is retained for save compatibility. The generator now counts all eight Secret chests, for 442 total world collectibles.

Remaining work: complete save-point paths where the source gives only relative landmarks; earliest collectible access and save/episode returnability; independent repeated-chest/Reports-order reconciliation; minimum movement levels and alternatives. All 374 main source rows and 60 album placement landmarks are integrated. Counts and source URLs alone do not satisfy those gates.

## Practical research boundary (October 2)

The October 3 census separately audited all 60 pickup locators, found 26 weak notes and integrated map/guide corrections. All 39 weak chest rows were also corrected. Pickup and placement are distinct audits. Full save-point scripts, earliest-visit/minimum-movement routing and exact Reports slot numbers are deferred optional precision, not certified facts. Return with the indicated movement commands leveled when needed. A concrete inaccessible or unlocatable record reopens that item. See [BBS-001/002/003 decisions](critical-reaudit-2026-10-03.md#bbs-001).
