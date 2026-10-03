# Ars Arcanum Design and Implementation Documentation

**Non-CoM player-purpose review — completed 2026-10-03:** all 65 starting residual KH2/BBS/DDD/KH0.2/KH3 families reviewed: 2 resolved, 52 with optional residual precision deferred, 11 useful questions still open. Practical fixes and exact deferral reasons are in the [final report](research/non-com-practical-review-2026-10-02.md). The initial 61/four count is superseded. KH1 and concurrent CoM work are preserved; app/device acceptance remains separate.

**KH1 research — 2026-10-02:** practical needs met; 14 closed, 6 partial evidence families, 0 unresolved. Five partial families are deferred and one dropped; none remain active in the reviewed research scope. [Current decisions and evidence](games/kh1fm/research-integration-2026-10-02.md). This does not certify UI/device release acceptance or authorize reseeding Data Jiminy.

This directory is the planning workspace for rebuilding KH Tools as **Ars Arcanum**, a mobile-first React Progressive Web App presented through faithful, game-specific journals.

## Current phase

The non-CoM player-purpose research pass is integrated on its feature branch. The [final report](./research/non-com-practical-review-2026-10-02.md) accounts for all 156 scoped families and the 65 starting residuals: 2 resolved, 52 with optional precision deferred, and 11 still open. Practical acquisition, progression and achievement instructions were improved before residual precision was deferred. The [workstream register](./research/research-workstreams-2026-10-02.json) preserves all 208 seven-game families and the separate app-development classification. KH1 decisions and the concurrently owned CoM work are unchanged. Earlier [gap-closure](./research/gap-closure-coordination-2026-10-02.md), [October 1 resolution](./research/research-resolution-2026-10-01.md), and [recovery](./research/research-recovery-2026-10-01.md) reports are historical checkpoints; current game ledgers take precedence. Data Jiminy remains empty. No master merge or deployment is implied.

## Journal implementation context

The initial Ars Arcanum UI direction is superseded. The user accepted the faithful-journal mockups and requested a new implementation plan, beginning with KH1FM. Start with the [KH1FM new UI plan](./ui/kh1fm-new-ui-plan.md), its [open questions](./ui/kh1fm-new-ui-plan.md#8-open-questions-for-revision), and the [reference workbook](./ui/references/kh1fm/README.md). The direction is accepted; detailed design proposals remain open for revision. The user subsequently authorized an MVP implementation pass; the [local MVP report](./implementation/kh1fm-faithful-journal-mvp.md) records what is working, provisional choices and remaining checks.

Existing factual content, persistent progress, synthesis/farming behavior, offline infrastructure and Data Jiminy remain the foundation. Earlier implementation reports describe the old interface and provide regression evidence, not the current visual target. See [DEC-020](./07-decision-log.md#dec-020-faithful-game-journals-replace-the-initial-ars-arcanum-ui) for precedence.

The user has now authorized the same treatment for KH2 using its own journal menus. The [KH2FM new UI plan](./ui/kh2fm-new-ui-plan.md) and [working MVP report](./implementation/kh2fm-faithful-journal-mvp.md) carry forward the KH1 interaction lessons and identify remaining reference/design questions.

## MVP scope rule

All user-requested features and specified games are MVP scope unless the user explicitly defers them. “Later” in a planning conversation is not a release deferral. Explicit exceptions include the documented KH1 research deferrals/dropped question and production screenshots/visual assets that still need to be obtained; media-support design and testing remain MVP. Unresolved implementation choices require planning, not automatic deferral. This does not add unrequested features. The user subsequently authorized implementation of KH1FM and the shared application infrastructure.

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
