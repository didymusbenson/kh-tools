# Sources & Research — home modal requirements

Date: 2026-10-01. Status: requirements draft; home-page modal and centralized attribution are accepted user direction. This document does not implement the feature or establish final visual approval.

## Purpose

Explain where Ars Arcanum's information comes from, credit the people and resources behind it, and describe how the research becomes guide data. The user wants the community origins to be transparent while keeping repeated attribution panels out of individual journal pages.

The entry point is the global game-selection home page. The experience is a popup modal that the reader can open, read and dismiss.

## Entry point and presentation

- Provide a visible text control labeled **Sources & Research** on the home page. Place it with secondary home controls, visually subordinate to the game choices but easy to find. Exact placement and styling remain draft design choices.
- Open on deliberate activation only. Do not show it automatically, require acknowledgment, or block entering a game.
- Use one app-wide modal covering all supported games. The reader does not need to choose a game first.
- Match the home screen's visual language and provide a quiet, high-contrast reading surface with comfortable line lengths.
- Allow the body to scroll vertically within the available viewport. On a phone, the modal may occupy most of the screen; keep the title and close control visible. Do not force attribution into journal-style pagination or horizontal scrolling.
- Keep the content concise enough to scan, with clear headings and credits grouped by game or source where that improves navigation. A source used by several games may appear once with its scope listed.

## Required content

### 1. Where the information comes from

Explain that the guide draws on community-created reference material, walkthroughs and guides, relevant official material, and the project's original research tables. Credit the original contributors rather than presenting their findings as original discoveries by Ars Arcanum.

Name only sources actually used. Distinguish source material from research leads that were found but not inspected. Describe original project work accurately: collecting, comparing, organizing and presenting information is different from originating every underlying fact.

### 2. How the research was done

Give a short, plain-language account of the process actually documented in the repository:

1. Gather existing tables and inspect sources for the applicable game and edition.
2. Compare evidence where available, preserving differences between original releases, modern editions, campaigns and DLC.
3. Record conflicts and unresolved questions; reconcile them when supporting evidence is available.
4. Normalize findings into structured records and check identities, relationships, counts and calculations used by the app.
5. Retain source references and research notes so later corrections can be traced.

Disclose the use of AI assistance for research organization, comparison and data preparation. Describe source material as evidence for game facts; model output alone is not a source. Do not imply that every record received multiple independent checks or human/gameplay verification when the documentation does not establish that.

### 3. What the research establishes

Explain briefly that source-backed information is not the same as personally reproducing every event in-game, and that application tests check app behavior rather than proving all guide facts. Research coverage varies and is being improved.

Use a concise explanation, not a dump of the research backlog. Do not publish blanket claims of complete verification, official endorsement, exhaustive coverage or guaranteed accuracy. Keep internal audit IDs and developer task lists in the research documentation.

### 4. Credits and source links

- Give meaningful credit to each used source or contributor whose material is represented in the published guide. Use the credited author/community name and source title where known, with a useful public link and a short description of the contribution.
- Cover every supported game: KH1FM, Re:CoM HD, KH2FM, BBSFM, DDD HD, KH0.2 and KH3/Re Mind. Shared sources can identify several games rather than repeat identical credits.
- Preserve source-specific attribution wording and reuse notices already documented with the material. Existing dedicated attribution resources, including `public/kh2-content-sources.html`, must remain reachable; the modal may summarize and link to them.
- Keep individual page/guide links where they identify an author's contribution. A general website homepage alone must not replace a meaningful existing reference.
- Public credits must not expose private Drive/workbook IDs, private document links, internal paths, snapshot hashes or tool logs. Describe private project inputs without publishing their access details.

## Provenance and maintenance

Detailed provenance stays in the underlying research documents and structured records even when it is absent from journal UI. This modal centralizes user-facing explanation and credits; it does not replace the research trail.

Use the existing source manifests, source tables, per-record references and conflict-resolution notes to prepare the published credits. The ongoing per-game `research_audit.md` work identifies weak or missing provenance; a source list alone does not close those gaps.

The reader-facing content must be curated from those records rather than display raw manifests. Resolve stale research descriptions against later work before publishing claims about the process. Update the credits when adding or materially changing sourced content, and retain historical resolution evidence in the research files.

Useful starting records include:

- [KH1 reference-data report](../implementation/reference-data.md)
- [KH2 source and legacy audit](../games/kh2fm/sources-and-legacy-audit.md)
- [Re:CoM source manifest](../games/recom/source-manifest.json) and [conflict resolutions](../games/recom/source-conflicts.json)
- [BBS source manifest](../games/bbsfm/source-manifest.json)
- [DDD sources](../games/dddhd/sources.md)
- [KH0.2 sources and gaps](../games/kh02/sources-and-gaps.md)
- [KH3 sources and conflicts](../games/kh3/sources-and-conflicts.md)

## Dismissal, accessibility and state

- Provide a clearly labeled **Close** control and support Escape. Backdrop dismissal may be included, but must not be the only dismissal method.
- Expose an accessible dialog name from the title. Place focus at the beginning of the reading experience when opened; keep keyboard focus within the modal while open and return it to the trigger on dismissal.
- Make the background unavailable for interaction while the modal is open and prevent background scrolling. Restore the home's previous selection and scroll position when dismissed.
- Support keyboard, touch and screen readers, visible focus, text zoom, narrow screens and reduced motion. The close control must remain reachable at all supported sizes.
- Opening, reading and closing must not alter game selection, saved journal progress, inventory, resume state or assistant context. There is no saved acknowledgment or “read” requirement.
- Open external source links in a separate browsing context with an accessible indication, preserving the open modal and the reader's place in the app.

## Offline behavior

Bundle the explanation and credits with the app so the modal opens and remains readable offline after installation. Opening it must not fetch remote source pages or require Data Jiminy/model setup. Public source links may require internet; their destinations are not promised as offline content. New credit revisions follow the existing app-update lifecycle.

## Acceptance criteria

- From home, a reader can locate Sources & Research, open it, read all content and dismiss it without entering a game or acknowledging a notice.
- The explanation accurately describes community contributions, project research and AI assistance, edition handling, source retention and the limits of validation.
- Published credits cover the sources actually represented in all seven guides and preserve existing detailed attribution resources.
- No private research access details or raw developer backlog appear in the modal.
- Desktop Chrome and the project's iPhone 17 target can read the content without clipped controls or horizontal overflow; keyboard focus, Escape and focus restoration work as specified.
- After offline installation, the explanation and credits remain readable; external-link availability does not block the modal.
- Reopening and dismissing preserve the home state and saved player data. Individual journal pages do not acquire repeated citation panels as part of this feature.

See [testing and content validation](../testing-and-content-validation.md) for the existing distinction between research evidence and app/device acceptance. Final copy, exact credit inventory and visual layout are implementation work against this draft.
