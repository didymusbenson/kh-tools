# Data Jiminy memory flush and About popup

2026-10-01. User requested a memory flush, explicitly preserving the Coppermind and assistant infrastructure, plus under-construction copy and a compact About control for the full AI notice.

## Changes

- Replaced the only populated game instance, KH1FM, with a fresh empty Chroma database retaining its `thoughts` collection. Repackaged the database archive, browser export and hash/count report: **0 thoughts, 0 source entries**. Other games had no seeded instance to flush.
- Introduced knowledge revision `2026-10-01-flush`. The build gate accepts this intentionally empty release and rejects old or populated exports. Normal content builds restore the empty archive; they do not regenerate memories. Future seeding requires an explicit reviewed knowledge-release change.
- The updated app clears obsolete per-game Coppermind cache entries, including revision-query precache copies. It preserves model weights, normal guide caches, unrelated app caches and player data. Runtime revision checks independently reject stale memory if cache cleanup is unavailable.
- Requests consult the knowledge pack before deterministic guide lookups. Empty or obsolete knowledge returns the under-construction message; it cannot fall through to unchecked guide facts. Models, worker/setup behavior, chat controls and synthetic seeding/grounding tests remain in place.
- The assistant identifies itself as under construction. **About Data Jiminy** opens the complete existing disclaimer and limitations in a separate native dialog. Escape or the close control dismisses About and returns focus; the assistant stays open. The full notice is not expanded inside the chat.

Research records, canonical game data, checklists and inventories are unchanged. Old populated artifacts remain in Git history, not in current build inputs. Devices still running an old installed app receive the flush when they load the updated app; an offline client that has not updated cannot be remotely wiped.

## Validation performed

- All **112 Vitest tests** passed, including new empty-memory, stale-revision and selective-cache-cleanup regressions.
- **7 pack validation tests** and **2 real Chroma seed tests** passed with pinned Chroma 1.5.5.
- Actual retained Chroma collection queried in a separate process: `thoughts`, count **0**. Pack gate independently reports **0** thoughts and entries.
- Production build passed, restoring the empty browser pack. Existing large-chunk warnings remain; the model runtime remains shipped.
- **4 browser checks passed**, across desktop and phone-emulated Chromium: empty-memory response, compact notice and popup dismissal/focus, old-cache removal with guide/model preservation, and offline reopening. Full notice and chat screenshots inspected.
- Heavyweight real-model acceptance remains opt-in and was not rerun (2 skipped project cases); no physical iPhone/Safari acceptance is claimed. Existing engine regressions cover model setup/restore retention without downloading weights.

The obsolete browser scenario requiring a live factual Jiminy citation was removed because the current release intentionally has no factual memories. The new tests check that no factual citation is emitted. This is an implemented repository change; it does not record a production deployment.
