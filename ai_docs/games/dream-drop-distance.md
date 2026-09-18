# Kingdom Hearts Dream Drop Distance HD Specification

## Status

Audited planning draft, 2026-09-18. The actual **KH3D DATABASE PROJECT** ranges and public HD references have been inspected. The workbook is a useful mixed-edition prototype, with material omissions and integrity defects. Production content remains incomplete; see the [research pack](dddhd/README.md) and [readiness audit](../readiness/dream-drop-distance.md).

## Product objective

Provide a collectible/acquisition compendium answering “Where is this thing and how do I get it?” Crafting and Spirit creation are first-class, alongside character-specific treasures, commands, equipment, portals, challenge rewards and separate achievement goals. Ordinary story walkthroughs, biography completion and narrative gates are not the product objective or release blockers.

The supported baseline is **Dream Drop Distance HD**; the user plays Steam. **2.8 is a collection, not a standalone game entry.** Use 3DS evidence only where HD applicability is verified, retaining consequential changes. Announced 2026-10-08 ports remain unreleased at this audit date; see the [edition/source notes](dddhd/README.md).

## Legacy evidence found

- 52 Spirit-master rows, but a normalized 54-breed reconciliation target: the master includes three HD additions and omits Sudo Neku/R & R Seal
- Shared lookup concepts for character, command category, elements/attributes, and Link Style types
- Single-Spirit Link Attacks and their descriptions
- Dual Link Attacks and recipes based on paired Spirit attributes/families
- Riku's single and dual Link Styles and pairing recipes
- Abilities, descriptions, categories, and maximum stacks
- 119 command candidates; public category tables supply 124 after adding five omitted Defense commands and separating Reprisals; the legacy Item “Slots” field actually stores use quantities
- 816 flat reward rows for 51 Spirits with LP prices; topology, gates and transformed reward nodes are missing
- Synthesis/Dream Piece item names
- 243 creation formula candidates for 51 Spirits; mixed/null probability cells and incomplete “best base” flags require validation
- A GameFAQs source lead (retrieval restricted; not claimed read)

Exact sheet IDs, inspected ranges, row counts, aliases and conflicts are in the [legacy audit](dddhd/legacy-audit.md). Factual candidate cells are retained separately for review, never auto-imported into production.

## Required completion modules

### Spirit encyclopedia

- Every Spirit and Nightmare
- Family, disposition, attribute, and affinity information
- Stats and rank behavior
- Creation recipes
- Best starting recipes by goal
- Ability Link board contents
- Link Points costs
- Disposition paths and unlock effects
- Training/toy/food interactions where relevant
- Link Attack for Sora
- Link Style contribution for Riku
- Locations or enemy appearances
- Edition/platform-exclusive Spirits

### Spirit creation planner

- Select desired Spirit and rank/quality target
- Show every valid recipe
- Ingredient quantities and acquisition sources
- Success probability
- Recommended recipe rationale
- Required recipe unlock, if any
- Forecast abilities or stats affected by recipe inputs where supported
- Reverse lookup from owned Dream Pieces
- Aggregate material requirements for a planned Spirit roster

The legacy `BEST BASE` flag is a useful product idea but must be replaced with a documented, reproducible recommendation rule.

### Ability Link boards

- Board nodes and topology, not just a flat unlock list
- LP cost
- Prerequisite nodes
- Unlock type: command, ability, stat increase, disposition change, or other reward
- Secret routes and disposition requirements
- Maximum useful stacks
- Permanent versus Spirit-equipped effects
- Progress tracking per Spirit

### Commands and deck building

- Commands by Attack, Magic, Item, Movement, Defense, Reprisal, and Flowmotion categories
- Slot cost
- Sora/Riku availability
- Element/type
- Acquisition sources
- reload behavior
- recommended use
- command collection tracking

### Link systems

- Sora single-Spirit Link Attacks
- Sora Dual Links and valid pair attributes/families
- Riku single-Spirit Link Styles
- Riku Dual Link Styles and valid pairings
- Descriptions, controls, duration/mechanics, and completion relevance

### Additional collectible, acquisition and optional-goal coverage

The legacy workbook does not cover:

- Treasures by character and world
- Special and Secret Portals
- Forecasts
- Reality Shifts and world mechanics
- Keyblades
- Reports-related acquisition and discrete secret rewards; narrative requirements only on the relevant separate achievement/goal detail
- Flick Rush cups and medals
- Dive Mode ranks
- Dream Eater collection requirements
- Optional bosses
- Critical Mode/secret ending requirements
- trophies/achievements
- Consequential HD changes versus Nintendo 3DS, including altered formulas/chest contents and removed AR/StreetPass routes

Research now establishes a 438-chest census (Sora 225, Riku 213), 78 Special/11 Secret portals, 14 ordinary Dives, ten Flick Rush cups, and a 15-type Keyblade acquisition catalog. Complete row-level routes/rewards still need source validation. Follow [worlds](dddhd/worlds-and-collectibles.md), [Spirits/commands](dddhd/spirits-and-commands.md), [portals/challenges](dddhd/portals-and-challenges.md), and [rewards/achievements](dddhd/rewards-and-achievements.md).

## Data model additions

- `spirit`
- `spirit_recipe`
- `dream_piece`
- `ability_link_board`, `board_node`, and `board_edge`
- `spirit_unlock` with LP cost and prerequisites
- `link_action`
- `link_pairing_rule`
- `command` with character and slot cost
- `portal`, `portal_rotation`, and `forecast`
- `edition_difference`

## Primary user experiences

- “What is the best recipe for this Spirit?”
- “What can I create with the Dream Pieces I own?”
- “Which Spirit unlocks this command or ability?”
- “How do I reach this Ability Link board node?”
- “Which Spirit pair gives this Dual Link or Link Style?”
- “Which collectibles remain for Sora and Riku, and where are they?”
- “How do I acquire the ingredients and craft this Spirit at my target rank?”
- “Which older-guide instructions changed in HD?”

## Visual direction

DDD visual inspiration remains unconfirmed and user-owned; do not treat the earlier proposed neon palette as accepted. Initial application acceptance targets Apple browser/iPhone/iPad; Android follows. Preserve accessible compact marks/expanded rows, keyboard/touch operation and reduced motion.

The app is spoilerific. No spoiler warnings, hidden content or reveal controls. No Available Now/progress-gate tracking or filtering; acquisition/access conditions remain concise text guidance.

## Known source risks

- The workbook uses surrogate lookup structures intended for a relational database rather than user-facing content.
- Spirit attributes and style types appear incompletely populated in the Spirit table.
- Affinity-board unlocks are flat and omit board topology and prerequisites.
- “Best base” is asserted rather than derived.
- Command descriptions appear to have lost controller-button glyphs.
- The workbook mixes HD master names with older recipe/board coverage; Frootz Cat, Kab Kannon and R & R Seal formulas change materially in HD.
- Aura Lion's public board table/footnote disagree about the red-secret coordinate; preserve this source conflict visibly.
- External text may require attribution or rewriting.

## Release acceptance criteria

A user must be able to locate collectibles, plan Spirit creation, navigate every Ability Link board, understand Link pairings, find every verified acquisition route and track scoped progress without needing another guide. Acceptance validates sources, formulas and application behavior; it does not require the user to perform a manual gameplay/playthrough gate.

All specified features remain MVP. Only absent production screenshot/map images are deferred; complete text directions, media fields/support and fallback tests remain required.

## Linked collectible state and counting

Follow [collectible compendium and linked views](../content/collectible-compendium-and-linked-views.md). Each compact mark and expanded location row uses the same stable collectible record and persisted state. World pages, master indexes, search, reverse acquisition views and Data Jiminy synchronize both directions. Filters never shrink denominators.

World collection percentages count scoped collectible records only, never plot/character biographies. Count each chest once regardless of contained quantity; distinguish Sora/Riku chest inventories. Shared Spirit breed acquisition, owned Spirit instances, board nodes, recipe items, ingredient formulas and acquired commands are separate concepts linked by acquisition events. Portal/challenge and platform goals have separate denominators.

Add `collectible`, `acquisition_event`, `acquisition_route`, `spirit_instance`, `recipe_item`, `recipe_outcome`, `owned_material`, `achievement_requirement` and source/edition/confidence records to the planning model. Stable IDs and migrations preserve progress when labels, numbering or routes are corrected.

## Crafting, inventory and application validation

Follow [synthesis and inventory](../content/synthesis-and-inventory.md) and [testing/content validation](../testing-and-content-validation.md). Crafting is first-class; validate ingredient names/quantities, alternate outcomes, probabilities, rank boosts, forecast/difficulty conditions and aggregate material calculations. Optional opt-in inventory shows owned/required (x/y) per ingredient. The compendium and calculators work without inventory entry; never require users to maintain story-gate state.

React offline PWA, persistent local progress, backup/restore/migration, bundled local SLM and the DDD Coppermind for Data Jiminy remain MVP. Source conflicts produce qualified answers rather than invented certainty. Initial functional checks cover Apple browser/iPhone/iPad, with Android follow-up.

The [research-source manifest](dddhd/sources.md) states exactly what was inspected. Community source evidence is not in-game verification, and missing evidence stays explicit. A source-backed content pass plus application tests replaces a required manual player walkthrough.

