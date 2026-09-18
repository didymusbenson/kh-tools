# Data Jiminy

## Status and identity

Accepted MVP feature for Ars Arcanum. The natural-language Coppermind query interface is represented by Jiminy Cricket and is specifically named **Data Jiminy**. This is the user-facing identity of the per-game Coppermind assistant. Planning remains the current phase; no application implementation is authorized by this document.

Use the same recognizable identity across game-specific journal themes. Character-art treatment remains to be specified; do not assume reference screenshots are production assets.

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
- One shared answering model can serve separate game knowledge packs. Preserve game, edition, character, and DLC boundaries.
- Show readable download progress and verified offline readiness; do not claim readiness until all required model/runtime/data files are present.
- Keep guide browsing and persistent checklists usable while the assistant is downloading or unavailable.
- Link answers to their supporting guide entries. When the stored guide cannot support an answer, state the gap rather than fabricate game facts.

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
