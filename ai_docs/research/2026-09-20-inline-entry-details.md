# KHFM inline entry details

## Research
The former standalone EntryPage was the only renderer for media, missability, public facts, uncertainty, related records and recipe stock calculations. Links to it originated in world lists, reference/challenges, search, synthesis recipes/materials/plan, and Jiminy retrieval/citations. World cards and recipes used two columns. World presentation switches duplicated compact and detailed list implementations.

## Plan
1. Save human feedback and both fallback approaches (modal detail card; world/category detail table) in the durable feedback file.
2. Extract shared compact details, preserving meaningful content and deterministic inventory calculations.
3. Replace item pages with independently expandable rows, plus category expand/collapse controls. Keep completion and planner controls separate. Keep expanded records visible when completion changes.
4. Use one column for world and recipe lists. Remove redundant presentation switches.
5. Generate canonical links to the owning collection with a focused entry. Resolve old bookmarks there, overriding conflicting filters for that item without resetting saved choices. Keep expansion through reload/back navigation.
6. Verify keyboard/bulk expansion, completion persistence, layout, inventory, media, search/citations and compatibility links on desktop and mobile.

Implementation covers all KHFM entry categories. The game selection menu is unchanged. Source data and progress schema remain compatible.

## Result
Implemented the full mapped scope. Final production build passed; 57 unit tests passed; 40 desktop/phone browser cases passed, with two optional heavyweight model cases skipped. Tests cover keyboard and bulk expansion, completion/filter behavior, compatibility URLs, same-citation reopening, media fallback/zoom, inventory/planning, persistence and offline reload. Shared preview refreshed and visually reviewed.
