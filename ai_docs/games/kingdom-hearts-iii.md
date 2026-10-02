# Kingdom Hearts III Specification

## Current research and implementation status — 2026-10-01

KHIII/Re Mind canonical content now has **1954 entries + 286 recipe actions**. The [current per-ID ledger](kh3/audit-resolution-2026-10-01.md) records **13 partial, 19 resolved, 3 conflicted**, with exact consulted sources and remaining evidence boundaries. Full 88-recipe synthesis, all applicable blade ladders, 20 photo routes, 10 Slider prizes, 81 adversaries/54 records and 14 DLC strategies are integrated. Gummi has all 46 mission predicates and expanded catalogs, with all 45 fragment approaches; all nine spheres now have built-in marker flight approaches. This is not a claim that every acquisition route or platform predicate is ready.

Current scope and acceptance requirements below remain binding. Jiminy remains empty; shared runtime/UI validation is assessed separately from factual resolution.

## Historical baseline and enduring requirements

## Historical status (superseded)

Research baseline established on 2026-09-18; not implementation-ready. No reusable KH3 KHTABLES data was identified after auditing the inventory and ambiguous legacy documents. See the [research set](kh3/README.md), [source manifest](kh3/sources-and-conflicts.md) and [readiness matrix](../readiness/kingdom-hearts-iii.md).

## Product objective

Provide a Kingdom Hearts III acquisition compendium: where a collectible, ingredient, material or equipment item is and how to obtain it, covering updated base-game content and explicitly separated Re Mind episodes.

Apply the accepted [collectible compendium and linked-view contract](../content/collectible-compendium-and-linked-views.md), [synthesis and inventory contract](../content/synthesis-and-inventory.md), and [testing/content-validation contract](../testing-and-content-validation.md). The user plays Steam. The app is openly spoilerific: no spoiler warnings, hiding or reveal controls. Do not track story milestones or offer an Available Now/progress-gate filter; explain necessary prerequisites in the acquisition text.

World percentages count applicable collectibles only, not plot, biographies or ordinary conversations. Compact world marks, expanded detail rows, search and Data Jiminy resolve to one stable record and one saved state. Preserve verified journal order/numbers without making display order the storage key. Filters do not change full denominators.

Inventory is optional and opt-in. When enabled, show owned/required ingredient quantities as x/y, with tested game-specific synthesis and forging formulas. Inventory and first-crafted history are distinct. Synthesis remains a first-class module.

React offline PWA, local persistence, bundled SLM/per-game Coppermind, text directions and media support remain MVP. Only missing production screenshot/map images are deferred. Initial functionality testing targets Apple browsers/iPhone/iPad; Android follows. User gameplay or a complete user playthrough is not a release gate.

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
- Character files and glossary as reference/search context, without narrative completion gates
- Secret Reports
- Photo Missions
- synthesis records
- category collection counts and exact goal predicates, separate from narrative Journal state

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
- constellation photographs and their blueprints
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
- `acquisition_event` linking collectible, contained item and reward without duplicate counting
- `save_profile`, `save_lineage`, `edition_status` and `content_entitlement`
- `material_discovery`, `inventory_quantity`, `crafted_once` and independent `recipe_unlock`

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

## Current evidence and remaining data

The canonical compendium contains 1954 entries and 286 recipe actions. All 245 base chests, 90 emblems and nine Re Mind chests have pickup directions. Synthesis includes 88 recipes/history outputs and 78 ordered Collector Goals. Blade properties/forge ladders, 54 Game Records, 81 adversaries, 23 Classic controls, 20 photo routes, ten Slider prizes and fourteen DLC strategies are integrated. Gummi includes all 45 fragment approaches, 13 special weapons and 46 mission predicates. The [continuation report](kh3/research-continuation-2026-10-01.md) records 59 newly normalized shop rows and the full follow-up evidence.

The remaining conflicts are Forest Clasp’s exact deadline, seven Flan threshold equalities and PRO rank B. Earliest collectible access, modern labels, every alternative source quantity, medal roll distributions, replenishment/reset timers, Gummi cost/AP progression and platform-specific save/code/achievement cases remain scoped evidence limits. Toy Box emblem 8 and crafted-history marker behavior are resolved.

The [edition audit](kh3/editions-and-dlc.md) separates free updates from Re Mind and dated platform entitlements. Native October 8, 2026 editions remain announced/unreleased as of October 1; the official Cloud transfer promise is not a documented procedure. Consult the [readiness matrix](../readiness/kingdom-hearts-iii.md) for current coverage and application acceptance. No user replay is required to close a research finding.

## Release acceptance criteria

A player can find/acquire the specified collectibles, materials and equipment from complete text guidance and clearly see separate base, Re Mind, recipe, record and achievement goals. The app must pass meaningful calculation, linked-state, offline, migration, backup and mobile functionality checks, with source conflicts represented honestly. No full narrative Journal reproduction, Available Now tracking, spoiler controls or user playthrough gate is implied.


Current gap-closure integration (2026-10-02): 28 obtainable medal variants and five activity/rank pools, 151 acquisition links across 104 equipment records, 12 material/sphere quantity links, 172 landmark route groups across all 59 ingredients, Final World copy-recovery directions, and an attributed 99-level combined Main + Teeny cost table. See [the closure report](kh3/gap-closure-2026-10-02.md) for evidence and the precise remaining boundaries.
