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
