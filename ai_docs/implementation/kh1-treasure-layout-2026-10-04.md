# KH1 treasure binding and world-detail cleanup · 2026-10-04

## Scope and correction

The two user-supplied screenshots identify KH1 Final Mix's Treasures & Rewards world directory and the world-detail filter/match toolbar. The directory's paper leaves are equal width, but the native index binding still used its ordinary 43% position. At a 1440×900 viewport this placed the ring centers 75.72 px left of the actual seam and over the world completion counts.

- Center the binding at 50% only inside the KH1 treasure host. Preserve its width, styling, reserved inner margins, narrow-screen hiding, and the original 43% index geometry elsewhere.
- Remove KH1's Find & filter, matching-count, previous/next Match, and compact mobile Filter controls. Ignore legacy filtering parameters for this board so a saved URL cannot silently dim its slots behind removed controls.
- Retain an explicitly labeled Back to Worlds link, world/grid/notes pagination, adjacent acquisition notes, separate collected checks, Undo, and global Search, Save & Settings, and Ask Jiminy.
- Leave the other six games' filters and navigation intact. No data, canonical order/numbering, acquisition IDs, storage format, or persistence logic changes.

## Verification

- Production content validation, Coppermind pack check, TypeScript, Vite, and service-worker build passed.
- All 232 unit tests passed.
- Python pack tests: 7/7; seed tests: 2/2. The pinned Chroma test dependency was installed in a temporary environment; application dependencies were unchanged.
- Production Playwright: **70/70 passed, zero skips**, across desktop and mobile Chromium projects (1.4 minutes). This includes 10 new binding/clearance, fixed-frame, 44 px control, history/focus and stale-filter cases plus all 60 seven-game treasure regressions. Both production offline checks ran. KH1 failed saves, selection without saving, mark/unmark, Undo, cross-tab synchronization and saved-ID reload passed.
- Actual screenshots were inspected before implementation, then compared with corrected production captures at 1440×900, 2048×1468, 390×844 and 320×568. No input screenshots or test-capture image files were added to the repository.
- At 1440×900 the spread remained x=179.046875, y=163, width=1081.90625, height=628 before and after. The corrected binding center is x=720 against a measured page seam of x=719.984375 (subpixel rounding only).
- At 2048×1468 the binding center is x=1024 against x=1023.984375. The single-page phone layout retains 44 px board controls and no visible binding.

## Reproduce focused browser checks

After `npm run build`:

```sh
CI=1 ARS_TEST_CHROMIUM=/tmp/chromium npx playwright test \
  tests/e2e/kh1-treasure-layout.spec.ts tests/e2e/treasure-grids.spec.ts \
  --workers=2 --reporter=line
```

The explicit executable is only for this container; a standard installed Playwright Chromium is sufficient elsewhere. `CI=1` enables the production offline cases.

## Boundaries

This is a feature-branch change, not a merge or deployment. Physical-device acceptance remains separate. The repository's inherited full-suite legacy failures are not repaired or weakened by this patch; only KH1 assertions tied to the deliberately removed filter controls are updated. Other games keep their full filter assertions.
