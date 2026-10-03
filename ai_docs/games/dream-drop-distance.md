# Kingdom Hearts Dream Drop Distance HD Specification

**Critical re-audit:** [Current corrections](dddhd/critical-reaudit-2026-10-02.md) re-examine three overbroad deferrals, resolve the adapter defect, and add recipe-mode, repeat-farming, concrete bonus and high-score instructions.
**2026-10-02 practical review:** 1,285 entries / 263 formulas. Research disposition: 8 resolved, 14 deferred, 3 open; evidence: 8 resolved, 16 partial, 1 blocked. [Current player-goal review](dddhd/practical-review-2026-10-02.md) and [deferral reasons](dddhd/future-improvements.md) supersede older exhaustive-research task lists below. The Jestabocky connector is normalized from explicit source evidence; open questions cover Aura Lion’s red secret, colliding custom recipes and saved wrong-answer ending recovery. Stable IDs and empty Data Jiminy remain preserved; application/UI acceptance is separate.

2026-10-01 historical checkpoint: 1,283 generated entries and 263 formulas; all 54 boards, 124 commands, 43 abilities/Links, 346 portal identities and 54 Steam achievements are represented. Data Jiminy remains empty. See [all current per-ID dispositions](dddhd/audit-dispositions.md).

## Status

Updated 2026-10-02. Generated runtime is integrated; 8 research families are resolved, 14 precision families are deferred, and DDD-004/006/025 remain open. Evidence statuses independently remain 8 resolved, 16 partial and 1 blocked. The actual **KH3D DATABASE PROJECT** remains a historical mixed-edition prototype; its omissions are distinguished from current integrated data in the [research pack](dddhd/README.md) and [readiness audit](../readiness/dream-drop-distance.md).

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

Quick Blitz acquisition is corrected to 100 munny, or 80 during Bargain Flurry, at Shop LV 1. Its conflicting historical article prose is retained in canonical evidence. Strike Raid still has conflicting 22/24-second reload values; neither is certified.

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

Research now supplies all 438 chest pickup landmarks (Sora 225, Riku 213), 346 portal identities including 78 Special / 11 Secret portals, 14 ordinary Dives, ten Flick Rush cups and a 15-type Keyblade acquisition catalog. The known final-world order conflict is resolved: Riku’s Curaga is HD Reports #2 and Doubleflight #3; historical guide numbers and stable IDs are retained. Chest earliest-access, minimum-movement and returnability coverage remains incomplete. Portal approach and first/repeat reward semantics retain specific residuals. Follow [worlds](dddhd/worlds-and-collectibles.md), [Spirits/commands](dddhd/spirits-and-commands.md), [portals/challenges](dddhd/portals-and-challenges.md), and [rewards/achievements](dddhd/rewards-and-achievements.md).

All 54 DDD Steam achievement names are now mapped to independently observed native API keys in [canonical key provenance](dddhd/steam-key-provenance.json). Checklist IDs stay separate and unchanged. Other-platform native IDs and undocumented internal unlock counters remain unverified and deferred for the current manual Steam checklist. API identifiers and source reconciliation belong in centralized provenance, not player instructions.

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

DDD visual references are now supplied: [Reports and Help screenshots](../ui/references/dddhd/README.md). Reports uses magenta tabs and pale ring-bound pages; the separate Help menu uses cyan/violet. The earlier generic neon proposal is not a substitute for these references. Initial application acceptance targets Apple browser/iPhone/iPad; Android follows. Preserve accessible compact marks/expanded rows, keyboard/touch operation and reduced motion.

The app is spoilerific. No spoiler warnings, hidden content or reveal controls. No Available Now/progress-gate tracking or filtering; acquisition/access conditions remain concise text guidance.

## Known source risks

- The workbook uses surrogate lookup structures intended for a relational database rather than user-facing content.
- Spirit attributes and style types appear incompletely populated in the Spirit table.
- Affinity-board unlocks are flat and omit board topology and prerequisites.
- “Best base” is asserted rather than derived.
- Command descriptions appear to have lost controller-button glyphs.
- The workbook mixes HD master names with older recipe/board coverage; Frootz Cat, Kab Kannon and R & R Seal formulas change materially in HD.
- Aura Lion's public board table/footnote disagree about the red-secret coordinate; preserve this source conflict visibly. Jestabocky A-3 exists, but its Right connection does not reciprocate B-3’s Left connection; no edge is invented.
- External text may require attribution or rewriting.

## Release acceptance criteria

A user must be able to locate collectibles, plan Spirit creation, use source-backed Ability Link paths and explicit reward detours where a board is disputed, understand Link pairings, find every verified acquisition route and track scoped progress without needing another guide. Acceptance validates sources, formulas and application behavior; it does not require the user to perform a manual gameplay/playthrough gate.

All specified feature modules remain MVP. The 14 factual-precision deferrals in the practical review are now optional research, alongside absent production screenshot/map assets. Usable text acquisition guidance, media fields/support and fallback tests remain required; a deferral must not fabricate a missing fact or hide a player-blocking question.

## Linked collectible state and counting

Follow [collectible compendium and linked views](../content/collectible-compendium-and-linked-views.md). Each compact mark and expanded location row uses the same stable collectible record and persisted state. World pages, master indexes, search, reverse acquisition views and Data Jiminy synchronize both directions. Filters never shrink denominators.

World collection percentages count scoped collectible records only, never plot/character biographies. Count each chest once regardless of contained quantity; distinguish Sora/Riku chest inventories. Shared Spirit breed acquisition, owned Spirit instances, board nodes, recipe items, ingredient formulas and acquired commands are separate concepts linked by acquisition events. Portal/challenge and platform goals have separate denominators.

Add `collectible`, `acquisition_event`, `acquisition_route`, `spirit_instance`, `recipe_item`, `recipe_outcome`, `owned_material`, `achievement_requirement` and source/edition/confidence records to the planning model. Stable IDs and migrations preserve progress when labels, numbering or routes are corrected.

## Crafting, inventory and application validation

Follow [synthesis and inventory](../content/synthesis-and-inventory.md) and [testing/content validation](../testing-and-content-validation.md). Crafting is first-class; validate ingredient names/quantities, alternate outcomes, probabilities, rank boosts, forecast/difficulty conditions and aggregate material calculations. Optional opt-in inventory shows owned/required (x/y) per ingredient. The compendium and calculators work without inventory entry; never require users to maintain story-gate state.

React offline PWA, persistent local progress, backup/restore/migration, bundled local SLM and the DDD Coppermind for Data Jiminy remain MVP. Source conflicts produce qualified answers rather than invented certainty. Initial functional checks cover Apple browser/iPhone/iPad, with Android follow-up.

The [research-source manifest](dddhd/sources.md) states exactly what was inspected. Community source evidence is not in-game verification, and missing evidence stays explicit. A source-backed content pass plus application tests replaces a required manual player walkthrough.

