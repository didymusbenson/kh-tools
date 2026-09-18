# Kingdom Hearts Birth by Sleep Final Mix Specification

## Status

Discovery draft based on **KHBBS Tables**. The command-melding data is substantial but unverified and currently mixes presentation logic with source data.

## Product objective

Build the definitive command-melding and completion companion for Birth by Sleep Final Mix across Terra, Ventus, and Aqua, while also covering collectibles, reports, minigames, arena progress, character-specific commands, and Final Mix content.

## Legacy evidence found

- 297 command-melding result rows
- Result command, first ingredient, second ingredient, recipe type, and success chance
- A crystal-to-ability matrix for Shimmering, Fleeting, Pulsing, Wellspring, Soothing, Hungry, and Abounding crystals
- A small crystal/material source table mapping crystals to Unversed
- A catalog of approximately 150 commands grouped as Attack, Magic, Friendship, Movement, Defense, and Reaction
- Some Final Mix-only commands identified in labels

The workbook also includes “DO NOT TOUCH” and helper cells that are spreadsheet implementation details and must not become product data.

## Required completion modules

### Command melding

- Every valid command combination
- Ingredient order behavior, if relevant
- Result command
- Success percentage
- Recipe/type code translated into explicit rules
- Required ingredient command levels
- Character availability
- Shop or chest alternatives
- Rare-result behavior
- Final Mix/version restrictions

### Ability synthesis

- Every crystal
- Ability produced for each recipe type
- Ability category
- Maximum useful stacks
- Recommended reliable meld path
- Crystal acquisition sources and drop rates
- Character-specific exceptions
- Clear explanation of whether the ability is permanently learned and when

The core user interaction should answer both directions:

- “What can I make from these two commands?”
- “How do I make this command with this ability?”

### Command catalog

- Attack
- Magic
- Item
- Friendship
- Movement
- Defense
- Reprisal/Reaction
- Shotlock
- D-Link commands where relevant
- Finish Commands
- Character restrictions
- Acquisition and leveling requirements

### Character progression and completion

Separate Terra, Ventus, and Aqua state while allowing shared reference data:

- Treasures by world and character
- Sticker locations and placement rewards
- Xehanort Reports
- Command collection
- Abilities
- Shotlocks
- D-Links
- Finish Commands
- Keyblades
- Arena Missions and Arena Level
- Command Board
- Rumble Racing
- Ice Cream Beat
- Fruitball
- Unversed Missions
- Optional bosses
- Mirage Arena rewards
- Final Episode and Secret Episode unlock requirements
- Trophy/achievement overlay by platform

### Materials and enemies

- Crystal/material family
- Enemy source
- world/area
- drop rate
- special conditions
- best farming route
- relevant Lucky Strike effects

## Data model additions

- `playable_character`
- `command` with category and character availability
- `meld_recipe` with two ingredients, recipe type, probability, and output
- `meld_ability_result` keyed by recipe type and crystal
- `command_level_requirement`
- `completion_state` scoped per character where necessary
- `final_mix_only` and broader edition/platform applicability

The legacy single wide crystal matrix should be normalized into one row per recipe-type/crystal/ability relationship.

## Primary user experiences

- “I want Magic Haste on Aero—what crystal and recipe should I use?”
- “What are all ways to meld this command?”
- “Which option guarantees the result?”
- “Where can I farm this crystal?”
- “What commands or collectibles am I missing for this character?”
- “What must all three characters complete for the secret ending?”

## Visual direction hypothesis

Reflect Birth by Sleep's Wayfinder and command-deck identity: character-coded Terra/Ventus/Aqua accents, luminous glass panels, soft gradients, and circular/triangular Wayfinder motifs. Character color must never be the only signal; names and icons remain explicit.

## Known source risks

- The command table is extensive but does not visibly encode character restrictions or required ingredient levels.
- Recipe type is represented by opaque letters that need a documented ruleset.
- Drop locations are largely absent from the crystal source tab.
- Final Mix-only labeling is inconsistent.
- The source has spreadsheet helper content mixed into core data.
- Comprehensive collectibles and minigame data are absent.

## Release acceptance criteria

The melding tool must provide trustworthy bidirectional answers, explain probability and prerequisites, and cover every command/ability combination. The broader game guide must track character-specific and shared completion requirements without conflating save progression.
