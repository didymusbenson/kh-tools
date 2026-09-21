# KHFM refinement review — September 20, 2026

This is the dedicated KHFM task in the six-game rollout. KHFM already implements the refinement session's category navigation, inline collection rows, readable compact journal styling, distinct menu icons, always-on inventory, material-family grouping, conditional source labels and material-target farming plan. Existing Data Jiminy behavior is intentionally untouched.

## Research and decisions

Reviewed the refinement playbook against KHFM's `Synthesis` and backup views in `src/App.tsx`, `EntryDetails`, material presentation helpers and the transactional player store. Kept the working KHFM implementation as the baseline instead of replacing it with the new shared guide shell.

The farming plan uses direct recipe ingredients, additive shared targets, unknown stock distinct from zero and independent historical crafting. Craftable ingredients expose recursive source detail with cycle protection. Storage writes operate against the latest persisted state; failures roll back and surface through the store. Conditional material rewards retain their full rule in expanded details.

## Changes

- Added active-page semantics to the three synthesis tabs, so assistive technology can identify the current workspace.
- Updated progress/backup copy from obsolete “craft quantities / craft plan” to “farming targets,” matching what exports actually preserve.
- Rewrote the cross-game synthesis/inventory contract to remove obsolete opt-in controls and recipe-queue planning. It now documents always-visible stock, direct additive targets, no automatic dependency expansion, self-contained inline farming sources and unchanged historical craft semantics.
- Updated `lessons-for-other-games.md` with the category/world/inline/detail/aesthetic decisions and the explicit Data Jiminy exclusion. Existing model architecture notes are retained as historical technical context, not new rollout scope.

## Validation

Passed 33 focused tests across material presentation, deterministic planning and persistence. These cover conditional rules, unknown versus zero inventory, recipe totals, stock bounds and persistent mutation behavior. No new tests were added for the low-impact wording/accessibility edits. The root task owns the combined production build and desktop/phone integration checks.

## Shared-guide review sent to the root task

Read-only inspection identified character filtering excluding `Both` records when selecting Sora/Riku, per-world filtered counters shrinking their denominators, and a saved-status message that could remain positive alongside a storage error. These belong to the shared shell and were reported for root integration rather than edited concurrently.
