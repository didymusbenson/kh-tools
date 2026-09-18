# Information Architecture

## Goals

- Let a player reach a specific answer quickly on a phone.
- Support browsing by game and searching across all supported content.
- Keep guide pages understandable when reached directly from search or a saved link.
- Make game, edition, platform, and add-on context explicit.
- Use the journal metaphor to clarify relationships rather than hide navigation.

## Top-level journey

1. Ars Arcanum cover/title experience
2. Fly-in game selector
3. Selected game's journal
4. Journal section, index, checklist, tool, or individual entry
5. Cross-references to related entries

Deep links may enter directly at steps 3–5.

## Candidate hierarchy

- Ars Arcanum
  - Game selection
  - Global search
  - Recent and saved entries
  - Completion overview
- Game journal
  - Contents
  - Worlds/story progress
  - Collections and treasures
  - Characters
  - Adversaries
  - Synthesis/crafting
  - Equipment and abilities
  - Minigames/challenges
  - Reports/records
  - Game-specific tools
  - Completion summary
- Sources and verification
- About and legal information

Sections adapt to the selected game's actual systems. Empty generic sections should not appear.

## Game families and releases

- Canonical games receive their own journal identity.
- Related experiences may nest inside a game family when that improves comprehension; Birth by Sleep 0.2 belongs with the Birth by Sleep family.
- Platform versions and editions modify applicability rather than becoming duplicate games.
- Release collections are navigation/grouping metadata, not automatically game identities.
- Add-ons such as Re Mind remain visibly distinct from base-game completion.

## Taxonomy

### Game identity

- Canonical title
- Common abbreviation and aliases
- Family/related title
- Edition/version
- Platform
- Region, where mechanically relevant
- Base game, add-on, or media work
- Release-collection membership

### Content type

- Journal entry
- Guide
- Reference
- Table
- Calculator/tool
- Checklist
- FAQ
- Strategy
- Edition comparison

### Completion semantics

- Required for in-game 100%
- Required for trophy/achievement
- Optional collection
- Optional encounter
- Add-on content
- Repeatable challenge
- Missable or permanently available
- Character/save-specific

## Search requirements

- Global and current-game scopes
- Canonical names and aliases
- Entity-aware results grouped by category
- Visible game/edition badges
- Offline search over installed content
- Direct answers for acquisition, location, requirements, and relationships
- Typo tolerance and abbreviation support
- Filters that serialize into shareable URLs

## Navigation requirements

- Persistent escape back to game selection
- Current game and edition always visible
- Journal contents available from every game page
- Browser-native back/forward behavior
- Keyboard and screen-reader parity
- Reduced-motion equivalent for fly-in and page transitions
- Cross-references for item → recipe → source → area relationships

## Deep-linking requirements

- Every journal entry has a stable URL.
- Useful tool state and filtered views should be shareable when practical.
- Direct links must not require replaying the home animation.
- Routes should use stable IDs while exposing readable slugs.
- Renamed entries require redirects or aliases.

## Open questions

- Should global search open before a game is selected?
- Does the journal support one cross-game completion dashboard?
- Are games presented as separate volumes or major sections of one volume?
- How should release collections be exposed without competing with canonical games?
- Which filters and progress choices persist locally?
