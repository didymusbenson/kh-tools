# Kingdom Hearts Dream Drop Distance Specification

## Status

Discovery draft based on **KH3D DATABASE PROJECT**. The workbook is a useful relational prototype for Spirits and Links, but it does not cover the whole completion surface.

## Product objective

Provide a comprehensive Dream Drop Distance companion centered on Spirit creation and progression while also covering commands, treasures, portals, trophies, reports, Flick Rush, and edition/platform differences.

## Legacy evidence found

- 52 Spirits
- Shared lookup concepts for character, command category, elements/attributes, and Link Style types
- Single-Spirit Link Attacks and their descriptions
- Dual Link Attacks and recipes based on paired Spirit attributes/families
- Riku's single and dual Link Styles and pairing recipes
- Abilities, descriptions, categories, and maximum stacks
- 119 deck commands with slot cost, elemental typing, description, character availability, and command category
- Hundreds of Spirit affinity-board unlocks with LP prices
- Synthesis/Dream Piece item names
- Hundreds of Spirit creation recipes with ingredient quantities, rank, probability, and a “best base” flag
- A GameFAQs source lead

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

### Full completion surface

The legacy workbook does not cover:

- Treasures by character and world
- Special and Secret Portals
- Forecasts
- Reality Shifts and world mechanics
- Keyblades
- Reports and glossary/story entries
- Flick Rush cups and medals
- Dive Mode ranks
- Dream Eater collection requirements
- Optional bosses
- Critical Mode/secret ending requirements
- trophies/achievements
- HD 2.8 changes versus Nintendo 3DS

These require new research and explicit edition scoping.

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
- “What remains for 100% on Sora and Riku?”
- “Does this information differ between 3DS and HD 2.8?”

## Visual direction hypothesis

Use Dream Drop Distance's vivid dreamscape identity: saturated cyan, magenta, and violet accents; soft neon glow; rounded card geometry; and Dream Eater silhouettes/patterns. Animation should be restrained and honor reduced-motion preferences.

## Known source risks

- The workbook uses surrogate lookup structures intended for a relational database rather than user-facing content.
- Spirit attributes and style types appear incompletely populated in the Spirit table.
- Affinity-board unlocks are flat and omit board topology and prerequisites.
- “Best base” is asserted rather than derived.
- Command descriptions appear to have lost controller-button glyphs.
- The source predates later ports and may only describe the 3DS release.
- External text may require attribution or rewriting.

## Release acceptance criteria

A user must be able to plan Spirit creation, navigate every Ability Link board, understand every Link pairing, track all Sora/Riku completion items, and correctly account for platform-version differences without using another guide.
