# KH1 Final Mix — sourced planning reference

Research pass: **2026-09-18**. Product: Ars Arcanum. Scope: modern KH1 Final Mix in HD 1.5 + 2.5 ReMIX; no original-KH/PS2 compatibility work.

These documents fill the system-level research gaps in the [KH1FM specification](../kingdom-hearts-final-mix.md). They contain concrete planning tables and direct citation links alongside the facts. They do not replace the [readiness assessment](../../readiness/kingdom-hearts-final-mix.md) or certify the eventual app dataset complete.

| Document | Contents |
|---|---|
| [Collectibles and progression](collectibles-and-progression.md) | Counting rules; puppy rewards/relocations; Trinity unlocks; all postcards; Torn Pages/Pooh targets; 13 Reports; magic; summons; movement; level landmarks; secret endings |
| [Synthesis recipes](synthesis-recipes.md) | All 33 FM recipes, unlock sets, independently summed direct material totals and dependency calculation rules |
| [Farming and equipment](synthesis-farming-and-equipment.md) | Material sources/rates, ten special encounters, mushroom challenges, modifiers/resets, 48 party weapons and acquisition methods |
| [Challenges, Gummi and run goals](challenges-gummi-and-run-goals.md) | Cup variants/rewards, optional bosses, minigames, all 30 Gummi objectives, 48-blueprint roster, modern achievement distinctions |
| [World and coverage audit](world-and-coverage-audit.md) | Inspected sources for 13 worlds, missability examples, D01–D19 mapping, remaining extraction and specific unresolved facts |

## What changed

The planning baseline now distinguishes Journal completion, exhaustive collection, synthesis, equipment, optional challenges, Gummi content, secret unlocks and platform achievements. An achievement threshold is not a full-category denominator. The recipe reference calculates direct totals from individual ingredient rows, rather than trusting a legacy aggregate table.

Final Mix corrections are documented where they matter: changed treasure/puppy locations, recoverable Halloween Town red Trinity, cup rewards, level-choice landmarks, modern difficulty stacking and Gummi blueprint thresholds. Game-specific facts link to their sources; app recommendations are labeled as such.

## How to use this during implementation

1. Reconcile each sourced table with the legacy workbook and repository data.
2. Expand grouped rows into stable records with dependencies and goal memberships.
3. Finish the full treasure, Journal-entry, accessory, enemy/spawn and level-data inventories identified in the audit.
4. Resolve the small set of explicit source/behavior uncertainties before exposing those fields as verified answers.
5. Validate the normalized data and practical directions in the agreed modern game release.

The Energy Bangle recipe has a visible source conflict: the current recipe/totals use two Spirit Shards provisionally. Source presence, transcription, normalization and hands-on verification remain separate statuses.

All documented systems, persistent checklists, offline content and Data Jiminy remain MVP. Only production screenshot/map image assets are deferred; text directions, media support and media tests remain required.
