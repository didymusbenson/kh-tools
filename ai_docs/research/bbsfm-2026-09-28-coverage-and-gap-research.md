# BBS Final Mix coverage and focused research — 2026-09-28

This supplement records a read-only app audit and targeted source research while the user supplies requirements. No app code or existing source inventory was changed. Community references establish corroboration, not gameplay certification. The Steam HD Final Mix baseline remains in force.

## Current coverage, correcting stale readiness wording

The September 18 specification/readiness says no implementation is claimed. That is historical: `ai_docs/implementation/bbsfm-rollout.md` documents September 20–21 implementation, and `src/games/bbsfm/content.json` currently contains 1,368 entries and 483 recipes. Counts were recomputed on September 28.

| Current generated content | Count / qualification |
|---|---|
| Treasures / stickers | 383 / 60: 374 main chests, 8 Secret Episode, 1 tutorial |
| Commands / materials | 246 / 286 character-scoped rows, not distinct command or material totals |
| Abilities / Keyblades / finishers | 90 / 48 / 46 scoped entries |
| Arena / minigames / Unversed goals | 48 / 57 / 27 scoped entries |
| Steam goals / bestiary | 34 / 16; explicitly partial |
| Albums / standalone reports / episode unlocks | 15 / 10 / 2; three other report acquisitions alias chest state |
| Meld recipes / ice cream recipes | 459 / 24 character-scoped input groups or recipes |
| Entries with an uncertainty field | 489 |

Existing source inventories remain substantial: 296 meld outcome rows, 112 crystal/type mappings, 14 distinct ice cream recipes, 42 flavors, 108 command-shop candidates and 24 Keyblade forms. None of these counts proves completeness. Most pickup directions are still area-only. The generator excludes both ambiguous meld input pairs in full. No dynamic ownership-conditioned melding solver is established by the static recipe text.

The September 20 rollout also says the then-current refinement playbook superseded optional stock tracking. Product decisions must be read chronologically; do not resurrect September 18 behavior merely because its readiness table is older and more detailed.

## Two meld corrections now corroborated

| Source conflict | Corroborated correction | Evidence and remaining limit |
|---|---|---|
| Zero-based outcome 90: Aerora + Aerora incorrectly produces Mine Square | Aerora Lv3 + Ignite Lv3 → Mine Square, 100%, all three characters | [KHWiki Mine Square](https://www.khwiki.com/Mine_Square) gives both levels. Separately published [Destiny Islands FM magic table](https://www.destinyislands.com/bbs-fm/melding/magic-commands/) confirms Aerora + Ignite, 100%, all; its Ignite level is omitted. This corroborates ingredient identity independently of the aggregate table but does not independently verify Ignite's minimum level. |
| Zero-based outcome 182: Stun Edge + Magnera has Collision Magnet at both 80% and 20% | Stun Edge Lv3 + Magnera Lv3 → Collision Magnet 80%, Magnet Spiral 20%, all three characters | [Destiny Islands FM attack table](https://www.destinyislands.com/bbs-fm/melding/attack-commands/) explicitly lists both results, levels and rates; [KHWiki Magnet Spiral](https://www.khwiki.com/Magnet_Spiral) agrees. |

The corresponding seven-crystal ability mappings match the existing rows in the independently published FM guide. Preserve the source-local letter mapping already in the reference rather than mixing legacy letters.

Applying only the two proposed corrections **in memory** yields 468 character/input/level groups, all summing to 100%; the uncorrected artifact has 465 groups including three 200% groups. The surfaced guide currently retains 459 groups, so correcting and restoring the omitted pairs would add nine scoped groups. This arithmetic is a validation result, not a proof of the entire recipe catalog. No checked-in recipe data was corrected during this research pass.

The [Steam community melding guide](https://steamcommunity.com/sharedfiles/filedetails/?id=3376906392), dated December 22, 2024, is another lead but explicitly derives from older GameFAQs/Reddit sources. Its Steam hosting is not primary evidence or an independent Steam build test. Do not count it as such.

## Conditional acquisition facts worth preserving

The [Spiderchest enemy table](https://www.khwiki.com/Spiderchest) explicitly lists Fleeting Crystal at **3.6% for Shop Levels 1–2**. Its higher-level drop tables omit Fleeting. This explains how a blanket material list can disagree with an enemy table: the candidate farm needs a shop-level condition. Exact character/room routes and an independent modern check remain open; it should not be presented as an unconditional farm.

[Command Board](https://www.khwiki.com/Command_Board) describes limited bonus-panel commands being replaced while currently present in the command list and reappearing after all copies are sold. This is **current ownership**, unlike wording elsewhere about ever obtaining a rare meld Shotlock. Keep these conditions separate until each mechanic is verified. The same page states that most Arena bonus panels are absent; it does not support a blanket assertion that every Arena panel or every command acquisition is absent. Board wins, panel purchases and menu/Arena modes require separate source-specific records.

## New user direction: character-first, game-faithful navigation

Relayed by the parent during this pass:

- BBS opens around Terra, Ventus and Aqua like the game's initial character selection.
- Entering a character shows only that character's relevant information and progress, rather than other characters' irrelevant content.
- Final Chapter is its own game section.
- Visual fidelity must look like the game, beyond a matching color theme.

Current `bbsPresentation.ts` exposes Terra, Ventus, Aqua, Aqua · Final Episode and Aqua · Secret Episode. Its scope helper also admits unscoped entries and an all-character view. September 21 made campaign a persistent global context, initially Terra. These existing choices are not automatically the new requirement: a selection landing and character-specific navigation need explicit treatment. Unscoped records should be classified as relevant shared reference, collection-wide goal or unrelated context before appearing inside a character. A shared fact does not justify leaking another character's progress.

### Episode boundaries

[Final Episode](https://www.khwiki.com/Final_Episode) is Aqua's separate post-story scenario, unlocked through the three completed stories and Xehanort reports. It imports Aqua's completed-save state and grants Brightcrest; Radiant Garden enters the finale and Land of Departure is unavailable. This is the natural source identity for the user's “Final Chapter.”

[Secret Episode / A Fragmentary Passage](https://www.khwiki.com/A_Fragmentary_Passage) is a further playable Final Mix episode: Aqua in the Realm of Darkness with Master's Defender, carrying over progress but without world-map access. It is not the separate 0.2 game. Preserve independent save/progress identity and eight episode chest records.

**Navigation recommendation, not an extra user decision:** make Terra/Ventus/Aqua first-level choices and keep Final Chapter a separate section. Final Episode and Secret Episode can be distinct destinations inside that section, pending the user's continuing requirements; do not silently merge their progress or reinterpret “Final Chapter” as 0.2. Source terminology should remain discoverable in entry descriptions/search even if the UI uses Final Chapter.

### Visual reference inventory and leads

No dedicated BBS screenshot set was found under `ai_docs/ui/references`; only KH1/KH2 reference directories exist. Local `img/bbs.png` was visually inspected and is the emblem, not a screen reference. `img/bbs.jpg` and its public duplicate are 450×635 cover-shaped files. Approved blue Reports notes are useful but are not sufficient evidence for recreating the character-selection composition.

Image search located HD 1.5+2.5 character-selection captures in a Japanese 2017 play diary:

- [Aqua selection source page](https://tsuibanamizuki-blog2.mynikki.jp/archives/783791.html), May 9, 2017; [screenshot](https://livedoor.blogimg.jp/mizuki_tsuibana/imgs/6/f/6f063f96.jpg).
- [Ventus selection source page](https://tsuibanamizuki-blog2.mynikki.jp/archives/783787.html); [screenshot](https://livedoor.blogimg.jp/mizuki_tsuibana/imgs/d/e/de9c51de.jpg).

These are source-backed visual leads; the images were not downloaded or added as production assets. Search previews identify the selection screen, but exact composition and animation still require full visual inspection before an implementation fidelity claim. Japanese HD captures help composition; English Steam footage/screenshots are preferable for exact wording and transitions. User-supplied imagery could improve fidelity but is **not a blocker** to continuing autonomous reference research, and no request for user gameplay is warranted.

## Highest-value remaining research

1. Exact English HD character-select and Reports screen references, including selected/unselected and return transitions.
2. Per-character complete command catalogs and alternate sources; Shotlocks, D-Links and Styles must not be inferred from the meld result list.
3. Precise collectible routes and Reports order, optimal sticker placement, Secret Gem area conflict.
4. Full enemy/flavor farming routes with shop-level conditions and character-specific access.
5. Steam achievement identities and one-character/all-character predicates; current 34-goal subset is not the roster.
6. Exact Arena ticket/clear-file alternatives and mixed-difficulty episode save aggregation.

No complete collectible route transcription, Steam roster certification, visual recreation, app implementation or gameplay validation is claimed by this supplement.

## Subsequent clarification: root Synthesis is the priority

The user explicitly separated **Synthesis** from the Terra/Ventus/Aqua story sections. Command melding is their highest-priority use case and largest time sink. Preserve a root synthesis workspace with its own explicit active-character context; accessing it must not require entering a character journal. The character-first journal direction above applies to story/reference sections and does not put synthesis underneath those sections. Its journal-faithful visual design is separate work.

### Original user artifacts and what was actually inspected

The [KHBBS Tables workbook](https://docs.google.com/spreadsheets/d/10P_1nFwhUHGAf6IJkzjkdgN7bB3u4S8REp6okXv7v4U/edit) was located again through the connected Google Drive plugin on September 28. Current metadata confirms exactly the same three tabs and grid bounds as the historical audit:

| Tab | Sheet ID | Bounds |
|---|---|---|
| command_melding | 1053757914 | 990 rows × 25 columns |
| Synthesis | 0 | 999 rows × 26 columns |
| Sheet3 | 1862685006 | 1,000 rows × 2 columns |

September 28 read scope: Drive metadata search for `KHBBS` and `melding`, metadata for the exact workbook, and the workbook's parent folder metadata listing. These identified KHBBS Tables but no second clearly named BBS tool. No fresh formula/grid read, bound Apps Script inspection or execution was performed. The earlier full-grid extraction remains recorded in `ai_docs/games/bbsfm/source-manifest.json`; do not mislabel this pass as another complete workbook audit.

The user's Library artifact `khbbs_command_melding_reference.json` (recorded Library ID `libfile_6b305649aa108191afefdb5d34338d14`) is preserved in `ai_docs/games/bbsfm/melding-reference.json`. It contains levels, character rates, rare-result/ability flags and ownership footnotes that the legacy wide spreadsheet model did not fully capture. Preserve the user's authored work and traceability, while retaining source-local ability-letter mappings.

The **repository's** `bbsmelding/index.html` contains input slots, output/ability display elements and a command-list concept. Its `script.js` only extracts, types, sorts and logs ingredient commands; it does not implement event-driven meld calculation. This finding concerns that local scaffold only. It **does not establish that the user's separately remembered functioning craft tool never existed or was unfinished**. Locate the working artifact or surviving formula/script version before claiming its behavior has been recovered.

### Functional value to retain and gaps to close

The current app already supports searching static recipe descriptions, including ability names, separating command melding from ice cream, displaying minimum levels and probability text, and character-scoped farming plans. `tests/e2e/bbs-ux.spec.ts` describes these behaviors; it was inspected, not rerun during this documentation-only pass. This is useful existing functionality but not a full bidirectional solver.

Priority behavior for the root workspace:

1. **Desired result → how to craft:** pick command and optionally desired attached ability; show all character-valid ingredient routes, exact levels, crystal choice and guaranteed/random outcomes. Link ingredient acquisition, not just ingredient names.
2. **Ingredients → possible results:** select an unordered pair, levels and optional crystal; show every valid outcome and ability. Character-specific rates and unavailable commands must change immediately with active character.
3. **Recursive planning:** expand a chosen route into prerequisite commands/acquisitions without cycles or duplicate consumption; preserve alternative routes rather than assuming the first is best. Stock behavior must follow current user decisions, not stale optional-inventory prose.
4. **Mechanics that affect correctness:** ownership-conditioned rare Shotlocks, no abilities on Shotlock outputs, retained movement/defense copy, duplicate ingredients, source-local crystal mapping and the corrected probability groups.
5. **Visible identity:** active character in root Synthesis is explicit and independent of a story-section visit; saved plans remain character-specific. Do not allow Final/Secret Episode pseudo-character selection to silently produce an empty solver when recipes are keyed to Aqua; separate recipe eligibility from save context.

Next provenance work is a targeted read of workbook formulas/controls plus any surviving original tool artifact, rather than rebuilding a second data table from scratch. No new inventory transaction model, root navigation implementation or recreated tool is claimed here.

## Command Melding catalog/detail audit — latest user requirements

The root tool label should be **Command Melding** (or similar), visually distinct from the character portraits and easy to reach. The catalog is grouped by command type and has character-availability indicators to the right of each name (portraits or colored initials). The detail page needs purchase prices, enemy drops, every producing meld with crystal/ability choices, and every consuming meld. The user clarified “price to unlock” as **purchase price from a Moogle or in medals**, not an invented abstract unlock cost.

### Taxonomy and availability

The local legacy `command_types` array has 150 rows: Attack 40, Magic 58, Friendship 17, Movement 17, Defense 10, Reaction 8. It has neither an Item nor Shotlock group. The current 108-row shop table has no type field at all. This is a seed, not a complete modern command catalog.

[KHWiki's BBS command catalog](https://www.khwiki.com/Deck_Command_(KHBBS)) separates Battle Commands into Attack, Magic, Item and Friendship, and Action Commands into Movement, Defense and **Reprisal**. Shotlocks are separately equipped. Use these distinctions to reconcile legacy “Reaction”; do not confuse command family with Basic/Advanced/Ultimate class or the A–P crystal mapping type. The page also includes temporary/D-Link/illusion-related commands, so copying every name into the ordinary obtainable catalog without interpreting footnotes would overcount.

Character badges must express ordinary command availability/acquisition for that character, not merely the presence of a successful meld row. Keep character usability, each acquisition route's character restrictions and each recipe outcome's character rate distinct. A temporary D-Link deck containing a command does not establish ordinary command ownership. Right-hand portraits/initials also need accessible full character names; color alone is insufficient.

### Both shop channels and drops

Current structured shop rows have only `name`, `munny`, `shop_level`, and `characters`. They cannot represent medal prices, Arena-level AND Shop-level gates, or all first-acquisition alternatives without extensions. Unknown/unresearched price must differ from “not sold,” and munny/medals must remain separate currencies.

Concrete sourced examples for implementation fixtures:

| Command | Ordinary acquisition / purchase facts | Why it matters |
|---|---|---|
| Zantetsuken | Terra: 1,700 munny once five worlds are cleared **or** previously obtained; alternatively 1,000 medals with Shop Level 5 **and** Arena Level 8. [BBS section](https://www.khwiki.com/Zantetsuken) | Multiple currencies, different gates, and Terra-only availability. No currency conversion or single “unlock cost.” |
| Quick Blitz | Starts with all three; shop purchase 100 munny after prior acquisition. Sonic Blaster drop 4.8% at Shop Levels 5–6. [BBS section](https://www.khwiki.com/Quick_Blitz) | A valid catalog command with no producing meld. Drop rate is conditional and must not use another game's same-name source. |
| Mine Square | Buckle Bruiser drop 1.2%, Shop Levels 6–8. [BBS section](https://www.khwiki.com/Mine_Square) | Drops are an alternative to crafting; availability must retain the shop-level interval. |

Rates above are source-inspected community evidence, not in-game measurements or independently certified Steam-build behavior. Exact spawn rooms, character-specific encounters, reset routes and all shop entries remain open. Enemy source pages and world encounter tables should be joined before a farm is presented as complete. Include shop/medal gates and drop conditions as reference text under the existing no-progress-gate-tracker requirement.

### Producing and consuming indexes

The 296-row reference has ingredient names and minimum levels, result names, per-character outcome percentages, recipe types, crystal mappings and conditional footnotes. It can generate both indexes from one source after identity/conflict normalization:

- Produces selected command: every outcome row whose result resolves to that command ID, grouped into complete input pairs, retaining alternate outcomes and character rates.
- Consumes selected command: every input pair containing that command, regardless of which ingredient position; show all possible results for the active character. Identical input pairs use quantity two, not two duplicated recipe cards.
- Crystal choices attach to the actual recipe outcome/type. All 112 standard type/crystal relationships are present, and non-attachable Shotlock rows have empty ability mappings. Do not assign a single universal crystal-to-ability table to a result that has multiple recipe types.

Measured raw-reference coverage: 80 distinct ingredient names, 99 result names, 124 names in their union. Quick Blitz has zero producing rows and 17 consuming outcome rows; Aero has zero producing rows and 13 consuming rows. These raw outcome counts are **not** counts of distinct valid recipe pairs. Such commands remain fully useful catalog/details entries with explicit “no meld recipe documented” and their other acquisition routes.

A further identity defect surfaced: the reference has one result named **Confusing Strike**, while it also has two **Confusion Strike** result rows and eight consuming rows using Confusion Strike. The command catalog uses Confusion Strike. This requires a sourced alias/correction before constructing reverse links; otherwise the graph splits one command and breaks ingredient navigation. Preserve the original source spelling in provenance rather than silently hiding the mismatch.

Outstanding modeling work is a complete command ID/type/availability catalog, structured acquisition routes per character and edition, both shop currencies/gates, complete command-drop records, and normalized recipe graphs. Existing shop rows, meld rows and character-scoped app entries remain reusable evidence, but their union is not a certified command roster.

### Chest acquisitions and canonical progress — subsequent requirement

The user also requires every treasure chest containing the selected command. Show character, world, area and precise directions when verified; each route links the **existing canonical treasure record and saved checklist value**, rather than creating another independent progress flag in Command Melding.

The existing `collectible-inventory.csv` already supplies stable chest IDs, character, episode, world, area, reward name, count scope and provenance. Command-name joins are therefore possible now, but need canonical command IDs/aliases and a completeness audit. The generator currently uses name-matched chest rows in some ingredient acquisition prose; that is not yet a complete command-detail chest index with shared linked state.

Example: Mine Square is recorded for Terra at Deep Space / Machinery Bay Access (`bbsfm:terra:deep-space:treasure:19`) and Aqua at Radiant Garden / Front Doors (`bbsfm:aqua:radiant-garden:treasure:16`). These are existing area-level candidate records; do not invent room directions or claim these examples exhaust its acquisition routes. Keep character and main/Secret Episode scope in the relation even when the same command has multiple sources. User command acquisition history and a particular chest's collected state are different facts; owning a command from melding must not auto-check its chest.

The [Sonic Blaster source](https://www.khwiki.com/Sonic_Blaster) further corroborates Quick Blitz's Shop Level 5–6 drop and locates the enemy in Deep Space and Keyblade Graveyard. Its later Shop Level 7–8 command drop changes to Blitz at 0.6%. Its Arena reward table lists munny instead of those command drops. Thus an Arena appearance must not be reused as a command farm merely because the enemy name matches. Exact room/character routes still require normalization.

## Follow-up category/visual research

See [shared-reference versus character-progress matrix](bbsfm-category-scope-matrix-2026-09-28.md) for the subsequent universal/character category audit, Arena and Unversed exceptions, new Arena source conflict, and Finish Commands tree/counter research. The user's [supplied UI screenshots](../ui/references/bbsfm/README.md) supersede this earlier pass's shared-blue Reports/journal-styled melding assumptions: Terra orange, Ventus green, Aqua blue; Command Melding uses the player-menu UI. No native Finish Commands screenshot or counter-reset behavior was certified from the third-party infographic.

## Implementation handoff: existing fields and stable IDs

Read-only audit for the parent implementing UI. No application files edited.

- `CollectionEntry.character` is a string, not a full availability model. 33 entries are unscoped: 16 bestiary references and 17 platform goals. Unscoped does not mean one shared completion flag is correct for every purpose.
- `CollectionRecipe` preserves only ID/name/group/character/instructions and ingredient IDs/quantities. Levels, outcomes and crystal mappings are flattened into instructions. Build exact recipe/ability indexes from the raw `melding-reference.json` fields rather than parsing UI prose. Filter by positive `success_rate_percent_by_character[character]`, respect attachability and footnotes, and group whole unordered input/level pairs.
- Ability IDs: `bbsfm:{character-lower}:ability:{slug}`. The CSV preserves `maximum_stacks`, `crystal`, `recipe_types`; Scan and Zero EXP are non-meld abilities. Ability → recipe lookup should test `possible_abilities_by_crystal` values on eligible attachable outcomes. Crystal labels must match the canonical material names.
- Crystal IDs: `bbsfm:{character-lower}:material:{crystal-name-slug}`, including `secret-gem`; 27 records total. Existing `drops[]` contains medal-shop information, while enemy details are prose. Link existing material entries and exact-name/character chest records now, but do not fabricate structured enemy room links.
- Finisher IDs: `bbsfm:{character-lower}:finish:{name-slug}`. The raw `finish_unlocks.rows` preserve characters, level, metric, target, parent_equipped and style. Split explicit ` or ` alternatives; normalize initial `Finish (Terra)` / `(Ventus)` / `(Aqua)` to that character's `finish:finish`. Every normalized parent resolves in the existing table. Preserve stable IDs and separate T15/V15/A16 state.
- Episode unlock IDs: `bbsfm:final-episode:unlock`, `bbsfm:secret-episode:unlock`. Secret chest IDs: `bbsfm:aqua:secret-episode:treasure:1` through `:8`. Episode weapon IDs: `bbsfm:aqua-final-episode:keyblade:brightcrest` and `bbsfm:aqua-secret-episode:keyblade:master-s-defender`.
- Episode character strings differ: chests/unlocks use `Aqua · Secret Episode`, weapons use `Aqua: Secret Episode` (likewise Final). Normalize scope strings at the boundary without rewriting saved IDs; existing `bbsScope` already performs this punctuation normalization. Recipe eligibility is Aqua, not an episode pseudo-character.

Minimal safe factual candidates are the two corroborated meld corrections documented above and normalization of the Confusing Strike name alias to Confusion Strike with provenance retained. Preserve original evidence separately, regenerate derived views, and validate whole probability groups. Do not silently resolve missing acquisition eligibility, the Secret Gem area conflict, Arena HP/gate conflicts or Finish counter reset behavior. Retaining a quarantined recipe is safer than displaying a partial probability group if the implementation does not yet apply the validated corrections.
