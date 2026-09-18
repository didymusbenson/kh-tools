# Seeded game Copperminds

`kh1fm.tar.gz` preserves the actual dedicated KH1FM ChromaDB instance seeded after application wiring and canonical content validation. Restore from the repository root with `mkdir -p .copperminds && tar -xzf artifacts/copperminds/kh1fm.tar.gz -C .copperminds`. Use the pinned Chroma version in `tools/coppermind/requirements.txt`. The database contains authored game knowledge only, no player or conversation data.

The corresponding offline browser export is `public/data/kh1fm-coppermind.json`. Run `npm run coppermind:check` to check it against the current guide. A future game must have its own directory and archive, not another collection inside this database. Re-seed after content changes and update both archive and report; never archive a database while a writer is active.

`kh1fm-browser.json.gz` is the compressed, committed browser export. `npm run content:build` restores it byte-for-byte into the public directory, and the production build rejects mismatches against canonical data. After a fresh seed, run `npm run coppermind:package` to refresh the browser archive, stopped Chroma database archive, and portable hash report.
