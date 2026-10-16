# KH1 material detail space and source priority

## Cause and change

The earlier compact material action belonged to KH2's separate journal component. KH1 still placed its action directly in a stretching flex-column leaf. Its standalone material detail also reused the compact source-row detail renderer, which intentionally removes rates and location because its caller normally already displays them. The standalone journal had no such source row.

KH1 now has a compact, right-aligned heading action with a flexible gap, including the recipe ingredient action. Owned stock uses one line. Stock help follows the material information. The standalone material detail explicitly shows its source rules and suggested enemy farming spots first, followed by alphabetized recorded worlds, then notes. The stock and target persistence behavior is unchanged.

Source rows preserve special reward conditions. Barrel Spider does not inherit the erroneous generic Agrabah spot; Arch Behemoth's 20% row is limited to Final Dimension with its Lucky Strike exception and non-permanent-farm warning. Battleship has separate body/part rates from the existing enemy reward table. Non-enemy rules are not assigned a misleading universal location. This is a presentation of existing primary-source records, not a new exhaustive acquisition audit. Related alternate-source and enemy details remain available below the main information.

Other synthesis actions were inspected: KH2 already has compact heading actions, DDD uses a content-sized action in its material-tools row, and BBS explicitly aligns its action to the start. Their game-specific layouts were retained.

## Validation

- Production build, TypeScript, canonical content and Coppermind checks pass.
- All 327 application tests pass, including source-rule/condition/location regressions.
- New browser coverage verifies first-source visibility, compact right alignment, keyboard add, reload persistence and containment at 1199×610, 390×650 and 844×350; captures Blaze Shard and conditional Stormy Stone.
- All 46 synthesis, material stock, farming plan and KH2 compact-action browser regressions pass across both desktop and mobile projects.
- New captures use `kh1-synthesis-material-*.png`, retained by the existing early synthesis CI artifact step.

### CI reload-race correction

The initial CI run caught a race in the new persistence assertion: `playerStore.enqueue` publishes the optimistic target immediately, so the disabled “In farming plan” button does not prove that IndexedDB has committed. Reloading at that point can abort the pending write. The test now waits for the completed-action notice and the Saved footer before reloading, then separately verifies the persisted disabled state. No production persistence behavior changed.
