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

## Final local validation

- Production content/pack validation, TypeScript and Vite/PWA build passed.
- All **232 unit tests** passed, including 38 new mapping/backup, 8 projection/route and 3 strict save-acknowledgment tests.
- Python pack **7/7** and seed **2/2** passed. The pinned Chroma dependency was installed in a temporary test environment; no dependency changes were required.
- The complete combined production browser run passed **104/104** across desktop and mobile Chromium emulation, with offline enabled automatically under `CI=1`: 60 feature cases, 32 existing DDD regression cases and 12 affected cross-game source-link/alias cases migrated to the approved board interactions. Fixed native-frame and summary no-scroll assertions were preserved; a genuine 44px frame shift was repaired. Includes 320×568 marked/Undo/filter bounds, short landscape reflow, keyboard/reduced motion, ID-only deep links, Back/Forward/focus, native character restoration, cross-tab and failed storage.
- BBS/DDD and KH1/KH2/KH3 deterministic metadata checks passed. All checkable original IDs remain in their original catalogues; old backup maps preserve true/false and excluded tutorial records.
- Representative desktop screenshots for all seven games plus KH2 phone and Re:CoM 320px were visually reviewed. Native references informed the framing; this does not certify unverified slot geometry or art parity.
- `git diff --check` passed.

The [focused QA report](treasure-grid-qa-2026-10-04.md) records exact coverage. Unit/browser fixtures are isolated from real player data. Existing full-suite CI is tracked separately; these focused passes do not imply a green full legacy suite.

Known inherited baseline: full browser suite had 50 legacy failures and 2 skips before this change; see [master consolidation](master-consolidation-2026-10-03.md). Existing unrelated failures are not being hidden or weakened.

## Evidence and remaining fidelity limits

- [KH1/KH2/KH3 crosswalk](../ui/treasure-crosswalk-kh-2026-10-04.md), [BBS/DDD crosswalk](../ui/treasure-crosswalk-bbs-ddd-2026-10-04.md), and [Re:CoM/0.2 crosswalk](../ui/treasure-crosswalk-companion-2026-10-04.md) retain the evidence and exceptions.
- BBS and DDD remain clearly companion-numbered. In particular, Ventus Disney Town Thunder11/12 landmark alignment is unresolved; existing IDs and useful directions were not overwritten to force an official-order claim.
- KH1/Re:CoM/0.2 boards are companion additions. KH1 numbering stays stable across physical/other acquisition subsets. KH2 geometry is adaptive, not asserted as native. KH3 eight-column base geometry is supported; Re Mind geometry remains unverified.
- A scoped KH3 treasure panel was implemented, not the unrelated full Gummiphone UI plan. No new artwork rights, gameplay verification, controller testing or physical iPhone acceptance is claimed.
- Changes are on a feature branch. Master merge, Pages deployment and live-release verification require the separate release decision.

The final entry-flow check also verifies that Re:CoM’s native Worlds & Rewards index opens finite Sora world boards directly. Riku and 100 Acre Wood remain in their original tracks.

The final Notes pass preserves Re:CoM Card Reference navigation and independent card-discovery checks. Adjacent filtered matches follow canonical order even after the selected Remaining cell is collected; world/character search terms remain valid on board entry. Keyboard selection was additionally stressed six times per desktop/mobile project (12/12 passes) after replacing stale delayed focus with cancellable restoration that respects newer user focus. Inapplicable scopes show no misleading 0/0 badge.
