# Re:Chain of Memories HD journal implementation

Historical chronological report. Its earlier missing-field/no-module statements describe their dated snapshots. The current October 1 disposition is [the full Re:CoM ledger](../games/recom/research-resolution-2026-10-01.md), including all resolved fields and exact remaining gaps.

2026-09-28. User authorized implementation following the [HD menu research](../ui/recom-menu-design-research.md), with the home entry between Kingdom Hearts Final Mix and Kingdom Hearts II Final Mix. Implemented locally; not deployed. This report describes the current working interface, not final artwork or complete native-game coverage.

## Working experience

- Home opens **Re:Chain of Memories · HD 1.5 ReMIX** in the requested position.
- Sora has the green Journal shell, purple ring-bound cover, red hierarchy tabs, cream interior and contextual footer. Riku has a charcoal D-Report with its own campaign navigation. Sleights, Moogle Shop and Review Decks use the blue system-menu treatment. These compositions follow the inspected HD references, not GBA or original PS2 imagery.
- Card Collection provides a paged card grid; Card Index provides family navigation. Records include acquisition notes, sources, uncertainty, linked rewards and independent discovery checks. Search, card-type and completion filters preserve the catalogue denominator and return context.
- Sora has mini-game records and separate world reward claims. Riku has twelve world deck references, including card values in source order. Sleights, Moogle pack prices and Steam goals are accessible from the companion navigation.
- Progress uses the existing per-game local database, backup/import and recovery infrastructure. Campaign-specific cards remain independent. Saving feedback reports successful database completion; mini-game scores do not automatically mark achievements.
- The journal, data and local assets are included in the existing offline build. Source provenance remains in the data/research pack. The follow-up cleanup removes external source panels from the reading interface.

## Content delivered

`tools/content/build-recom.mjs` converts the research pack into the runtime catalogue during `content:build`. It retains source links and unresolved values rather than inventing missing facts.

| Runtime group | Entries |
|---|---:|
| Sora documented card identities | 139 |
| Riku documented card identities | 44 |
| Sleights across campaigns | 98 |
| Sora finite world reward claims | 41 |
| Riku world deck references | 12 |
| Moogle pack prices | 16 |
| Steam goals | 47 |
| Mini-game records | 6 |
| Total | 403 |

These are documented app entries, not native completion denominators. Cards and the reward claims that grant them have separate progress records. Card discovery is not a copy inventory. Reference decks do not consume stock or calculate CP.

## Visual review

Desktop at 1280 × 720 and phone at 390 × 844 were inspected in the in-app browser. The desktop cover, footer and utility links fit together; the initial phone interiors used a scrollable single page. The cleanup revision below replaces that behavior with the shared pagination contract. Automated desktop and phone tests additionally check horizontal overflow, selection, filtering, campaign switching and record routes.

![Sora's Journal](recom-screenshots/sora-journal-desktop.png)

![Riku's D-Report](recom-screenshots/riku-report-desktop.png)

[Phone Card Collection capture](recom-screenshots/sora-collection-phone.png).

## Validation

- Production build passed, including the offline service worker. Existing large-bundle warnings remain.
- Full unit suite passed: 105 tests across 12 files, including six new Re:CoM tests for edition exclusions, campaign boundaries, source coverage, denominators, unknown CP, routes and database backup/recovery.
- Re:CoM browser suite passed: 10 tests across desktop and mobile Chromium. Covers home placement, Sora/Riku menus, card persistence after confirmed save and reload, filtered totals, campaign isolation, score persistence, reward links, Riku decks, invalid routes, empty results, backups, usable filters and offline reopening/campaign navigation.
- Service worker verification waits for installation and revisits the page before going offline, matching the existing prompt-based activation lifecycle.
- No native-game runtime or physical-device Safari acceptance is claimed.

## Remaining boundaries

- Card faces are original symbolic previews with initials; individual native card illustrations are not yet integrated. Jiminy imagery and substitute fonts reuse the existing local journal assets. Exact CoM fonts, cursor art and native illustrations remain artwork work.
- World/Gimmick cards and the complete Riku Battle Cards roster remain unreconciled. Partial coverage is labeled in the catalogue and settings; the app does not claim native 100% completion.
- Seven sourced enemy CP conflicts remain unresolved. The app exposes uncertainty and supplies no CP optimizer. Door-cost solving, copy/value/Premium inventory, exact bounty fallback rules and full retained boss-card/deck substitutions still require the documented evidence and implementation work.
- Story and Characters completion flags are outside the inherited collectible-compendium scope; they are not represented as implemented navigation.
- This pass does not implement a CoM-specific Data Jiminy assistant or assert final visual approval. The [readiness workbook](../readiness/kingdom-hearts-re-chain-of-memories.md) retains the remaining acceptance gates.

## Production release preparation

The user subsequently authorized production deployment together with the independently prepared home-menu restoration. The isolated CoM release excludes unrelated local BBS work. Its complete unit suite has 99 passing tests across 11 files; the earlier 105-test workspace run included six BBS tests. A production build using `/kh-tools/` passed. Publication is handled by the existing GitHub Pages workflow on `master`; the deployment run is the authoritative release result.


## Journal cleanup revision

2026-09-28. Local revision following the user's feedback about Re:CoM's presentation and missed KH1/KH2 display rules. This section supersedes the initial implementation's scrolling behavior and fixed page sizes.

### Changes

The shell now reserves one viewport-sized stage across every destination. Green frame/olive field, indigo cover/purple inset, left binding, compact red tabs, grey collection plaques and persistent help follow the supplied game screenshots more closely. Phone covers retain Jiminy where space permits. Riku retains its separate charcoal report; system tools retain blue framing.

Re:CoM uses the same `useIndexCapacity` and `JournalNotePages` components as KH1/KH2. The capacity hook's optional grid mode measures columns and gaps while retaining the existing default list behavior. Families, worlds, card grids and entry lists page within the available space. Notes, Riku decks, mini-games and settings flow onto numbered continuation pages. Previous/Next entry actions are separate from Previous/Next notes. Back retains filters and restores the selected card; a return anchor resolves its page after resizing.

The collection intentionally uses named symbolic previews. Exact reproduction of the native card mosaic is not an acceptance gate. The suggested TrueTrophies page could not be accessed (web fetch error and HTTP 403); no native card artwork was verified. Catalogue identities, stored checks, campaign separation and denominators are unchanged.

### Verification

The production build and all 105 workspace unit tests passed. All 18 desktop/mobile browser regression tests passed. Coverage includes saved discovery/reload, campaign isolation, mini-game scores, linked rewards, offline reopening, all destination bounds, active filters on the shorter phone viewport, adaptive capacity, return focus, complete long-deck pagination, and shared KH1/KH2 capacity behavior. The build still reports its existing large-chunk warning. Physical-device Safari and user visual acceptance are not claimed.

Updated review captures:

- [Desktop cover](recom-screenshots/sora-cover-revised-desktop.png)
- [Desktop collection](recom-screenshots/sora-collection-revised-desktop.png)
- [Phone cover](recom-screenshots/sora-cover-revised-phone.png)
- [Phone collection](recom-screenshots/sora-collection-revised-phone.png)

This cleanup remains local; the earlier production-release paragraph describes the prior version.


### Direct collection checks and research-copy correction

Following further user review, each grid tile now has a separate collected checkbox with a 44-pixel label target. It uses the existing saved check, pending/save-failure behavior, campaign identity and progress denominator. Card links continue to open notes without changing collection status. Desktop and phone tests cover saving in place, reload, keyboard undo, and the Remaining filter.

Removed the Sources & reference notes panel from all Re:CoM details. Removed the blanket missing-CP banner from attack-card generation and the research-status paragraph from the family index. The research pack retains `cpByValue: null`; no numeric values were invented and no CP calculator is claimed. The initial research had not extracted those tables, which is an implementation gap rather than proof that the information is unavailable.

Diamond Dust and One-Winged Angel previously embedded an unfinished world-pool research task in their acquisition sentences. Rechecked the [Attack Card acquisition table](https://www.khwiki.com/Attack_Card) and replaced both with the documented methods: after the first Marluxia fight, random drops, treasure or Moogle Shop packs. Exact per-world probabilities are not asserted. The separate seven enemy CP conflicts and missing World/Gimmick/Riku roster coverage remain in the research/readiness documents and coverage summary; they are not resolved by this UI change.

Validation: production build, all 105 unit tests and all 22 desktop/mobile browser tests passed. Updated collection review screenshots include the direct checkboxes. Local preview only.


### Collection control styling

Replaced the visually detached native checkboxes after user review. The card image is now the collection toggle (54 × 56 CSS-pixel target); the name below is the independent details link. A gold check seal appears for collected cards, and the inactive marker appears only on hover/focus. This keeps the resting grid clear while preserving native checkbox semantics, keyboard Space, save behavior and stable dimensions.


### Keyblade and journal data closure

The round key preview now has a squared Keyblade guard, grip, blade teeth and short chain. The current catalogue contains 431 entries, including complete 152/59 campaign card rosters. All 403 prior entry IDs are preserved. See the [data audit](../games/recom/data-gap-audit-2026-09-28.md) for 440 CP values, Premium costs, seven resolved enemy CP conflicts, effects/acquisitions, map drop tables, 25 floor-door records, Bounty order, Moogle corrections and the remaining evidence limits. This supersedes earlier partial-roster/missing-CP statements in this report.

The ten-value CP grid and new notes flow through shared journal pagination. Equal-rate world pools are grouped to avoid repetitive rows. No source panels or research placeholders return to the interface.

Validation: production build, 109 workspace unit tests and 24 desktop/mobile Re:CoM browser tests pass. Tests cover full campaign counts, numeric costs, edition exclusions, floor predicates, pack-pool arithmetic, save compatibility, CP-grid bounds and continuation through longer notes. The first new phone test incorrectly required an entire multipage section to fit on one leaf; it now checks reachable headings and the final linked reward. Existing large-chunk build warnings remain. Current changes are local.
