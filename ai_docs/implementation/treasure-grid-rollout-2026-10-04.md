# Treasure grid implementation checkpoints

Authorized implementation of the seven-game [approved direction](../ui/treasure-grid-redesign-research-2026-10-04.md), starting from master `9f5b5e1` plus research `747b050`. Feature branch only; no master merge or deployment.

## First working checkpoint

- Shared positional board lives inside existing KH1/KH2 facing pages, BBS broad Reports leaf and DDD/Re:CoM single leaf. KH3/0.2 add only their scoped digital treasure panels.
- Runtime metadata is separate from saved IDs and original factual catalogues. No completion migration, ID renaming, card discovery auto-marking or new profile namespace.
- KH2: 301 source-supported Sora Journal mappings; 16 prologue acquisitions separate. Disney Castle #7 remains Mythril Shard. Unverified native geometry is explicitly adaptive.
- KH3: 245 main and 9 Re Mind mappings, separately scoped. Main eight-column layout plus paged grouped overview; phone layout explicitly compact when eight 44px targets cannot fit. Re Mind geometry is not certified.
- BBS: 374 main + 8 Secret included, tutorial kept in catalogue and backups but excluded from chest counts. BBS and DDD use explicitly labeled companion order, never asserting extracted source numbers as verified HD Journal positions.
- KH1: all 306 treasure records classified; physical chests/containers and other acquisitions are separate boards, retaining explicit linked acquisition IDs. Ten Postcards remain reachable through their existing catalogue path.
- Re:CoM: 41 finite Sora claims use Base, Days bonus and Bounty groups; card discovery remains independent. KH0.2: 41 existing chest IDs, Zodiac a facet, never a duplicate board record.
- Filters dim nonmatches without removing positions. Counts retain scoped denominators. Selection is separate from collected; explicit desired-state writes, pending/error feedback and guarded Undo. ID anchoring recomputes grid page after resize. Long notes retain continuation pages.

## Validation underway

The initial build and all preexisting 183 unit tests passed. Six initial desktop boards and a KH2 phone board rendered without page overflow. Mapping and focused end-to-end regression are still being completed, including old backups, cross-tab, offline, failure recovery, narrow devices and final screenshots. These initial passes are not final acceptance or a full-suite-green claim.

Known inherited baseline: full browser suite had 50 legacy failures and 2 skips before this change; see [master consolidation](master-consolidation-2026-10-03.md). Existing unrelated failures are not being hidden or weakened.
