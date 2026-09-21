# Collectible compendium and linked checklist views

Status: **Accepted user direction, 2026-09-18.** Applies to every game and any checklist whose items have collection/acquisition details. This refines the journal metaphor and supersedes earlier assumptions that reproducing every narrative Journal flag is a release requirement.

## Product focus

Ars Arcanum is a compendium for finding and obtaining things: “Where is this thing?”, “What do I need to reach it?”, and “Which collectibles am I missing?”

World collection checklists and percentages represent collectibles: treasures, Trinities, puzzle pieces, stickers, emblems, reports and other applicable acquisition items. They do not measure plot progression, conversations, character biography updates or every narrative condition in the in-game Journal.

Synthesis/melding, equipment, commands, optional encounters, minigame records, Gummi content and platform achievements retain their previously accepted scope as separately named tools and goal tracks. This decision changes the world collection denominator and walkthrough expectations; it does not silently remove those modules.

## Two presentations, one saved item

| View | Required presentation |
|---|---|
| Condensed collection index | Group by world. Show category counts and compact item marks in the game's journal order/numbering where that exists. Individual marks represent individual collection records; a world summary is derived. |
| World details | Show the same items as expanded rows with area, exact text location, acquisition instructions, relevant prerequisites and reward/content. Include the same check control. |
| Search, entry links and Data Jiminy results | Resolve to those same collection records, with current saved state and a direct route to the corresponding detail row. |

Checking or unchecking a compact mark updates the matching detailed row; checking or unchecking a detailed row updates the compact mark and summaries. Neither view owns a separate copy of completion state. The relationship is bidirectional and remains correct offline, after navigation and after relaunch.

This pattern generalizes to every collection checklist with detailed entries. Use a useful game-specific grouping when an item has no natural world, rather than assigning a fictional world.

## List identity and ordering

- Save progress against stable item/acquisition IDs scoped to the applicable game, ruleset, player profile and character. Display position, item name, world label and journal number are not storage keys.
- Preserve verified in-game journal order and numbers when available, so a player can compare their game with the compact list.
- If the game lacks an equivalent journal list, provide an Ars Arcanum world index. Label app-assigned ordering as app ordering; do not invent official journal numbering. KH1 treasure presentation may use this approach.
- Compact marks have accessible item labels. Distinguish toggling a check from opening its location details, especially on touch screens.
- Opening a compact item locates/highlights its detailed row; returning preserves useful list position and filters.
- Renames, sorting changes, grouping changes and responsive layouts never create new progress identities.

## Accepted inline browsing direction — September 20, 2026

Human feedback now specifies single-column item rows, details that expand inline, and category-level expand/collapse controls. Remove deeper nested item-page navigation beyond categories such as Trinities. Keep the player in the current collection view while reading acquisition details. This supersedes any earlier standalone-item-page interpretation of the compact/detail relationship in this contract; stable IDs, shared check state, counting rules, filter context and useful acquisition information remain required.

Apply this direction to KH1 Final Mix first and retain it as the pattern for later games. The main game-selection menu remains unchanged. Implementation is in progress, pending verification and human review.

Saved fallback alternatives, only if human review rejects the inline expandable version:

1. An individual item opens in a compact detail-card modal.
2. A category detail page/table shows all relevant items for the current world/category together.

These alternatives are preserved in the [human feedback record](../implementation/human-feedback.md#saved-backup-alternatives); they are not extra modes to implement during the current pass.

## What each detail needs

Provide world and area; a recognizable text landmark; where to approach from if the route is ambiguous; the collection action; the reward/content; required movement/spell/character or access condition; and verified missability/revisit behavior. Include compact source links and optional media references.

Instructions must be sufficient without a screenshot. Render cleanly with no image; production screenshots and map images are added only when assets exist. Media support and tests remain MVP.

A prerequisite such as “requires High Jump,” “return on the second visit,” or “speak to this NPC to receive the report” is appropriate. Routine “talk to Mulan to advance the plot” instructions are not a standalone checklist requirement. Preserve a conversation when it directly grants a collectible or is essential to explain its access.

## Percentage and counting rules

- Label the main world metric **World collectibles** or an equally explicit collectible label. Do not label it official Journal 100% or story completion.
- Numerator: completed applicable collection units. Denominator: all applicable units in the declared world's collection set. Show the count as well as the percentage.
- Category summaries expose their counting units. Three puppies in one chest can be one group/check with three puppies recovered; those are two display units, not four separate actions in the same aggregate.
- A collectible shown in the compact index, expanded view, search and a reward reference contributes once to the same collection set.
- If two catalog entries are satisfied by the same verified acquisition event, link that event and avoid double-counting it in an aggregate. Preserve distinct actions: activating a Trinity and later opening a newly accessible chest are not automatically the same action.
- World parent completion is derived from child records. Partial groups have an accessible mixed state. A condensed world status is not an implicit bulk-complete button.
- Remaining/search/area filters do not redefine the full world denominator. Make a filtered result count visually distinct from full-world collection progress.
- Character-specific BBS and DDD collections remain correctly separated. Shared records count once in the applicable scope. 0.2 and Re Mind boundaries remain explicit.
- Unknown/unverified inventory totals must not produce a false 100%. Unsupported or inapplicable categories are distinct from missing data.
- Global crafted-item, equipment, challenge, story-dependent achievement and Gummi goals use their own declared sets. They do not silently inflate a world's collectible percentage.

## Narrative and Journal boundaries

The journal is the presentation and browsing reference. Reproducing its complete internal narrative state is not the current objective.

Full Chronicles transcripts, exhaustive character biography/update manifests, ordinary conversation flags and a step-by-step story walkthrough are not required deliverables or release blockers. Existing researched information can remain as reference without becoming mandatory checklist work. Enemy facts needed for materials, encounters or collectible acquisition remain in scope; tracking every bestiary narrative update is not implied.

A trophy or a secret unlock may require actual Journal completion. State that requirement accurately in its separate reference/goal track without claiming that the collectible percentage proves it. No full story walkthrough is thereby introduced.

Accepted 2026-09-18: omit Available Now filtering and manual access/ability/story milestone tracking. Keep prerequisite facts in item directions. An unchecked item never means inaccessible. The app is fully spoilerful; no spoiler warnings or reveal controls.

## Persistence and acceptance

Use the [persistent progress contract](persistent-checklists-and-progress.md) for saving, offline behavior, undo, migrations and storage errors. A save failure must produce a consistent retry/rollback state in every open representation.

1. Toggle an item in the compact world list; its expanded row and world/category counts immediately agree.
2. Toggle the expanded row back; the compact mark agrees, including after offline relaunch.
3. Open the item through search or Data Jiminy; it resolves to the same record and location.
4. Change sorting, labels or journal display numbers; progress remains attached to the item.
5. Apply Remaining or area filters; full-world progress keeps its denominator.
6. View grouped rewards or an item in several categories; aggregate counts do not duplicate the same acquisition.
7. Switch character, game or DLC scope; unrelated checks remain intact.
8. Acquisition prerequisite text and narrative reference content never add checks or change collectible percentages; no progress-gate tracker is presented.
9. With zero images, the detailed list still provides usable location/acquisition directions.
10. With incomplete inventory evidence, the UI does not present a certified complete world.
