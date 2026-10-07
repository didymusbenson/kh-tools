# Journal book geometry — October 6, 2026

## Scope and evidence

The user requested three physical book states: a closed cover occupying one half of the wide reading stage, an open full-width single leaf with outside-left binding, and a split spread with exactly equal facing leaves and a centered binding. Empty or short content must never change those dimensions. The full-viewport exterior, game styling, routes, pagination, saved records and digital interfaces remain intact.

KH1's native top-level Contents is **navy/purple, not brown**. The [closed Contents screenshot](https://www.khguides.com/kh/inventory/journal/images/s2.webp) and [opened character screenshot](https://www.khguides.com/kh/inventory/journal/images/s3.webp) were inspected at full resolution (1000×563). Closed cover bounds are approximately x500–869; the open spread spans x132–870 with the binding at x500. Jiminy and his speech bubble stand outside the closed book on the left background. The existing [report index reference](../ui/references/kh1fm/kh-hd-report-index.jpg) shows purple/paper facing leaves. The earlier app had reused that open index composition for Contents and retained an asymmetric 43/57 split on other indices.

KH2 world covers, BBS character Reports, Re:CoM Sora/Riku roots and DDD Reports roots are natively broad landscape covers with artwork and menus inside a continuous cover. They do not contain a center spine. Their new wide-screen half-stage cover width is an **intentional user-requested adaptation**, not a claim that their native covers were portrait-width. Existing reference packs remain research only; no screenshots were extracted as app artwork. KH2's additional cover/detail/synthesis references were inspected read-only on `feat/kh2-com-lettering` at `88ab0ea`, without importing that branch's typography work.

## State inventory

| Game | Closed | Open single leaf | Equal split spread | Other |
|---|---|---|---|---|
| KH1FM | Contents: right cover, Jiminy outside on left | Save & Settings | All section/world/search indices, entry overview/notes, synthesis/stock/farming, treasures/world directory | Narrow screens expose one leaf at a time |
| KH2FM | World hubs such as Port Royal | None in current app's main journal composition | Contents/collection, world directory, category/search/entry views, workshop/plan, settings and treasures | Native references favor a broad single leaf; the existing app's equal facing-page design is preserved |
| Re:CoM | Contents for Sora and Riku | Card collection, card/character/world lists and details, minigames, rewards, settings | None; internal art/text columns are content layout | Sleights/decks/shop retain their system-tool presentation |
| BBSFM | Character Reports Contents for Terra/Ventus/Aqua | World index/hubs, Final Chapter/episodes, collection/search/detail, materials/plan, settings, treasures | None; two content columns do not imply a center binding | Home character selector and Command Melding remain system stages |
| DDDHD | Reports Contents | Every interior Reports route, including worlds/collection, Dream Eaters, records, completion, workshop/plan, search, settings, treasures | None | No forced two-leaf conversion |
| KH3 / KH0.2 | None | None | None | Digital treasure interfaces and guide pages unchanged |

## Implementation

- KH1 Contents uses a transparent art stage alongside a navy closed cover with its blue-gray inset menu. The cover occupies exactly the right half of the same fixed stage used by an open spread. The hinge and right edge remain fixed when opening a section.
- All remaining center-bound KH1 indices now use `repeat(2,minmax(0,1fr))` and a 50% binding. Entry, synthesis and treasure leaves already had equal widths; they retain those widths. Save & Settings keeps its outside-left binding.
- KH2 ordinary facing pages already use equal zero-minimum grid tracks; those are preserved. World covers now occupy one half of the reading stage on wide screens, retaining burgundy/gold/green styling, art, summary, counts and pagination.
- BBS, CoM and DDD closed covers similarly occupy the right half of their respective wide reading stage. Their internal portrait/art/menu arrangement remains within a single cover; scoped spacing/type adjustments keep those panels readable.
- Narrow layouts retain a full-width single-book presentation and existing leaf/navigation controls. This is an explicit readability fallback rather than scaling a desktop canvas or squashing artwork. KH1's narrower closed cover retains left-edge rings.
- DDD's decorative offscreen phantom opposite leaf is removed, leaving the requested single full-width open leaf with left-edge rings.
- `data-book-state` records the conceptual physical state independently of internal content columns. No data schema, IDs, domain calculations, progress storage, release configuration or shared external chrome changes.

## Validation

- All 261 unit tests pass (25 files).
- Production content build, Coppermind pack validation, TypeScript, Vite and PWA build pass.
- New geometry tests plus existing KH1 treasure geometry tests pass **34/34** in both desktop and mobile Chromium contexts. Covers 768/1101/1440/2048 widths, 390/320 phones, 844 landscape, and 1101×390 long world-name fitting; verifies empty/populated pages, cover/open hinge stability, left bindings, treasury seams and responsive controls.
- Broader six-suite regression initially passed182/186. All four failures exposed the same new KH1 treasure-ring cascade collision (old `translateX(-50%)` plus a new minus-half-ring offset). The correction excludes treasure hosts from the ordinary index rule; all four affected cases and the complete10-case KH1 treasure suite pass in the final34-case run. The other182 cases cover full viewport, world/header controls, seven-game treasure persistence/offline/Undo/cross-tab behavior, and CoM/DDD journal routes. This is not a claim that the inherited whole browser suite is green.
- Independent review inspected78 screenshots/measurements across1440×900,1101×700,768×900,390×844,320×568 and844×390 plus targeted states. It caught the treasure collision and a short-wide KH2 long-title clip; both are fixed and covered by passing tests. It separately confirmed saved treasure checks survive reload in all five native journals. No document overflow was measured. Short BBS landscape retains its existing internal scrolling fallback.
- Before/after native screenshots at1440×900 are saved to Library for KH1 contents/open index, KH2 contents/world cover, BBS, CoM and DDD. Research images and QA captures were not added to production assets.
- Known baseline50 legacy browser failures and intermittent CoM disappearing-checkbox race are outside this geometry scope; no inherited assertions were weakened except the explicit cover-vs-open fixed-frame expectations in CoM/DDD. Physical iOS acceptance is not claimed.

## Publication boundary

Developed independently from master `62643025d81c291a83cbdd5bdbb539893f6ef43a` on `feat/book-geometry-20261006`. The separately validated typography branch is excluded. Default-branch merge/deployment remains pending the parent task's publication decision; this feature checkpoint does not bypass that gate.

## Integration follow-up — 2026-10-07

The branch-specific scope and validation above are historical. The [combined release record](journal-release-2026-10-07.md) documents integration with the other completed changes, approved test deferrals, the BBS short-landscape correction and final per-commit release gates.
