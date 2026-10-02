# KH1FM remaining-gap investigation — 2026-10-02

Scope: vanilla modern Steam KH1 Final Mix, app 2552430. Starting ledger: 10 closed, 6 partial, 4 unresolved. Reopened IDs: KH1-001, 002, 003, 004, 005, 010, 014, 015, 018, 020. Progress IDs remain stable; Data Jiminy stays empty.

This checkpoint records scope before research. The investigation will prioritize implementation documentation, original tables, localized footage and reproducible evidence over repeating guide consensus. Modified randomizer files cannot prove vanilla behavior. New results and precise residuals will be added below; no finding is closed at this checkpoint.

## Checkpoints

- Initial scope published on `research/finish-kh1fm-gaps-2026-10-01`; validation not yet run. Coordinator owns integration into master.

## KH1-004 — closed, direct visual source

The [Steam support post](https://steamcommunity.com/app/2552430/discussions/0/601893430931532381/) by Squid (13 January 2025) explicitly describes the author's swing problem and links their own [Squid Gaming footage](https://www.youtube.com/watch?v=MbRKk8JlsVw). Inspected the playing video through the browser, then paused/searched frames. At **0:03** the upper-left HUD reads **0 m**; at **0:38** it reads **7 m**. These are direct visible unit observations, not an inference from guide terminology. Canonical Cheer target is now **40 m**; the numeric threshold remains unchanged.

Platform provenance is the uploader's contemporaneous post in app 2552430's Steam discussion, bearing ownership of that app and explicitly linking their footage. The video itself does not expose a Steam executable build or depot identifier; neither posting date nor controller glyphs are used to infer a build. This closes the source-backed display-unit question at the same documentary standard as other current facts, not executable certification. The earlier yards prose loses to the observed HUD. No full video is redistributed.
