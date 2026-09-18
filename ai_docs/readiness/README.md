# Per-game readiness

These are working readiness checklists and answer logs, not declarations that a game is ready. All specified games/features remain MVP unless explicitly deferred. KH1FM is the first detailed readiness assessment; parallel researchers are expanding the other games from their existing stubs. See [research assignments](../research/parallel-game-research.md); each game's readiness document records the latest completed evidence. 0.2 has a separate readiness checklist within the BBS family. There is no 2.8 collection checklist.

## Edition policy — accepted

Target modern/current releases. KH1 and KH2 use Final Mix as delivered in modern releases. Do not build support for original/non-Final-Mix or PS2-era rulesets. Legacy material is evidence to reconcile against the modern baseline, not a compatibility obligation. Record relevant differences among supported modern platforms, especially achievements; do not assume they are identical. Research should pin the precise releases/builds verified, rather than using an unversioned “latest” label. Distinguish already released builds from announced upcoming editions as of the research date; announcements do not verify mechanics in an unreleased build.

## Readiness documents

- [Kingdom Hearts Final Mix](./kingdom-hearts-final-mix.md)
- [Kingdom Hearts II Final Mix](./kingdom-hearts-ii-final-mix.md)
- [Birth by Sleep Final Mix](./birth-by-sleep-final-mix.md)
- [Kingdom Hearts 0.2](./kingdom-hearts-02.md)
- [Dream Drop Distance](./dream-drop-distance.md)
- [Kingdom Hearts III](./kingdom-hearts-iii.md)

## Working method

- Use stable question/task IDs when answering or assigning work.
- Separate **user decisions**, **research**, and **engineering**. Do not ask the user to supply facts we can research or make routine engineering decisions unnecessarily.
- Record answers with date and rationale; update the corresponding game spec and affected acceptance criteria.
- States: **Not audited**, **Legacy lead**, **Missing/partial**, **In progress**, **Verified**, **Implemented**, **Validated**. A sheet tab or a written spec is not verified content or working code.
- Record evidence and expected/actual record totals before declaring a category complete; use “unknown” until measured.
- “Ready to start” means enough direction to work. “Ready to ship” means all required data and behavior pass the listed gates.
- Scope questions refine organization and user experience; unanswered questions do not silently exclude completion content.
- Production screenshots/assets awaiting acquisition are the existing exception. Text location details and media-capable design/testing remain required.

Shared contracts: [collectible scope and linked views](../content/collectible-compendium-and-linked-views.md), [Data Jiminy](../data-jiminy.md), [progress](../content/persistent-checklists-and-progress.md), [architecture](../05-technical-architecture.md).

## Accepted cross-game defaults

User game context: Steam. Initial app smoke/acceptance: Apple browser, iPhone and iPad; Android follow-up. Validate app functionality and source/data accuracy without requiring user gameplay. See [testing/content validation](../testing-and-content-validation.md).

No spoiler warnings/concealment and no Available Now/ability-story tracker. Keep acquisition prerequisites as text. [Synthesis and optional inventory](../content/synthesis-and-inventory.md) are first-class where applicable, with owned/required (x/y) recipe reminders and rigorous calculation acceptance. Do not reopen these settled questions in each game's readiness.
