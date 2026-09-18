# KH1FM corrective UI/UX review

Review scope: accepted green Jiminy’s Journal direction; anchored main-menu list with moving artwork; mobile/accessibility contract; linked collection views; synthesis/inventory contract; optional media support; Data Jiminy presentation. The reviewer did not author the main UI. Review uses local Chromium desktop and phone-sized emulation; it does not certify physical iPhone 17 behavior, VoiceOver or mobile memory performance.

## Corrective cycle

| Finding | Correction | Evidence |
| --- | --- | --- |
| Optional map/screenshot entry support was absent despite being an MVP architectural requirement. | Added optional media schema and build validation (root); conditional entry renderer; responsive media styles; useful alt/captions, ruleset/platform/credit/source labels; numbered annotation text; enlarged native dialog with zoom, keyboard scrolling and focus restoration. No production game images added. | Synthetic non-production image/map/failed-image browser fixtures in `tests/e2e/media.spec.ts`. |
| Jiminy’s suggested missing-collectibles question did not reach the deterministic progress path. | Added “missing” to progress intent recognition; category location questions list sourced canonical records directly. | `tests/coppermind.test.ts` verifies the exact suggested prompt without model setup. |
| Reload left a downloaded assistant looking unavailable until the user pressed Download again. | Added cache-only `restore(data, callback)` and opening-panel integration. It checks matching content/model metadata and probes local inference before ready. | `tests/coppermind-engine.test.ts` verifies no fetch and rejects stale pack. Actual browser runtime evaluation recorded separately. |
| Worker-derived root path broke WASM under subpath hosting. | Parent document passes an absolute deployment-aware WASM asset base into the worker. | Subpath `/kh-tools/` test with relative app base. |
| Disclaimer rewrite had diluted the user’s authored voice. | Restored original wording with resolved model name; moved accurate download/session/model caveat into a separate adjacent note. | Static copy review against `ai_docs/data-jiminy.md`. |

## Reusable patterns

- Keep collection action identity independent of screen layout, index position, filters and duplicate catalog references. A compact toggle and detail toggle must use the same acquisition record.
- Treat media as optional enrichment: canonical text first, no empty gallery without approved assets, no broken-image placeholder taking over the entry, and visible edition/provenance context.
- Use native modal semantics for focus containment and Escape; explicitly restore the opening control without scrolling the journal.
- Preserve the user’s authored product voice; keep technical accuracy in concise adjacent copy.
- Never label model downloads ready based on UI flags. Probe cached inference and validate the matching game pack after a cold reload.
- Derive runtime assets from the document deployment base, not from worker origin or hashed asset directories.
- Test unknown inventory separately from zero and surplus. Exact counts belong to shared domain calculations, never a chat model.

## Validation boundary

Desktop and phone-size screenshots, overflow/focus/touch checks and corrective results will be appended after the UI author’s stylesheet handoff. Physical iPhone 17 Safari/Chrome, soft-keyboard safe-area behavior and screen-reader testing remain device acceptance tasks; simulated Chrome dimensions are not those tests.

## Completed visual and interaction pass

Initial desktop/phone screenshots exposed a fixed-launcher overlap: Jiminy covered the contents copy on a 390px phone and section-header edge on desktop. Corrected with a dedicated right rail on desktop and a separate bottom dock on phones. The phone journal scrolls inside the remaining viewport; route/return scroll restoration now uses that scroll owner. This reserves actual space rather than relying only on bottom padding. Keyboard focus and entry controls can move into the unobscured reading region.

Small phone body copy was 9–11px and several muted paper text roles had contrast below 4.5:1. Raised practical reading text to 13px, input text to 16px (also avoids iOS input zoom), secondary text to darker ink, and primary controls to 44px minimum. Phone chapter cards now use one readable column. Native dialog content retains readable copy and an accessible author-authored disclaimer plus separate factual limitations note. Offline/save status changes use status semantics.

The first cover screenshot displayed the Heartless symbol because `khfm.png` was confused with the original `khfm.jpg`. Corrected KH1 to the supplied repository Sora-and-flag illustration, and BBS to its original character illustration. Original bytes are unchanged. The illustration moves while the list stays anchored. Unavailable KH3/0.2 art is omitted rather than borrowing another game's illustration. Added spacing between the framed illustration and its caption.

Verified the UI author's corrections: All/Remaining/Completed collection filtering; persistent world category/status/view preferences; correct world return route/scroll; atomic plan-all-uncrafted action with explicit first-craft mode; visible recovery restoration; installation readiness initial state; cache-only Jiminy restoration; hash-safe skip links; and entry media placement after written instructions.

### Evidence

- `tests/e2e/media.spec.ts`: **6 passing browser cases** across desktop and phone Chromium. No-media clean layout, map plus screenshot, ruleset/platform captions, annotations, zoom, Escape/focus restoration, missing-image fallback and text retention.
- `tests/e2e/ux.spec.ts`: **4 passing browser cases**. Keyboard artwork preview without moving game choices, no launcher on cover, correct KH1/BBS artwork, hash-safe skip navigation, modal Escape/focus restoration, 44px launcher target and geometry proving launcher outside the reading region.
- Screenshots inspected at desktop 1440×1000, phone 393×852, and narrow phone 320×740. Cover, contents, collection index, synthesis and Jiminy inspected. No page horizontal overflow in the four major views at either primary size; narrow synthesis also remained 320px wide.
- Production build and TypeScript compile passed after corrections.
- Root owns offline service-worker, full functional-flow and real-model browser evaluation; refer to its final verification record. This review does not substitute for actual iPhone 17 keyboard/VoiceOver/memory testing.

Further-game pattern: maintain **one explicit scroll owner per responsive layout**. When docking assistants or other persistent controls, reserve their geometry and adapt route/return scrolling; arbitrary z-index plus bottom padding does not prevent mid-page overlap. Keep review screenshots and browser test outputs separate across concurrent agents to avoid deleting each other's trace artifacts.
