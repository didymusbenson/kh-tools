# KH1 Final Mix collectible implementation

The normalized collection pack contains 471 source-backed entries: 306 treasures and finite world rewards, 33 Dalmatian chests (99 puppies), 46 Trinity Marks, 10 postcards, five Torn Pages, 13 Ansem Reports, 21 magic acquisitions, six summons, and 31 guides. All 13 collectible-bearing worlds have an offline route overview. Every acquisition supplies area, directions, requirements, missability, reward, source URLs and checked date. No record claims hands-on verification.

The treasure denominator is the declared compendium inventory, not an official Jiminy treasure count: KH1 does not expose that counter. Equipment catalog, ability catalog, challenge, blueprint and synthesis entries belong to their corresponding reference modules. Temporary narrative objects and repeatable farming opportunities do not add world-progress checks. The six Wonderland flower exchanges remain searchable guide records; ten postcard mailings are checkable guidance but excluded from world collectible totals.

## Reproduction and integrity

Run `python tools/content/import-collectibles.py` from the repository. It requires only Python's standard library and no network. Source facts and the independent location manifest are in `tools/content/import-collectibles.sources.json`. The generator asserts all seven specialist totals, Trinity color counts, 99 individual puppies, unique IDs, locally resolvable related IDs, per-world treasure totals and complete classification of all 535 inspected world-table rows. `tools/content/import-collectibles.audit.json` preserves every row's represented/excluded status, canonical entry ID, exclusion rationale, per-world action totals and independent chest reconciliation.

The independent comparison uses the [Archipelago Final Mix location manifest at a pinned revision](https://github.com/ArchipelagoMW/Archipelago/blob/1322ce866eddb1ccf0ca042db93ceef8789d6029/worlds/kh1/Locations.py). Its 216 records typed `Chest` reconcile world by world with the wiki tables after explicitly enumerated static interactions, temporary objects and one rejected duplicate are excluded from that comparison. This is an internal consistency check, not a claim that 216 is the complete game-wide physical chest count: the source types Atlantica containers, Library rotating chests, Olympia and other mechanisms as static rewards. Randomized item contents and altered randomizer progression are never imported.

| World | Treasure/reward records | Deduplicated collection actions, all collection categories |
| --- | ---: | ---: |
| Destiny Islands | 4 | 4 |
| Traverse Town | 33 | 63 |
| Wonderland | 23 | 33 |
| Olympus Coliseum | 18 | 29 |
| Deep Jungle | 30 | 39 |
| Agrabah | 34 | 49 |
| Monstro | 16 | 27 |
| Atlantica | 25 | 28 |
| Halloween Town | 16 | 25 |
| Neverland | 21 | 32 |
| 100 Acre Wood | 23 | 24 |
| Hollow Bastion | 37 | 51 |
| End of the World | 26 | 26 |
| Total | 306 | 430 |

## Acquisition identities

IDs are stable, game-prefixed identities shared by the UI and retrieval pack. Category identity is separate from acquisition identity. `facts.acquisitionId` always points to an existing canonical entry. Gizmo postcards 6 and 7 share one interaction; Aerith's Reports 2/4/6/10 share one conversation. Automatic report/magic or summon/weapon bundles also share an action. A puppy chest counts as one action and three rescued puppies. Activating a mark and opening its revealed chest remain separate actions; Olympus's Green Trinity gives Mythril directly and therefore shares an acquisition identity with its treasure view. Summon gems and Fairy Godmother conversions remain separate actions.

Report entries include bundled Holy Circlet, One-Winged Angel and EXP Necklace rewards. The 51-puppy Torn Page includes Mythril. Magic rows identify powers rather than assuming acquisition order fixes a spell's tier. The Wonderland ice power has one identity whether obtained from evidence or Trickmaster. Each relocated Oogie's Manor chest retains one identity before and after destruction.

## Evidence and discrepancies

The initial source inventory is the KH1 section of each world's KHWiki game tables, with the Final Mix branch selected wherever original and Final Mix contents differ. Existing repository research and legacy tables provided candidates; the current cited inventory determined game facts. [Gamer Guides' Final Mix walkthrough](https://www.gamerguides.com/kingdom-hearts-hd-15-remix/guide/kingdom-hearts-final-mix/walkthrough/agrabah) and its other world/revisit pages reconcile detailed directions. Original-game walkthroughs are explicitly labeled as geometry-only sources and do not override Final Mix contents.

Notable reconciliations include moved puppies 31–33, 43–45, 46–48, 58–60, 67–69 and 76–78; Final Mix Trinity rewards; twelve repeating Clock Tower hour windows; the second Roo-branch nut respawning at the same location; the second-visit Rising Falls Defense Up bubble; and the Hades Cup Orichalcum pot interaction.

The wiki's additional standalone `Halloween Town/Treasures/17` Mythril Shard is excluded as a duplicate candidate. The independent memory-location manifest accounts for six manor chests: two Ethers, two cage chests, puppies 40–42 and the Red Trinity shard. Both [Gamer Guides](https://www.gamerguides.com/kingdom-hearts-hd-15-remix/guide/kingdom-hearts-final-mix/walkthrough/halloween-town) and the [modern achievement walkthrough](https://www.trueachievements.com/game/KINGDOM-HEARTS-HD-15-25-ReMIX/walkthrough/14) describe that Red Trinity shard. The rejected row and supporting evidence remain in the audit rather than becoming a phantom checklist item.

Ansem Report 13 uses the conservative, source-backed practical route: reach Final Rest, then return to Castle Chapel's portal. Sources disagree about the earliest portal trigger; the entry explicitly preserves this uncertainty and does not claim that earlier access is impossible. Its location and reward remain source-backed. The [Final Mix changes page](https://www.khwiki.com/Kingdom_Hearts_Final_Mix#Battle) supports the practical access point.

No screenshot or map assets are bundled by this generator. Text directions remain self-contained offline. Root integration builds the public data file and performs the final Coppermind seed only after the application wiring is complete.
