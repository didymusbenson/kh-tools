# Non-CoM research: final integration validation

Completed October 3, 2026 against the final integrated KH2/BBS/DDD/KH0.2/KH3 code and data. Subsequent integration-report edits change documentation only.

## Passed locally

- `npm test`: **176 tests in 20 files passed**.
- `npm run build`: canonical content generation, empty Coppermind check, TypeScript, Vite and PWA generation passed. The existing large-bundle advisory remains.
- `ARS_TEST_CHROMIUM=/tmp/chromium npm run test:e2e -- tests/e2e/practical-research.spec.ts tests/e2e/bbs-research.spec.ts`: **10 desktop/mobile Chromium scenarios passed**. Coverage includes KH0.2 objective/wardrobe guidance, DDD portal-reference delivery, KH3 Forest Clasp guidance, BBS corrected sticker location, character-specific rare-crystal routes, source caveats, modal dismissal/reopening and selected-character persistence.
- `python tools/content/verify-gap-integration.py`: seven-game identity, source presence, recipe joins and **208 unique audit families** passed. No removed or duplicate entry/recipe IDs, missing sources or broken recipe links.
- `python tools/content/verify-practical-review.py`: **156 scoped families / 65 starting residuals** passed; shared register matches game ledgers, every deferred/open family has its rationale and report, and excluded KH1/CoM/Jiminy paths are unchanged.
- DDD and KH0.2 `validate-audit.py` checks passed, including all 54 normalized DDD source boards connected and KH0.2’s fixed 55-find denominator.
- Seven Coppermind pack tests passed. Both seed-isolation tests passed after installing the repository-pinned `chromadb==1.5.5` into a temporary validation environment; the first missing-dependency attempt was an environment issue, not a passing test. The tests use temporary fixtures; the empty production pack was not reseeded.
- Final report relative-link checks and `git diff --check` passed.

BBS’s worker additionally completed 12 desktop/mobile browser scenarios and generator reproducibility before integration. A coordinator rerun of the extra, older BBS UX file was interrupted after two passes by a cancelled tool review; it is not counted as a complete additional pass. The final targeted checks listed above completed successfully.

## Preserved identities

| Game | Current entries | Recipes |
|---|---:|---:|
| KH1 FM, unchanged | 1,259 | 33 |
| Re:CoM, unchanged | 431 | 0 |
| KH2 FM | 1,315 | 59 |
| BBS FM | 1,653 | 492 |
| DDD HD | 1,285 | 263 |
| KH0.2 | 177 | 0 |
| KH3 | 1,954 | 286 |

DDD has two additional noncheckable planning references; all previous IDs remain. BBS preserves all 442 collectible flags. No master merge or deployment occurred.

## CI and acceptance boundaries

An earlier exact remote checkpoint, `0307b0783ef7d50cb93e74345621bd569477fb3f`, completed its install/content/pack/unit/build stages but failed the full browser stage: **61 passed, 51 failed, two skipped**. [Workflow run](https://github.com/didymusbenson/kh-tools/actions/runs/37075159350). Some old KH1 selector/navigation failures were reproduced on the earlier baseline; all 51 have not been independently classified. Unrelated browser-suite repairs are outside this research pass.

The final combined checkpoint’s exact-head CI must be checked after publication and reported in the delivery handoff. These local results do not claim a green full CI browser suite, physical-device/release acceptance, or independently played Steam routes. Source/edition uncertainty remains visible in the game records.
