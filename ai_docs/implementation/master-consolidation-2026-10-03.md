# Master consolidation — 2026-10-03

## Included work

The integration joins the complete DDD/test-fix chain at `89a13d83bed5c124d57273d6a123599db8f2123f` with the independent Re:CoM chain at `cdbc4625453e0d95722b1b73183d7ab8ff869239`, preserving both histories. The original master endpoint was `e56ccb9abe902ef38076fd2888c9387a520f60a4`.

- Non-CoM practical research: `2cfc0ff`, including the reviewed BBS, DDD, KH2, KH0.2 and KH3 corrections.
- DDD Reports research and implemented journal: `2e9c4ee` and `619adc7`.
- KH3 Gummiphone interface research and implementation plan: `62f3516`. This is research only; no new KH3-specific renderer is implemented here.
- DDD Back/return-focus regression test synchronization: `89a13d8`.
- Re:CoM research/runtime integration: `2479d30`, `b01864f` and `cdbc462`, including COM-001–003 and COM-005–007 evidence, acquisition guidance and COM-017 duration follow-up.

No branch is deleted or force-pushed. No CI workflow or repository protection is changed.

## Branch coverage audit

All other non-CoM remote branches are ancestors of the latest chain or equivalent published research checkpoints already included in its tree. The two separately published practical-review endpoints, DDD `cf14a07` and KH3 `01520a8`, have no missing source/runtime changes; KH3's README has the later interface-research addition.

Local checkpoints `77420f5`/`62f3516`, `e0fa001`/`2cfc0ff` and `5107ba5`/`67decb8` respectively have identical complete trees. BBS `2ce375a` is preserved with later, clearer research dispositions. Historical intermediate implementation commits contain no additional work absent from their published successors. Duplicate histories are not replayed over newer content.

## Integration resolution

There was one merge conflict, confined to summary wording/counts in `research-workstreams-2026-10-02.json`. Every one of its 208 records was checked against its owning source: Re:CoM records exactly match `cdbc462`; all other records exactly match `89a13d8`. Counts are recomputed, rather than choosing either stale summary.

The scoped practical-review validator now accepts an explicit `--excluded-baseline` for independently authorized KH1/CoM work. Its default original-baseline behavior and all path/record preservation checks remain unchanged. In this combined integration, `--excluded-baseline cdbc462` verifies preservation of the independently completed CoM work while checking the non-CoM register.

## Executed local validation

- 183 application tests across 21 files: passed.
- Canonical content build, committed empty Coppermind pack verification, TypeScript and production build with `BASE_URL=/kh-tools/`: passed.
- Python pack tests: 7 passed; seed tests: 2 passed.
- Practical-review accounting: passed, 156 scoped families and 65 original residuals; 82 resolved, 52 deferred, 11 limitations and 11 useful questions still open across the complete scoped register.
- Focused browser suite at the production project base path: 66 passed. Covers DDD layout/regressions, Re:CoM UX, practical guidance and BBS research flows on desktop and mobile Chromium emulation. Includes persistence, offline reload, failed saves, backups, return navigation and narrow/landscape layouts. This is not physical iPhone acceptance.
- `git diff --check`: passed.

Commands:

```sh
npm test
BASE_URL=/kh-tools/ npm run build
python tests/coppermind_pack_test.py
python tests/coppermind_seed_test.py
python tools/content/verify-practical-review.py --excluded-baseline cdbc462
ARS_TEST_CHROMIUM=/tmp/chromium ARS_TEST_BASE_PATH=/kh-tools/ npm run test:e2e -- \
  tests/e2e/ddd-layout.spec.ts tests/e2e/ddd-reports-regression.spec.ts \
  tests/e2e/recom-ux.spec.ts tests/e2e/practical-research.spec.ts \
  tests/e2e/bbs-research.spec.ts --workers=2
```

## CI and deployment boundary

The latest pre-integration [validation run on 89a13d8](https://github.com/didymusbenson/kh-tools/actions/runs/37146211209) passed unit/content/build gates but finished with 104 browser passes, 50 previously identified legacy failures and 2 skips. Focused green tests do not imply a green full suite.

The combined integration must receive its own exact-head validation run and automatic master Pages run. Pages uses its existing independent application-test/content/build gates. Publication is confirmed only after its deploy job succeeds and the live site is checked; this document does not pre-claim either result. Later run links and live results are reported separately so recording them does not create an unvalidated replacement release commit.
