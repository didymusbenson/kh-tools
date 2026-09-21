# Feedback recovery and current implementation

## Scope and evidence

The user reports a human review of the first deployed build followed by dispatched agents applying that feedback. As of this investigation, that specific review and the dispatched work have **not been recovered**. The planning conversation, accepted requirements, and independent agent review are separate evidence and must not be represented as the missing human feedback.

Baseline: `ffa90b6cc07f1b3a8bb1327bae3ca8ed1f6ef1dd`, September 18, 2026. Local master and all remote branches were inspected. Both other remote branches are ancestors of master. The sole PR is merged, with no reviews/comments, and no GitHub issues contain the missing feedback.

- [Merged implementation PR](https://github.com/didymusbenson/kh-tools/pull/1)
- [Successful Pages deployment of baseline](https://github.com/didymusbenson/kh-tools/actions/runs/35378894369)
- [Live Pages site](https://didymusbenson.github.io/kh-tools/)

The deployed page serves the same `index-C8O3B-V7.js` produced by the baseline local production build. This rules out an unpromoted pushed branch; it does not rule out unpublished work on another machine or a stale installed client.

The accessible task titled `Find kh-tools repo` contains planning directions through the design contact sheet and Coppermind setup discussion. Available local session files and the cloud task listing did not reveal the later feedback session. The browser cloud-task page requires sign-in. Recovery of the actual feedback remains an open dependency.

The user subsequently confirmed that the feedback and agent dispatch occurred in a browser on another machine. No connection to that browser session is available here. The user was asked to open/link that original task using the same account. This is an information-access dependency, not an approval requirement for the independent fixes below.

## Parallel research findings

| Area | Baseline behavior | Evidence |
| --- | --- | --- |
| Collection progress | Category numerator is computed from filtered records, causing Remaining to show zero completed | [App.tsx](https://github.com/didymusbenson/kh-tools/blob/ffa90b6cc07f1b3a8bb1327bae3ca8ed1f6ef1dd/src/App.tsx#L1063) |
| Recipe details | Canonical recipe entries show raw requirements without enabled inventory counts | [App.tsx](https://github.com/didymusbenson/kh-tools/blob/ffa90b6cc07f1b3a8bb1327bae3ca8ed1f6ef1dd/src/App.tsx#L1269) |
| Navigation state | Reference/challenge and synthesis filters reset; acquisition route choices disappear when following a source link | [App.tsx](https://github.com/didymusbenson/kh-tools/blob/ffa90b6cc07f1b3a8bb1327bae3ca8ed1f6ef1dd/src/App.tsx#L1399) |
| Missing-item answers | Missing collectible/location questions return counts without identifying the missing records | [retrieval.ts](https://github.com/didymusbenson/kh-tools/blob/ffa90b6cc07f1b3a8bb1327bae3ca8ed1f6ef1dd/src/jiminy/retrieval.ts#L96) |
| Scoped locations | Category location lookup does not apply requested world scope | [retrieval.ts](https://github.com/didymusbenson/kh-tools/blob/ffa90b6cc07f1b3a8bb1327bae3ca8ed1f6ef1dd/src/jiminy/retrieval.ts#L128) |
| Model lifecycle | Pending setup/restore can leave a reopened component without the progress/completion updates from the prior component | [index.ts](https://github.com/didymusbenson/kh-tools/blob/ffa90b6cc07f1b3a8bb1327bae3ca8ed1f6ef1dd/src/jiminy/index.ts#L115) |
| Installed updates | Update action appears only in Backup; no visible build identifier or explicit focus/manual update checks | [main.tsx](https://github.com/didymusbenson/kh-tools/blob/ffa90b6cc07f1b3a8bb1327bae3ca8ed1f6ef1dd/src/main.tsx), [App.tsx](https://github.com/didymusbenson/kh-tools/blob/ffa90b6cc07f1b3a8bb1327bae3ca8ed1f6ef1dd/src/App.tsx#L2279) |

Already implemented: anchored game choices, original artwork, green journal, linked persistent checks, optional inventory and deterministic crafting planner, internal citations, separate Chroma preparation directories, local models, and transient chat. Only KH1FM is implemented. The other games remain overall MVP scope but were not part of the latest explicit KH1 implementation authorization. Area filtering and outgoing artwork animation remain gaps against the planning specification; they are not established as items from the missing human review.

## Implementation plan

1. Recover the human review and any unpublished agent results; reconcile each item against source and deployment before claiming feedback completion.
2. Correct independently confirmed KH1 journal state/count/inventory defects with focused browser regressions.
3. Correct deterministic missing-item/location answers and interrupted model setup/restore with focused tests.
4. Make installed update availability visible and expose a build identifier; retain user-controlled activation and saved progress.
5. Integrate agent changes, run production build and relevant unit/browser checks, inspect desktop/phone presentation, then assess delivery against recovered feedback.

## Baseline validation

- 36 unit tests passed.
- Content validation: 1,149 entries, 33 recipes, 23 coverage groups.
- Real stored pack validation: 4,300 thoughts, 1,148 supported entries.
- Production build passed using `/kh-tools/` base path.
- Browser suite: 19 passed, one failed, two heavyweight model cases skipped. Failure: phone synthesis plan quantity became zero instead of one after reload (`tests/e2e/journal.spec.ts:115`). Assigned for investigation.
- Physical iPhone 17 behavior and actual model inference were not revalidated in this baseline pass.

## Local implementation outcome

Implemented the independently confirmed journal corrections: category totals remain stable under Remaining filters; canonical recipe detail pages show enabled inventory and unknown/surplus values; reference, challenge and synthesis filters persist; material acquisition-route choices survive source navigation; unchanged quantity-field blur does not enqueue a stale write. Browser persistence tests now wait for the explicit saved state before reloading.

Jiminy lists missing collection actions with scoped locations and canonical links, preserving shared acquisition grouping. Long selections show the first 12 actions and an explicit truncation count. World-specific category lookups are scoped. Setup/restore progress is observable by the current panel, guarded against stale activations, and restored after leaving/reentering during an operation. Clearing chat does not invalidate model setup.

Installed-app changes include update checks on startup/focus/reconnection, a manual check and build identifier, a notice in every journal page and the cover, and verification of cached journal files after cold reload. Activation remains explicit. Previously installed baseline clients only gain the new notice after activating this release through their existing update control.

Validation: 57 unit tests passed; canonical content and real stored Coppermind pack validation passed; final production build passed under `/kh-tools/`. All 30 non-heavyweight desktop/phone browser cases passed against the final build (two heavyweight cases intentionally skipped). Inspected desktop Jiminy and phone synthesis screenshots. Update lifecycle was verified with mocked registration callbacks; an actual two-release update rollout was not exercised. No physical-device or fresh real-model inference claim is made.

Acquisition-route preferences remain local UI preferences, outside backup exports. Area filtering, full outgoing-artwork animation and other-game implementations have not been expanded in this patch. None of these independent corrections is claimed as satisfying the missing human feedback list. No deployment has been made.
