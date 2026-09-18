# Kingdom Hearts Final Mix Specification

## Status

Discovery draft based on the legacy **KH FM TABLES** workbook. All factual data must be independently verified before release.

## Product objective

Provide a complete, mobile-friendly companion for Kingdom Hearts Final Mix completion: what exists, where it is, when it becomes obtainable, what it unlocks, and how completion categories interact.

## Legacy evidence found

The workbook contains material for:

- Heartless descriptions, stats, resistances, drops, and world appearances
- Equipment and acquisition methods
- Keyblades, staves, and shields with stats, attributes, locations, and notes
- Synthesis recipes grouped by unlock set
- Aggregate synthesis materials needed, enemy sources, locations, and occasional farming strategies
- Trinity locations, colors, prizes, and traversal effects
- Ten Traverse Town postcards
- Olympus Coliseum tournaments, unlock conditions, seeds, enemies, time trials, and rewards
- All 99 Dalmatians organized in chest groups, with required abilities and locations
- Level-up rewards by starting weapon choice
- Experience curves by Dawn/Midday/Dusk progression choice
- Torn Page locations
- Magic upgrade acquisition

The workbook also contains source reminders, including a synthesis guide and KH Wiki's 99 Puppies page. These links are provenance leads only.

## Required completion modules

### Collectibles and world completion

- Dalmatians
- Trinity Marks
- Postcards
- Torn Pages
- Treasure chests
- Key items and one-time world rewards
- Ansem Reports
- Optional and secret rewards
- World-level completion summary

Each collectible needs world, area, precise instructions, prerequisite abilities or story flags, reward, earliest availability, missability status, and verification source.

### Synthesis

- Every recipe and recipe-unlock condition
- Ingredients and quantities
- Every material source
- Enemy drop rates and applicable modifiers
- Special acquisition rules
- Total material requirements for completing the synthesis catalog
- Material farming recommendations
- Derived “what am I still missing?” calculations

The old workbook separates recipes from aggregate material totals. The new model should calculate totals from normalized recipe data rather than maintain hand-entered duplicate totals.

### Equipment and abilities

- Keyblades
- Donald's staves
- Goofy's shields
- Accessories/equipment
- Stats, abilities, special properties, acquisition method, and edition differences
- Level-up abilities based on starting choices

### Magic and progression unlocks

- Fire, Blizzard, Thunder, Cure, Gravity, Stop, and Aero tiers
- Acquisition event and prerequisites
- Cross-links to collectibles gated by that spell or tier

### Olympus Coliseum

- Cup unlock requirements
- Match seeds and enemy compositions
- Solo and time-trial variants
- Rewards and completion conditions
- Optional bosses

### Journal and 100% completion

The legacy workbook is not sufficient here. Research must establish the full Final Mix completion surface, including Journal requirements, enemy entries, character entries, minigames, bosses, reports, and any platform trophy/achievement layer.

## Data model additions

- `collectible_group` for Dalmatians 1–3 style grouped rewards
- `access_requirement` for Trinity color, spell tier, movement ability, or story flag
- `progression_choice` for Dawn/Midday/Dusk and starting weapon paths
- `tournament`, `tournament_match`, and `tournament_variant`
- `synthesis_unlock_set`
- `enemy_resistance_profile`

## Primary user experiences

- “What can I complete in this world right now?”
- “Where are the Dalmatians I am missing?”
- “What does this Trinity give me, and can I reach it yet?”
- “What materials remain for every synthesis item?”
- “Where is the best place to farm this material?”
- “Which ability do I learn at this level with my starting choice?”
- “What remains for 100% or the platinum trophy?”

## Visual direction hypothesis

Capture KH1's simpler, mysterious storybook quality: deep blue night-sky surfaces, restrained gold accents, stained-glass motifs, rounded menu frames, and clear world iconography. This is a design hypothesis requiring user approval, not a locked theme.

The UI must remain readable and accessible; decorative motifs should frame content rather than imitate the game interface so closely that dense reference data becomes difficult to use.

## Known source risks

- The workbook is old and may mix original KH, Final Mix, and later collection/platform data.
- Several descriptions appear copied from external guides and require attribution/licensing review.
- “SYNTH NEEDED” is likely hand-calculated and may drift from recipe data.
- The experience chart contains a duplicate level-15 row.
- Treasure and Journal coverage is incomplete or absent.
- “Figure out tournaments” remains an unresolved legacy note.

## Release acceptance criteria

This game is not comprehensive until every defined completion category has a verified inventory, every record has acquisition/location data, cross-category prerequisites resolve correctly, and a user can derive a complete 100% checklist without another guide.
