# Decision Log

Latest presentation decision: [DEC-020](#dec-020-faithful-game-journals-replace-the-initial-ars-arcanum-ui). Earlier accepted visual decisions remain history and are superseded where they conflict.

## DEC-018: Implementation, isolated Chroma instances and transient Jiminy conversations

- **Status:** Accepted
- **Date:** 2026-09-18
- **Decision:** Implement KH1FM now using a specialist agent team and a corrective UI/UX review, followed by orchestrator review and fixes. Save repeatable implementation patterns for the remaining games. Initial user acceptance devices are desktop Chrome and iPhone 17; these supersede the previous initial three-device matrix.
- **Copperminds:** Every canonical game owns a separate ChromaDB persistent database instance/directory, not a collection inside a shared database. Inspect/reuse the original WintersRain Coppermind capability. Wire the application and retrieval pipeline before seeding actual KH1FM thoughts. Seed concise factual units with useful tags, categories, stable source links and compatible embeddings.
- **Offline compatibility:** Chroma instances are the content-preparation/query source. Export their data and embeddings into separate browser-local game packs so the phone requires neither Python nor a Chroma server. This retains the accepted fully offline player runtime.
- **Conversation:** Do not persist Jiminy chat history or conversational memory. In-memory follow-up context may remain isolated per game during the current app session. A reload/restart clears it. Player checklists, inventory and resume state continue to persist.
- **Consequences:** Test real instance separation and pack scoping, idempotent seeding, browser retrieval parity, no transcript storage, and downloaded model readiness. Distinguish desktop/mobile emulation from real iPhone 17 acceptance.
- **Supersedes:** Earlier undecided transcript retention, shared-database interpretations, planning-only implementation restrictions for the now-authorized KH1FM work, and the initial iPad acceptance requirement. Does not remove other games from overall MVP scope.

Record decisions that should survive individual planning conversations. Each entry should include the problem, decision, rationale, alternatives, and consequences.

## Decision template

### DEC-XXX: Title

- **Status:** Proposed | Accepted | Superseded
- **Date:** YYYY-MM-DD
- **Problem:** TBD
- **Decision:** TBD
- **Rationale:** TBD
- **Alternatives considered:** TBD
- **Consequences:** TBD
- **Supersedes / superseded by:** None

---

## DEC-001: Deliver as a React Progressive Web App

- **Status:** Accepted
- **Date:** 2026-09-18
- **Problem:** KH Tools needs a more maintainable, mobile-friendly delivery model that can work across common platforms and remain available offline.
- **Decision:** Rebuild the experience as a mobile-first React Progressive Web App.
- **Rationale:** A PWA provides broad reach, rapid web delivery, installability, and offline capabilities without requiring native app-store distribution for the initial product.
- **Alternatives considered:** Flutter; React Native with Expo; continued static HTML.
- **Consequences:** The project must define service-worker caching, installability, responsive behavior, browser compatibility, and update safety. Platform-native APIs and app-store presence are not initial assumptions.
- **Supersedes / superseded by:** None

## DEC-002: Name the project Ars Arcanum

- **Status:** Accepted
- **Date:** 2026-09-18
- **Problem:** The rebuilt product needs an identity distinct from the legacy KH Tools implementation.
- **Decision:** Name the product Ars Arcanum.
- **Rationale:** The name is recognizable within Kingdom Hearts, supports a magical compendium identity, and separates the new product from the old technical implementation.
- **Alternatives considered:** Continue using KH Tools.
- **Consequences:** Product copy, metadata, manifests, icons, repository documentation, and later deployment naming must be updated deliberately. The repository itself remains `kh-tools` unless separately renamed.
- **Supersedes / superseded by:** None

## DEC-003: Use a Jiminy's Journal interface metaphor

- **Status:** Accepted
- **Date:** 2026-09-18
- **Problem:** The original project directly mimicked KH1 home and pause menus, but the expanded cross-game guide needs a cohesive identity that supports dense reference material.
- **Decision:** Retain the anchored home-menu game list and fly-in game-specific artwork, then present game content as Ars Arcanum's interpretation of Jiminy's Journal rather than recreating in-game pause menus.
- **Rationale:** A journal naturally accommodates entries, indexes, checklists, cross-references, sources, and completion tracking while allowing per-game visual variation.
- **Alternatives considered:** Continue mimicking KH1 menus; recreate each game's own pause menu; use a neutral documentation UI.
- **Consequences:** The design system needs a shared journal shell, per-game theme tokens, accessible motion alternatives, and purpose-built layouts for dense tools. It must avoid becoming a literal book simulation that obstructs navigation.
- **Supersedes / superseded by:** None

## DEC-004: Model games separately from release collections

- **Status:** Accepted
- **Date:** 2026-09-18
- **Problem:** Kingdom Hearts releases frequently bundle several games or media works under collection names, which can blur guide ownership.
- **Decision:** Canonical games and experiences own their specifications and completion data. Release collections are grouping and platform metadata, not standalone game guides by default.
- **Rationale:** This prevents duplicated data and keeps 0.2, DDD HD, and similar experiences attached to the correct gameplay model.
- **Alternatives considered:** Create a complete guide specification for every retail collection.
- **Consequences:** The data model must represent collection membership and platform releases while routing users to component guides.
- **Supersedes / superseded by:** None

## DEC-005: Design for screenshots but defer production media

- **Status:** Accepted
- **Date:** 2026-09-18
- **Problem:** Location screenshots and maps will materially improve future guides, but Ars Arcanum should reach MVP without delaying for a media library or adding unowned images.
- **Decision:** Include optional screenshot, map, annotation, accessibility, provenance, rights, and offline fields in the architecture from the start. Test media-capable UI with synthetic or project-owned fixtures, while shipping no production screenshot unless an approved asset already exists.
- **Rationale:** This prevents costly schema and layout retrofits while keeping MVP text-first and avoiding rights problems.
- **Alternatives considered:** Ignore media until after MVP; require screenshots for MVP; display empty placeholders.
- **Consequences:** Records and components must render cleanly with zero media. Production builds validate rights state and accessibility metadata. Media-support design and testing remain MVP. Only production visual assets awaiting acquisition are explicitly deferred; no blanket deferral of media functionality is implied (clarified by DEC-008).
- **Supersedes / superseded by:** None

## DEC-006: Use game-specific journal presentations

- **Status:** Accepted
- **Date:** 2026-09-18
- **Problem:** A single physical-book skin would miss the distinct journal identities shown in the user's references.
- **Decision:** KH1–2 use green journal theming; BBS uses blue Reports theming; KH3 uses a dark, menu-like digital journal. Preserve the anchored game menu with fly-in artwork and shared navigation semantics.
- **Rationale:** The user selected these directions from supplied journal screenshots.
- **Alternatives considered:** Earlier speculative game palettes; one literal book treatment for all games.
- **Consequences:** Theme support must cover layout variants as well as color tokens. DDD and a distinct 0.2 treatment await further inspiration. Reference images are not production screenshot assets; text-first MVP remains unchanged.
- **Supersedes / superseded by:** Replaces earlier speculative KH1/KH2/KH3 palette proposals and refines DEC-003; does not replace the journal concept.

## DEC-007: Persistent checklists for every game

- **Status:** Accepted
- **Date:** 2026-09-18
- **Problem:** Players need to track completion across sessions without losing their place.
- **Decision:** Every game has checkable completion items with automatically saved state, offline persistence, Remaining filters, progress counts, and resume context in MVP.
- **Rationale:** Explicit user requirement that players can check things off as they go and return reliably.
- **Consequences:** Stable identifiers, game/character scope, migrations, failure handling, and accessible completion controls are required. Local-first storage and export/import are proposed safeguards; cloud sync is not implied.
- **Alternatives considered:** Session-only checklists; reference-only guides.
- **Supersedes / superseded by:** Makes persistent checklist behavior mandatory rather than a generic future planning item.

## DEC-008: MVP by default; Coppermind included

- **Status:** Accepted
- **Date:** 2026-09-18
- **Problem:** “Later” was incorrectly interpreted as permission to defer the SLM/Coppermind feature beyond MVP.
- **Decision:** All user-requested features and specified games are MVP scope unless the user explicitly defers them. “Later” in a planning conversation is not a release deferral. The only current explicit exception is production screenshots/visual assets that still need to be obtained; media-support design and testing remain MVP. Unresolved implementation choices require planning, not automatic deferral. This does not add unrequested features or authorize implementation while discovery is ongoing.
- **Rationale:** The user explicitly clarified that later refers to their planning sequence, not the project's release scope.
- **Consequences:** Bundled SLM and per-game, data-grounded Coppermind Q&A are required for MVP. Model/runtime selection, packaging, offline compatibility, and integration with WintersRain/coppermind remain engineering decisions to resolve for MVP. Escalate feasibility constraints rather than silently moving requirements to another release.
- **Alternatives considered:** Automatically classifying unimplemented or technically unresolved requirements as future features; rejected.
- **Supersedes / superseded by:** Supersedes prior outside-MVP Coppermind wording and any unapproved release deferrals; clarifies DEC-005 without removing the production screenshot asset exception.

## DEC-009: Data Jiminy identity and offline AI disclosure

- **Status:** Accepted
- **Date:** 2026-09-18
- **Problem:** The MVP assistant needs a settled user-facing identity and a clear, prominent AI disclaimer.
- **Decision:** Represent the chatbot as Jiminy Cricket and name him **Data Jiminy**. Preserve the user's initial disclaimer verbatim in [data-jiminy.md](./data-jiminy.md), with final technical wording reviewed during implementation. Chat runs locally after setup without user credentials, external account connections, or model configuration.
- **Rationale:** Explicit user direction; integrates conversational help with the journal presentation.
- **Consequences:** Bundled embedding and conversational models support game-scoped browser-local retrieval. SmolLM2 is the candidate family; exact model/runtime selection remains an implementation decision. Final copy must match actual download, offline, and data-access behavior while retaining the intended playful tone.
- **Alternatives considered:** Generic chatbot branding; user-configured external assistants.
- **Supersedes / superseded by:** Refines DEC-008 and resolves prior uncertainty about hosted inference and user setup; no cloud inference fallback is included.

## DEC-010: Direct Coppermind answers without conversational personality

- **Status:** Accepted
- **Date:** 2026-09-18
- **Problem:** Chatbot framing suggests personality and elaboration that the user does not want.
- **Decision:** Data Jiminy is a natural-language interface to the per-game Copperminds. Return fast, concise, factual answers with compact source links. No roleplay, personality, filler, or unsolicited elaboration. Preserve necessary conditions and ask only essential clarifications.
- **Rationale:** Explicit user direction to prioritize direct answers.
- **Consequences:** Jiminy remains the visual identity; the existing user-authored disclaimer remains intact. Prefer direct structured results and application-controlled retrieval. Standing model instructions support the behavior but do not guarantee output correctness or enforce access controls.
- **Alternatives considered:** General conversational assistant; character-driven chat.
- **Supersedes / superseded by:** Refines DEC-009. Any earlier chatbot/conversational wording describes the input mechanism or model technology, not a personality-driven product experience. See [Data Jiminy](./data-jiminy.md#direct-answer-contract).

## DEC-011: Collectible compendium and world progress

- **Status:** Accepted
- **Date:** 2026-09-18
- **Problem:** Treating every in-game Journal flag as required content expanded the app into a narrative walkthrough and obscured collectible progress.
- **Decision:** Focus on finding and acquiring collectibles and completion items. World percentages count explicitly scoped collectible records, excluding routine story progression, conversations and character-biography updates. Keep necessary acquisition/access conditions. Crafting, equipment, optional challenges, Gummi, records, unlocks and achievements retain distinct goal tracks.
- **Rationale:** The user wants direct “where is this thing?” answers and collection tracking.
- **Alternatives considered:** Recreating every narrative Journal flag; a full sequential story walkthrough.
- **Consequences:** Full narrative Journal manifests are not release blockers. An actual achievement or secret unlock may reference Journal completion accurately without implying that the app's collectible percentage proves it.
- **Supersedes / superseded by:** Supersedes broader planning assumptions requiring exhaustive Chronicles/character-update manifests; refines DEC-003 and DEC-007. Does not defer other accepted MVP features.

## DEC-012: One saved collectible across compact and expanded lists

- **Status:** Accepted
- **Date:** 2026-09-18
- **Problem:** Journal-style compact lists and practical location guides must not create duplicate progress states.
- **Decision:** Group collectible slots by world in a compact index. World details expand those same records into location/acquisition rows. Both surfaces check/uncheck the same stable item ID in both directions. Apply this to every checklist with collection details.
- **Rationale:** Players can match the familiar overview and immediately find the missing item without losing their checks.
- **Alternatives considered:** Independent checks in each presentation; aggregate-only world lists without item mapping.
- **Consequences:** Derived parent summaries, explicit counting units, stable ordering metadata, deduplication, offline persistence and accessible separate open/toggle actions are required. See the [shared contract](./content/collectible-compendium-and-linked-views.md).
- **Supersedes / superseded by:** Refines DEC-007; does not change persistent progress requirements.

## DEC-013: Spoilerful compendium without progress-gate tracking

- **Status:** Accepted
- **Date:** 2026-09-18
- **Decision:** Show content openly with no spoiler warnings, hiding or reveal controls. Omit Available Now filters and manual story/ability milestone tracking. Keep required abilities and access conditions in acquisition guidance.
- **Rationale:** Explicit user direction; the app provides direct reference answers.
- **Consequences:** Remove prior spoiler and optional availability-tracker proposals across all games, search, media and Data Jiminy. World collectible progress remains unaffected by narrative gates.
- **Supersedes:** Prior unresolved spoiler/Available Now questions and proposed hidden-media behavior.

## DEC-014: Steam context and Apple-first app acceptance

- **Status:** Accepted
- **Date:** 2026-09-18
- **Decision:** User plays Steam. Initial app smoke and acceptance use Apple browser, iPhone and iPad; Android is a follow-up test target. Validate app functionality without requiring user gameplay or a completion playthrough.
- **Rationale:** Explicit user testing plan.
- **Consequences:** Record actual device/browser versions during execution. Source reconciliation and structured-data validation still establish content accuracy; they do not depend on the user's game progress. See [testing policy](./testing-and-content-validation.md).
- **Supersedes:** User-device question and mandatory gameplay/modern-save verification gates.

## DEC-015: First-class synthesis with optional inventory

- **Status:** Accepted
- **Date:** 2026-09-18
- **Decision:** Make synthesis a first-class feature. Optional player inventory displays owned/required (x/y) reminders on recipe ingredients and supports accurate remaining-material calculations.
- **Rationale:** The user identifies synthesis as the least enjoyable part of collection and wants strong functional support.
- **Consequences:** Prioritize recipe/source navigation, persistent optional stock, deterministic calculations and independent acceptance fixtures. Keep crafted history separate from current stock and avoid double-allocating inventory. Propagate applicable lessons to KH2/KH3 synthesis, BBS melding and DDD creation without inventing crafting in 0.2. See [shared contract](./content/synthesis-and-inventory.md).
- **Supersedes:** Unresolved KH1 inventory question; strengthens existing crafting MVP priority.

## DEC-016: Main-menu artwork flies in; game choices stay anchored

- **Status:** Accepted
- **Date:** 2026-09-18
- **Decision:** Preserve the original main menu's anchored game list and large game-specific artwork transitions. Highlighted-game artwork flies in/out; the games themselves are not flying cards. The journal UI begins inside the selected game.
- **Rationale:** Explicit user correction, corroborated by browser exploration of the original site.
- **Consequences:** Adapt list/artwork composition to phones/tablets, support keyboard/touch and reduced motion, and keep direct game access independent of art loading. Preserve the original KHFM tool's direct-reference intent while replacing its pause-menu interior with journal views.
- **Supersedes:** The design document's incorrect “Game choices fly into view” statement and ambiguous fly-in-selector wording. Refines DEC-003/006.

## DEC-017: Shared model, per-game Jiminy sessions and anchored launcher

- **Status:** Accepted
- **Date:** 2026-09-18
- **Decision:** One answering SLM serves the entire app. Sessions/context and Coppermind retrieval are per-game, selected by the active journal. Place Jiminy at the bottom right inside a game with a tappable “…” bubble opening Data Jiminy.
- **Rationale:** Explicit user direction: KH1 must not surface BBS questions or context, while avoiding a model per game.
- **Consequences:** Isolate history, retrieved context, suggested questions and answer caches; discard stale responses after switching. Reuse shared model weights/downloads. No unscoped launcher on the game-selection screen. Maintain accessible controls, safe-area/keyboard spacing and the existing direct-answer/disclaimer requirements. All games inherit this contract.
- **Supersedes:** Earlier wording that shared inference was merely possible. Refines DEC-009/010; the shared query-embedding component remains part of local retrieval.


## DEC-019 — Research citations stay out of player-facing entries

The user clarified during implementation that external research citations were for their review. Data Jiminy's visible citations and journal cross-references link to canonical in-app entries. Removed external research link lists, verification badges and research-audit copy from the player UI. Provenance remains in canonical records, Coppermind metadata and developer documentation for maintenance and factual checks. Necessary factual uncertainty remains visible. Media credit/attribution is a separate asset requirement.


## DEC-020: Faithful game journals replace the initial Ars Arcanum UI

- **Status:** Accepted direction; detailed KH1FM implementation plan is a revision draft.
- **Date:** 2026-09-22
- **Decision:** Scrap the initial Ars Arcanum UI as the visual target. Build workable journals faithful to the games, based on the accepted standalone mockups. Start with KH1FM. KH2FM remains the user's preferred overall clarity reference; each game keeps its own journal identity.
- **Rationale:** User feedback: the earlier interface is too wiki-like, crowded and overdesigned; the faithful mockups are working for them.
- **Consequences:** Replace presentation architecture while retaining researched content, saved progress, synthesis/farming logic, canonical linking, offline use and Data Jiminy behavior. Draft the plan in `ai_docs`, independently source additional KH1FM reference material, and keep numbered questions and blockers for user revision. Mockup placeholders, fonts and fixed-canvas scaling are not automatically production requirements. No application code is changed in this planning pass.
- **Supersedes:** Prior anti-reproduction and generic-theme language (DEC-003/006), mandatory inline-expanded collectible presentation, and conflicting presentation instructions in the old UI documents. Earlier global-menu composition (DEC-016) and fixed assistant placement (visual part of DEC-017) are reopened as explicit design clarifications, not silently reapproved or deleted. Nonvisual contracts remain in force.
- **Open scope:** Full native Chronicles/biography/report-text coverage, app-only tool navigation, phone composition, assistant placement and production assets. Do not silently add a complete narrative encyclopedia or remove existing companion capabilities.
- **Plan:** [KH1FM new UI plan](ui/kh1fm-new-ui-plan.md), [reference workbook](ui/references/kh1fm/README.md).


## DEC-021: Implement a KH1FM MVP to support design revision

- **Status:** Accepted authorization; implemented locally for review.
- **Date:** 2026-09-23
- **Decision:** Following the logged new-UI plan, the user authorized an MVP pass so unknowns can be evaluated in a working journal.
- **Consequences:** Implement reversible provisional choices without treating them as final answers to the plan's questions. Preserve content and player state. Record approximations, transitional tool layouts, reference gaps and executed checks. This authorizes implementation; it does not assert full native journal content, final visual acceptance or production deployment.
- **Record:** [KH1FM faithful-journal MVP](implementation/kh1fm-faithful-journal-mvp.md).

## DEC-022: Apply the faithful-journal treatment to KH2FM

- **Status:** User-authorized implementation; local pass ready for revision.
- **Date:** 2026-09-24
- **Decision:** Use the supplied KH2 video and accepted mockup for KH2's journal style. Carry forward KH1's stable interaction geometry, viewport-height frame, equal facing pages, compact rows, measured page capacity, direct collection navigation and book-based synthesis.
- **Consequences:** Replace the generic KH2 guide interior while retaining existing content and progress behavior. Keep world-specific artwork, native subsection adaptations and typography gaps explicit. Ask for focused reference screenshots if needed; do not fabricate reference evidence or native journal content.
- **Record:** [KH2FM UI plan](ui/kh2fm-new-ui-plan.md), [local MVP](implementation/kh2fm-faithful-journal-mvp.md).

## DEC-023: BBS starts with character selection and isolates each playthrough

- **Status:** Accepted user requirement; research and design preparation underway.
- **Date:** 2026-09-28
- **Decision:** Center the BBS root on Terra, Ventus and Aqua in the manner of the game's initial character-selection screen. Scope all downstream information and progress to the selected story. Give Final Chapter its own section.
- **Rationale:** The game takes players through separate stories; Aqua players do not need irrelevant Terra/Ventus information.
- **Consequences:** Character scope applies to journal content, acquisition alternatives, recipes, search and Data Jiminy. Shared reference records remain possible, with independent playthrough progress. Keep Final/Secret Episode scopes distinct and verify exact labels/menu treatment during research. Preserve the high-fidelity game-UI requirement for both the selector and Reports interior. Existing Reports/Sticker Album screenshots do not establish the selector's design; find references and request a user image/video only if necessary.
- **Specification:** [BBS character-first root](games/birth-by-sleep-final-mix.md#character-first-root-and-episode-sections--accepted-2026-09-28).

## DEC-024: Independent root-level BBS Synthesis tool

- **Status:** Accepted user requirement; detailed visual design pending.
- **Date:** 2026-09-28
- **Decision:** Synthesis is an independent BBS root category alongside the character stories and Final Chapter. Command melding is the user's highest-priority BBS tool.
- **Rationale:** The user's research artifacts and personally built Google Drive tables already supported a functioning crafting tool. Melding requires prominent, practical planning support.
- **Consequences:** Audit and build on existing tool behavior and source tables. Preserve both ingredient-to-result and desired-result/ability-to-recipe workflows. Select character context within Synthesis for valid recipes, outcomes and independent inventory; do not require entering a character journal. Develop a dedicated journal-faithful visual treatment for the tool rather than treating static reference tables as sufficient.
- **Clarifies:** DEC-023 character scoping governs story journals and relevant data, not exclusive ownership of Synthesis navigation.
- **Specification:** [First-class command melding](games/birth-by-sleep-final-mix.md#first-class-command-melding).

## DEC-025: Command Melding catalog, character markers and two-way recipe details

- **Status:** Accepted user requirement; price terminology clarified.
- **Date:** 2026-09-28
- **Decision:** Give the independent root tool the working label Command Melding and a visually distinct, accessible entry beside the character stories. Group its command catalog by type. Place acquiring-character markers to the right of command names, using portraits or colored initials. A selected command shows Moogle Shop purchase prices in munny, medal purchase prices where applicable, enemy drops, producing recipes with recipe-specific crystal/ability results, and recipes that use it as an ingredient.
- **Consequences:** Catalog acquisition markers cover all acquisition methods, not just meld eligibility. Preserve the independent catalog's cross-character overview alongside explicit recipe/inventory character context. Exact icon treatment remains open. The user clarified “price to unlock” as price to buy from a Moogle or with medals, and explicitly added enemies that drop the command. Identify vendors/currencies and enemy locations/conditions; retain unknown-versus-absent source distinctions. Validate forward and reverse recipe relationships against the same source records.
- **Specification:** [Command Melding catalog and details](games/birth-by-sleep-final-mix.md#command-melding-catalog-and-details--accepted-2026-09-28).

## DEC-031: Final Chapter is a character-style home entry below Aqua

- **Status:** Accepted user placement requirement, conditioned on relevant collectible content.
- **Date:** 2026-09-28
- **Decision:** Place Final Chapter directly beneath Aqua on the home menu, styled as a character/story option when it has collectibles to highlight.
- **Consequences:** Existing research identifies eight Secret Episode chest candidates and episode-specific Keyblade forms, supporting inclusion. Keep the entry with the story choices, separate from universal tools, and preserve Final Episode/Secret Episode contexts and Aqua main-story progress independently. This settles home placement without fixing the section's internal layout or certifying all candidate collectible details.
- **Additional acquisition requirement:** Include treasure chests containing each command, identified by character/episode, world and location, with directions and links to the same canonical treasure checklist records. Chest references share acquisition state and never double-count progress.

## DEC-026: Supplied BBS references define separate melding and character Reports styles

- **Status:** Accepted user visual direction; references preserved locally.
- **Date:** 2026-09-28
- **Decision:** Mimic the supplied in-game player-menu melding UI specifically for Command Melding. Character Reports use the supplied Terra orange, Ventus green and Aqua blue frames with the shared ring-bound book composition. Use the fifth image for interior-page treatment; its character identity remains tentative.
- **Consequences:** Supersedes the shared-blue framing and journal-styled melding assumptions in earlier decisions/specification. Retain all requested catalog, acquisition and two-way recipe functions. Screenshot labels and incidental UI are visual evidence, not new feature instructions. These Reports roots do not replace the distinct initial character-selector reference requirement.
- **References:** [Five supplied BBS screenshots and design notes](ui/references/bbsfm/README.md).

## DEC-027: Research shared categories before assigning BBS navigation scope

- **Status:** Accepted information-architecture requirement; category classification under research.
- **Date:** 2026-09-28
- **Decision:** Separate character-specific content such as treasures and Keyblades while keeping universal information readily accessible. Explicitly investigate bestiary/The Unversed, Mirage Arena and Unversed Missions for shared versus playthrough-specific behavior, plus other categories as applicable.
- **Consequences:** Research must distinguish universal reference definitions from character/episode availability, locations, rewards, requirements and independent saved progress. No candidate category is assumed fully universal based on its name. Produce a sourced matrix before fixing additional shared navigation placement. Preserve the already approved independent Command Melding tool.
- **Specification:** [Shared versus playthrough-specific categories](games/birth-by-sleep-final-mix.md#shared-versus-playthrough-specific-categories--research-requested-2026-09-28).

## DEC-028: Character-specific Finish Commands presentation under consideration

- **Status:** User-proposed design options; exact presentation not selected.
- **Date:** 2026-09-28
- **Direction:** Consider a faithful Finish Commands menu or a character-specific menu/panel opened from the character section. Preserve the relevant character's progression tree and unlock requirements.
- **Evidence:** [Supplied unlock guide](ui/references/bbsfm/finish-commands-unlock-guide.png), a third-party infographic rather than a verified native-menu screenshot. Research must verify conditions, dependencies and counter behavior, and inspect native UI before claiming an exact match.
- **Resolved by DEC-032:** Character journal list/details are primary; View chart opens a coded fly-in chart modal.

## DEC-029: Supplied selector establishes BBS root; book video is visual-only evidence

- **Status:** Accepted reference direction and permitted adaptations; exact layout pending mockup.
- **Date:** 2026-09-28
- **Decision:** Use the supplied native three-character selector as the root reference. Its lower blue description area can hold other menu items; portrait areas may be reduced/cut to accommodate universal entries. Preserve the three character choices, independent Command Melding and Final Chapter.
- **Book reference:** Sampled four frames from the supplied 14:33 video at 1:32, 4:21, 8:43 and 13:05, without watching it all. Distinct index and detail layouts are recorded. Character Files content/tracking is explicitly out of scope; the video informs presentation only.
- **References:** [Selector screenshots and video sample notes](ui/references/bbsfm/README.md#character-selector-and-sampled-book-video--2026-09-28).

## DEC-030: Three-column Command Melding with a separate crystal catalog

- **Status:** Accepted user layout and interaction requirement.
- **Date:** 2026-09-28
- **Decision:** Rearrange the supplied in-game melding menu: scrollable list at left, recipes plus abilities in the middle, other information at right. Provide Commands and Crystals list tabs. Selecting a synthesis crystal opens bestiary information identifying enemies that drop it and their locations, with character flags when relevant.
- **Consequences:** The central pane preserves producing and ingredient-use recipes plus crystal/ability mapping; the right pane holds purchase prices and enemy/chest acquisition details. Crystals are browsable independently of recipes. Reuse conditional canonical enemy-drop records, including location/shop-level/Arena distinctions. The wide-screen arrangement is settled; exact pane dimensions, crystal detail popup mechanics and responsive adaptation remain design work.
- **Specification:** [Command Melding catalog and details](games/birth-by-sleep-final-mix.md#command-melding-catalog-and-details--accepted-2026-09-28).

## DEC-032: Track Finish Commands in character journals with a coded chart modal

- **Status:** Accepted user presentation and tracking requirement.
- **Date:** 2026-09-28
- **Decision:** List Finish Commands by name as per-character journal collectibles. Details state prerequisite finishers, then unlock conditions. A View chart link at the bottom opens a fly-in popup modal of the character's chart, recreated in code rather than displayed as a JPG.
- **Consequences:** Journal list, details and chart share canonical finisher records and saved character-specific acquisition state. Preserve alternative parent requirements and equipped-parent conditions. Use labeled code-rendered nodes/connectors, accessible modal controls and reduced-motion behavior. Do not add automatic gameplay-counter tracking or assume unresolved reset rules.
- **Supersedes:** DEC-028's open presentation alternatives.
- **Specification:** [Finish Commands journal list and coded chart](games/birth-by-sleep-final-mix.md#finish-commands-journal-list-and-coded-chart--accepted-2026-09-28).

## DEC-033: Equal-weight first Command Melding entry and character pills

- **Status:** Accepted mockup revision; first pass positively received, final fidelity still pending.
- **Date:** 2026-09-28
- **Decision:** Command Melding comes first among the shared menu options and uses the same styling/size as its peers. Replace Terra/Ventus/Aqua dropdown selection with pills showing clear selected/unselected states.
- **Consequences:** Keep active-playthrough isolation; pills include both visual and accessible selected state. Retain temporary character art while the user explores improved assets later. The current mockup is not approved as fully faithful; KH1FM/KH2FM-level reference fidelity remains the target.

## DEC-034: Character hover preview and ability-first melding lookup

- **Status:** Accepted user requirement; interactive mockup updated.
- **Date:** 2026-09-28
- **Decision:** Hovering a home character swaps to that character's visual. Add an Abilities tab to Command Melding; selecting an ability shows recipes that can make it.
- **Consequences:** Keyboard focus also previews character artwork; activation still opens the journal. Hover does not change active character context. Ability lookup joins recipes to crystal mappings and character eligibility, displaying input levels, output commands, required crystals and probabilities while excluding no-ability outcomes. Retain Commands and Crystals tabs.

## DEC-035: BBS mockup structure approved; visual fidelity remains open

- **Status:** Structure accepted; visual presentation not approved.
- **Date:** 2026-09-28
- **Decision:** The user confirms the mockups' structure is correct but remains uncertain about UI faithfulness.
- **Consequences:** Preserve the agreed navigation and interaction structure. Perform a dedicated visual refinement against supplied native references and the KH1FM/KH2FM standard before claiming faithful production UI. Approximate mockup styling and stand-in assets are not approved production targets. This acceptance does not certify sample content, incomplete views or app implementation.


## DEC-036: Implement the accepted BBS structure for local review

- **Status:** User authorized implementation; visual review pending.
- **Date:** 2026-09-28
- **Decision:** Implement the working character home, character Reports, separate episode collection and Command Melding tool in the app. Preserve the existing saved profile identities and the accepted temporary artwork boundary.
- **Consequences:** The local build is reviewable and interactive. Research gaps remain explicit, and quarantined meld conflicts remain excluded. Planning and historical meld checks do not consume stock. No deployment or final visual-fidelity approval is implied.

## DEC-037: Centralize attribution and research explanation in a home modal

- **Status:** Accepted user direction; requirements drafting authorized.
- **Date:** 2026-10-01
- **Decision:** Provide a popup modal on the global game-selection home page that users can open, read and dismiss. It credits the sources behind the guide and explains how the research was performed.
- **Rationale:** The user wants community-sourced information to be acknowledged without spending space on repeated citations throughout individual journal pages.
- **Consequences:** Retain detailed provenance in research documents and underlying records. Centralize the user-facing explanation and credits, preserve existing source-specific attribution resources, and keep the modal optional and accessible. This request drafts requirements; it does not implement or deploy the feature.
- **Specification:** [Sources & Research home modal requirements](content/sources-and-research-modal.md).

## DEC-038: Flush Coppermind memories and put Jiminy's notice behind About

- **Status:** Accepted user instruction, including explicit clarification to flush memories rather than disable infrastructure.
- **Date:** 2026-10-01
- **Decision:** Empty the existing game Coppermind memories because the underlying facts need correction. Keep the databases, model infrastructure and feature available for rebuilding. Label Data Jiminy under construction, and show the full AI notice through an **About Data Jiminy** popup.
- **Consequences:** Ship empty, revisioned knowledge exports and Chroma instances; reject or remove obsolete cached exports after the app updates. Do not return the same unchecked guide facts through deterministic fallback. Preserve research, player state and model weights. Restore factual answering through a reviewed future knowledge release. Keep the full user-authored notice accessible, with modal dismissal and focus restoration.
- **Specification:** [Data Jiminy current knowledge reset](data-jiminy.md#current-knowledge-reset--2026-10-01).
