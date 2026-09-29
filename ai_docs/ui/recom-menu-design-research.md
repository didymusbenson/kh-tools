# Re:Chain of Memories HD — menu design research

**2026-09-28 · Research baseline.** The user subsequently authorized implementation; see the [working HD journal report](../implementation/recom-hd-journal.md) for the current UI, screenshots and remaining boundaries. This document preserves the original evidence and proposals.

User request: research Chain of Memories' own menu feel at the level of KH1, KH2 and BBS, using the **HD 1.5 ReMIX Re:Chain of Memories** presentation. [Visual evidence and 24 references](references/recom/README.md) · [Capture manifest](references/recom/source-manifest.json) · [Content specification](../games/kingdom-hearts-re-chain-of-memories.md) · [Readiness](../readiness/kingdom-hearts-re-chain-of-memories.md).

## Current revision: shared display contracts

The user's subsequent cleanup request makes the accepted KH1/KH2 display rules binding for Re:CoM as well. Earlier proposals below that allow scrolling are superseded by this revision. Their game-specific geometry is still reference evidence, not a request to add Story or Characters tracking.

- The outside frame and book bounds stay fixed across cover, catalogue, reading, system tools and settings. Reserve header, help, utilities and saving-status space.
- Reuse `useIndexCapacity` for compact indices; its optional grid mode measures actual columns and row gaps. Never use a fixed 24-card or eight-entry page count. Taller screens show more entries without stretching rows.
- Reuse `JournalNotePages` for numbered note continuations, mini-game records and settings. Entry navigation and continuation navigation are separately labeled. Neither the book nor the document scrolls vertically at the tested desktop/phone sizes.
- Source lists and research-status notes do not belong in journal reading pages. Keep provenance and extraction TODOs in the research pack; show useful acquisition guidance and gameplay-relevant qualifications. The collection grid uses the card image as an accessible collected toggle, with a gold check seal when collected; the name opens details. Uncollected cards have no persistent empty box or badge. Preserve a minimum 44-pixel toggle target and keyboard focus.
- Keep selection gutters and stable row dimensions. Preserve filters, originating card, page and keyboard focus on return. A return anchor keeps the card on the correct page after the available capacity changes.
- Keep Re:CoM's outside-left binding and single cream leaf, Sora's saturated green/olive/purple cover, Riku's charcoal treatment, grey collection plaques, red hierarchy tabs and green footer.
- Exact native card art/mosaic is optional, per the user. Readable names and existing symbolic card faces are the deliberate fallback. No collector rank or native completion percentage is fabricated. The suggested [TrueTrophies card page](https://www.truetrophies.com/game/KINGDOM-HEARTS-ReChain-of-Memories/walkthrough/5) returned access errors during this pass; no assets from it were verified or added.

See the [implementation revision](../implementation/recom-hd-journal.md#journal-cleanup-revision) for validation and screenshots.

## 1. What defines this game's interface

Re:CoM has three related menu families worth preserving: the blue player/system menu, Sora's green Journal, and Riku's charcoal D-Report. The player menu organizes card tools and statistics around a dimmed gameplay scene. The reports use a ring-bound cover at the root and a single broad cream page for interior content. Cards retain their distinctive crown-shaped silhouettes, family colors and large selected previews.

That distinction should guide the app's information architecture. A card catalogue belongs in the report language. A deck or room-card utility should use the game's system-menu language. Both can share navigation and saved records without being forced into one visual template.

### How this follows the earlier research

| Existing reference | What to carry forward | What the CoM evidence changes |
|---|---|---|
| [KH1](references/kh1fm/README.md) | Source-backed composition, contextual help, separate focus/completion states | CoM binding sits at the left edge; the cover and one-page interiors are not KH1's two-page spread |
| [KH2](references/kh2fm/README.md) and [UI plan](kh2fm-new-ui-plan.md) | Stable stage, reserved selection gutter, remembered navigation, readable long details | CoM uses card-category tabs, dense Card Collection mosaic and campaign-dependent report roots; KH2 world navigation is not native evidence here |
| [BBS](references/bbsfm/README.md) | Character-specific visual identity; distinct player-menu tools and report pages | CoM needs Sora/Riku treatment, not Terra/Ventus/Aqua palettes or Command Melding geometry |

These workbooks were compared for their research method and concrete interface evidence. Previous accepted designs remain decisions for their respective games; this document does not silently transfer their exact compositions or content scope to CoM.

## 2. Native structure now verified

| Screen | Sora | Riku |
|---|---|---|
| Report name | Journal | D-Report |
| Root background | Green bands, olive field | Charcoal bands, gray field |
| Book cover | Blue-purple; Jiminy/speech at left | Black; empty left cover area in sampled root |
| Root choices, in order | Story; Card Collection; Card Index; Characters; Mini-games | Story; Card Collection; Card Index; Characters |
| Collection | Dense card mosaic, rank/percentage plaques, selection brackets | Smaller campaign-specific mosaic with same controls |
| Card Index categories | Attack, Magic, Summon, Item, Friend, Enemy, Map, World visible in the initial list; Gimmick and Special verified in later detail screens | Battle, Enemy, Map, World |
| Reading page | Cream ruled surface, left rings, red hierarchy tabs, green navigation controls | Same paper/page hierarchy inside charcoal framing; green navigation controls remain |
| Footer | Green help strip with small Jiminy head | Gray help strip without Jiminy |

The captured native root is a visual reference, not a request to add full Story/Character tracking. Preserve the existing collectible and tool scope. Narrative pages establish reading-layout behavior; any narrative expansion needs its own scope basis.

## 3. Proposed app compositions

The following are design proposals derived from the evidence, not claims about the original game.

### Campaign and report entry

Keep the active campaign visible before entering its collection or tools, and preserve independent completion state. Opening Sora should reveal the green/purple report identity; opening Riku should reveal the charcoal/black identity. Carry that choice through deep links, search results, card acquisition notes and return navigation.

The native campaign selector has not yet been captured. For the first mockup, use an explicitly app-owned Sora/Riku control outside the report cover rather than inventing a faithful-looking native selector. Shared references can remain reachable from either campaign, with campaign applicability written beside their results.

### Card Collection

Preserve the native hierarchy: compact rank/progress area above a card mosaic, clear focus brackets, contextual guidance below. The mosaic should provide a recognizable overview and an enlarged, readable selection state. Selecting a card should connect to its Card Index entry and acquisition sources, using the same record identity as compact world lists and detail pages.

The native video shows a completed collection and advertises zoom, but does not settle unknown slots or the zoom transition. Until those are observed, mockups must label any empty/unknown treatment as an adaptation. Do not copy 100%, a collector rank, the uploader's checks or an inferred denominator into production progress. Search and Remaining filters must retain the unfiltered completion denominator.

### Card Index and acquisition detail

Preserve the large card at left and the name/effect region at right on wide layouts. Header plaques show parent category and selected family; previous/next controls keep the selected entry position visible. Content varies by family: attack attributes, enemy abilities/limits, map effects, world identity or special-card behavior. The native required-CP letter grade and an app's numeric per-value CP table need distinct labels and purposes.

Add the app's acquisition directions, prerequisites, farm locations, shop prices and related rewards as clearly labeled continuations of the reference. Do not replace those useful directions with copied Journal prose. Keep campaign-specific acquisition records linked to shared card identities; a Sora acquisition must not tick Riku's progress.

A card-type completion check is different from optional quantities, numeric card values and Premium copies used in a deck. Inventory editing should be a separate action. Checking a historical acquisition should not manufacture or consume deck stock.

### World and room references

Use the native World Map screenshot to inform blue framing, the floor/world identity area and the bottom help strip. The app's reward checklist remains a finite acquisition view. A procedurally generated room diagram should only appear if the user has supplied or built a layout; decorative native room cubes are not evidence of a fixed collectible route.

A future Room Creation helper should retain the observed predicate → selected card → eligible card strip hierarchy. Display requirements in text as well as symbols. Room-card family, value, quantity and special exceptions belong together; never communicate an exact-sum or threshold condition with a bare colored icon. The Japanese official frame establishes placement, while English labels and edge-case behavior remain a targeted capture task.

### Deck and sleight reference

Use blue player-menu framing with compact category controls and a persistent help region as the provisional outer shell. Keep Riku's preset-deck reference distinct from Sora's editable deck system. The Status frame demonstrates a sleight list at left and statistics at right, but it does not establish Edit Deck or the sleight-recipe panel. Do not treat a BBS melding recipe layout as native CoM evidence.

The next deck-specific research should capture Review Decks, Edit Deck, a selected attack card with value/CP, a populated sleight recipe, an unlearned entry and a reorder state. Acquisition guides and recipe alternatives can be prepared independently; exact panel composition remains open until these HD frames are inspected.

### Mini-games

Use a grouped records sheet: soft horizontal world bands, indented game names, aligned values/units and a separate completion column. Preserve Monstro versus 100 Acre Wood grouping and time versus points. An app may show the user's result next to a separately labeled achievement target; the source player's score is not the target. Keep all six native rows readable without substituting six large dashboard tiles.

## 4. Visual and interaction requirements for the first mockup

| Area | Proposed requirement | Basis / boundary |
|---|---|---|
| Page stage | Stable outer frame; only content changes between list/detail states | Carries forward KH1/KH2 usability lessons; reference frames establish composition, not browser behavior |
| Book | Left rings, restrained corner ornament, faint ruling, one broad interior page | Direct HD evidence; avoid central spine or generic parchment treatment |
| Cover | Campaign-specific cover/inset, menu spacing, illustration area | Sora root and Riku root are separately captured |
| Typography | Angular white navigation; softer rounded reading face; strong numeric alignment | Visual character is verified, exact fonts are not |
| Palette | Sora green/olive/purple; Riku charcoal/gray/black; system menus navy/cobalt/red | Qualitative reference palette; final tokens require a reviewed mockup, not guessed native hex values |
| Selection | Reserve space for glove/indicator; focus must not shift rows or counts | Native selection grammar + shared interaction requirements |
| Progress | Separate completion marks, acquisition state, unread state and keyboard focus | Samples show separate selection/marks; unread behavior remains unverified |
| Navigation | Parent/child hierarchy, entry position, reliable Back returning to selected row | Tabs/counters are native; browser history behavior is an app adaptation |
| Help | Short persistent contextual strip; longer sources and caveats in detail | Native footer evidence; avoid variable-height page jumps |
| Controls | Text actions for pointer/touch/keyboard; contextual platform glyphs only when appropriate | PlayStation glyphs in references do not establish Steam or browser bindings |
| Motion | Restrained page/selection transitions with reduced-motion support | Timing not measured; no claimed native animation duration |
| Data | Same IDs across mosaic, index, sources, search and progress | Existing compendium requirement; layout changes cannot fork completion records |

Do not imitate native statistics by adding unsolicited gameplay-time, Moogle-point or HP tracking. Those values establish visual regions in the source; only requested app functions should occupy those regions.

## 5. Phone, tablet and desktop adaptations

The game reference is a landscape stage. A scaled-down 16:9 screenshot would make the card mosaic, menu rows and prose unusable on a phone. Preserve color, hierarchy, card shape and binding while changing layout deliberately:

- **Phone:** single readable page; compact left binding; clear campaign/category label; tap-sized card tiles in a measured, paged grid; selected card opens a detail page with card preview above the text. Keep back navigation and progress visible. Do not force tiny native rows or require horizontal scrolling to read directions.
- **Tablet:** wider index and detail regions where readable; collection overview may coexist with selected-card detail. Preserve enough room for card names, quantities and campaign labels.
- **Desktop:** native-inspired stage proportions, left-card/right-detail reading, clear top tabs and bottom help. Extra width can support acquisition context, but must not stretch short rows across the viewport.

These are responsive proposals. Target at least 44 CSS-pixel touch controls, visible keyboard focus, sufficient text contrast, meaningful image labels and completion state communicated beyond color. Typography must remain readable at enlarged text settings. The source's gray prose and extremely dense grid are not accessibility acceptance criteria.

## 6. Review package to build next

Create linked mockup states using these references: Sora report root, Riku report root, Card Collection overview/selection, Card Index list/detail, grouped Mini-games records and a clearly provisional system-tool shell. Exercise returning from a detail to the same grid cell or list row, switching campaigns, long acquisition notes, no-results search and incomplete progress.

Use real sourced candidate data with visible research-status boundaries, not fabricated counts. Unknown roster/CP fields should remain unknown. Mockup review should compare composition to the linked frames while also checking that a user can find a card, understand how to obtain it and mark progress without changing campaign accidentally.

The first mockup does not require completion of every remaining visual research item. Exact Edit Deck, Moogle shop, native partial-collection/NEW states and selector fidelity remain open and should be labeled accordingly. No runtime code, app bundle assets, progress models or deployment were changed by this research pass.
