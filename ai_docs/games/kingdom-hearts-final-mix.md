# Kingdom Hearts Final Mix Specification

## Status

Planning draft based on the legacy **KH FM TABLES** workbook and the **2026-09-18 sourced research pass**. Concrete reference tables and citations now live in [KH1FM research](kh1fm/README.md). Research, transcription, normalized app data and hands-on verification are separate statuses; this is not yet a release-complete guide.

## Supported release baseline and readiness

Use modern Final Mix releases. Original/non-Final-Mix and PS2-era compatibility are out of scope. Reconcile legacy data against the modern baseline; preserve only relevant modern platform differences. See the [readiness workbook](../readiness/kingdom-hearts-final-mix.md) for data gaps, user decisions, and validation gates.

## Sourced planning reference

- [Collectibles and progression](kh1fm/collectibles-and-progression.md): counts, rewards, unlocks, magic, summons and ending conditions.
- [All 33 synthesis recipes](kh1fm/synthesis-recipes.md): ingredient quantities, unlock sets and recalculated direct totals.
- [Farming and equipment](kh1fm/synthesis-farming-and-equipment.md): material sources, special-enemy mechanics and 48 obtainable party weapons.
- [Challenges, Gummi and run goals](kh1fm/challenges-gummi-and-run-goals.md): cup variants, bosses, minigames, 30 missions and 48 blueprints.
- [World and coverage audit](kh1fm/world-and-coverage-audit.md): inspected per-world sources, D01–D19 coverage and exact remaining work.

Citations are attached to the relevant facts in these documents. Content answers and directions must be stored in the offline game package; an external citation link cannot substitute for the guide itself.

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

### Synthesis — first-class feature

Follow the [shared synthesis and inventory contract](../content/synthesis-and-inventory.md). Optional opt-in material inventory adds owned/required (x/y) ingredient reminders and remaining-material calculations. Recipe reference remains complete with inventory off. Validate shared-stock allocation, craftable-material dependencies, historical crafted state and accurate farming shortfalls; no automatic stock deduction from a historical check.

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
- All six summons, including summon-gem acquisition and restoration
- Cross-links to collectibles gated by that spell or tier

### Olympus Coliseum

- Cup unlock requirements
- Match seeds and enemy compositions
- Solo and time-trial variants
- Rewards and completion conditions
- Optional bosses

### Collection views and separate completion goals

Use the [shared compendium and linked-view contract](../content/collectible-compendium-and-linked-views.md). A compact world-grouped collection index and expanded world location rows share the same stable saved item IDs. Checking or unchecking either view updates both, search and derived summaries, including offline. Apply this to treasures, puppy groups, Trinities and other collections with detail records.

KH1's in-game Journal has no comprehensive treasure inventory; use explicitly app-defined treasure ordering rather than claiming official chest numbers. Preserve verified Journal ordering for categories that have it.

World percentages count collectible acquisition records with documented counting units. Exclude narrative flags, routine conversations and character biography updates. Full Chronicles/Characters/Heartless entry-update manifests are not required. Keep enemy information needed for drops, encounters and acquisition guidance.

The [sourced reference](kh1fm/collectibles-and-progression.md) includes all 13 Report acquisitions. Necessary access conditions and acquisition conversations remain in entries; a full story walkthrough does not. Maintain collection, synthesis, equipment, challenges, Gummi completion, secret unlocks and platform achievements as separate requirement sets. Where an actual trophy or unlock requires Journal completion, state that condition accurately in that goal's guidance without treating world collection percentage as proof. An achievement threshold is not the complete collection denominator.

### Gummi completion and other records

Include all 30 Final Mix missions, the 48-blueprint roster, all relevant parts and acquisition methods, route/enemy information and practical mission build guidance. Track installed blocks, collected blocks, score, enemy/obstacle counts and restrictions distinctly. See [Gummi research](kh1fm/challenges-gummi-and-run-goals.md).

Include Jungle Slider, Vine Swinging, Phil's Training, Hundred Acre Wood records, Clock Tower rewards, mushroom challenges, early-world activities and incidental interaction rewards. A chest-only checklist is insufficient.

### Modern achievement and restricted-run guidance

Use HD 1.5 + 2.5 ReMIX rules; maintain platform-specific IDs and conditions. Model difficulty stacking, equipment restrictions, Continue usage and time limits. A route recommendation must distinguish convenient separate runs from mechanically required separate runs. Detailed edge cases remain explicit research tasks.

## Data model additions

- `collectible_group` for Dalmatians 1–3 style grouped rewards
- `access_requirement` for Trinity color, spell tier, movement ability, or story flag
- `progression_choice` for Dawn/Midday/Dusk and starting weapon paths
- `tournament`, `tournament_match`, and `tournament_variant`
- `synthesis_unlock_set`
- `enemy_resistance_profile`

## Primary user experiences

- “Which collectibles am I missing in this world, and where are they?”
- “Where are the Dalmatians I am missing?”
- “What does this Trinity give me, and can I reach it yet?”
- “What materials remain for every synthesis item?”
- “Where is the best place to farm this material?”
- “Which ability do I learn at this level with my starting choice?”
- “What remains for 100% or the platinum trophy?”

## Visual direction — green journal

Accepted user direction: KH1 and KH2 share the green Jiminy's Journal family, based on the supplied journal references. This replaces the earlier speculative blue/stained-glass palette.

- Emerald/forest-green framing with lime accents and pale cream-green reading pages.
- Binder-ring or page-edge cues, subtle paper texture, and restrained ruled lines.
- Burgundy section tabs, clear section titles, and compact completion marks.
- Page-based lists, indexes, and entry details; distinct KH1 refinements await further inspiration.
- On phones, use one readable page with compact navigation rather than shrinking a two-page console screen.
- Portraits and illustrations are optional; no empty portrait space or borrowed screenshot assets in MVP.

See [shared design direction](../ui/jiminys-journal-design-direction.md) for reference interpretation and accessibility requirements.

## Known source risks

- The workbook is old and may mix original KH, Final Mix, and later collection/platform data.
- Several descriptions appear copied from external guides and require attribution/licensing review.
- “SYNTH NEEDED” is likely hand-calculated and may drift from recipe data.
- The experience chart contains a duplicate level-15 row.
- Exhaustive treasure and acquisition-route coverage is incomplete. Full narrative Journal tracking is outside the accepted compendium scope.
- The legacy “Figure out tournaments” note is partly resolved by sourced unlock/variant/reward tables; complete seed and intermediate-reward imports still remain.
- Energy Bangle has conflicting Spirit Shard quantities in public sources; the recipe reference uses 2 provisionally and flags the resulting total for verification.

## Release acceptance criteria

This game is not comprehensive until every scoped collection and completion-goal category has a verified inventory, every relevant record has acquisition/location guidance, dependencies resolve, and a player can find and track the missing items without another reference guide. Verify that compact and expanded checks persist as one state and narrative updates never inflate collectible percentages. Full story walkthrough and biography-update coverage are not release gates.

## Accepted presentation and testing decisions

Fully spoilerful: no warnings, hiding or reveal controls. No Available Now filter or manual story/ability progress-gate tracker. Item directions still state necessary abilities/access conditions such as High Jump.

User game context is Steam. Test app functionality first on Apple browser, iPhone and iPad; Android follows. No user gameplay or playthrough verification gate. Follow [testing and content validation](../testing-and-content-validation.md); source conflicts remain research work.
