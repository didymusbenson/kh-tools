# Kingdom Hearts Birth by Sleep Final Mix — family specification

## Status and boundary

Research assessment updated 2026-09-18. [Research pack](bbsfm/README.md) and [readiness](../readiness/birth-by-sleep-final-mix.md) replace the previous unaudited discovery claims. Candidate inventories and detailed mechanics exist; the content is not yet certified or implemented.

BBS Final Mix is the modern HD game with separate Terra, Ventus and Aqua progress. **0.2 remains in the Birth by Sleep family with its own [dedicated specification](kingdom-hearts-02.md), data, objectives and completion state.** Do not apply BBS command melding or three-character progression to 0.2. BBS's playable Secret Episode “A Fragmentary Passage” and the later game “0.2 … A fragmentary passage” are different scopes. 2.8 is a collection, not a separate game checklist.

The user's game baseline is Steam BBSFM in HD 1.5+2.5 ReMIX, published on Steam on 2024-06-13. [Steam product](https://store.steampowered.com/app/2552430/KINGDOM_HEARTS_HD_15_25_ReMIX/). Pin the installed/current build when validating rules; no unsupported “latest” claim. Square Enix lists new editions for 2026-10-08, which are announced and unreleased on this audit date; no future platform mechanics are certified. [Official collection site](https://www.jp.square-enix.com/kingdom/collection/). PSP/non-Final-Mix compatibility is outside the product baseline.

## Accepted product behavior

Ars Arcanum answers where an acquisition is and how to obtain it. Apply the [collectible compendium and linked views contract](../content/collectible-compendium-and-linked-views.md), [synthesis and inventory contract](../content/synthesis-and-inventory.md), and [app/content validation contract](../testing-and-content-validation.md).

- Spoilerific throughout: no spoiler warnings, hiding or reveal controls.
- No Available Now filter, story-progress-gate tracker or milestone input. Prerequisites remain useful acquisition text.
- World percentages count applicable collectible acquisitions only. Narrative story/character Reports content is context and does not block world completion.
- Compact world marks, detailed location rows, indexes, search and Data Jiminy use one stable record and saved value.
- Commands, equipment, melding, optional challenges and platform achievements remain separately named MVP modules.
- React offline PWA, persistent local progress, backup/migration safety and bundled local SLM/per-game Coppermind remain MVP.
- Inventory tracking is optional and opt-in. When enabled, recipes show owned/required counts such as `2/3`; command instances retain level/ability information needed by melding.
- Initial app smoke/acceptance targets Apple browsers on iPhone/iPad; Android follows. The user playing on Steam does not mean the app runs only on Windows.
- Validate app behavior, formulas and content sources. A required user gameplay playthrough is not a release gate. Only missing production screenshots/map image assets are deferred; text directions, media fields and image-free rendering are MVP.

## Evidence now available

| Dataset | Inspected/created evidence | Important limit |
|---|---|---|
| Legacy workbook | All bounded grids read; 296 outcome rows, 112 matrix cells, 150 catalog rows, nine materials | Old letter mappings and typos are incompatible with naïve migration |
| Existing user reference | Reused 296 outcomes with ingredient levels, character rates and rare-Shotlock ownership rules | Two current-source conflicts quarantined |
| Collectibles | 443 candidates: 374 numbered main chests, eight Secret Episode chests, one tutorial chest, 60 stickers | Area inventory; complete directions and Reports order still need source validation |
| Reports | Letter and I–XII acquisition table | Chest-linked reports must not double-count |
| Abilities | 30 stack-cap entries; 28 meldable types | CP/learning and random-crystal details need final checks |
| Keyblades | 24 forms, scoped stats and acquisition | Reach/passive normalization remains partial |
| Other acquisition tables | 14 ice cream recipes, 42 flavors, 108 command-shop candidate rows, 42 finish-unlock predicate rows | Source leads; not all acquisition alternatives or mode exceptions |
| Challenges | 16 Arena battles, 29 level-up conditions, nine Unversed Missions, four racing courses, five rhythm songs, seven boards | Complete strategies and modern source reconciliation remain open |

The inventory totals are measured candidate-source coverage, not automatic proof of a complete production compendium. [Source manifest](bbsfm/source-manifest.json).

## First-class command melding

**Root-level Synthesis workspace — explicitly required 2026-09-28:** Synthesis is its own category alongside Terra, Ventus, Aqua and Final Chapter, independent of the three character journals. Command melding is the user's highest-priority BBS tool and must not be buried inside a story section. The character-first navigation contract scopes story journals; it does not require entering a character journal to use Synthesis.

Build on the user's existing functioning crafting tool and personally built Google Drive tables, including the [legacy workbook](https://docs.google.com/spreadsheets/d/10P_1nFwhUHGAf6IJkzjkdgN7bB3u4S8REp6okXv7v4U/edit). Audit and preserve its useful input/output query behavior while validating source-local mappings and known conflicts; do not replace the tool with static reference tables. Within the independent workspace, make the relevant character explicit so availability, probabilities, command inventory and learned abilities remain correctly scoped. Character context must not make Synthesis subordinate to a character journal.

Use the user-supplied in-game player-menu melding screen as the specific visual target for Command Melding, separate from the Reports journal. This 2026-09-28 clarification supersedes the earlier journal-styled melding assumption. Preserve the planning/catalog functions below while adapting their presentation to that menu. See the [five supplied references](../ui/references/bbsfm/README.md).

### Command Melding catalog and details — accepted 2026-09-28

- **Abilities catalog:** add an Abilities tab alongside Commands and Crystals. Selecting an ability works backwards to the recipes that grant it, scoped to the selected character. Each matching recipe shows its resulting command, input commands/levels, relevant crystal choice, target ability and applicable outcome probability. Use the existing recipe/crystal/ability mapping, not just command-name search, and exclude outcomes that cannot attach abilities. Keep alternative recipes visible; link required crystals to drop locations and resulting commands to their acquisition details.

- **Mockup refinement:** Command Melding is first in the shared home-menu options, with the same scale and styling as the other entries, not an oversized standalone feature. Use Terra/Ventus/Aqua pills wherever choosing a character context/filter; show unmistakable selected and unselected states, including a non-color cue and accessible pressed state. Replace the mockup's character dropdowns. The initial pills keep one active playthrough at a time.

- **Three-column layout, explicitly selected by the user:** rearrange the supplied in-game melding menu into a scrollable list on the left, recipes plus abilities in the middle, and other command information on the right. Preserve the reference's player-menu styling while changing its panel arrangement. The right pane contains acquisition information already required below: Moogle/medal prices, enemy drops and treasure chest sources. The middle pane covers both producing and ingredient-use recipes, with recipe-specific crystal/ability results. Exact widths and narrow-screen adaptation remain design work; the wide-screen information arrangement is settled.
- **Commands / Crystals tabs:** provide a second list/tab alongside the command catalog for synthesis crystals. The Commands list retains type grouping and right-aligned character eligibility markers. The Crystals list is independently browsable; users need not select a command or recipe first.
- **Crystal selection opens bestiary information:** display the enemies that drop the selected crystal and the locations in which those drops occur. Flag character-specific sources where necessary. Reuse canonical bestiary/drop records with location, shop-level and story/Arena conditions where applicable, rather than assuming every encounter with an enemy has the same drops. Preserve list selection when opening/closing the detail view. The user requests the information to pop up; the exact overlay versus in-pane presentation remains open.
- Use **Command Melding** as the working player-facing name for the root tool. Keep it easily accessible and visually distinct from the three character-story choices, using the supplied player-menu melding aesthetic. Do not present the tool as a fourth character.
- Show a command list grouped by command type (Attack, Magic, and the other applicable categories established from the catalog).
- To the right of each command name, show which of Terra, Ventus and Aqua can acquire it. Character faces or color-coded initials are accepted design options; the exact treatment remains open. Indicators express acquisition eligibility across sources, not just whether a character can meld the command. Provide readable names/accessible labels and do not rely on color alone.
- The independent tool's catalog exposes cross-character availability. This deliberately differs from character-story journals, which keep their content scoped to that story. Explicit character context still controls recipe outcomes, inventory and applicability; do not silently hide the catalog's requested character comparison.
- Selecting a command opens its details, including **purchase prices at the Moogle Shop (munny) and medal shop (medals)** wherever applicable, recipes that produce it, recipes that consume it as an ingredient, and enemies that drop it. The user clarified that “price to unlock” means these purchase prices. Label each vendor and currency explicitly; distinguish unavailable purchase routes from missing research. Include relevant shop availability conditions as acquisition guidance.
- For enemy drops, identify the enemy and where to find it, with applicable character/version/drop conditions and verified rates where available. Commands without enemy drops should have a clear non-applicable state only when verified; unknown sources must not be presented as confirmed absent.
- List treasure chests containing the selected command, with character/episode, world, area and precise location/directions where verified. Link directly to the canonical treasure checklist entry and its shared acquisition state; presenting a chest in command details must not create a second collectible or independent completion check. Distinguish confirmed absence from incomplete chest-source research.
- For every producing meld recipe, show the input commands, required levels, applicable characters and outcome probability together with which abilities each crystal grants for that recipe. Ability results must follow that recipe's mapping, not a universal crystal-to-ability assumption. Retain known no-ability/conditional outcome rules.
- The ingredient-use view lists recipes in which the selected command is an input, with linked outputs and applicable conditions. This is a first-class reverse lookup, distinct from recipes that create the command. Support a clear empty state when no meld produces or uses a command rather than inventing a recipe.

Support both directions: “What can these commands become?” and “How do I obtain this command with this ability?” Show alternative acquisition routes and guaranteed versus random outcomes. The result depends on character, input levels, retained movement/defense copies, ability crystal, and previously obtained rare Shotlocks.

Store recipe outcomes separately from input-pair identity; probabilities can vary by character and ownership. Recipe type A–P means crystal/ability mapping, not command class or DDD-style rank. Basic/Advanced/Ultimate and recipe-item visibility are distinct properties. Both commands must meet their recipe-specific level requirements; do not assume universal mastery.

With inventory enabled, validate quantities and levels, reserve the required action-command copy, account for two identical ingredients, consume both input commands and the chosen material only when the user records a completed meld, and add the actual selected outcome atomically. Do not record a probabilistic preview as a guaranteed acquisition. Undo restores quantities, levels and identities exactly. With inventory disabled, all reference/calculation features remain useful.

Permanent learned ability, attached ability, enabled stack count, command ownership and mastered-command state are distinct. The planner must not claim abilities attach to Shotlocks or treat a rare Shotlock's already-obtained state as irrelevant. Strong validation covers probability sums, source conflicts, formula boundaries, levels, inventory consumption, duplicate inputs, optional inventory, undo and persistence.

Historical acquired/crafted checks never consume stock or imply present ownership. An explicit completed-meld transaction is a separate action. Unknown inventory differs from zero; show surplus honestly and calculate missing quantities as max(required − owned, 0). Multi-recipe plans allocate the shared command/crystal pool once and expand only the chosen route, with cycle detection and no duplicate prerequisite crafting. Disabling inventory preserves its saved values. Data Jiminy uses the same deterministic calculations as the planner.

## Collectible and acquisition modules

Terra, Ventus and Aqua share reference facts but retain independent acquisition state. Separate main, Final and Secret Episode save contexts where applicable.

### Shared versus playthrough-specific categories — research requested 2026-09-28

Keep character-specific content (including treasures and character-scoped Keyblades) within the relevant playthrough. Make universal reference content easily accessible without forcing users through an unrelated character's journal. Command Melding retains its explicitly approved independent root entry.

Before assigning other shared navigation entries, research the bestiary/The Unversed, Mirage Arena and Unversed Missions specifically, then assess the remaining categories. For each category distinguish shared definitions from character-specific roster, availability, locations, rewards, prerequisites and separately saved completion/statistics. Shared enemy or challenge names are not evidence of identical acquisition conditions or shared progress. Account for Final/Secret Episode boundaries as well as the three main stories.

Deliver a source-backed category matrix with navigation implications and explicit unresolved exceptions. Do not label these candidate categories universal or merge their progress until evidence supports the relevant dimension. Exact navigation placement follows the findings; the user has requested accessible universal information, not approved a specific new menu structure for every candidate.

- Treasures by world/character in verified Reports order; tutorial and Secret Episode scope explicit.
- Sticker pickup locations and album placement/point rewards. Collection and optimal placement are distinct.
- Xehanort reports and letter, linking chest or event sources.
- Command catalog: attack, magic, item, friendship, movement, defense/reprisal, Shotlocks, D-Links, Styles and Finish Commands, with modern availability.
- Every material/flavor and its enemy/shop/event source; conditional rates, precise area and farming directions.
- Every Keyblade with character/episode scope and acquisition.
- Mirage Arena battles, bonus challenges, cumulative medal missions, level progression and rewards.
- Command Board panels/modes, Rumble Racing, Ice Cream Beat, Fruitball and Unversed Missions.
- Optional bosses, Final/Secret Episode unlock requirements and separate in-game Trinity trophies/platform achievements.

Each collectible detail needs precise text directions, action, reward, movement/character prerequisite, revisit/missability facts, unit/count scope and provenance. Search filters never shrink the full-world denominator. Duplicate representations and chest-contained reports resolve to a single acquisition record.

## 0.2 relationship

The separate [0.2 spec](kingdom-hearts-02.md) owns its numbered objectives, treasures, wardrobe unlocks, equipment/combat facts, optional encounters, difficulty requirements and achievements. The full KHBBS workbook contains no 0.2 data. Family navigation may connect the experiences; saved state, denominators and mechanics must remain distinct.

## Primary questions and grounded answers

- Which Terra/Ventus/Aqua treasure or sticker am I missing, and how do I reach it?
- Which meld guarantees this command for my character?
- Which crystal and recipe grant Second Chance, Once More or Magic Haste?
- Can an ability be attached to a base command such as Aero? Check whether it can be a meld result; never invent a recipe.
- Where can this character obtain a crystal, command, Keyblade or ice cream ingredient?
- What will this meld consume from my optional inventory, and what can it produce?
- What remains for the album's 140-point reward, Arena level 30, or a separate Steam achievement?
- Is this the BBS Secret Episode or the distinct 0.2 game?

## Ars Arcanum visual direction — character Reports and player-menu melding

Accepted user direction, refined 2026-09-28: character Reports use Terra orange/amber, Ventus green and Aqua blue/cyan outer framing, with the shared navy book and violet-blue menu composition. Command Melding uses its own in-game player-menu treatment. The [supplied reference set](../ui/references/bbsfm/README.md) supersedes earlier shared-blue framing assumptions.

### Character-first root and episode sections — accepted 2026-09-28

- The BBS root menu centers Terra, Ventus and Aqua, following the in-game initial character-selection screen, with independent Synthesis and Final Chapter entries. Character selection is the primary navigation boundary for story journals, not a filter on a combined guide; Synthesis remains directly accessible at the root.
- Entering a character's story scopes the journal, acquisitions, recipes, requirements, search and Data Jiminy context to that playthrough. An Aqua player should not need to sift through Terra/Ventus information. Shared facts may use shared underlying records but must present the active character's applicable details and independent progress.
- Hovering a character choice on the home menu swaps the displayed character visual and selection highlight; keyboard focus provides the same preview. Previewing does not navigate or change the active playthrough/filter state. Clicking/activating the choice opens that character's journal.
- Provide a clear way to return to character selection. Switching characters preserves each story's progress.
- Final Chapter is a separate game section, not folded into Aqua's main-story completion. Research must verify its correspondence to the game's Final Episode label and keep the Secret Episode separately scoped; the precise episode-menu composition remains to be established from reference evidence.
- **Home placement settled:** present Final Chapter as a character-styled option immediately below Aqua when it contains collectible content to highlight. It belongs with the story choices, rather than among universal tools. Existing research identifies eight Secret Episode chest candidates and episode-specific Keyblade forms, so retain this entry in the planned home layout. Preserve distinct Final Episode/Secret Episode acquisition contexts inside the section and independent state from Aqua's main story; exact internal presentation remains open.
- High fidelity to the actual game UI is a requirement, including the character-selection root and character-specific Reports interiors. A generic menu with a similar palette is insufficient. Preserve responsive and accessible behavior while grounding composition and selection states in actual game references.
- The supplied [Terra/Ventus/Aqua selector screenshots and four video samples](../ui/references/bbsfm/README.md#character-selector-and-sampled-book-video--2026-09-28) now establish the initial-selector and book-view references. The lower blue description area may become utility navigation; portrait areas may be reduced/cut to make room. These are permitted adaptations, not a final removal decision. Preserve the three-character hierarchy, distinct Command Melding access and separate Final Chapter. Character Files is explicitly not tracked; its video supplies layout evidence only.

- Character-specific outer framing: Terra orange/amber, Ventus green, Aqua blue/cyan.
- Deep navy, lightly starry contents surfaces with violet-blue list panels.
- Pale lined reading pages with subdued section bands, faint emblem and aligned values, following the supplied interior reference.
- Binder-ring cues and burgundy section tabs maintain the journal relationship to KH1–2.
- Clear portrait, character name and emblem identify Terra, Ventus or Aqua; outer framing uses the character's reference color.
- Completion badges align with rows; rewards and point thresholds remain scannable.
- The Sticker Album reference informs reward-table hierarchy. Album art is optional and not required for MVP.
- On phones, collapse the portrait/contents spread into a compact character header and full-width content.
- 0.2 remains part of the BBS family, but its exact visual variation awaits additional inspiration; do not treat the earlier dark/fragmented suggestion as approved.

See [shared design direction](../ui/jiminys-journal-design-direction.md).


## Current blockers and acceptance

Detailed rows and algorithms are ready to be modeled, but shipment still requires resolving the two meld conflicts, precise collectible directions, independent inventory/order validation, complete alternative command acquisitions, normalized character/mode exceptions, and Steam achievement predicates. None requires the user to play through the game for us.

Acceptance must demonstrate bidirectional checklist synchronization, character/episode isolation, stable denominators, source-grounded answers, opt-in inventory and correct atomic melding/undo, image-free text guidance, offline/relaunch/backup behavior and accessible Apple mobile layouts. Formula/content validation must exercise the known conflicting cases rather than trusting extraction totals.

## Finish Commands journal list and coded chart — accepted 2026-09-28

Track Finish Commands as collectibles separately for Terra, Ventus and Aqua. List each finisher by name in the selected character's journal, with its acquired/unlocked completion state. Selecting a name opens a journal detail view stating the prerequisite finisher(s) first, then the conditions to unlock it. Preserve alternative prerequisites explicitly; where an eligible parent must be equipped, say so rather than implying that merely owning it is enough. Use the researched metric and target (CP earned, munny collected, steps, enemy defeats, Style activations or lethal hits survived); do not infer progress from wallet balances or lifetime totals.

Place a **View chart** link at the bottom of each finisher detail. It opens a fly-in popup modal showing the selected character's progression chart. Recreate the chart in code (for example, HTML/CSS and SVG connectors), not as a JPG or other flattened image. Render its labeled nodes, branching prerequisite links and completion display from the same canonical character/finisher records as the journal list and detail views, preserving one saved acquisition value per finisher. Shared finisher names do not combine different characters' progress. The reference's visual structure can guide the chart without making its unverified claims authoritative.

Support keyboard access, a labeled close action, focus return to View chart, and reduced-motion behavior for the fly-in. Keep labels and branch relationships readable on narrow screens through an appropriate navigable layout rather than shrinking a whole infographic to fit. The graph does not introduce automatic gameplay-counter tracking or unverified counter-reset behavior. Character-wide finisher completion is separate from world collectible denominators unless an acquisition rule explicitly requires otherwise.

This settles the earlier dedicated-screen-versus-popup choice: the journal list and details are the primary interface, and the chart is a supplementary modal. The [supplied unlock-tree infographic](../ui/references/bbsfm/finish-commands-unlock-guide.png) remains a reference; source-check its conditions against the [Finish Commands research](../research/bbsfm-category-scope-matrix-2026-09-28.md#finish-commands-follow-up-character-trees-shared-mechanics).

## First mockup feedback — 2026-09-28

The user accepts the interactive mockup as a strong first pass, not as final fidelity approval. Continue toward the high-fidelity standard established by the KH1FM/KH2FM work. Existing Terra/Ventus/Aqua graphics suffice as temporary stand-ins; the user plans to explore better assets later. This does not settle production artwork or lower the fidelity requirement.

## Mockup acceptance boundary — 2026-09-28

The user confirms the mockups have the right idea and the **structure is correct**. Navigation and interaction structure are accepted: character-first home with hover/focus artwork preview; Final Chapter beneath Aqua; equal-weight shared menu entries with Command Melding first; character pills; three-column melding with Commands, Crystals and Abilities catalogs; character journal finisher lists/details with a coded fly-in chart.

**Visual fidelity is not approved.** The user remains unconvinced that the mockup faithfully matches the game UI. Use the supplied game screenshots/video and the KH1FM/KH2FM fidelity standard as the visual target, not the mockup's approximate styling. Typography, proportions, framing, surfaces, selection cues and artwork need a dedicated visual pass and review. Current portraits remain stand-ins pending better assets. Structural acceptance does not certify sample data, incomplete screens, production artwork, responsive behavior or implementation readiness. Preserve the accepted structure while refining the presentation; do not reopen it without a concrete issue or further user direction.


## Working implementation for review — 2026-09-28

Use the [review and approval checklist](../implementation/bbsfm-review-checklist.md) to work through the local build, record changes and track outstanding approvals.

The user authorized implementation following structural acceptance. The app now opens BBS at `#/bbsfm/home`, with hover/focus character previews, Final Chapter below Aqua and equal-weight shared navigation. Character Reports, world/category pages, independent episode collections, and the three-column Command Melding tool use the existing saved profile identities. Character filters are pills; the melding catalog scopes commands and ability recipes to the active character while retaining cross-character availability markers.

Command Melding includes Commands/Crystals/Abilities, both directions of recipe lookup, per-outcome crystal abilities/probabilities, Moogle and documented medal prices, canonical chest links/checks, crystal-source dialogs, and a level-aware calculator. Existing stock and farming-plan records are retained; inventory display is optional, and planning or recording a historical meld never consumes stock. Finish Commands use the canonical per-character checklist, parent/unlock details, and a navigable HTML/SVG chart in a native modal.

The presentation data is generated by `src/games/bbsfm/build-ui-data.py` into `ui-data.json`: 459 accepted character/recipe groups, 139 known command identities and 46 finisher nodes. The two previously quarantined input-pair conflicts remain excluded rather than guessed. `crystal-sources.json` adds researched world/drop examples for all nine crystals. This is not a complete command-acquisition or room-by-character enemy index; unknown paths remain explicitly unrecorded. No completeness claim supersedes the research gaps above. Atomic consume/undo is not part of this review implementation.

The working build uses temporary cropped character art and reference-derived menu/book treatments. The user still needs to review visual faithfulness; implementation does not convert earlier structural acceptance into artwork or final UI approval. Desktop and phone browser checks cover canonical saved checks, character/episode isolation, source dialogs, reverse ability recipes, calculator levels, preserved inventory, and offline reopening. Unit checks preserve legacy IDs and validate the structured joins.
