# KH3 workshop and equipment acquisition

Research date: 2026-09-18. [Index](README.md). Community evidence unless explicitly labeled otherwise; no in-game testing performed.

## Workshop model

Keep distinct states for material type discovered, current quantity, recipe unlocked, product crafted at least once, product currently owned and Keyblade upgrade level. Synthesis and forging spend the same material stock. A collectible chest can award a material without creating a second chest record. Collector’s Goals and Photo Missions unlock recipes; do not port KH2’s Moogle-level/Energy/Serenity rules. Ultima Weapon unlocks at 58 different material types. The highest forge level is 10, but initial levels differ. [Synthesis](https://www.khwiki.com/Synthesis).

A desired-products planner must expand ingredient edges and reserve stock once across selected synthesis/forge goals. Track discovery independently: spending the final copy does not erase having discovered that material. Never assume that possessing a product proves the user synthesized it.

The Synthesis page’s claim that crafted items have no checkmarks conflicts with the KH3 patch-history description of v1.04. Modern UI verification is required; do not use that old claim in player instructions. [Patch history](https://www.khwiki.com/Kingdom_Hearts_III#Patch_update_data).

## Photo Mission identity/reward inventory

Each mission is one record, even mission 20’s twelve subjects. Subject child records may store photos/checks, with a derived parent completion. These are recipe unlocks, not an award of the finished equipment. The first ten rows are corroborated by the KH3 Photo Mission table in [Synthesis](https://www.khwiki.com/Synthesis); rows 11–20 and special conditions use [Photo Missions](https://www.khwiki.com/Photo_Missions).

| No. | Subject | Recipe unlocked |
|---:|---|---|
| 1 | Flame Core | Firefighter Rosette |
| 2 | Water Core | Umbrella Rosette |
| 3 | Chief Puff | Mask Rosette |
| 4 | Hercules statue | Cosmic Ring |
| 5 | Beasts & Bugs display | Soldier’s Earring |
| 6 | Rapunzel’s tower | Mage’s Earring |
| 7 | Festival | Moon Amulet |
| 8 | Secluded Forge fire | Fire Chain |
| 9 | Zeus | Thunder Chain |
| 10 | Tram | Draw Ring |
| 11 | CDA agent | Insulator Rosette |
| 12 | Ice palace | Blizzard Chain |
| 13 | Olaf | Snowman Rosette |
| 14 | Green cactuar | Fencer’s Earring |
| 15 | Scarecrow | Slayer’s Earring |
| 16 | Evening star | Star Charm |
| 17 | Fish-shaped windsocks | Aero Armlet |
| 18 | Port Royal waterfall | Aqua Chaplet |
| 19 | Demon Tower | Dark Chain |
| 20 | Twelve teammates | Petite Ribbon |

The evening-star photo requires night; windsocks require daytime. Zeus’s Cliff Ascent statue is an accepted alternative. Rapunzel can still satisfy mission 20 after she leaves the party, so this photo objective must not inherit Forest Clasp’s missability warning. Demon Tower is available in Battlegate 8. Precise camera positions and every unlock milestone remain to be authored and verified. [Photo Missions](https://www.khwiki.com/Photo_Missions), [Battlegate](https://www.khwiki.com/Battlegate).

## Ultima Weapon dependency fixture

Recipe: **7 Orichalcum+ + 2 Wellspring Crystals + 2 Lucid Crystals + 2 Pulsing Crystals**, unlocked by discovering 58 material types. Its normal first synthesis grants a level-10 Keyblade. Store an acquired/crafted distinction and a separate New Game+ import state; never charge the level-0 upgrade ladder to a freshly synthesized level-10 weapon. [Ultima Weapon](https://www.khwiki.com/Ultima_Weapon), [Synthesis](https://www.khwiki.com/Synthesis).

The seven Orichalcum+ acquisition events are one unit each:

| Event | Exact scope / link |
|---|---|
| Caribbean chest | Exile Island, chest 12 |
| Final World chest | Return visit, chest 1 |
| Lucky Emblems | Photograph 80 |
| Flantastic Seven | Meet the high reward threshold in all seven games |
| Frozen Slider | Collect all ten special prizes |
| Omega Machina | Defeat the Gummi boss |
| Prize Postcard | Random reward from mailing postcards |

These are distinct from ordinary Orichalcum, which can drop from Eclipse asteroids. No repeatable guaranteed Orichalcum+ farming route is established. The planner must expose the postcard randomness and the remaining unique events, not suggest killing an enemy for more Orichalcum+. [Orichalcum](https://www.khwiki.com/Orichalcum).

Validation examples: four completed Orichalcum+ events imply three remaining events; 80 emblems unlock this material goal but leave ten of the 90-emblem collection unfinished; a found chest updates its Orichalcum+ dependency without counting a second world chest.

## Material sourcing examples with rates

| Material | Inspected source | Planning implication |
|---|---|---|
| Wellspring Crystal | High Soldier 12%; Helmed Body 4%; Anchor Raider 8% | Battlegate 12 contains High Soldiers; link repeatable route and drop record |
| Illusory Crystal | Demon Tower 10%, specifically Battlegate 8; first-clear rewards at gates 6 and 8 | Separate repeatable drop from one-time gate reward |
| Evanescent Crystal | Berserker 9%; first-clear rewards at gates 3 and 9 | Gate 9 supplies a repeatable Berserker route |
| Fluorite | Starlight Way rocks 2.5%; shop price 500 after Toy Box + Corona | Show buy/farm alternatives with access conditions |
| Electrum | Eclipse blue rocks 1% | Keep Gummi-source results visible in material search |

Sources: [Wellspring](https://www.khwiki.com/Wellspring), [Illusory](https://www.khwiki.com/Illusory), [Evanescent](https://www.khwiki.com/Evanescent), [Fluorite](https://www.khwiki.com/Fluorite), [The Eclipse](https://www.khwiki.com/The_Eclipse). These are published community base rates; this audit does not certify Lucky Strike stacking, encounter-time efficiency or a universal best farm.

## Keyblade Forge calculator fixture

A checked Kingdom Key upgrade schedule provides a nontrivial fixture before building the full forge catalogue. [Kingdom Key, KH3](https://www.khwiki.com/Kingdom_Key).

| Target level | Ore | Wellspring material |
|---:|---|---|
| 1 | Fluorite ×1 | Shard ×2 |
| 2 | Fluorite ×1 | Shard ×3 |
| 3 | Fluorite ×1 | Shard ×4 |
| 4 | Damascus ×1 | Stone ×1 |
| 5 | Damascus ×1 | Stone ×2 |
| 6 | Damascus ×1 | Stone ×3 |
| 7 | Adamantite ×1 | Gem ×1 |
| 8 | Adamantite ×1 | Gem ×2 |
| 9 | Adamantite ×1 | Gem ×3 |
| 10 | Electrum ×1 | Crystal ×1 |

Calculated level 0→10 totals: Fluorite 3, Damascus 3, Adamantite 3, Electrum 1, Wellspring Shards 9, Stones 6, Gems 6, Crystal 1. Level 3→6 needs Damascus 3 and Wellspring Stones 6. At level 10 its STR/MAG are 9/8. These totals are derived from the ten rows, not copied from a material aggregate.

Each production Keyblade needs acquisition, initial level, all level transitions, stats/abilities, formchanges and shotlocks. Keyblade state is Sora-specific; Donald staves, Goofy shields and temporary playable characters need distinct equipment applicability. Do not make Riku/Aqua/Roxas/Kairi copies of Sora’s forge checklist.

Base acquisition anchors include Hero’s Origin (Olympus), Shooting Star (Twilight Town), Favorite Deputy (Toy Box), Ever After (Corona), Happy Gear (Monstropolis), Crystal Snow (Arendelle), Wheel of Fate (Caribbean), Nano Gear (San Fransokyo), Hunny Spout (100 Acre Wood) and Starlight (Keyblade Graveyard). These are recorded in the corresponding [world tables](collectible-inventory.md), alongside chest equipment. Grand Chef and Classic Tone have their own [record dependencies](cuisine-and-records.md); Oathkeeper/Oblivion and platform extras have [edition rules](editions-and-dlc.md).

## Remaining workshop and equipment work

- Enumerate the complete synthesis output set and every ingredient/quantity edge; independently reconcile the exact modern total before asserting it.
- Extract every Collector’s Goal, recipe unlock, all material families/ranks, shop unlock thresholds and source-rate conditions. This pass inspected the 24 type-count unlock rows and 20 photo rows, not every product recipe.
- Extract the full Keyblade upgrade catalogue. The Kingdom Key fixture is not representative proof for every blade; Ultima/New Game+ behavior especially needs testing.
- Enumerate all staves, shields, armor and accessories, including every acquisition alternative and Re Mind rewards. Chest identity coverage does not make the entire equipment catalogue ready.
- Verify aliases (Bandana/Bandanna, Petit/Petite Ribbon, Source’s Strength/Power labels) against modern English UI before assigning canonical names.
