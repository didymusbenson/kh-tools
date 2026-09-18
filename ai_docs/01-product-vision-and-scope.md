# Product Vision and Scope

## Product name

**Ars Arcanum**

## Vision

Build the definitive, mobile-first Kingdom Hearts completion journal: a fast React PWA that helps players find, understand, and track every collectible, synthesis requirement, unlock, challenge, record, and other completion item across supported games—even offline.

Ars Arcanum interprets Jiminy's Journal as a living cross-game reference rather than reproducing a specific game's menu UI.

## Experience promise

- Select a game through the retained fly-in home-menu interaction.
- Enter a game-specific volume or section of the journal.
- Find the direct answer first, with deeper explanation and relationships available.
- Track completion using the game's own terminology.
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

## Confirmed game specifications

- Kingdom Hearts Final Mix
- Kingdom Hearts II Final Mix
- Birth by Sleep Final Mix, including a related 0.2 section
- Dream Drop Distance, including HD-version differences
- Kingdom Hearts III, including separately scoped Re Mind content

This list can expand; it does not yet establish first-release sequencing.

## In scope

- Responsive, installable React PWA
- Offline core reference content
- Fly-in game selection
- Jiminy's Journal-inspired information experience
- Distinct per-game visual themes within shared navigation
- Search, filtering, cross-linking, checklists, and progress
- Structured provenance and edition applicability
- Game-specific calculators and planners

## Out of scope unless later accepted

- Direct replicas of copyrighted in-game menu screens
- Native iOS/Android apps for the initial delivery
- Treating release collections as if they were standalone games
- User accounts or cloud sync without an explicit product decision
- Unverified bulk migration of legacy data

## Success criteria

- A player can complete a supported game without needing another guide.
- Common lookups reach an answer in a few taps on a phone.
- The installed core experience works offline.
- Game and edition context is always clear.
- Visual identity feels like Ars Arcanum and Jiminy's Journal, not a copied pause menu.
- Dense tools remain functional and readable despite the journal metaphor.
- Every published fact has provenance and verification state.

## Open questions

- Which game ships first?
- What is the minimum content threshold for a game to appear in production?
- Which progress state remains device-local, and does any later version sync?
- What original visual assets and icon system will define Ars Arcanum?
- How much lore/context belongs beside completion-focused material?
