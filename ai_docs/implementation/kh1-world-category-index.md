# KH1 world category directory

2026-10-13. Scope: KH1 Final Mix only. World pages now index nonempty categories instead of listing every related record together. The notebook layout, equal leaves, binding and viewport ownership remain unchanged.

## Category audit

- Treasures: canonical treasure acquisitions, spanning both Chests & containers and Other acquisitions boards.
- Trinities: marks.
- Upgrades: magic, abilities and summons.
- Heartless / Enemies: reference-only encounter records.
- Challenges: bosses, cups (including round references), mini-games and Gummi missions.
- Ansem's Reports; Dalmatians; Torn Pages: their existing canonical collections.
- Postcards: cards plus existing mail/reward actions. Only Traverse Town has them.
- Equipment & Items: weapons, accessories and items.
- Synthesis: first-craft recipe checks; Materials: material/farming references.
- World Notes: world routes and remaining guide/reference records.

Every world-associated catalogue ID belongs to exactly one category. Empty categories are omitted. Unknown worlds show the normal empty state. Category links preserve a world scope and a return-world context. Treasures first opens a world-scoped board directory, so both acquisition groups remain reachable. Synthesis recipe/material indices honor the world parameter without changing other games.

Enemy `world` fields often identify one recommended farming location. The enemy filter additionally uses existing explicit `facts.Worlds` lists and named world HP rows. No world is inferred from loose prose. This exposes Shadow for Destiny Islands and mushroom encounter worlds without inventing records or checks.

## Progress semantics

Counts use existing checkable IDs and verified acquisitionId equivalences. Completed/total describes tracked actions, including non-collectible challenges and first crafts. Dalmatians count puppy groups, not puppies. Reference-only categories display reference counts and no completion checkbox; mixed categories show a separate reference count. Completion marks are read-only summaries of saved item checks, never bulk-toggle controls. A zero denominator is never complete. Existing saves, undo and acquisition linkage remain untouched. Category counts are not added into a misleading world total: cross-category rewards may share an acquisition, and equipment ownership differs from physical pickup tracking.

## Validation

- Unit tests check all world entries are assigned exactly once, all links round-trip world/category context, treasure totals match canonical board cells in every world, report acquisition aliases are deduplicated, and empty/reference/partial/complete states behave correctly.
- Browser tests cover every world's category directory on desktop and phone, keyboard navigation and 44px targets, scoped treasure groups, item saves, completion marks, reload, undo, reference/challenge/notes routes, and return navigation.
- Existing full unit/browser suites and GitHub CI are required before merge; deployment must be verified against the merged commit.
