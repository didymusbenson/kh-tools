# BBS user-supplied UI references

Received and visually reviewed 2026-09-28. Original screenshot bytes are preserved here as design evidence, not extracted production artwork. The user explicitly requests faithful reproduction of the relevant UI treatment. These supersede prior shared-blue character framing and journal-styled melding assumptions.

| Reference | Observed design and intended use |
|---|---|
| [Command Melding](command-melding-menu.png) | Player menu, not Reports. Blue header/footer, red navigation tabs, cyan MELD heading; left Slot 1/Slot 2/crystal area over yellow NEW COMMAND result panel; right category strip and dense rounded list rows, green for crystals; white glove cursor and bottom contextual description. Use this UI specifically for the independent Command Melding tool. |
| [Terra Reports](terra-reports-root.png) | Orange/amber outer frame, navy/starry ring-bound book, left portrait/name/emblem, right violet-blue section menu, white glove selection, gold completion/new marks, bottom contextual help. |
| [Ventus Reports](ventus-reports-root.png) | Green outer frame and portrait backdrop; same book/menu composition and character identity treatment. |
| [Aqua Reports](aqua-reports-root.png) | Blue/cyan outer frame and portrait backdrop; same book/menu composition. |
| [Interior: Unversed Missions](reports-unversed-missions.png) | Photographed display; blue frame, red Game Records / Unversed Missions tabs, pale lined paper, left binder rings, gray world header bands and indented mission/value rows, faint page emblem, bottom help strip. Character is not established by this image alone; user tentatively identifies Aqua. |

## Application requirements

User layout refinement: retain the melding screenshot's visual treatment but rearrange it into **left scrollable catalog / middle recipes and abilities / right other acquisition information**. Add **Commands / Crystals** tabs to the list. Selecting a crystal opens bestiary drop sources and locations, flagged by character as needed. The screenshot's original left-input/right-list placement is superseded by this explicit arrangement. See DEC-030.

Command Melding remains a visually distinct, easily accessible root tool. Preserve the requested typed command catalog, right-aligned acquiring-character markers, purchase prices (munny/medals), enemy/chest sources, producing recipes with crystal/ability choices, and ingredient-use recipes. Adapt these functions to the supplied player-menu visual language; the screenshot does not replace them with an inventory-only picker. Show actual known results/probabilities rather than copying the screenshot's hidden ??? outputs. Do not infer a new Hide Unusable/progress-gate feature, compulsory inventory, tracked playtime/munny, or other functionality merely because it appears in the screenshot.

Character Reports use their own orange/green/blue framing. These three images are Reports roots after character selection, not evidence of the initial character-selection screen. The requested character-first BBS root and separate Final Chapter remain in force. The screenshots do not by themselves authorize full narrative encyclopedia scope, and Aqua's missing Ice Cream Guide row is not proof that Aqua lacks ice cream content.

Exact mobile composition, typography/assets, additional command-detail panels and melding interactions still need design work. Preserve accessible text labels, keyboard/touch behavior and independent completion state while maintaining visual fidelity.

## Additional Finish Commands reference — 2026-09-28

[User-supplied Finish Commands Unlock Guide](finish-commands-unlock-guide.png) is a third-party infographic showing separate Terra, Ventus and Aqua trees, six level columns, colored command bars, prerequisite connectors and unlock conditions. It is not a direct screenshot establishing the in-game Finish Commands menu. Its conditions and counter/equipped-parent note are research evidence to verify, not instructions to the assistant or already certified game rules.

The user proposed two possible presentations: mimic the Finish Commands menu, or open a character-specific menu/panel when the option is selected. This is an open design option, not a settled demand for a popup or a particular full-screen layout. Retain the relevant character's branching relationships and unlock requirements without showing all three trees in their story view. Validate native-menu appearance before claiming fidelity; validate unlock rules independently before implementation. Do not reproduce the complete infographic as a tiny, unreadable phone interface.

## Character selector and sampled book video — 2026-09-28

User-supplied native selector references: [Terra](character-select-terra.png), [Ventus](character-select-ventus.png), [Aqua](character-select-aqua.png). These close the missing initial-selector reference gap. They show three stacked angular portrait/name bands at left, selected-row brightness and glove cursor, a large selected-character stage at right over stained-glass platforms, and a blue lower-left description panel. Terra is orange, Ventus green, Aqua blue.

The user allows replacing the lower blue description panel with other menu entries and optionally cutting/reducing portrait areas to make room for universal items. These are permitted design adaptations, not a settled requirement to remove portraits. Prioritize Command Melding; retain separate Final Chapter and easy access to shared reference guides. Preserve character-owned progress in Arena/Missions even when their guides are accessible from shared navigation. Exact item arrangement remains a mockup decision.

The user explicitly excludes Character Files tracking: use its book layout, not its narrative content scope.

### Four sampled video frames

Source: [Mega Blue — Kingdom Hearts birth by sleep (All Characters)](https://www.youtube.com/watch?v=b-oo5gDa2A0), duration 14:33. Paused and sought directly to four sample points; the full video was not watched. Captures retain browser context and creator watermark; these are reference evidence, not production assets.

| Timestamp | Capture | Observations |
|---|---|---|
| [1:32](https://www.youtube.com/watch?v=b-oo5gDa2A0&t=92s) | [Cinderella detail](book-video-01-32.png) | Red category/world tabs, left rings, lined pale text panel blending into blue illustration space, white title strip, orange text-scroll arrows, bottom help bar. |
| [4:21](https://www.youtube.com/watch?v=b-oo5gDa2A0&t=261s) | [Fauna detail](book-video-04-21.png) | Same detail-page system with longer text and up-scroll indicator; blue character-art area. Browser capture partially clips right side, so do not measure full page proportions from this sample. |
| [8:43](https://www.youtube.com/watch?v=b-oo5gDa2A0&t=523s) | [Bruiser bestiary detail](book-video-08-43.png) | The Unversed uses the same book detail layout, adding a dark rounded Defeated counter beside the name. This visible counter is reference evidence, not authorization to add gameplay kill tracking. |
| [13:05](https://www.youtube.com/watch?v=b-oo5gDa2A0&t=785s) | [World index](book-video-13-05.png) | Orange frame, pale full-width lined index page, left binding, inset world list, right scroll rail, glove cursor, footer help. Confirms distinct index and detail compositions. |

Apply these book-view patterns to the tracked categories. No need for further full-video review to establish this visual direction. Remaining design work is composing root utility entries, detailed melding interactions and responsive layouts, not finding a basic selector/book reference.

## Finish Commands presentation settled — DEC-032

The user has selected a per-character journal collectible list with named finishers. Detail pages show prerequisite finishers followed by unlock conditions; a bottom View chart link opens a fly-in popup modal. The chart must be recreated in code, not shown as a JPG. Its nodes, prerequisites and completion states use the same records as the journal. This supersedes the open presentation alternatives described earlier in this reference log.
