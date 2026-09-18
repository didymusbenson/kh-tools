# Product Vision and Scope

## Product name

**Ars Arcanum**

## Vision

Build the definitive, mobile-first Kingdom Hearts completion journal: a fast React PWA that helps players find, understand, and track every collectible, synthesis requirement, unlock, challenge, record, and other completion item across supported games—even offline.

Ars Arcanum interprets Jiminy's Journal as a cross-game collectible compendium. Its central question is “where is this thing, and how do I obtain it?” Journal presentation does not require recreating narrative or character-biography completion flags. See the [collection scope and linked views](./content/collectible-compendium-and-linked-views.md).

## MVP scope rule

All user-requested features and specified games are MVP scope unless the user explicitly defers them. “Later” in a planning conversation is not a release deferral. The only current explicit exception is production screenshots/visual assets that still need to be obtained; media-support design and testing remain MVP. Unresolved implementation choices require planning, not automatic deferral. This does not add unrequested features or authorize implementation while discovery is ongoing.

## Experience promise

- Select a game from the retained anchored home menu while its artwork flies into the adjacent illustration stage.
- Enter a game-specific volume or section of the journal.
- Find the direct answer first, with deeper explanation and relationships available.
- Track collectibles using familiar game terminology, compact world lists and expanded location details backed by the same saved checks.
- Move between related entries—item, recipe, enemy, area, prerequisite, and reward—without consulting another guide.
- Continue using installed core content offline.

## Audiences

- Players pursuing 100% in-game completion
- Trophy and achievement hunters
- Returning players trying to identify a missing item
- Players optimizing synthesis, melding, Spirit creation, or farming
- Series fans comparing editions and platforms
- Guide researchers and maintainers validating structured facts

## Primary use cases

- Browse completion categories by game and world
- Search globally or within a game
- Track collectibles and completion requirements
- Calculate remaining synthesis/crafting materials
- Resolve acquisition prerequisites
- Use game-specific tools such as BBS command melding
- Distinguish edition, platform, base-game, and add-on requirements
- Verify source provenance and data freshness
- Ask a per-game Coppermind questions and receive sourced answers from stored guide data using a bundled SLM

## Confirmed game specifications

- Kingdom Hearts Final Mix
- Kingdom Hearts II Final Mix
- Birth by Sleep Final Mix, including a related 0.2 section
- Dream Drop Distance, including HD-version differences
- Kingdom Hearts III, including separately scoped Re Mind content

All listed games are MVP scope. Development order does not remove games from the first release without explicit user approval.

## Release baseline

Target modern/current releases. KH1 and KH2 use modern Final Mix; original/non-Final-Mix and PS2-era support are excluded. Verify relevant modern platform differences and pin researched releases. See [readiness workbooks](./readiness/README.md).

## In scope

- Responsive, installable React PWA
- Offline core reference content
- Anchored game selection with animated game-specific artwork
- Jiminy's Journal-inspired information experience
- Distinct per-game visual themes within shared navigation
- Search, filtering, cross-linking, checklists, and progress
- Structured provenance and edition applicability
- First-class synthesis/crafting tools, optional persistent inventory, owned/required ingredient reminders and accurate remaining-material planners
- Bundled SLM powering game-scoped Coppermind Q&A grounded in stored guide data

## Out of scope unless later accepted

- Spoiler warnings/concealment and Available Now/progress-gate tracking
- A full story walkthrough or exhaustive tracking of narrative Journal/character updates
- Direct replicas of copyrighted in-game menu screens
- Native iOS/Android apps for the initial delivery
- Treating release collections as if they were standalone games
- User accounts or cloud sync without an explicit product decision
- Unverified bulk migration of legacy data

## Success criteria

- A player can find, obtain and track all scoped collectibles and completion items, including crafting and challenge goals, without another reference guide.
- World percentages represent collectibles; achievement, crafting and challenge tracks use their own explicit requirements.
- Common lookups reach an answer in a few taps on a phone.
- The installed core experience works offline.
- Game and edition context is always clear.
- Visual identity feels like Ars Arcanum and Jiminy's Journal, not a copied pause menu.
- Dense tools remain functional and readable despite the journal metaphor.
- Every published fact has provenance and verification state.

## Open questions

- In what order do we build and validate the MVP games?
- What is the minimum content threshold for a game to appear in production?
- Which progress state remains device-local, and is synchronization needed? No cloud-sync decision has been made.
- What original visual assets and icon system will define Ars Arcanum?
- How much lore/context belongs beside completion-focused material?

## Accepted use and validation context

The app is fully spoilerful. Required abilities/access conditions remain visible acquisition guidance without player milestone entry. The user plays Steam and will initially test app functionality on Apple browser, iPhone and iPad, with Android follow-up. No user gameplay/playthrough verification gate. See [testing](./testing-and-content-validation.md) and [synthesis/inventory](./content/synthesis-and-inventory.md).
