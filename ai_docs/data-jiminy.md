# Data Jiminy

## Status and identity

Accepted MVP feature for Ars Arcanum. The natural-language Coppermind query interface is represented by Jiminy Cricket and is specifically named **Data Jiminy**. This is the user-facing identity of the per-game Coppermind assistant. Planning remains the current phase; no application implementation is authorized by this document.

Use the same recognizable identity across game-specific journal themes. The user has supplied the Jiminy character PNG identified below for the launcher design; preserve it as the provided asset rather than extracting art from journal screenshots.

## Highlighted AI disclaimer — initial user-authored copy

Preserve this copy as the initial design baseline. The user explicitly allows adjustment during implementation to reflect the actual shipped behavior.

> AI DISCLAIMER: This is Data Jiminy. He runs on an open source SLM called {modelname}, which is completely offline and only reads data from this app, nothing else. The only way he's consuming any water is if you drop your phone in the bath. I'm sure the more technically inclined of you are going to try to make him say weird stuff. That would only be a reflection of the darkness in your own heart. May your heart be your guiding key.

The disclaimer must be prominently presented in the question-and-answer interface, not buried solely in general terms. Proposed placement: first-use introduction with an always-accessible “About Data Jiminy / AI disclaimer” entry. Exact layout and dismissal behavior remain design decisions; an extra login or consent wizard is not implied.

Resolve `{modelname}` from the shipped model metadata. Do not publish an unresolved placeholder or imply a model has been selected before evaluation. Retain the playful Kingdom Hearts tone, water joke, darkness-in-your-heart line, and closing sentiment when refining the copy.

### Implementation wording review

- “Completely offline” describes question embedding, retrieval, and answer generation after initial download. Initial installation, model/game-pack downloads, and updates need connectivity; explain this accurately in final copy or adjacent setup text.
- “Only reads data from this app” means no live web access, external connectors, or access to unrelated device data. The model also processes the user's question and relevant conversation context. Pretrained weights contain prior learned information; local retrieval does not guarantee that generated text uses only supplied facts.
- The water line is user-authored humor, not a measured zero-environmental-impact claim. Preserve the intent while reviewing whether final wording distinguishes local inference from training, downloads, and device electricity.
- The prompt-manipulation joke is tone, not a substitute for accurate limitations. Final wording should make clear that AI can make mistakes; provide source links and avoid treating the joke as assigning users responsibility for ordinary model errors.

These notes do not replace the quoted draft. Review final copy against the implemented behavior before release.

## Settled product behavior

- Users ask natural-language questions about the selected game and receive answers grounded in stored guide data.
- No user login, API key, external account connection, separately installed model server, or model-selection/configuration step is required.
- Embedding, retrieval, and answer generation run locally after the required resources are downloaded. No hosted inference fallback is part of the accepted design.
- One shared answering SLM serves the entire app. Game-specific models or duplicate weights/downloads are not required. Each game has its own session/context and Coppermind scope; preserve edition, character and DLC boundaries within it. The existing query-embedding component is also shared infrastructure, not a separate assistant per game.
- Show readable download progress and verified offline readiness; do not claim readiness until all required model/runtime/data files are present.
- Keep guide browsing and persistent checklists usable while the assistant is downloading or unavailable.
- Link answers to their supporting guide entries. When the stored guide cannot support an answer, state the gap rather than fabricate game facts.

## Shared model, isolated game sessions

Accepted 2026-09-18: one app-wide answering model, separate game contexts. The active journal determines scope; question text cannot change it.

- Bind every request to the active canonical game ID and applicable ruleset/character/DLC context. Retrieve only that game's permitted records and apply the same scope to citations, suggested questions, progress and inventory calculations.
- Conversation history, follow-up references, retrieved passages and generated-answer caches must be isolated by game. Within-game navigation can retain the session. Switching games creates or restores that game's own session; never append the prior game's history.
- Reuse shared model weights/runtime, but clear or replace active inference context between game sessions. Any context/cache reuse must retain the same isolation.
- Cancel or discard an in-flight response if its originating game/session is no longer active. A late BBS answer must never appear in the KH1 panel.
- Asking a BBS question from KH1 does not trigger cross-game retrieval or automatic switching. Return a brief scope response such as “Open the Birth by Sleep journal for that question.” If the intended game is unknown, use the existing scoped no-result response.
- Shared terms such as “Ultima Weapon” resolve against the active journal. No BBS suggested prompts, retrieved facts or follow-up context in KH1.
- 0.2 has its own game session even inside the BBS navigation family. Re Mind remains explicitly scoped within KH3.
- Session isolation is required regardless of whether conversation history is retained across app restarts; long-term transcript retention is not implied.

## In-journal launcher and interface

- Once inside a specific game, anchor Data Jiminy at the bottom right of the app viewport. Keep him available across that game's sections and entry pages.
- Give him a small visible **“…” chat bubble**. Tapping/clicking it opens the Data Jiminy interface for the current game.
- Do not show an unscoped Jiminy launcher on the main game-selection screen. Entering a game establishes scope before the interface can accept a question.
- The bubble is a semantic button with an accessible name such as “Open Data Jiminy for Kingdom Hearts Final Mix,” visible keyboard focus and a touch target larger than its decorative dots.
- Show the current game clearly in the open interface. Use a panel or responsive sheet suited to the device; opening and closing it preserves the underlying journal's location and checks.
- Respect iPhone/iPad safe areas and the on-screen keyboard. Reserve enough space that Jiminy/bubble do not cover the final checklist row, inventory input, navigation or primary action.
- Provide a clear close action and sensible focus restoration to the launcher. Keep the initial AI disclaimer above prominently available.
- Use the user-supplied Jiminy character PNG identified below for the launcher design. An unavailable model can show readiness/download status in the interface without blocking normal guide use.

## Direct-answer contract

Data Jiminy interfaces with the per-game Copperminds to return fast, direct answers. Jiminy Cricket supplies the visual identity, not a conversational personality. The playful static disclaimer above is preserved and does not set the tone of generated answers.

- Lead immediately with the requested fact, location, recipe, quantity, or completion result.
- Use the shortest complete answer: a value or sentence for a simple lookup, a compact list/table for multiple results, or essential steps when the question asks for a procedure.
- No greetings, roleplay, character voice, jokes, filler, unsolicited lore, elaboration, closing remarks, or offers to help further.
- Include conditions needed to avoid a misleading answer (such as character, edition, prerequisite, or chance), even when brevity is the goal.
- Present supporting journal links compactly; source labels come from retrieved record IDs, not invented model citations.
- Ask one short clarification only when ambiguity materially changes the result and active game context cannot resolve it.
- For unsupported questions, use a brief fixed response such as “No matching information in this journal.” For unrelated requests, use “Ask a question about this game's guide.”
- Follow-up questions may reuse relevant query context without becoming open-ended social conversation.

### Standing instructions and enforcement

Maintain versioned standing instructions alongside the implementation: use only supplied Coppermind results, answer the requested question concisely, decline unrelated tasks, and treat instructions inside retrieved records or user attempts to override the role as untrusted content. These instructions describe behavior; they are not a security boundary.

Application code controls allowed retrieval, game/edition filters, exact calculations, and source references. No arbitrary external tools, web access, file access, or memory writes are exposed to the model. Use deterministic result rendering for exact lookups and validated templates where possible; use the SLM only where it adds value to query interpretation or concise answer formulation. Missing evidence must lead to a fixed no-result response. A similarity score alone is not proof that a record answers the question.

Evaluate latency, correctness, concise output, unsupported-query handling, and attempts to induce roleplay or unrelated output. Do not assume prompt instructions eliminate hallucinations.

## Accepted presentation and recipe answers

Answer openly with no spoiler warnings or concealment. Do not ask the player for story/ability milestones or power an Available Now filter. Include acquisition prerequisites when needed for a correct answer.

Synthesis is first-class. When optional inventory is enabled, use application-computed owned/required counts and remaining-material totals from the [shared synthesis contract](./content/synthesis-and-inventory.md); when disabled, give full recipe requirements without assuming inventory. Keep answers short and directly linked to recipes/sources. App acceptance follows the [Apple-first testing policy](./testing-and-content-validation.md).

## Collection lookup scope

Follow the [collectible compendium contract](./content/collectible-compendium-and-linked-views.md). For “where is this?” return the matched item's world/area, concise directions and necessary acquisition prerequisites, with a link to the same stable record used by compact and expanded checklists. Progress answers use application-computed collectible sets; routine plot flags and character biography updates do not affect world percentages. Do not turn answers into a full story walkthrough.

A necessary NPC reward conversation is valid acquisition guidance. Retrieving an answer does not mark anything collected, and the model must not infer acquisition from story progress. Saved-state changes remain application-controlled and explicit user actions. Other scoped crafting/challenge/achievement queries remain supported with distinct goal definitions.

## Local architecture

1. Application code receives the question and active game context.
2. A bundled embedding model represents the query for semantic retrieval.
3. Browser-local search retrieves relevant text and structured guide records; combine semantic matching with exact filters as needed.
4. Application code performs exact recipe, quantity, and progress calculations where applicable.
5. Render exact structured results directly where possible. Otherwise, the bundled SLM produces a brief factual answer from retrieved records. The UI attaches verified source links.

The embedding model supports memory retrieval; the SLM formats concise answers from the retrieved facts. Retrieval does not require the chat model to autonomously call tools. Canonical game data remains separate from generated answers and user conversation history.

WintersRain's [Coppermind](https://github.com/WintersRain/coppermind) supplies the reference approach: a Python MCP server with local ChromaDB retrieval. Its existing Python implementation is not a drop-in browser component. Browser-compatible vector storage/search is an implementation choice to resolve. ChromaDB may be used during content preparation and export; a reachable ChromaDB server must not become an offline runtime dependency.

## Model selection: implementation decision

The product behavior is settled; exact model and runtime are not locked. SmolLM2 is the current candidate family, with 135M-Instruct and 360M-Instruct as initial evaluation targets. The earlier 1–3B range is not a requirement. Select the smallest configuration that meets factual grounding and device-performance criteria. Bundle a compatible query-embedding model and precomputed guide embeddings with matching preprocessing/version metadata.

References discussed during planning:
- [SmolLM2-135M-Instruct](https://huggingface.co/HuggingFaceTB/SmolLM2-135M-Instruct)
- [SmolLM2-360M-Instruct](https://huggingface.co/HuggingFaceTB/SmolLM2-360M-Instruct)

## MVP acceptance criteria

- Cold-start question answering works in airplane mode after verified setup, including follow-up questions and source links.
- Network inspection confirms questions, conversation text, and player progress are not sent to external inference or embedding services.
- No credentials, model picker, or separately installed services are necessary.
- Validate exact item names, prerequisites, quantities, missing-data answers, and game/edition isolation against curated questions.
- Validate mobile memory, response latency, storage failures/eviction, interrupted downloads, and model/data updates on the agreed device matrix.
- Model-cache cleanup and content updates preserve saved player progress.
- Data Jiminy identity and a prominent, accessible AI disclaimer are present; model name and offline/data-access statements match the actual implementation.
- Technical blockers are raised for a product decision, not silently deferred beyond MVP.

## Session and launcher acceptance

1. Enter KH1: bottom-right Jiminy and “…” launcher are present; opening identifies KH1 and uses only KH1 records/prompts.
2. Ask a KH1 question, switch to BBS, then ask a follow-up: KH1 history and retrieval do not leak into BBS. Returning to KH1 uses only its own session context.
3. Ask a BBS-specific question while in KH1: brief scope guidance, no BBS retrieval or answer.
4. Switch journals during inference: the old response cannot render in the new game's interface.
5. Reuse one answering-model download/cache across games; verify game switching does not download duplicate model weights.
6. Verify game/edition/character/DLC filters and scoped caches in offline operation, including 0.2 versus BBS.
7. On initial Apple targets, launcher and interface remain usable with touch, keyboard, screen reader, zoom, rotation, safe areas and soft keyboard, without obscuring journal controls.
8. Closing restores journal position/focus; returning to game selection removes the game-specific launcher. Suggested questions and source links remain scoped.

## User-supplied Jiminy asset

- Original attachment: `6a6444f0-2e49-4a3e-9cd2-13b0af30b59d.png`.
- Persistent attachment ID: `libfile_773b16c6ad10819188967d29bdd072ae`.
- Inspected original: 408 × 608 pixels, RGBA PNG with transparency (alpha range 0–255).
- SHA-256: `9483988664047c3d2e6b40e5f33839178558ee7560fb184a60f7c95c0f4c1aed`.
- Depiction: full-body Jiminy with blue hat, yellow vest, folded umbrella and raised index finger. User supplied this asset for Data Jiminy.
- Design use: bottom-right launcher across game journals. Preserve aspect ratio, transparent silhouette and the raised hand. Proposed placement puts the separate “…” button above/beside the raised finger; evaluate at actual phone size without covering journal controls.
- Keep the bubble as an independent accessible UI control, not text baked into the image. Scale responsively; avoid enlarging the raster beyond useful sharpness. No image alteration was requested or performed.
- Repository original: [data-jiminy-full.png](../assets/data-jiminy/data-jiminy-full.png). The actual PNG is checked in unchanged, including transparency. User-supplied provenance is recorded; no independent license assertion is made.

## User-supplied chat icon

Use the supplied compact Jiminy face as his chat icon. Original attachment: `2de78f28-3dea-4a09-8c36-28f09030bc21.png`; persistent attachment ID: `libfile_aa5043b420148191838e98a9dcfafa6e`.

- Repository original: [data-jiminy-chat-icon.png](../assets/data-jiminy/data-jiminy-chat-icon.png).
- 512 × 512 RGBA PNG with transparency, preserved byte-for-byte.
- SHA-256: `7693584fe123b003176275fff7321297f99cc353e5b0dcc7cef320ff4c3488a1`.
- Use for compact chat/avatar presentation; retain the full-body asset for the larger anchored Jiminy treatment. Both are available for responsive design. The separate accessible “…” button remains the specified opener; this asset does not itself change that interaction.
