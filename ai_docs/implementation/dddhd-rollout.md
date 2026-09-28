# DDD HD guide rollout — September 20, 2026

## Research and plan

Applied the refinement playbook: category-first navigation, single-column inline records, character-specific chest/portal identities, Spirit Creation with direct ingredient targets and always-on material stock. Data Jiminy is excluded.

Started with the six DDD research documents and the legacy factual-candidate inventory. The old HTML was a placeholder. The legacy data omitted five Defense commands, used inconsistent breed/command names, mixed 3DS and HD formulas, and flattened board gates. Imported factual names and provider costs with explicit uncertainty; did not represent 816 reward rows as verified complete board graphs.

Expanded research by fetching factual fields directly from all seven KHWiki world pages and all 54 breed pages on September 20. World extraction asserts the existing researched 438-chest / 78-Special-Portal census. Breed extraction selects the final synthesis table, which is the explicitly HD replacement table on changed-AR-breed pages. No source guide prose is copied into the generated catalog. Source URLs remain attached to records; formulas include their source in details. This is community-source verification, not a gameplay audit.

## Implementation

- `src/games/dddhd.ts` exports the guide configuration, seven world summaries and distinct category icons.
- `src/games/dddhd/content.json` contains 860 entries and 263 creation formula rows.
- 438 character-scoped chest contents/area records, retaining the 26 existing authored correction/route examples. Treasure identity is character + world + source number; quantities do not multiply chest counts.
- 54 shared Spirit breeds with source Link/attribute/style data and legacy board reward reference. Corrected Juggle Pup, Majik Lapin, Fishboné and R & R Seal aliases. Aura Lion and Lord Kyroo transformed-node caveats remain visible.
- 124 commands, with the missing Defense group restored and legacy Defense corrected to Reprisal; 43 abilities with reverse provider references. Item uses are not falsely rendered as deck slots.
- 263 creation formulas for all 54 breeds. Explicit success percentages and alternate outcomes are retained; omitted probabilities remain unknown. HD Frootz Cat, Kab Kannon and R & R Seal formulas replace 3DS formulas. These create material targets for one attempt; they are not an outcome/rank optimizer.
- 37 Dream Pieces, all with sourced farming routes. Ordinary and rare Nightmare rates remain distinct; portal rewards include character, world, area and forecast. Material family/grade order is deterministic. Finite alternatives remain in expanded descriptions where known.
- 78 Special Portal records with forecast, Nightmare, area and reward; 11 Secret Portals; 14 character-specific Dive targets; ten Flick Rush cups and three optional encounter goals.
- 15 Keyblade types, 18 in-game trophies and 15 explicitly selected Steam achievement objectives. These are separate categories and never count as chest records.

## Reproduction and validation

Run `python3 src/games/dddhd/fetch-worlds.py` and `python3 src/games/dddhd/fetch-spirits.py` to refresh factual source extracts, then `python3 src/games/dddhd/generate.py` to rebuild content. Generated snapshots are checked in so normal app builds never require network access.

Generator assertions check unique entry and recipe identities, all ingredient references, exact 438 chest count, and absence of leaked wiki/template/HTML markup. Fetch assertions check 78 Special Portals and all 54 breeds with formulas. Reconciled seven world chest totals (66/83/87/53/63/43/43) and Sora/Riku totals (225/213). All 37 materials have farm routes; 263 formula identities are unique. A TypeScript check found no DDD errors; shared integration validation belongs to the root task.

## Honest remaining coverage

Most chest records have verified area/contents but still need precise approach directions. Special Portal bonus objectives and exact approaches are not yet imported. Enemy farming locations are world-level, with portal-only qualifiers retained; rare encounter conditions and room routes need further research. Full Spirit instance boards, edge/disposition/gate tracking, complete command acquisition routes, optimized creation probabilities/rank calculations, Link pairing calculator and a complete platform achievement manifest are not implemented by this content rollout. The shared interface exposes the actual represented records and marks those gaps, rather than claiming full guide completion. No Data Jiminy work was added.
