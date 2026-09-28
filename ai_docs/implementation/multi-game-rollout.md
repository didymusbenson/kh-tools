# Multi-game refinement rollout

September 20–21, 2026. User requested the KHFM refinement lessons be documented and applied by game-specific agents, excluding Data Jiminy. See [the governing playbook](refinement-playbook.md).

## Delivered

All six journals open from the existing game selector. KHFM retained its established implementation, received a focused review and corrected workshop accessibility/backup wording. Five new game configurations and sourced catalogs use a common journal interface with distinct accent colors and menu icons.

- Worlds hubs and collection-type destinations; world and character filters, search and completion filters.
- Single-column inline expandable rows, bulk expansion, separate completion controls, stable alias identities and full category/world progress denominators.
- Crafting tabs with recipes, grouped materials, always-visible owned stock and direct-input farming targets. Recipe operations retain character scope and probability caveats; 0.2 has no invented workshop.
- Collapsed drop/location summaries, Conditional labels, inline source details, target/owned/remaining quantities and no automatic stock consumption.
- Game-isolated IndexedDB profiles, atomic concurrent mutations, cross-tab refresh, resume links, backup import/export and pre-import recovery. Unknown stock remains distinct from zero; errors are visible.
- Local/offline production routes, cached lazy-loaded catalogs and update notices. No assistant launcher or new model/retrieval integrations in the new guides. Existing KHFM Data Jiminy unchanged.

## Per-game passes

Concurrency limits required running the game assignments in waves. Each game received a bounded implementation/review assignment; root owned shared integration, persistence, responsive styling and validation.

| Game | Implementation notes |
| --- | --- |
| KHFM | [Focused review](kh1fm-rollout.md) |
| KH2FM | [Catalogs, synthesis, Bestiary and Steam coverage](kh2fm-rollout.md) |
| BBSFM | [Character collections, melding, ice cream and acquisition sources](bbsfm-rollout.md) |
| DDD HD | [Character collections, Spirits, creation and portals](dddhd-rollout.md) |
| 0.2 | [Physical collectibles, objectives, wardrobe and replay](kh02-rollout.md) |
| KH3/Re Mind | [Base/DLC collections, cooking, forge and challenges](kh3-rollout.md) |

## Coverage limits

This is a functional review build, not a declaration that every game's research is complete. Some precise chest approach directions, hidden achievement conditions, complete enemy/equipment/synthesis catalogs and advanced game-specific calculators remain incomplete. Existing evidence conflicts are preserved in the relevant records and per-game notes. Counts describe represented acquisition records; they do not assert official 100% Journal completion. Missing screenshots/maps were not fabricated.

The common presentation intentionally prioritizes browsable answers over separate detail pages. The recorded modal and world-category table alternatives remain backup approaches for the next human review.

## Validation

Production build and type checking passed. All 76 unit checks passed, including new catalog identity/recipe integrity, atomic concurrent target additions, recovery, game isolation, quantity validation and family sorting checks. The targeted integration rerun passed all 36 desktop/phone cases covering existing KHFM behavior plus new games, aliases, persistence, farming, navigation and cold offline reopening. Initial integration failures (asynchronous checkbox timing, ambiguous repeated labels in test selection, an old KHFM-only selector) were corrected; one browser startup timeout and one offline install timeout passed on rerun. Existing unaffected browser cases passed in the broader run. Optional heavyweight model probes remained excluded; Data Jiminy was not changed.

Desktop and phone screenshots were inspected; corrected cramped mobile filters, desktop paper padding and the inherited empty assistant dock. This is Chromium phone emulation, not a claim of physical iPhone/Safari testing.

Final follow-up: after the last BBS catalog additions and assistant-dock CSS correction, catalog integrity checks passed again and all 16 new-game desktop/phone cases passed across the final run and a focused KH3 rerun. Two KH3 cases timed out during an unusually delayed run; both passed in under a second on the isolated rerun. A regression assertion now checks that new journals do not reserve assistant-dock padding.

Work is committed on `feat/refined-game-guides` for review and remote backup. The deployed master branch remains the previously approved KHFM refinement build.
