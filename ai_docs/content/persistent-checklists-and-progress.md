# Persistent Checklists and Player Progress

## Status and scope

Accepted requirement: every supported game needs checklists with memory so players can mark progress and return without losing their place. This is MVP functionality, not a post-MVP enhancement.

This document specifies future implementation; no progress storage or application UI has been built yet.

Accepted refinement (2026-09-18): follow the [collectible compendium and linked-view contract](collectible-compendium-and-linked-views.md). World progress measures collectibles; narrative Journal updates do not enter its denominator.

## Required behavior

- Check or uncheck an individual completion item in one action from its list or detail entry.
- Automatically persist each change; no separate Save button.
- Restore checked state after navigation, refresh, app/browser closure, and offline relaunch.
- Show the same state wherever the same item appears, including compact world indexes, expanded location rows, search, recipe details, and completion dashboards. Compact and expanded checks address one stable saved record in both directions; they are not separately synchronized copies.
- Provide All, Remaining, and Completed filters, plus world/area/category filters.
- Show completed/total collectible counts by category and world with an explicit counting unit and membership. Narrative progression, conversations and character biography updates do not count. Keep crafting, challenges, records and achievements in named separate goal tracks.
- Remember the last game, section, and relevant filters; offer a clear Resume action.
- Allow undo for recent changes. Never reset progress during a content update.
- Keep completion separate from selected, focused, new, unavailable, or spoiler-hidden state.
- Checking an item is a manual player record; do not imply automatic reading of game saves.

## Progress scope

| Game | Required separation |
|---|---|
| KH1 | Game and applicable edition/platform; grouped collectibles must use a defined counting unit |
| KH2 | Game/edition, world and category; distinguish collected pieces from separate puzzle-completion requirements |
| BBS | Terra, Ventus, and Aqua where character-specific; shared accomplishments only when rules establish them |
| 0.2 | Separate game/progress namespace inside the BBS navigation family |
| DDD | Sora/Riku where required; distinguish shared collection from character-specific requirements |
| KH3 | Base-game and Re Mind requirements remain distinct; platform achievements are a separate overlay |

Proposed model: a stable playthrough/profile ID plus game, edition/ruleset, character scope, and completion-item ID. Multiple named playthroughs are a future option, not an approved MVP UI requirement. Do not key saved progress by display name, list order, or array index.

## Completion semantics

- Each checkable item represents an explicit action: found, crafted, unlocked, cleared, or threshold achieved.
- Model distinct requirements separately; owning an ingredient does not imply a recipe was crafted.
- A collectible appearing in multiple views is counted once in a given completion set.
- Parent completion is derived from its applicable child requirements; partially complete groups have an accessible mixed state.
- Quantities and multi-stage goals need appropriate counters or child steps rather than misleading single checkboxes.
- Historical acquisition/completion is not the same as current consumable inventory.
- Unknown, unsupported, or unverified requirements must not silently count as completed or nonexistent.
- An Ars Arcanum checklist percentage must not be labeled official in-game 100% unless its rule mapping is verified.
- Optional content and DLC must not silently change the denominator of a base-game checklist.
- No broad bulk-complete control is required for MVP. Any later bulk change needs explicit scope and undo.

## Persistence proposal and boundaries

Use local-first persistent browser storage for MVP, with no account required. IndexedDB is the proposed store for progress; final library/implementation selection remains open.

- Keep player progress separate from downloaded guide content and service-worker caches.
- Cache cleanup and app updates must not delete progress.
- Confirm successful storage before indicating that a change is saved.
- Handle failed writes visibly with retry or rollback; do not silently lose ticks.
- Version progress schemas and migrate transactionally using stable IDs.
- When records are renamed, preserve identity. When merged, split, or retired, use explicit migration mappings and retain unresolved records for recovery.
- Prevent simultaneous tabs from silently overwriting unrelated changes.
- Remember explicit unchecked state when needed for reliable imports or later synchronization.

Local persistence is not a permanent backup or automatic cross-device sync. Clearing site data, browser eviction, private browsing behavior, or changing devices can remove or isolate state. Communicate these limits plainly.

## Proposed backup safeguards

Include progress export/import as an MVP safeguard, subject to implementation planning:

- Export versioned JSON containing profile metadata and progress, not screenshots or copied guide data.
- Validate format, IDs, schema version, and bounds before import.
- Show target game/profile and conflict handling before applying.
- Preserve a recovery snapshot before replacing existing progress.
- Reject malformed or unsupported imports without changing saved state.
- Reset actions must name their exact scope and require confirmation; offer export first.

Cloud accounts, background sync, conflict resolution across devices, and automatic game-save import are not authorized by this requirement and remain undecided.

## Journal UI integration

- KH1–2: completion marks and counts integrated into green journal lists.
- BBS: row-end completion badges in the blue Reports treatment, with clear active-character labels.
- KH3: tile-level summaries and item-level checks in the digital menu.
- DDD and 0.2: same interaction semantics regardless of final skin.
- Text labels and semantic checkbox state supplement decorative badges.
- Keyboard and touch can toggle without opening the entry accidentally.
- Under Remaining filtering, keep focus predictable when a checked row disappears and offer undo.
- Updating progress works without any images.

## Acceptance tests for every shipped game

1. Check an item; reload and relaunch; its state and counts remain correct.
2. Check/uncheck offline; restart offline; both actions persist.
3. Open the same item through another view; state agrees.
4. Change BBS character or game; unrelated progress is unchanged.
5. Open 0.2; original BBS progress is not reused.
6. Switch applicable DLC/edition filters; totals use the intended rules without deleting history.
7. Update guide data, rename an entry, or clear media caches; existing progress survives.
8. Simulate storage failure; UI does not falsely report saved progress.
9. Modify different items in two tabs; neither change disappears.
10. Export/import round trip restores progress; invalid import leaves existing state untouched.
11. Reset cancellation preserves everything; confirmed reset affects only the named scope.
12. Keyboard/screen-reader toggling, partial groups, filtered-list focus, and undo work.
13. Restore the last section/filter and provide a usable Resume action.

## Linked collection views

The compact journal index groups collectible slots by world; opening a world expands those same records into precise location/acquisition rows. Use verified in-game ordering where available and label app-defined ordering where the game has no corresponding inventory. Group summaries are derived, not independently saved checkmarks. Filters change visible rows, not the underlying collection denominator. A checked chest appearing in several categories must not be counted several times in one world total.

Acceptance: toggle in the compact index and verify the expanded row and count; toggle back in details and verify the index, search and saved offline state. Reorder content and retain the same checks by ID. Record an access milestone or character-story update and verify world collectible progress does not change. See the shared contract for grouped rewards, explicit scopes and remaining cases.
