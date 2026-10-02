# Ars Arcanum Design and Implementation Documentation

This directory is the planning workspace for rebuilding KH Tools as **Ars Arcanum**, a mobile-first React Progressive Web App presented through faithful, game-specific journals.

## Current phase

The seven-game research pass is integrated: every game had a medium-reasoning agent and its own branch, with reviewed merges to master. The [gap-closure coordination log](./research/gap-closure-coordination-2026-10-02.md) records the changes, validation and exact remaining scope: 106 closed, 73 partial, 15 unresolved/conflicted and 14 other limitations. The [October 1 resolution report](./research/research-resolution-2026-10-01.md) records the prior audit follow-through, and the [recovery/continuation log](./research/research-recovery-2026-10-01.md) preserves its remaining questions, updated documentation and git checkpoints. Game ledgers take precedence over old planning tables for current data gaps. Data Jiminy remains flushed while research continues. The [game-research/app-development split](./research/gap-closure-coordination-2026-10-02.md#game-factual-research-versus-app-development) classifies all 208 families: 189 game facts/evidence/scope and 19 app development/integration; it keeps their completion states separate.

## Journal implementation context

The initial Ars Arcanum UI direction is superseded. The user accepted the faithful-journal mockups and requested a new implementation plan, beginning with KH1FM. Start with the [KH1FM new UI plan](./ui/kh1fm-new-ui-plan.md), its [open questions](./ui/kh1fm-new-ui-plan.md#8-open-questions-for-revision), and the [reference workbook](./ui/references/kh1fm/README.md). The direction is accepted; detailed design proposals remain open for revision. The user subsequently authorized an MVP implementation pass; the [local MVP report](./implementation/kh1fm-faithful-journal-mvp.md) records what is working, provisional choices and remaining checks.

Existing factual content, persistent progress, synthesis/farming behavior, offline infrastructure and Data Jiminy remain the foundation. Earlier implementation reports describe the old interface and provide regression evidence, not the current visual target. See [DEC-020](./07-decision-log.md#dec-020-faithful-game-journals-replace-the-initial-ars-arcanum-ui) for precedence.

The user has now authorized the same treatment for KH2 using its own journal menus. The [KH2FM new UI plan](./ui/kh2fm-new-ui-plan.md) and [working MVP report](./implementation/kh2fm-faithful-journal-mvp.md) carry forward the KH1 interaction lessons and identify remaining reference/design questions.

## MVP scope rule

All user-requested features and specified games are MVP scope unless the user explicitly defers them. “Later” in a planning conversation is not a release deferral. The only current explicit exception is production screenshots/visual assets that still need to be obtained; media-support design and testing remain MVP. Unresolved implementation choices require planning, not automatic deferral. This does not add unrequested features. The user subsequently authorized implementation of KH1FM and the shared application infrastructure.

## Implementation reports

- [Data Jiminy memory flush and About popup](./implementation/jiminy-memory-flush-2026-10-01.md) — empty knowledge release, retained infrastructure and validation
- [Re:Chain of Memories HD journal](./implementation/recom-hd-journal.md) — working Sora/Riku interfaces, sourced catalogue, persistence, offline validation and remaining boundaries

- [BBS review and approval checklist](./implementation/bbsfm-review-checklist.md) — personal review queue, working preview links, approval notes and research follow-ups
- [Verification and remaining acceptance boundaries](./implementation/verification.md)
- [Collection reconciliation](./implementation/collectibles.md)
- [Reference data and conflicts](./implementation/reference-data.md)
- [Corrective UI/UX review](./implementation/ui-ux-review.md)
- [Reusable lessons for other games](./implementation/lessons-for-other-games.md)
- [GitHub Pages deployment](./implementation/github-pages.md)

## How to contribute information

Put unstructured notes, links, examples, feature ideas, and source material into [00-planning-inbox.md](./00-planning-inbox.md). Information can be reorganized into the focused documents as decisions become clearer. Preserve the original intent when consolidating notes, and record consequential choices in the decision log.

## Core planning documents

1. [Planning inbox](./00-planning-inbox.md) — raw information and unresolved input
2. [Product vision and scope](./01-product-vision-and-scope.md) — audience, goals, boundaries, and success criteria
3. [Content inventory](./02-content-inventory.md) — existing and proposed guides, tools, and data sources
4. [Information architecture](./03-information-architecture.md) — navigation, taxonomy, search, and content relationships
5. [Mobile UX and accessibility](./04-mobile-ux-and-accessibility.md) — responsive behavior and interaction requirements
6. [Technical architecture](./05-technical-architecture.md) — proposed React application structure and engineering constraints
7. [Offline PWA strategy](./06-offline-pwa-strategy.md) — installation, caching, updates, and offline guarantees
8. [Decision log](./07-decision-log.md) — durable architectural and product decisions
9. [Roadmap and backlog](./08-roadmap-and-backlog.md) — phased delivery plan and outstanding work

## Readiness

[October 1 research audit](./research/research-audit-2026-10-01.md) indexes all seven per-game `research_audit.md` reports, including open questions, affected records and resolved historical caveats.

[Per-game readiness workbooks](./readiness/README.md) track what we have, what is missing, user questions, and release gates. Start with the [KH1FM assessment](./readiness/kingdom-hearts-final-mix.md).

## Detailed specifications

- [Sources & Research home modal](./content/sources-and-research-modal.md) — centralized attribution, research-method explanation and dismissible home-page reading experience; requirements draft
- [Re:Chain of Memories research pack](./games/recom/README.md) — 2026-09-28 factfinding, both campaigns, structured inventories, sources and remaining gaps
- [Re:Chain of Memories coverage audit](./research/recom-2026-09-28-coverage-and-gap-research.md)
- [Re:Chain of Memories HD menu design research](./ui/recom-menu-design-research.md) — distinct Journal, D-Report and system-menu compositions
- [Re:Chain of Memories HD reference workbook](./ui/references/recom/README.md) — 24 inspected references and capture provenance
- [Data Jiminy: offline AI assistant and disclaimer](./data-jiminy.md)
- [First-class synthesis and optional inventory](./content/synthesis-and-inventory.md)
- [App testing and content validation](./testing-and-content-validation.md)

- [KH1FM new UI plan — active draft](./ui/kh1fm-new-ui-plan.md)
- [KH1FM reference images and gaps](./ui/references/kh1fm/README.md)
- [KH2FM new UI plan and open questions](./ui/kh2fm-new-ui-plan.md)
- [KH2FM video reference and visual gaps](./ui/references/kh2fm/README.md)
- [Initial Jiminy's Journal design direction — superseded historical record](./ui/jiminys-journal-design-direction.md)
- [Per-game specifications](./games/README.md)
- [Collectible compendium and linked collection views](./content/collectible-compendium-and-linked-views.md)
- [Parallel game research assignments](./research/parallel-game-research.md)
- [Screenshot, map, and visual location support](./content/screenshot-and-map-support.md)
- [KHTABLES Drive source audit](./sources/khtables-drive-audit.md)

## Working principles

- Mobile-first, but fully usable on larger screens.
- Core reference material should remain usable offline after initial installation.
- Content should be structured data where practical, rather than embedded in presentation markup.
- Search and quick answers are first-class experiences.
- Global game-selection design is an open clarification; the current work starts inside KH1FM.
- Game interiors faithfully recreate their journal compositions; app-only tools extend that visual language.
- Each game retains its own journal composition and completion model; shared behavior does not require one shared layout.
- Shared UI and data primitives should not erase game-specific terminology or workflows.
- Existing useful content should be inventoried before it is migrated or replaced.
- Legacy data is discovery evidence until it has been verified and its reuse rights established.
- Proposals are not decisions until they appear in the decision log.

## Player progress

[Persistent checklists and player progress](./content/persistent-checklists-and-progress.md) is a shared MVP requirement for every game. Checkmarks must survive visits and offline use. Compact world indexes and expanded location rows share the same saved item records. World progress measures collectibles; narrative Journal flags are not collection requirements.
