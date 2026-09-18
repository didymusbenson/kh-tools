# Mobile UX and Accessibility

## Design direction

Ars Arcanum uses a Jiminy's Journal metaphor inside each game while retaining the original project's fly-in game-selection concept.

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

## Fly-in game selector

- Preserve the recognizable fly-in interaction.
- Support swipe, tap, keyboard, and accessible list navigation.
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

## Larger screens

- Preserve the journal reading metaphor without stretching text across the viewport.
- Use facing pages only when it improves relationships or comparison.
- Allow persistent contents/index navigation where space permits.
- Tools may use split views for inputs and results.
- Game selection can become more spatial while preserving a list-equivalent navigation model.

## Accessibility baseline

- Semantic HTML and landmark structure
- Full keyboard navigation
- Visible focus states
- WCAG-compliant contrast
- Screen-reader labels for controls
- Respect reduced-motion preferences
- Do not encode meaning using color alone
- Responsive text without clipping at browser zoom
- Text alternatives for decorative and informational images
- Status announcements for checklist and offline/update changes
- No essential handwriting-style body copy

## Visual system requirements

- Shared journal shell and layout primitives
- Per-game theme tokens for color, ornament, display type, icons, and motion
- Quiet reading surfaces for dense reference material
- Texture treated as decoration rather than the source of contrast
- Consistent completion, source, edition, and spoiler indicators across themes
- Original visual interpretation rather than direct menu reproduction

## Usability scenarios

- Select a game with reduced motion enabled.
- Open a shared deep link directly to an offline entry.
- Check off a collectible one-handed during play.
- Compare edition differences without losing current progress.
- Search for a material, follow it to an enemy, then to the enemy's area.
- Use a dense melding/recipe planner at phone width.
- Return to the most recent journal entry after relaunch.
