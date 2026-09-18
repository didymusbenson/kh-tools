# Information Architecture

## Goals

- Let a player reach a specific answer quickly on a phone.
- Support browsing by game and searching across all supported content.
- Keep guide pages understandable when reached directly from search or a saved link.
- Make version and platform differences explicit.

## Candidate hierarchy

This is a starting hypothesis:

- Home
- Games
  - Game overview
  - Guides
  - Reference tables
  - Tools/calculators
- Global search
- Saved or recent content
- About, sources, and legal information

## Taxonomy

### Game identity

- Canonical title
- Common abbreviation
- Edition/version
- Platform
- Region, where mechanically relevant

### Content type

- Guide
- Reference
- Table
- Calculator/tool
- Checklist
- FAQ

Additional taxonomy is TBD.

## Search requirements

- TBD

## Navigation requirements

- TBD

## Deep-linking requirements

- Every guide and useful filtered view should have a stable URL.
- TBD

## Open questions

- Should search span every game by default or remain within the currently selected game?
- Should tools and guides be organized separately or by the player task they support?
- Which filters need to survive refresh, sharing, and offline use?
