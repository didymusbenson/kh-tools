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

## September 20, 2026 — Category menu and world hub

**Status: Implemented locally; awaiting human review.**

### Exact primary navigation

Use this order and wording:

1. Worlds
2. Synthesis Workshop
3. Bestiary
4. Treasures
5. Trinities
6. Dalmatians
7. Magic Upgrades
8. Torn Pages
9. Ansem Reports
10. Challenges and Minigames
11. Steam Achievements

Use the correct spelling **Dalmatians**. **Reference library** and **Progress & backups** remain secondary sidebar links. Reference content stays unchanged pending later review; this is not permission to remove its information.

### World and category behavior

- Replace Contents with a world hub.
- Each world opens its general information and quick links to the relevant collection-type pages, filtered to that world.
- Use the existing canonical world collection-route instructions for the general overview. Keep other relevant guide entries and summons available as inline World notes.
- Collection-type pages group their records by world and use full-width inline expandable rows. Keep category expand/collapse controls and independent saved completion checks.
- Preserve inline details and canonical cross-links; do not reintroduce nested item pages.
- Keep the main game-selection menu unchanged.

Implementation research and the thirteen available canonical world overview records are documented in [Category navigation research and plan](../research/2026-09-20-category-navigation.md).

### Acceptance checks

- Primary menu labels and order match the list above; Reference library and Progress & backups are secondary.
- The world hub replaces Contents, and world shortcuts open the correct type list with that world's filter applied.
- World general information and inline notes remain factual and useful; neither adds completion checks or inflates collection totals.
- Per-type lists remain grouped by world with full-width inline rows; saved checks, expansion, category controls, search and cross-links continue to work.
- Existing bookmarks resolve into the new navigation without losing the target record.

### Verification

Implemented the requested primary menu, 13 world overview pages, world-filtered category shortcuts, world-grouped catalogues, canonical links and legacy redirects. Postcards stay in a distinct Treasures section; Steam Achievements are separate from Challenges and Minigames. Secondary reference content remains accessible. Resume last page now accepts all new destinations and query filters.

Production build and 57 unit tests passed. All 46 existing/new navigation browser cases passed across the full run and locator-only rerun; two added resume cases also passed. Final affected run: 26/26 desktop/phone navigation, journal and regression cases. Two optional heavyweight model tests were skipped. Shared preview refreshed; Trinities, Worlds hub and Traverse Town overview visually inspected. Changes remain local, pending human acceptance.

## September 20, 2026 — Distinct menu icons

User feedback: menu icons are too similar. Replaced repeated book symbols with distinct silhouettes: globe for Worlds, flask for Synthesis, monster face for Bestiary, chest for Treasures, three connected marks for Trinities, paw for Dalmatians, wand for Magic Upgrades, torn sheet for Torn Pages, scroll for Ansem Reports, trophy for Challenges, medal for Steam Achievements. Uses the existing SVG style and retains text labels.

## September 20, 2026 — Restore inline detail styling

User identified visual drift in expanded details. The inline component had dropped the original detail-specific sage body/fact colors, warm requirement treatment and reference-link styling, inheriting generic dark body text with heavy labels. Font families had not been removed (Georgia headings and Arial/Helvetica body remain). Restored the journal detail palette, serif field labels, warm requirement highlighting and styled links while preserving compact rows and larger readable text.

## September 20, 2026 — Synthesis workshop cleanup

**Status: Implemented locally; awaiting human review.**

User requested Recipes → Materials → Planning tab order, with Planning replacing Craft Plan. Inventory tracking must always be active, including existing saves. Material rows group by family and expose source/drop rules, farming location and editable owned count while collapsed; multiple sources can occupy separate lines. Expanded details retain tactics, conditions, finite treasures/rewards and related links. Remove repeated generic Lucky Strike advice; retain meaningful item-specific exceptions.

Implementation preserves blank-as-unknown versus explicit zero, existing inventory quantities and craft plans, and compatibility with older backup schema. Material display uses the existing sourced drop data without inventing rates for conditional encounters. Repeated generic reset/ability boilerplate is omitted; ability entries remain available in Reference. Non-farmable sources and detailed crafting/encounter requirements remain in expanded content.

Verification: production build passed. All 59 unit tests passed, including legacy inventory migration and backup/recovery preservation. Browser suite: 52 passed on desktop/phone, two optional heavyweight model cases skipped. Verified collapsed drops/locations, family grouping, editable unknown/zero stock, tab naming and existing planning workflows. Shared materials preview visually inspected.

## September 20, 2026 — Material targets and a self-contained farming plan

**Status: Implemented locally; awaiting human review.**

The Farming Plan tab tracks **material targets**, not a queue of recipes to craft.

- Adding a recipe adds its direct ingredient quantities for one craft to the existing material targets. Repeated additions are additive; shared ingredients accumulate into one target for that material.
- Adding a material directly gives it a target of 1 if it is absent. An existing target is preserved rather than reset.
- Each planned material shows editable target and owned quantities, plus its remaining quantity.
- Preserve unknown stock as distinct from confirmed zero. A blank owned count must not silently become zero or produce a falsely exact remaining quantity.
- Keep the useful farming information on the Planning page: source/drop rules, farming location and the complete expandable material details. Players should not have to navigate away to assemble a farming plan.
- Craftable materials retain their synthesis requirements and acquisition alternatives within those inline details. Do not turn a direct-ingredient addition into an unrequested recursive recipe queue or automatically consume inventory.

### Acceptance checks

- Add a recipe twice and verify each direct ingredient target increases twice by the recipe quantity; common material IDs merge into one target.
- Add a new material and verify target 1; add it again and verify the existing target is preserved.
- Change target or owned stock and verify remaining quantities, including unknown, zero, exact and surplus stock.
- Open a planned material's details without leaving Planning and verify its complete source conditions, locations, tactics and crafting alternatives are available.
- Preserve saved stock, meaningful planning data, and historical crafted checks through the planning change. Historical checks do not consume materials.

Implementation: collapsed recipe/material cards have Add to farming plan actions. Existing recipe goals migrate once into summed direct ingredient targets; saved inventory and historical completion stay intact. Targets persist through backups, recovery, undo and concurrent tabs. Removing a target preserves stock. More info embeds material tactics, source-enemy/guide details, and synthesis options with expandable ingredient sources (including Dark Matter → Mythril), with cycle guards and no automatic recursive target additions.

Verification: production build and 65 unit tests passed, including migration, import/recovery, additive target transactions, undo, overflow bounds and concurrent tabs. All 56 standard desktop/phone browser cases passed across the full run and corrected-test reruns; two optional heavyweight model cases skipped. Confirmed target/owned/remaining math, persisted removal, no stock loss, collapsed source details, and nested Dark Matter/Mythril information without leaving the plan. Desktop/phone screenshots inspected. Final copy cleanup clears stale add notices on tab changes. Changes remain local.

## September 20, 2026 — Compact conditional drops

User requested non-percentage conditional drops show only “Conditional” in collapsed rows. Kept enemy names and locations, preserved percentage-based rules, and retained the full conditional reward text in expanded material details. Applies consistently to Materials, Farming Plan and inline ingredient sources.

## September 20, 2026 — Workshop aesthetic cleanup

User requested a visual cleanup after the functional changes, highlighting oversized recipe action buttons and loose layout. Consolidated recipe count and expansion control into one toolbar, removed duplicated crafted totals, moved completion checks to the leading edge, and aligned compact farming actions beside recipe/material content where width allows. Narrow layouts keep right-aligned content-sized actions. Applied consistent paper surfaces, sage borders, detail separators, family headings and field spacing across the workshop. Preserve readable text, touch targets and journal typography.

Verification: production build and all 20 targeted desktop/phone browser checks passed. Inspected the refreshed shared recipe view and phone layout, plus farming-plan screenshots. Changes saved locally; no deployment.
