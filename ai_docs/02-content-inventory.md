# Content Inventory

Track current material, proposed additions, ownership, source quality, and migration status here.

## Existing repository content

Initial repository-level observations:

- Static HTML entry points
- Birth by Sleep melding content
- Boss tables
- CSV data
- Game-specific content under `games/`
- Existing image and stylesheet assets

A detailed repository audit is still required.

## Legacy Drive sources

The KHTABLES folder's ten-file inventory is recorded in [the source audit](./sources/khtables-drive-audit.md). File discovery is not an exhaustive row audit. [Parallel researchers](./research/parallel-game-research.md) are inspecting actual ranges and reconciling old findings; per-game evidence supersedes older tab-level assumptions.

| Source | Game | High-value coverage | Migration status |
|---|---|---|---|
| KH FM TABLES | Kingdom Hearts Final Mix | Heartless, equipment, synthesis, Trinities, postcards, tournaments, Dalmatians, progression, Torn Pages, magic | Specified; facts unverified |
| Kh2FM tables and SQL documents | Kingdom Hearts II Final Mix | Treasures, Puzzle Pieces, synthesis, drops, equipment, magic, missions, trophies, intended relational model | Specified; facts unverified |
| KHBBS Tables | Birth by Sleep Final Mix | Command melding, crystal abilities, material sources, command catalog | Specified; facts unverified |
| KH3D DATABASE PROJECT | Dream Drop Distance | Spirits, recipes, board unlocks, commands, abilities, Link Attacks and Styles | Specified; facts unverified |

No legacy Drive source was found for 0.2 or Kingdom Hearts III.

## Per-game specifications

| Game/family | Specification | Current strongest source area | Largest known gap |
|---|---|---|---|
| Kingdom Hearts Final Mix | [Open](./games/kingdom-hearts-final-mix.md) | World collectibles and synthesis | Exhaustive treasure/accessory inventories, exact routes and validation |
| Kingdom Hearts II Final Mix | [Open](./games/kingdom-hearts-ii-final-mix.md) | Relational synthesis and treasure data | Reconcile actual tab contents, FM edition differences, exact collection routes and goal rules |
| Birth by Sleep Final Mix + 0.2 | [Open](./games/birth-by-sleep-final-mix.md) | BBS command melding | Broader BBS completion and all 0.2 data |
| Dream Drop Distance | [Open](./games/dream-drop-distance.md) | Spirit creation and Links | Portals, treasures, board topology, HD differences |
| Kingdom Hearts III + Re Mind | [Open](./games/kingdom-hearts-iii.md) | Specification only | All factual datasets and exact completion rules |

## Proposed guide catalog

| Guide/tool | Game | User question answered | Required data | Priority | Notes |
|---|---|---|---|---|---|
| World completion view | All | What remains in this world? | Collectibles, areas, prerequisites, progress | High | Shared shell, per-game categories |
| Universal search | All | Where/how do I obtain this? | Normalized entities and aliases | High | Must work offline |
| Synthesis planner | KH1/KH2/KH3 | What materials remain and where do I farm them? | Recipes, quantities, drops, locations, optional inventory | First-class MVP | Owned/required (x/y) reminders when enabled; validated totals and shared-stock allocation |
| Command melding tool | BBS | How do I make this command/ability? | Meld recipes, crystals, type rules | High | Bidirectional lookup |
| Objective tracker | 0.2 | Which objectives remain and how are they completed? | Objectives, unlocks, conditions, rewards | High | Independent from BBS progression |
| Spirit recipe planner | DDD | What can I create and which recipe is best? | Recipes, materials, probabilities, ranking rules | High | Recommendation logic must be explainable |
| Lucky Emblem and Gummiphone tracker | KH3 | What remains in each record category? | Emblems, treasures, records, requirements | High | Base game and DLC separated |
| Linked collection checklists | Per game | Which collectibles am I missing, and where are they? | Stable item IDs, world/area directions, explicit counting units | High | Compact index and expanded details share saved state; narrative flags excluded from world percentages |
| Equipment catalog | Per game | What does this item do and where is it? | Stats, effects, acquisition | Medium | |
| Optional encounter guide | Per game | How do I unlock and clear this fight/challenge? | Requirements, strategies, rewards | Medium | |

## Source and attribution requirements

- Store provenance at the record level.
- Record game edition, platform, region, and source access date.
- Distinguish verified facts from legacy, inferred, disputed, or incomplete data.
- Do not copy third-party prose when reuse rights are unclear.
- Prefer independently structured facts and original explanatory text.
- Preserve source conflicts for review rather than silently choosing one.
- Treat old linked guides as research leads, not automatic authority.

## Content quality risks

- Conflicting information between releases or platform versions
- Data embedded directly in legacy HTML, SQL, or spreadsheet helper columns
- Missing citations or unclear ownership
- Terminology and spelling inconsistencies
- Hand-maintained totals that can drift from underlying records
- Empty legacy tables that imply intended scope but contain no facts
- Missing prerequisite and earliest-availability data
- Incomplete distinction between in-game completion and platform achievements

## Accepted collection focus

Follow the [shared compendium contract](./content/collectible-compendium-and-linked-views.md). Keep synthesis, equipment, optional challenges, Gummi, records and achievements in their own named tracks. Necessary acquisition prerequisites belong in item guidance; full story walkthroughs and exhaustive narrative Journal flags are outside current scope.

Melding and Spirit creation inherit the applicable [optional-inventory and calculation standards](./content/synthesis-and-inventory.md) with game-specific rules. Fully spoilerful content requires no spoiler warnings. Required access conditions are reference data, not an Available Now/progress tracker.
