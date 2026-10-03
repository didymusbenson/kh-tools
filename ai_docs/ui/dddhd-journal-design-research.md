# Dream Drop Distance HD — Reports interface research

**Research date:** 2026-10-03 · **Baseline inspected:** `083dd13`  
**Scope:** DDD HD, with Steam as the user's gameplay edition. Research and implementation were requested; the implementation is available on `research/ddd-journal-interface-2026-10-03`, with its checks and explicit fidelity limits recorded in the [implementation report](../implementation/dddhd-faithful-reports.md). This document distinguishes native visual evidence, existing product requirements and deliberate web adaptations.

[Original reference inventory](references/dddhd/README.md) · [Source manifest](references/dddhd/source-manifest.json) · [Implementation plan](dddhd-new-ui-plan.md) · [Current game specification](../games/dream-drop-distance.md)

## 1. Findings that determine the design

1. **The journal is Reports.** Its visual identity is charcoal/black, silver-gray framing, glossy magenta hierarchy plaques and pale ruled paper. The cyan/violet screenshot belongs to **Help**, a separate menu family. A neon dashboard would not reproduce Reports.
2. **The native reading composition is one broad leaf.** At 1920 × 1080 the binding is around x=216, with a narrow blank page fragment to its left and nearly all usable content to its right. It is not KH1/KH2's equal facing-page composition. The cover uses the same left binding and a two-part art/menu arrangement inside the black cover.
3. **DDD shares a Report across Sora and Riku.** Character-scoped chest/portal data must remain distinct, but the interface should not adopt BBS's separate-playthrough home or duplicate shared Spirit facts. The supplied cover already presents both protagonists together. The shared Report is corroborated by [KHWiki's Report description](https://www.khwiki.com/Report#Kingdom_Hearts_3D:_Dream_Drop_Distance), a secondary source with a 3DS heading; it does not itself establish exact Steam controls.
4. **Native completion is not the app's manual checklist total.** Combat, Story, Items and Play Time are distinct fields in the native Completion Rate screen. Do not copy their values, fabricate playtime or claim the app's chest denominator is official Reports completion.
5. **Existing functions must survive the new composition.** DDD currently has substantive acquisition records, character/world filters, Spirit Creation recipes, materials and farming targets. Replacing its generic sidebar is a presentation refactor, not permission to replace those functions with empty native Story/Character menus.

## 2. Evidence and confidence

The six user-supplied JPGs were opened and visually inspected at their original 1920 × 1080 resolution. Original filenames, dimensions, hashes and bytes remain preserved. They are sufficient for the shell, cover structure, reading/list treatment, completion summary composition and distinction between Reports and Help.

| ID | Evidence actually inspected | Establishes | Limits |
|---|---|---|---|
| V01 | [Reports cover](references/dddhd/Kingdom-Hearts-Dream-Drop-Distance-HD03152021-105140-21456.jpg) | Both protagonists; black cover; eight-entry gray menu; glove; unread markers; contextual footer | One selected row; no root transition or completed-root state |
| V02 | [Completion Rate](references/dddhd/Kingdom-Hearts-Dream-Drop-Distance-HD03152021-105140-99441.jpg) | Four large horizontal summary lanes, circular icons, magenta labels, gold values | One partially complete save; no arithmetic or click behavior proven |
| V03 | [Glossary / Keyblades](references/dddhd/Kingdom-Hearts-Dream-Drop-Distance-HD03152021-105141-39332.jpg) | Broad pale leaf, gray title strip, ruled body, scrollbar, `L2 Back` / `R2 Next` footer | Controller-style glyphs do not independently identify capture platform; scrolling/entry-switch timing unseen |
| V04 | [Character Files / Main Characters](references/dddhd/Kingdom-Hearts-Dream-Drop-Distance-HD03152021-105142-62749.jpg) | Two magenta hierarchy plaques; handwritten rows; thin rules; glove gutter; separate unread badges | Parent world/group index and portrait detail absent |
| V05 | [Dream Eaters](references/dddhd/Kingdom-Hearts-Dream-Drop-Distance-HD03152021-105143-31738.jpg) | Two gray Nightmares/Spirits summary bars, type-emblem columns, one combined species list, distinct unread/completion marks | The bars are not proven clickable tabs. Blank Spirit circle is visible, but its complete state machine is unverified |
| V06 | [Help](references/dddhd/Kingdom-Hearts-Dream-Drop-Distance-HD03152021-105145-97727.jpg) | Dark patterned player-menu surface, cyan inactive categories, violet selected rows, yellow focus glow, separate text footer | Not evidence for Reports page styling or Spirit Creation's exact native tool layout |
| T01 | [Firemac's HD Reports and Collection Guide](https://www.playstationtrophies.org/forum/topic/284269-comprehensive-reports-and-collection-guide/) | First-hand authored HD guide; indexed excerpt lists Game Records subsections and native section order | Live page encounters security verification in the cloud browser; no embedded image is claimed inspected |
| T02 | [Firemac Gameplay's 100% Reports tour](https://www.youtube.com/watch?v=u5qOn1j3cwo) | Public video identity, author, HD title and 13:22 duration verified | Playback stayed black/buffering after a reload; download timed out. No frame or timestamp from this video is certified |
| T03 | [Official Square Enix HD 2.8 page](https://www.square-enix.com/kingdomhearts/2_8/gb/) | HD remaster identity and collection membership | Product page, not a Reports interaction specification |
| T04 | [Official Steam product listing](https://store.steampowered.com/app/2552440/KINGDOM_HEARTS_HD_28_Final_Chapter_Prologue/) | The user's PC edition is part of HD 2.8 | Does not establish pixel-identical controller prompts across HD ports |

Public web research was performed in dot's cloud tools/browser. The original Game UI Database image URL could not be opened through the web reader; this does not invalidate the locally inspected original files. The filenames/source URLs say HD, and V03 includes L2/R2-style glyphs, but the precise capture platform and build remain unverified. No 3DS screenshot is silently promoted to HD evidence.

## 3. Native hierarchy, with missing transitions called out

### Reports root

V01 visibly orders the native menu as:

- Story
- Glossary
- Completion Rate
- Game Records
- Character Files
- Dream Eaters
- Treasures
- Trophy Shelf

The selected Story row has a pointing glove with an orange fingertip glow. Unread `NEW` marks sit at the far right of several rows. The current explanatory sentence occupies its own fixed footer, rather than expanding the selected row.

T01's first-hand HD guide lists the Game Records families as Link Attacks / Link Styles, Reality Shifts, Flowmotion, Dive Mode, Mini-Games and Link Portals. This is text-supported hierarchy, not a photographed layout. Existing app `links`, `dives`, `challenges` and `portals` records map naturally here. Commands, Abilities, Keyblades and recipe items are useful companion catalogues, not proven additional native Reports root entries.

Dream Pieces are not a Reports root entry in V01/T01. In Ars Arcanum they belong prominently in Spirit Creation's Materials view and ingredient cross-links. Do not describe that workshop as a reproduced native Reports screen until its own menu evidence exists.

### Interior hierarchy

V04 explicitly shows `Character Files` → `Main Characters` as adjacent angular magenta plaques. V03 shows a single `Glossary` plaque and the selected `Keyblades` entry title inside the leaf. Use the plaque strip for section/parent context, and the quiet gray in-page strip for entry identity. Avoid replacing this with a persistent SaaS sidebar or a stack of detached cards.

V05 presents Nightmares and Spirits side by side **above the same list**, with two emblem columns. It does not show a tab switch. Because the runtime currently has 54 Spirit breed records but no independently modelled full Nightmare encounter collection, the implementation must not invent a second tracked list, fill missing native marks automatically or claim native encounter completion from Spirit acquisition.

### Character/world selection

The data requirement is firm: seven worlds with character-scoped chests (225 Sora; 213 Riku), plus character-specific portals and Dives. The exact HD Treasures world-selection, Sora/Riku switching and unopened-slot layouts are **not yet visually established** by this pack. A 3DS text transcript's five-slot rows are comparison evidence only, not permission to claim an HD grid.

Use accessible, visibly labeled Sora / Riku / Both filtering as a web adaptation until an HD capture establishes a more exact composition. A character name in Character Files is a biography entry, not evidence of an active-player selector. A main-menu Drop command/forecast panel is likewise not a Reports character tab.

## 4. Visual system from the original pixels

### Stage and cover

Approximate source coordinates below are visual measurements, not CSS values to impose on every screen size:

| Landmark at 1920 × 1080 | Source composition |
|---|---|
| Top Reports band | y=0–120, near-black edges and a mid-gray central glow; large italic REPORTS at upper right |
| Silver field | Below header and around the book; roughly `#b6b6b6` in flat sample areas |
| Root book | x≈220–1704, y≈147–944; black rounded rectangle, beveled edge/shadow |
| Left binding | x≈177–263; repeated metallic rings crossing the book edge |
| Root art | x≈339–973, y≈264–825; rounded, framed magenta patterned portrait panel |
| Root menu | x≈999–1626, y≈261–826; rounded gray panel, compact equally spaced rows |
| Footer | Dark full-width band below y≈976; rounded medium-gray inset help strip |

The black cover has gray mirrored corner flourishes with crown-like motifs. Interior leaves retain matching light-gray ornaments. The paper is cool white/light gray, subtly mottled rather than tan parchment. A large, faint crown sits behind the reading/list area. Source JPG sample values include `#e9e9e9` paper, `#dddddd` watermark area and `#e50462` magenta plaque. JPEG/lighting variation means these are starting points, not extracted canonical game tokens.

### Type and rhythm

There are two visibly different type treatments:

- Menu/header/help text: narrow squared technical letters, light fill, dark outline/shadow. The REPORTS masthead is heavier, italic and gray.
- List and reading text: black, rounded handwritten forms on ruled paper; lighter, more human than the shell labels.

Reuse the already bundled Chakra Petch and Itim fonts as explicit available substitutes, with their existing licenses. Neither has been identified as the original game font. Do not silently use Georgia throughout DDD, and do not stretch one font to counterfeit two native roles.

Character list rows are compact, top-aligned and separated by subtle rules. The hand occupies a reserved gutter to the left; right-side completion/unread affordances occupy their own space. Selection should not add padding, boldness or borders that move text or change page capacity.

### Native summary/list/reading families

- **Completion Rate:** generous icon medallion at left; magenta caption superimposed on a silver capsule; gold italic number aligned right. Its percentages are text values, not demonstrated proportional progress bars.
- **Dream Eaters list:** gray beveled summary labels with type emblems, percentages in yellow, two narrow status columns before each species name, right-aligned marks.
- **Glossary detail:** centered gray title strip, large handwritten ruled prose, an internal vertical scrollbar, adjacent-entry controls in the footer.
- **Help:** two-column category/list composition with cyan→blue and blue→magenta gradients, yellow focus outline and far-right scrollbar. This is useful separate tool evidence but must not replace Reports chrome.

## 5. Interaction and state contract

Keep these states separate:

| State | Evidence / app handling |
|---|---|
| Focus or selection | Glove and optional glow; must work for keyboard and pointer without moving layout |
| Unread/new | Native `NEW` badge is visible; no app unread model currently exists, so do not draw it decoratively |
| Acquired/complete | Native gold Mickey-like stamp is visible in V05; app manual checkbox/check seal needs its own accessible label and truthful scoped meaning |
| Missing/unknown | Some pale blank Spirit circles appear; app should not interpret every absent fact as an unacquired native slot |
| Filtered | App-added world/character/query/status controls; the unfiltered denominator stays fixed for the declared scope |
| Entry navigation | Previous/Next entry differs from note continuation pagination; both need separate accessible names |
| Save pending/failure | App-owned, retained visibly in reserved utility space; never imply a failed write succeeded |

Exact animation duration, sound, list-wrap behavior and native Back/Next ordering are not established by stills. Do not invent a claim of native input parity. Use browser Back/Forward, keyboard links/buttons, touch targets and reduced-motion handling from the other implemented journals.

The native Glossary visibly scrolls, whereas the user's established app constraint uses a fixed stage with numbered continuation pages. The implementation intentionally adapts this one behavior: text is paginated inside a stable leaf instead of shrinking or vertically scrolling the whole book. Reuse measured capacity and note pagination; do not hard-code the reference screenshot's nine visible Dream Eater rows as universal capacity.

## 6. Current implementation gap at the inspected baseline

At `083dd13`, `src/games/dddhd.ts` supplies 14 navigable categories, seven worlds and accent `#625087`. `GuideJournal.tsx` dispatches custom journals for Re:CoM, BBS and KH2, but DDD falls through to the generic `journal-app multi-guide` shell. `profile.ts` opens new DDD profiles at `dddhd/worlds`.

The generic renderer has a persistent left navigation, serif headings, world links, expanding acquisition rows, common dropdown filters and recipe/material/farming views. It has useful real state behavior, but none of this establishes a faithful DDD Reports composition. Simply changing the purple accent to pink is insufficient.

Preserve and reconnect:

- All 1,285 entry IDs and 263 formula IDs at this baseline, including 438 independent chest flags, 346 portal identities, 54 Spirit breeds and 37 Dream Piece types
- Existing `GuideProfile` checks, owned quantities, targets, saved routes and backup/recovery format
- Cross-tab synchronization and local persistence
- Every current catalogue, search, recipe/material/farming view and existing deep link
- Independent Sora/Riku pickup identities; shared records remain shared
- The existing empty/under-construction Data Jiminy boundary; do not seed or resurrect old knowledge as a visual-refactor side effect

## 7. Assets and remaining reference work

Original screenshots remain research-only. The new near-parity request does not silently authorize extracting their character art into production. The checked-in standalone `public/assets/ddd.png` is usable existing game artwork, but is visibly **different from the source cover portrait**. The source shows seated back-to-back Sora/Riku with Keyblades on a magenta pattern; the existing standalone art is the falling Sora/Riku/Mickey composition. Faithful CSS/SVG geometry, borders, rings, plaques and ornaments can be built independently of that asset decision. Record the mismatch rather than calling it exact art parity.

Prioritized missing captures:

1. HD Treasures world index, Sora/Riku change and one partly completed world grid/list
2. HD Game Records root, one Links detail, one Portal record and one score/minigame screen
3. Dream Eater detail and the meaning/transitions of blank, unread and gold-complete marks
4. Exact native Spirit Creation and Dream Pieces menu screens for the app's high-priority workshop
5. Complete/empty root states; previous/next and back transitions; character/world selection retention
6. Steam-specific controls, keyboard prompts and display scaling, if literal control parity becomes a requirement

No missing screenshot is a reason to erase working compendium functions or demand a user playthrough. Build the well-evidenced Reports shell and clearly identified web adaptations now; replace a provisional interior only when an actual HD reference improves it.
