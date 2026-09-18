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

The KHTABLES folder has been audited. See [the source audit](./sources/khtables-drive-audit.md) for the complete ten-file inventory and data-quality findings.

| Source | Game | High-value coverage | Migration status |
|---|---|---|---|
| KH FM TABLES | Kingdom Hearts Final Mix | Heartless, equipment, synthesis, Trinities, postcards, tournaments, Dalmatians, progression, Torn Pages, magic | Specified; facts unverified |
| Kh2FM tables and SQL documents | Kingdom Hearts II Final Mix | Treasures, Puzzle Pieces, synthesis, drops, equipment, magic, missions, trophies, intended relational model | Specified; facts unverified |
| KHBBS Tables | Birth by Sleep Final Mix | Command melding, crystal abilities, material sources, command catalog | Specified; facts unverified |
| KH3D DATABASE PROJECT | Dream Drop Distance | Spirits, recipes, board unlocks, commands, abilities, Link Attacks and Styles | Specified; facts unverified |

## Per-game specifications

| Game | Specification | Current strongest source area | Largest known gap |
|---|---|---|---|
| Kingdom Hearts Final Mix | [Open](./games/kingdom-hearts-final-mix.md) | World collectibles and synthesis | Full Journal/100% definition |
| Kingdom Hearts II Final Mix | [Open](./games/kingdom-hearts-ii-final-mix.md) | Relational synthesis and treasure data | Empty intended tabs and exact Journal rules |
| Birth by Sleep Final Mix | [Open](./games/birth-by-sleep-final-mix.md) | Command melding | Broader character-specific completion |
| Dream Drop Distance | [Open](./games/dream-drop-distance.md) | Spirit creation and Links | Portals, treasures, board topology, edition differences |

## Proposed guide catalog

| Guide/tool | Game | User question answered | Required data | Priority | Notes |
|---|---|---|---|---|---|
| World completion view | All | What remains in this world? | Collectibles, areas, prerequisites, progress | High | Shared shell, per-game categories |
| Universal search | All | Where/how do I obtain this? | Normalized entities and aliases | High | Must work offline |
| Synthesis planner | KH1/KH2 | What materials remain and where do I farm them? | Recipes, quantities, drops, locations | High | Computed totals |
| Command melding tool | BBS | How do I make this command/ability? | Meld recipes, crystals, type rules | High | Bidirectional lookup |
| Spirit recipe planner | DDD | What can I create and which recipe is best? | Recipes, materials, probabilities, ranking rules | High | Recommendation logic must be explainable |
| Journal/100% checklist | Per game | What remains for true completion? | Edition-specific completion rules | High | Separate trophies from in-game completion |
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
- Hand-maintained totals that can drift from their underlying records
- Empty legacy tables that imply intended scope but contain no facts
- Missing prerequisite and earliest-availability data
- Incomplete distinction between in-game completion and platform achievements
