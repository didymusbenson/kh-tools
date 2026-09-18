# Testing and content validation

Status: accepted user direction, 2026-09-18. Shared by every game specification.

## Game baseline and testing objective

The user plays the games on **Steam**. Use the modern applicable Steam edition as the user's content context; retain already scoped relevant modern-platform differences without reopening PS2/original-edition support.

Validate **Ars Arcanum's functionality**. Testing is not coupled to the user's gameplay, and playing through each game or manually reproducing every acquisition in the game is not a required acceptance gate. Existing research labels may accurately say that no in-game verification occurred; that historical statement must not become a requirement that the user supplies a playthrough.

Content still needs cited, edition-correct sources, reconciliation of contradictory values, schema/reference checks, inventory counts and independently checked calculation fixtures. Do not label a source-backed fact “in-game tested” without such evidence. Resolve uncertain game mechanics through research; expose unresolved fields honestly.

## Initial app smoke and acceptance matrix

Updated user direction, 2026-09-18: **desktop Chrome and iPhone 17** are the initial acceptance targets. The historical table below records the earlier broader matrix; iPad is no longer an initial requirement. Automated Chromium/WebKit mobile emulation is useful engineering evidence but is not a claim of real iPhone 17 hardware acceptance. Jiminy has no persistent conversation memory.

| Target | Initial scope |
|---|---|
| Browser on an Apple computer | Navigation, responsive layouts, keyboard, search, checklist/inventory persistence, synthesis calculations, offline content and Data Jiminy. Record actual browser/OS versions when executing tests. |
| iPhone | Touch layouts and controls, Safari/browser use and installed PWA behavior, offline restart, persistence, storage/download behavior and local-model resource/latency checks. |
| iPad | Touch/tablet layouts, browser and installed PWA behavior, portrait/landscape, offline restart, persistence and local-model checks. |
| Android test device | Follow-up compatibility pass when used; it does not block initial Apple smoke/acceptance. Do not claim validated Android support before this pass. |

Exact hardware, OS and browser versions belong in test execution records; they are not a new planning question for the user. Other supported-browser coverage can be scheduled within implementation without changing the initial Apple-first sequence. This testing sequence does not defer specified product features.

## Highest-value app checks

- Compact and expanded collection checks share one stable record and update world/category counts correctly.
- Scope isolation, grouped-item counts, filters, resume, undo, export/import, migrations and failed writes behave correctly.
- Synthesis is first-class: run the [inventory/planner acceptance scenarios](content/synthesis-and-inventory.md), including independent arithmetic expectations and game-specific rules.
- Offline installation/readiness, cold relaunch, interrupted downloads, safe updates, local inference and missing-data responses work on the initial matrix.
- Readable dense tables, touch/keyboard access and accessible names/states work without production images; optional-media fixture tests remain in scope.
- Content is openly spoilerful. No warnings, spoiler-hidden state, blur/reveal controls or spoiler-preference tests.
- No Available Now filter, ability/story milestone questionnaire or progression-gate tracker. Required abilities/access conditions remain plain acquisition guidance.

## Scope boundary

Passing app tests does not certify unverified guide facts. Conversely, source validation does not require the user to test facts while playing. Record research, structured-data validation, app implementation and executed app acceptance separately. This supersedes older mandatory hands-on gameplay/modern-save verification wording throughout planning.
