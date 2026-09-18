# DDD HD: portals, Dives and challenge rewards

Research date: 2026-09-18. These are separate acquisition/challenge modules. They never become story-gate entries in the world collectible percentage.

## Portal identity and census

The inspected [Portal mechanics](https://www.khwiki.com/Portal) distinguishes Battle, Friendship, Special and Secret portals. There is one active Special Portal per world/drop; rotations change on dropping. There are six Specials per character in each of the first six worlds, three in The World That Never Was: **39 per character, 78 combined** (computed). Secret portals unlock after game clear; there are none in The World That Never Was or Riku's Symphony. Thus **six Sora + five Riku = 11**. Clearing a character's Specials awards End of Pain; Secrets award Unbound. HD removes player-created StreetPass portals, but does not remove the built-in Battle/Friendship/Special/Secret content.

| World | Sora Specials | Riku Specials | Sora Secret area | Riku Secret area |
|---|---:|---:|---|---|
| [Traverse Town](https://www.khwiki.com/Game:Traverse_Town) | 6 | 6 | Fifth District | Garden |
| [La Cité des Cloches](https://www.khwiki.com/Game:La_Cit%C3%A9_des_Cloches) | 6 | 6 | Square | Square |
| [The Grid](https://www.khwiki.com/Game:The_Grid) | 6 | 6 | Throneship | Portal |
| [Prankster's Paradise](https://www.khwiki.com/Game:Prankster%27s_Paradise) | 6 | 6 | Promontory | Monstro: Bowels |
| [Country of the Musketeers](https://www.khwiki.com/Game:Country_of_the_Musketeers) | 6 | 6 | Theater | Backstage |
| [Symphony of Sorcery](https://www.khwiki.com/Game:Symphony_of_Sorcery) | 6 | 6 | Precipice | None |
| The World That Never Was | 3 | 3 | None | None |

Area evidence comes from each world's Secret Portal first-clear reward row. Those rows award +10 maximum HP. A precise approach landmark for each portal remains unverified; an area is not complete navigation.

Use a stable `world + character + portal kind + source number` key. A rotation's reference marker/location and the persistent cleared state are different data. Forecast explanations are reference guidance, not a tracked Available Now system. A cleared Special Portal remains cleared when inactive; “not currently present” must not appear as “not collected”. Persist clear, bonus objective and claimed first-clear reward separately. Repeating a portal for materials must not increase a completion denominator.

The 78 Special Portal **locations, forecast silhouettes, enemies, bonus objectives and all first-clear/repeat rewards are not yet a verified row inventory**. Likewise built-in Battle/Friendship portal locations and all seven bonus-objective types remain extraction work. No deterministic drop cycle or guaranteed “next drop” is asserted. The legacy workbook contains none of these records.

## Dive inventory

The [Dive Mode table](https://www.khwiki.com/Dive_Mode) provides 14 ordinary world/character courses. A-rank thresholds below are source facts; course IDs are planning IDs, not invented report numbers. Seven A ranks earn that character's Divewing. The final-world heart/credits sequences are distinct from these courses.

| World | Sora A-rank score | Riku A-rank score | Listed A-rank prize |
|---|---:|---:|---|
| Traverse Town | 750000 | 420000 | Spark Dive |
| La Cité des Cloches | 1200000 | 140000 | Water Barrel |
| The Grid | 100000 | 30000 | Treasure Goggles in 3DS source; verify HD Candy Goggles replacement |
| Prankster's Paradise | 730000 | 400000 | Balloonra |
| Country of the Musketeers | 650000 | 100000 | Zero Graviga |
| Symphony of Sorcery | 1000000 | 800000 | Fleeting Fantasy |
| The World That Never Was | 140000 | 1000000 | Meteor |

Prizes appear as world-wide cells spanning the two character rows in the source; first-award/shared behavior needs verification before automatic ownership propagation. Track personal best and rank per course, not a single world rank.

## Flick Rush

The [Flick Rush source](https://www.khwiki.com/Flick_Rush) locates the tournament moogle in Traverse Town's Fourth District and lists ten cups, 27 rounds total (sum below). This remains in HD with revised controls; exclude 3DS wireless matches.

| Cup | Rounds | Access condition |
|---|---:|---|
| Training | 1 | Initial |
| Beginner's | 2 | Rush LV2 |
| Rainbow | 4 | Clear La Cité and Prankster's Paradise with either character |
| Digital | 2 | Clear The Grid with either character |
| Tin Pin | 4 | Rush LV6 |
| Speed | 1 | Rush LV7 |
| Yummy | 3 | Complete second Traverse Town visit |
| Final | 4 | Clear Musketeers and Symphony |
| Horror | 1 | Rush LV13 |
| Secret | 5 | Win all other cups; Rush LV15 |

Store static cup access prerequisites, per-match outcome/rank, cup prize, Rush level and medals as separate facts. Do not add Available Now filters or track story/access gates. Medal Shop purchasing consumes currency; lifetime medal achievement totals and current wallet are different counters. Opponent lineups, card strategies, complete rank/prize tables and all shop stock need extraction. [Sweet Dreams](https://www.khwiki.com/Sweet_Dreams) is awarded for Secret Cup match 5 (“Orion”), so attach that reward to the match event.

## Optional encounter acquisition

| Encounter / source | Where / access | Reward and state rule |
|---|---|---|
| [Julius](https://www.khwiki.com/Julius) | Traverse Town, Fountain Plaza; after game clear | Ultima Weapon; preserve Sora/Riku ownership and fight state |
| [Lord Kyroo](https://www.khwiki.com/Lord_Kyroo) | Riku Nave → Sora Promontory → Riku Moonlight Wood loop; persistent HP after timed escape | Recipe, Link Accelerator and HP bonus to the finishing character; one shared encounter chain |

Lord Kyroo's Nave encounter is unavailable during the Square fire before Wargoyle. Its shared chain must not become three independent bosses or three recipe awards. The exact encounter persistence/reset behavior and map approach directions still need a route fixture.

## HD minigames and other challenge goals

Balloon, Water Barrel, Candy Goggles, Light Cycle, Reality Shifts, training/affinity, Link use and Flick Rush records remain useful separate modules. The [HD changes page](https://www.khwiki.com/Kingdom_Hearts_Dream_Drop_Distance_HD) confirms controller/single-screen reworking, Water Barrel's pinball format, Candy Goggles replacing camera-based Treasure Goggles, renamed Spirits and extended Drop times. Never present broken legacy button glyphs or 3DS touch/AR instructions as HD guidance.

Training toys, food and recipes require acquisition entries as well as minigame explanations. The product must answer both “where do I obtain this toy?” and “which score unlocks this award?” Complete toy/shop acquisition and controller-specific input records remain outstanding.

