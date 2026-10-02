# Research gap resolution — October 1, 2026

First correction batch following the [seven-game audit](research-audit-2026-10-01.md). Work starts with source-backed answers omitted from the app and audit claims that fail an edition check. The five other games' findings are unchanged in this pass.

| Game | Closed findings | Narrowed findings | Evidence log |
|---|---|---|---|
| BBS Final Mix | BBS-007, BBS-008, BBS-017 | BBS-006: minimum Ignite level only; BBS-015: Archraven band corrected, full routes still open | [BBS resolutions](../games/bbsfm/research-resolution-2026-10-01.md) |
| Re:CoM HD | COM-018: false gap; COM-019: integrated | COM-032: ordinary-enemy mushroom boilerplate and stale door warning removed; real mushroom/encounter questions remain | [Re:CoM resolutions](../games/recom/research-resolution-2026-10-01.md) |

Five issue families closed; three other families narrowed. These are not counts of individual factual corrections or a claim that either game is fully verified.

## Delivered behavior

- BBS restores nine character-scoped meld groups, including the correct 80% Collision Magnet / 20% Magnet Spiral alternatives. The two generators agree on all 468 groups and retain crystal mappings and character-specific outcomes.
- Confusion Strike is named consistently in BBS canonical and generated data. Original altered source values remain in correction provenance.
- Conditional Spiderchest Fleeting and corrected Archraven Shimmering drops reach the relevant references without claiming an unresearched farming route.
- Re:CoM's 13 Riku sleights expose mode requirements; six duel entries include initiation requirements. Ansem's resistance-only player effect is explicitly identified as the correct Re:CoM behavior.
- Per-game audits, research guides, manifests, specifications/readiness and the active review checklist now reflect the closures. Historical appendix locations and dated reports retain their baseline with explicit supersession notices.

## Validation

- `npm test`: **115 tests passed across 13 files**, including source-specific regression cases for restored melds, ability mappings, level filtering, command joins, conditional drops, Riku form pairs and the Ansem edition distinction.
- `npm run build`: passed TypeScript, content validation and production/PWA generation. Only the existing bundle-size advisory remains.
- Coppermind validation confirms the current knowledge revision remains **empty, zero thoughts**.
- Identity comparison against the previous commit: all 1,368 BBS entry IDs and all 483 existing recipe IDs retained; nine recipe IDs added. All 431 Re:CoM entry IDs and their order retained.
- BBS and Re:CoM generation reproduced identical output on a repeat run; `git diff --check` passed.

## Next research targets

The remaining minimum Ignite level conflict needs direct evidence distinguishing Lv1 from Lv3, not another copy of the aggregate table. Re:CoM's two mushroom success predicates and Shadow/Soldier encounter exceptions are useful next targets: they determine which documented card farms actually work. COM-020's September 28 provenance backlog remains open; this pass's new inspection records do not retroactively certify it.

Future closures should follow the same sequence: inspect edition-specific evidence, preserve source/provenance, update canonical authoring inputs and generated guidance, replace the active gap statement with the precise residual question or dated closure, and verify the affected behavior. Test success alone does not certify a game fact.
