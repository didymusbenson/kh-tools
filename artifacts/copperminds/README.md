# Seeded game Copperminds

## Current release: empty memories, 2026-10-01

The user requested a memory flush while game facts are audited. The KH1FM artifacts now contain **zero thoughts and zero entries**, with `knowledgeRevision: 2026-10-01-flush` and `knowledgeState: empty`. The dedicated Chroma instance and its `thoughts` collection still exist. This is the only previously populated instance. Old populated copies remain historical Git revisions, not current release inputs.

`npm run content:build` restores the empty export; it does not reseed from guide data. The build gate rejects populated or stale exports during this empty release. Models and research remain intact. After source corrections and review, update `src/jiminy/knowledge-release.json` and reseed/package/validate. The updated browser rejects older knowledge revisions and clears old cached packs.

To reproduce the flush, run `.venv-coppermind/bin/python tools/coppermind/flush.py --game kh1fm`, let it exit, then `.venv-coppermind/bin/python tools/coppermind/package.py --game kh1fm`. A fresh empty database removes old SQLite/vector files rather than leaving deleted records behind. Verify `npm run coppermind:check` and the Chroma collection count. Restore an archive into a clean destination; do not overlay a populated directory.

## Artifact format and historical seeding procedure

`kh1fm.tar.gz` preserves the actual dedicated KH1FM ChromaDB instance seeded after application wiring and canonical content validation. Restore from the repository root with `mkdir -p .copperminds && tar -xzf artifacts/copperminds/kh1fm.tar.gz -C .copperminds`. Use the pinned Chroma version in `tools/coppermind/requirements.txt`. The database contains authored game knowledge only, no player or conversation data.

The corresponding offline browser export is `public/data/kh1fm-coppermind.json`. Run `npm run coppermind:check` to check it against the current guide. A future game must have its own directory and archive, not another collection inside this database. Re-seed after content changes and update both archive and report; never archive a database while a writer is active.

`kh1fm-browser.json.gz` is the compressed, committed browser export. `npm run content:build` restores it byte-for-byte into the public directory, and the production build rejects mismatches against canonical data. After a fresh seed, run `npm run coppermind:package` to refresh the browser archive, stopped Chroma database archive, and portable hash report.
