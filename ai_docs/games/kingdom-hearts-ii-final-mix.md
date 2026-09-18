# Kingdom Hearts II Final Mix Specification

## Status

Discovery draft based on **Kh2FM tables** and six legacy SQL/setup documents. The database scripts are implementation archaeology, not a target architecture. All game facts require verification.

## Product objective

Create a complete KH2 Final Mix companion that joins treasures, puzzle pieces, synthesis, enemy drops, equipment, missions, optional encounters, Journal requirements, and trophies into one navigable completion system.

## Legacy evidence found

The source material includes:

- Puzzle Pieces with puzzle, piece number, world, area, location instructions, and movement requirements
- Heartless and Nobody descriptions
- Magic unlocks
- Trophy/achievement descriptions
- Armor acquisition
- Missions and minigames with locations, target requirements, and strategies
- Treasure chests by world, area, contents, and description
- Keyblades, Donald's staves, and Goofy's shields with stats, abilities, and acquisition methods
- Synthesis materials, ranks, total-needed values, enemy sources, and drop rates
- Synthesis recipes, upgraded products, rank, experience, effect, and ingredient strings
- Orichalcum+ acquisition conditions
- SQL schemas and joins for items, recipes, ingredients, enemies, drops, worlds, areas, enemy locations, chests, puzzles, abilities, weapons, magic, characters, missions, and special completion items

Several workbook tabs exist but are empty: Accessories, Colosseum tournaments, Abilities, Mushroom XIII, Nobodies, and Absent Silhouettes. Empty tabs indicate intended scope, not completed research.

## Required completion modules

### World treasure and puzzle tracking

- Every treasure chest
- Every Puzzle Piece
- Puzzle set membership, number, reward, and completion state
- Required Growth Ability and minimum level
- Earliest story availability
- World/area completion totals

### Synthesis and material planning

- Every material family and rank
- Enemy sources, world/area appearances, and drop rates
- Special sources such as chests, event rewards, Absent Silhouettes, and data battles
- Every recipe and upgraded product
- Recipe rank, experience, unlock conditions, ingredients, quantity modifiers, and Serenity/Energy effects
- Collection List and Moogle level requirements
- Exact Orichalcum+ checklist
- Computed total-needed and remaining-material views

The legacy joins express a key user workflow: recipe → ingredient → source enemy/special rule → drop rate → enemy location. Preserve that relationship directly in the new domain model.

### Jiminy's Journal and completion requirements

- Story and character entries
- Heartless and Nobody entries
- Treasure totals
- Puzzle completion
- Maps
- Synthesis/Collection List
- Missions and minigames
- Olympus Coliseum cups
- Hundred Acre Wood episodes
- Atlantica songs
- Mushroom XIII
- Absent Silhouettes
- Organization XIII Replica Data
- Cavern of Remembrance
- Optional and superboss encounters
- Gummi missions and blueprints where applicable
- Platform trophies/achievements as a separate overlay

Exact edition-specific completion rules require fresh research.

### Missions and minigames

Every record needs world, area, unlock prerequisites, target score/time/rank, strategy, reward, Journal relevance, and repeatability.

### Equipment, abilities, and magic

- Sora's Keyblades
- Donald's staves
- Goofy's shields
- Armor and accessories
- Growth, action, support, and party abilities
- Magic tiers and acquisition events
- Drive Forms, summons, limits, and their progression/completion hooks

### Optional encounters

- Mushroom XIII: number, location, unlock, objective, thresholds, recommended setup, rewards
- Absent Silhouettes: location, unlock, strategy, rewards, corresponding data battle
- Replica Data: unlock and completion reward
- Sephiroth, Lingering Will, and other optional bosses
- Coliseum cups and score requirements

## Data model additions

- `journal_requirement` and `completion_rule`
- `puzzle` and `puzzle_piece`
- `growth_ability_requirement` with ability and minimum level
- `mission`, `mission_target`, and `score_tier`
- `encounter_chain` linking Absent Silhouette to Data encounter
- `recipe_variant` for base and upgraded products
- `drop_source` supporting enemies and special acquisition rules
- `platform_achievement` separated from in-game Journal completion

## Primary user experiences

- “What treasures and Puzzle Pieces remain in this world?”
- “Which missing items require a higher Growth Ability?”
- “What do I need to synthesize everything?”
- “Where should I farm this material?”
- “Which Journal missions have unmet score requirements?”
- “How do I unlock and clear Mushroom XIII number X?”
- “What is the shortest route from current progress to 100%?”

## Visual direction — green journal

Accepted user direction: KH2 shares the green Jiminy's Journal family with KH1. This replaces the earlier speculative black/silver theme.

- Green outer framing, pale cream/lime pages, visible binder cues, and burgundy category tabs.
- Purple/lavender contents panels can contrast with the lighter detail pages, as in the supplied references.
- World/category context stays visible above the content.
- Compact portrait/entry grids can organize collections when assets exist; labels remain sufficient without images.
- Completion and newly available states must be distinct and accessible.
- Single-page mobile reading; optional index/detail or facing-page composition on larger screens.
- The character-grid reference informs browsing structure, not a requirement to copy its exact arrangement.

See [shared design direction](../ui/jiminys-journal-design-direction.md).

## Known source risks

- Most SQL scripts duplicate one another at different stages.
- The scripts include TODOs, placeholder values, typos, incomplete abilities, and comments requesting better sources.
- The treasure and Puzzle Piece tables embed generated SQL beside source data; these implementation columns should not be migrated.
- The treasure range inspected contains at least 250 rows and may continue beyond the legacy review window.
- Some workbook tabs are empty.
- Descriptions and strategies may come from unattributed external sources.
- Platform and edition boundaries are not consistently recorded.

## Release acceptance criteria

A user must be able to track every KH2 Final Mix completion requirement, understand all prerequisites, calculate synthesis needs, locate every collectible, and distinguish in-game Journal completion from platform trophies without consulting another guide.
