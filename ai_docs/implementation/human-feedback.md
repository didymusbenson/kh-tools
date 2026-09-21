# Human feedback

## September 20, 2026 — KH1 Final Mix navigation copy

**Status: Implemented locally; awaiting human review.**

The user reported that the deployed build did not appear to reflect all changes requested during their previous session. The present feedback is the confirmed basis for this pass; earlier agent review notes are not a substitute for human feedback.

### Requested change

- Leave the main game-selection menu unchanged. Focus this pass on the KH1 Final Mix journal.
- Remove the SaaS-style marketing preamble, promotional titles, subtitles, and other fluff on navigation pages.
- Use at most a compact page title and useful statistics where needed. Bring the navigation and actual journal content forward.
- Keep captions only when they are descriptive or necessary.

### Scope and reusable direction

The main menu is excluded from this copy and layout cleanup. Preserve useful journal content, functional instructions, and meaningful statistics; the request concerns promotional framing and unnecessary captions around navigation.

Apply this direction to KH1 Final Mix now and use the resulting navigation pattern for other games as they are implemented. This does not request implementation of the other games during this pass.

The accepted shared rule is recorded in [Jiminy's Journal Design Direction](../ui/jiminys-journal-design-direction.md#navigation-copy-and-page-headers).

### Acceptance checks

- KH1FM navigation pages lead with their controls and content, with at most a compact identifying title and useful statistics.
- Promotional preambles and redundant subtitles are absent.
- Remaining captions explain their associated content or serve a necessary purpose.
- The main game-selection menu retains its existing appearance and behavior.

### Implementation and verification

Removed navigation-page promotional preambles/subtitles and the oversized contents feature block. KHFM pages use compact identifying titles with relevant collection, crafting or result counts. Contents links have short factual descriptions. Synthesis retains a concise stock-behavior note; entry facts, acquisition conditions and backup instructions remain. Main-menu markup and behavior are unchanged.

Production build passed. All 30 standard desktop/phone browser cases passed (two heavyweight model cases skipped). Inspected the shared contents preview and phone synthesis screenshot. The preview is refreshed for human review; passing checks do not imply human acceptance. Nothing deployed.

## September 20, 2026 — Larger text, less padding

**Status: Implemented locally; awaiting human review.**

User feedback: most fonts throughout the app are too small and surrounded by excessive padding. Increase font sizes modestly and reduce padding.

Raised body text to 16px and increased small labels, navigation, inputs, reference text and Jiminy text across responsive layouts. Reduced page, toolbar, card, category and dialog spacing. Preserved 44px interactive targets and the reserved assistant space. Media captions now use the larger base size. No content or saved-state behavior changed.

Production build and all 30 standard desktop/phone browser checks passed before the final collection/assistant spacing adjustment. Desktop collection and phone synthesis screenshots inspected; final affected checks recorded below.

Final build passed; all 14 affected collection, journal, assistant and navigation browser cases passed after the spacing adjustment (two heavyweight model cases skipped). Updated preview activated and visually checked. Changes remain local.

## September 20, 2026 — Inline collectible details

**Status: Implemented locally; awaiting human review.** Both backup approaches below remain saved.

### Accepted direction

- Show items as single-column rows.
- Expand item details inline, keeping the player in the current collection view.
- Provide category-level controls to expand or collapse the items in that category.
- Remove deeper nested item pages beyond a category such as Trinities. The category is the browsing destination; opening an item reveals its details in place.

Keep the current focus on KH1 Final Mix. This continues the compact, direct-reference navigation direction; the main game-selection menu remains outside this change. Preserve item facts, completion state, counts, filters and useful location context while changing their presentation.

### Saved backup alternatives

The user asked to retain both alternatives explicitly in case the inline expandable version is rejected:

1. **Item modal:** open an individual item in a compact detail-card modal.
2. **Category detail page/table:** show all relevant items for the current world/category together on a category detail page or table.

These are saved fallback designs, not additional interfaces to implement alongside the accepted inline version. Revisit them if human review rejects the expandable version.

### Acceptance checks

- Category item lists use one column at desktop and phone sizes.
- An item opens and closes its details inline without taking the player to another nested page.
- Each category provides working expand/collapse controls for its items.
- Checks and derived counts still agree after expanding, collapsing and filtering.
- Details retain their useful acquisition information and related context.

The shared [collectible contract](../content/collectible-compendium-and-linked-views.md) and [design direction](../ui/jiminys-journal-design-direction.md#entry-pages) supersede the earlier standalone-item-page presentation for this collection flow. Record actual implementation and verification results when complete.

### Implementation and verification

Applied inline item expansion and category expand/collapse controls across world collectibles, reference, challenges, search, synthesis recipes and materials. Each world and recipe occupies one full-width row. Item pages are removed; old bookmarks resolve to their owning list with the item expanded, and Jiminy/ingredient/related links use those same destinations. Craft quantities and stock controls remain accessible without expansion. Duplicate Trinity names include location landmarks.

Expansion persists through reload and navigation. An expanded item stays readable immediately after checking it; explicit filter changes apply normally. Reopening the same citation expands it again. Meaningful instructions, conditions, rewards, missability, media, facts and uncertainty remain; repeated summary/edition/color text and generic revisit boilerplate are omitted.

Production build and 57 unit tests passed. Final browser suite: 40 passed on desktop and phone, two optional heavyweight model cases skipped. Shared preview updated and visually inspected. Changes remain local; human acceptance is pending.
