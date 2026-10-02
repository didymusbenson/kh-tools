# Content Inventory

**KH1 research — 2026-10-02:** practical needs met; 14 closed, 6 partial evidence families, 0 unresolved. Five partial families are deferred and one dropped; none remain active in the reviewed research scope. [Current decisions and evidence](games/kh1fm/research-integration-2026-10-02.md). This does not certify UI/device release acceptance or authorize reseeding Data Jiminy.

Track current material, proposed additions, ownership, source quality, and migration status here.

## Current repository content

The working React/PWA has seven game journals with canonical research inputs, runtime catalogs, persistent collection identities and source provenance. The [October 1 audit](./research/research-audit-2026-10-01.md) inspected all seven games; the [resolution report](./research/research-resolution-2026-10-01.md) records integrated coverage and links the current per-game ledgers. The [recovery/continuation log](./research/research-recovery-2026-10-01.md) tracks the resumed work on remaining factual questions.

Earlier static HTML, SQL and CSV sources remain historical discovery material. Their existence does not establish a current missing catalog or validate an edition-specific value. Runtime counts and saved-checkpoint hashes are recorded in the [validation record](./research/research-validation-2026-10-01.json), separately from source accuracy.

## Legacy Drive sources

The KHTABLES folder's ten-file inventory is recorded in [the source audit](./sources/khtables-drive-audit.md). File discovery is not an exhaustive row audit. Per-game reconciliation and current evidence supersede the original tab-level assumptions and [September research assignments](./research/parallel-game-research.md).

| Source | Game | High-value coverage | Migration status |
|---|---|---|---|
| KH FM TABLES | Kingdom Hearts Final Mix | Heartless, equipment, synthesis, Trinities, postcards, tournaments, Dalmatians, progression, Torn Pages, magic | Source-backed catalogs integrated; numeric legacy crosswalk recorded, full prose equivalence not claimed |
| Kh2FM tables and SQL documents | Kingdom Hearts II Final Mix | Treasures, Puzzle Pieces, synthesis, drops, equipment, magic, missions, trophies, intended relational model | Reconciled FM catalogs integrated; original workbook provenance remains distinct from later sources |
| KHBBS Tables | Birth by Sleep Final Mix | Command melding, crystal abilities, material sources, command catalog | Expanded canonical melding, command and collection catalogs integrated; remaining contradictions tracked by finding ID |
| KH3D DATABASE PROJECT | Dream Drop Distance | Spirits, recipes, board unlocks, commands, abilities, Link Attacks and Styles | HD boards, formulas and commands integrated; blank probabilities and source conflicts are explicitly retained |

No legacy Drive source was found for 0.2 or Kingdom Hearts III.

## Per-game specifications

| Game | Specification | Integrated source-backed coverage | Current remaining questions |
|---|---|---|---|
| Kingdom Hearts Final Mix | [Open](./games/kingdom-hearts-final-mix.md) | Collectibles, synthesis, equipment/items, abilities, progression, cups, Gummi and challenges | [Current per-finding ledger](./games/kh1fm/research-resolution-2026-10-01.md) |
| Kingdom Hearts Re:Chain of Memories HD | [Open](./games/kingdom-hearts-re-chain-of-memories.md) | Both card rosters, rooms/rewards, sleights, progression, combat and boss-deck tables, shops and goals | [Current per-finding ledger](./games/recom/research-resolution-2026-10-01.md) |
| Kingdom Hearts II Final Mix | [Open](./games/kingdom-hearts-ii-final-mix.md) | Treasures/puzzles, recipes/materials, equipment/abilities, combat, cups, minigames and Gummi | [Current per-finding ledger](./games/kh2fm/research-resolution-2026-10-01.md) |
| Birth by Sleep Final Mix | [Open](./games/birth-by-sleep-final-mix.md) | Melding, command acquisition/CP/drops, abilities, chests/stickers, Arena, D-Links and minigames | [Current per-finding ledger](./games/bbsfm/research-resolution-2026-10-01.md) |
| Kingdom Hearts 0.2 | [Open](./games/kingdom-hearts-02.md) | Physical collectibles, objectives, routes and defense/healing mechanics | [Current per-finding ledger](./games/kh02/audit-dispositions.md) |
| Dream Drop Distance HD | [Open](./games/dream-drop-distance.md) | Chests, Spirit boards, commands/Links, recipes/materials/shops, portals and goals | [Current per-finding ledger](./games/dddhd/audit-dispositions.md) |
| Kingdom Hearts III + Re Mind | [Open](./games/kingdom-hearts-iii.md) | Chests/emblems, synthesis, equipment/forge, cuisine, records, adversaries, Gummi and DLC/Premium goals | [Current per-finding ledger](./games/kh3/audit-resolution-2026-10-01.md) |

These are coverage summaries, not claims of exhaustive correctness. Consult each ledger for exact unresolved subfields instead of treating a broad category as either wholly absent or wholly verified.

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
