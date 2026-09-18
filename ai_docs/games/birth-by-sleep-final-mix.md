# Kingdom Hearts Birth by Sleep Family Specification

## Status

Discovery draft covering Birth by Sleep Final Mix and the related Birth by Sleep 0.2 — A Fragmentary Passage experience. The KHBBS command-melding source is substantial but unverified.

## Product objective

Build the definitive command-melding and completion companion for Birth by Sleep Final Mix across Terra, Ventus, and Aqua, with 0.2 represented as a related Aqua-focused journal section rather than conflated with the original game's systems.

## Birth by Sleep Final Mix legacy evidence

- 297 command-melding result rows
- Result command, first ingredient, second ingredient, recipe type, and success chance
- A crystal-to-ability matrix for Shimmering, Fleeting, Pulsing, Wellspring, Soothing, Hungry, and Abounding crystals
- A small crystal/material source table mapping crystals to Unversed
- A catalog of approximately 150 commands grouped as Attack, Magic, Friendship, Movement, Defense, and Reaction
- Some Final Mix-only commands identified in labels

Spreadsheet helper cells such as “DO NOT TOUCH” are implementation details and must not become product data.

## Birth by Sleep Final Mix completion modules

### Command melding

- Every valid command combination
- Ingredient order behavior, if relevant
- Result command and probability
- Recipe/type code translated into explicit rules
- Required ingredient levels
- Character availability
- Shop, chest, board, or event alternatives
- Rare-result behavior
- Final Mix/version restrictions

### Ability synthesis

- Every crystal
- Ability produced for each recipe type
- Ability category and maximum useful stacks
- Recommended reliable meld path
- Crystal sources and drop rates
- Character-specific exceptions
- Explanation of permanent ability learning

The tool must answer both directions:

- “What can I make from these two commands?”
- “How do I make this command with this ability?”

### Command catalog

- Attack, Magic, Item, Friendship, Movement, Defense, and Reprisal commands
- Shotlocks
- D-Link commands
- Finish Commands
- Character restrictions
- Acquisition and leveling requirements

### Character progression and completion

Track Terra, Ventus, and Aqua separately while sharing common reference data:

- Treasures by world and character
- Sticker locations and placement rewards
- Xehanort Reports
- Commands and abilities
- Shotlocks and D-Links
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
- Final Episode and Secret Episode requirements
- Platform trophy/achievement overlay

### Materials and enemies

- Crystal/material family
- Enemy source
- World/area and drop rate
- Special conditions
- Best farming route
- Lucky Strike effects

## Birth by Sleep 0.2 — A Fragmentary Passage

### Scope boundary

0.2 belongs in the Birth by Sleep family because it follows Aqua and extends that story, but it has its own completion state, mechanics, objectives, and release/platform applicability.

Do not reuse BBS command-melding or three-character progression structures for 0.2.

### Required completion modules

- Story objectives
- Optional objectives and exact completion requirements
- Treasure chests
- Wardrobe items and unlock conditions
- Areas within the Realm of Darkness
- Enemy/adversary entries
- Magic and combat progression
- equipment and abilities
- optional encounters
- Critical Mode and difficulty-specific requirements
- platform trophies/achievements
- secret/ending unlock requirements
- version and collection membership

### Required record fields

For an objective:

- Objective number and canonical name
- Description
- Unlock timing
- Area/location
- Exact condition
- Strategy
- Reward
- Difficulty or version applicability
- Completion state

For a treasure or wardrobe item:

- Category
- Area
- Precise location
- Prerequisite
- Acquisition instructions
- Related objective or reward

### 0.2 primary user experiences

- “Which objective am I missing?”
- “Where is this treasure or wardrobe item?”
- “When does this objective become available?”
- “Does difficulty affect this requirement?”
- “What remains for every trophy?”

## Shared data model additions

- `game_family`
- `playable_character`
- `command` with category and character availability
- `meld_recipe`
- `meld_ability_result`
- `command_level_requirement`
- `completion_state` scoped by character and game
- `objective`
- `wardrobe_item`
- edition/platform applicability
- release-collection membership

The legacy wide crystal matrix should become one row per recipe-type/crystal/ability relationship.

## Primary user experiences

- “I want Magic Haste on Aero—what crystal and recipe should I use?”
- “What are all ways to meld this command?”
- “Which option guarantees the result?”
- “Where can I farm this crystal?”
- “What commands or collectibles am I missing for this character?”
- “What must all three characters complete for the secret ending?”
- “What remains in Aqua's 0.2 objectives?”

## Ars Arcanum visual direction — blue Reports

Accepted user direction: Birth by Sleep uses the blue Reports journal treatment shown in the supplied references.

- Cobalt/royal-blue framing with cyan header accents.
- Deep navy, lightly starry contents surfaces with violet-blue list panels.
- Pale icy-blue reading pages for tables, collectibles, and detailed entries.
- Binder-ring cues and burgundy section tabs maintain the journal relationship to KH1–2.
- Clear character name and emblem identify Terra, Ventus, or Aqua; character accents are secondary to the shared blue theme.
- Completion badges align with rows; rewards and point thresholds remain scannable.
- The Sticker Album reference informs reward-table hierarchy. Album art is optional and not required for MVP.
- On phones, collapse the portrait/contents spread into a compact character header and full-width content.
- 0.2 remains part of the BBS family, but its exact visual variation awaits additional inspiration; do not treat the earlier dark/fragmented suggestion as approved.

See [shared design direction](../ui/jiminys-journal-design-direction.md).

## Known source risks and gaps

- Meld data lacks clear character restrictions and required ingredient levels.
- Recipe type uses opaque letters needing a documented ruleset.
- Drop locations are largely absent.
- Final Mix-only labeling is inconsistent.
- Broader BBS completion content is absent from the legacy workbook.
- No legacy 0.2 dataset has been identified.
- 0.2 platform, objective, treasure, wardrobe, and trophy data all require new research.

## Release acceptance criteria

The BBS melding tool must provide trustworthy bidirectional answers and the guide must track character-specific completion accurately. The 0.2 section must independently account for every objective, treasure, wardrobe unlock, and platform completion requirement without suggesting that BBS meld/progression systems apply to it.
