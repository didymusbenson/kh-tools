# Mobile UX and Accessibility

## Design direction

Ars Arcanum uses a Jiminy's Journal metaphor inside each game while retaining the original project's anchored game-selection menu with fly-in artwork.

See [Jiminy's Journal design direction](./ui/jiminys-journal-design-direction.md).

## Mobile-first requirements

- Primary workflows must work comfortably at narrow phone widths.
- Important information must not depend on hover.
- Tap targets must be large enough for reliable use.
- Tables need deliberate small-screen transformations rather than default horizontal overflow.
- Search and filtering should minimize typing during play.
- Core actions remain usable offline.
- Journal decoration must not reduce readable content space excessively.
- Direct links open content immediately without forcing an intro sequence.
- Entries remain complete and well-composed when they contain no screenshots.

## Anchored game selector and artwork transitions

- Preserve the recognizable fly-in artwork interaction. Keep game choices anchored and readable; animate the selected game's illustration.
- Support tap, keyboard focus and accessible list navigation without requiring hover or swipe. Keyboard focus previews corresponding artwork; touch selection/entry treatment should be evaluated in the design.
- Provide a reduced-motion variant using fades or immediate positioning.
- Keep game labels readable before selection.
- Avoid carousel traps and hidden offscreen options.
- Distinguish canonical games from related subentries and add-ons.

## Journal interaction model

- Contents behaves as navigation, not ornamental front matter.
- Page tabs have text labels.
- Entry status can be changed in one action.
- Page turns are optional animation, never a required gesture.
- Dense tools may use full-screen inserts, sheets, or workspaces.
- Cross-references visibly communicate where the user will go.
- Completion changes are reversible and provide clear feedback.

## Screenshot and map presentation

Production screenshots and maps are deferred beyond MVP, but the layouts must support them from the start.

- Do not show empty frames or placeholder galleries when an entry has no media.
- Text location instructions must remain independently sufficient.
- One primary location image should fit naturally on a phone.
- Maps and screenshots may appear together with clearly distinct captions.
- Enlarged media must preserve journal position when closed.
- Edition/platform-specific images require visible context.
- Show all available content openly; no spoiler warnings, blur, hiding or reveal controls.
- Optional uncached images do not block offline entry content.
- Test synthetic/owned fixtures must never be confused with production guide assets.

See [Screenshot, Map, and Visual Location Support](./content/screenshot-and-map-support.md).

## Larger screens

- Preserve the journal reading metaphor without stretching text across the viewport.
- Use facing pages only when it improves relationships or comparison.
- Allow persistent contents/index navigation where space permits.
- Tools may use split views for inputs and results.
- Media and text may use a coordinated split layout.
- Use the larger screen for a prominent artwork stage beside the anchored game list; do not turn game choices into flying cards.

## Accessibility baseline

- Semantic HTML and landmark structure
- Full keyboard navigation
- Visible focus states
- WCAG-compliant contrast
- Screen-reader labels for controls
- Respect reduced-motion preferences
- Do not encode meaning using color alone
- Responsive text without clipping at browser zoom
- Useful alternatives for informational screenshots and annotated maps
- Text equivalents for complex location annotations
- Status announcements for checklist and offline/update changes
- No essential handwriting-style body copy

## Visual system requirements

- Shared journal shell and layout primitives
- Per-game theme tokens for color, ornament, display type, icons, and motion
- Quiet reading surfaces for dense reference material
- Texture treated as decoration rather than the source of contrast
- Consistent completion, source, edition and media indicators across themes
- Original visual interpretation rather than direct menu reproduction

## Usability scenarios

- Select a game with reduced motion enabled.
- Open a shared deep link directly to an offline entry.
- Check off a collectible one-handed during play.
- Read a complete location entry with no image.
- Open and zoom an approved location screenshot when present.
- Encounter optional uncached media while offline without losing instructions.
- Compare edition differences without losing current progress.
- Search for a material, follow it to an enemy, then to the enemy's area.
- Use a dense melding/recipe planner at phone width.
- Return to the most recent journal entry after relaunch.

## Accepted collection and synthesis controls

No Available Now filter or story/ability milestone tracker. Keep acquisition conditions readable in detail rows. Optional inventory displays ingredient owned/required (x/y) values with accessible labels; recipe reference remains usable with it off. Follow [synthesis/inventory](./content/synthesis-and-inventory.md) and the [Apple-first app acceptance plan](./testing-and-content-validation.md).
