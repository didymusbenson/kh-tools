# Kingdom Hearts III Specification

## Status

Initial scope specification. No legacy KHTABLES source material has been identified for Kingdom Hearts III.

## Product objective

Provide a definitive Kingdom Hearts III completion journal covering the base game, supported platform editions, and clearly separated downloadable or expanded content such as Re Mind.

## Required completion modules

### World and treasure completion

- Every treasure chest
- World, area, precise location, and route
- Required progression or abilities
- Maps and area completion totals
- Missability and revisit availability
- Photo/location context where useful

### Lucky Emblems

- Every Lucky Emblem
- World and area
- Precise visual/location description
- Suggested camera position
- Earliest availability
- Reward thresholds
- Progress tracking and world totals

### Synthesis, materials, and workshop

- Every synthesis recipe
- Unlock conditions
- Ingredients and quantities
- Material acquisition sources
- Enemy drop rates and locations
- Battlegate or special sources
- Computed totals and remaining requirements
- Ultima Weapon path
- Workshop Collector's Goals and related milestones

### Keyblades and equipment

- Every Keyblade and acquisition method
- Stats and abilities
- Formchanges
- upgrades and required materials
- armor and accessories
- character equipment
- item sources and special rewards

### Cooking and ingredients

- Every ingredient
- acquisition sources and farming locations
- every recipe
- Little Chef ranks/results
- bonuses and full-course effects
- Flantastic Seven ingredient/reward relationships
- cooking completion requirements

### Gummiphone and records

- Adversaries
- Treasures
- Lucky Emblems
- Classic Kingdom games
- Game Records
- Character files and glossary entries
- Secret Reports
- Photo Missions
- synthesis records
- completion percentages and their exact rules

### Minigames and challenges

- Flantastic Seven
- Classic Kingdom
- Verum Rex: Beat of Lead
- Festival Dance
- Frozen Slider and treasures
- Flash Tracer
- Hundred Acre Wood
- optional world-specific challenges
- score thresholds, rewards, and strategies

### Combat and optional encounters

- Battlegates
- Dark Inferno
- optional and secret bosses
- EXP and material farming
- challenge/Pro Code interactions where relevant
- Critical Mode considerations

### Gummi Ship

- Routes and zones
- treasures and blueprints
- enemy constellations
- missions, ranks, and rewards
- ship parts and customization
- optional bosses
- completion requirements

### Re Mind and expanded content

Keep add-on progress distinct from base-game completion:

- Re Mind scenario
- Limitcut Episode
- Secret Episode
- Data Organization XIII
- secret boss
- Data Greeting
- Premium Menu: EZ Codes and PRO Codes
- merit/challenge requirements
- add-on-specific trophies/achievements
- save-data and unlock prerequisites

### Platform achievements

- Trophy/achievement sets by platform
- Base game versus add-on grouping
- Requirements mapped to in-game completion records
- Platform/release differences

## Data model additions

- `lucky_emblem`
- `keyblade_upgrade_level`
- `formchange`
- `ingredient` and `cooking_recipe`
- `cooking_result`
- `photo_mission`
- `game_record`
- `classic_kingdom_game`
- `battlegate`
- `gummi_zone`, `gummi_mission`, and `gummi_blueprint`
- `dlc_content_set`
- `premium_menu_code` and `merit`
- `platform_achievement`

## Primary user experiences

- “What am I missing in this world?”
- “Where is this Lucky Emblem or treasure?”
- “What do I still need for Ultima Weapon?”
- “Where can I farm this material or ingredient?”
- “Which Game Record is incomplete?”
- “What score or rank does this minigame require?”
- “What remains in the base game versus Re Mind?”
- “Which Gummi objectives count toward completion?”

## Journal presentation — digital Gummiphone-style menu

Accepted user direction: KH3 uses a more menu-like digital journal, based on the supplied Gummiphone screenshot. It does not need a literal book, parchment, or binder.

- Dark navy/indigo star-field atmosphere with restrained constellation-like lines.
- Rectangular blue/violet category tiles, prominent readable icons, and explicit labels.
- Cyan/blue selected-state highlights and warm completion badges.
- A world/context panel may appear on larger screens when useful assets exist; it must not leave an empty character-art column in MVP.
- Responsive tile counts and full-width detail panels on phones; do not shrink the console screenshot.
- Preserve the same search, progress, cross-links, accessibility, and edition controls as other games.
- Text and location instructions remain complete without images.

This supersedes the earlier bright-page palette proposal. The journal is the information model; its presentation here is digital.

See [shared design direction](../ui/jiminys-journal-design-direction.md).

## Known research gaps

- Exact base-game completion formula and Gummiphone category rules
- Complete platform and patch differences
- Re Mind/platform achievement distinctions
- Exact minigame rank thresholds
- Record-level authoritative sourcing
- Whether later releases bundle DLC in ways that affect edition labeling

## Release acceptance criteria

A player must be able to account for every base-game and Re Mind completion item, trace every material and collectible to an acquisition path, distinguish optional records from required completion, and understand platform-specific achievement requirements without another guide.
