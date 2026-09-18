"""Preserve a completed game seed and its browser export for source control."""
import argparse
import gzip
import hashlib
import io
import json
from pathlib import Path
import re
import tarfile

ROOT = Path(__file__).resolve().parents[2]


def package(game):
    if not re.fullmatch(r'[a-z0-9-]+', game):
        raise ValueError('Unsafe game ID')
    database = ROOT / '.copperminds' / game
    export = ROOT / 'public/data' / f'{game}-coppermind.json'
    report = json.loads((database / 'seed-report.json').read_text())
    export_bytes = export.read_bytes()
    if hashlib.sha256(export_bytes).hexdigest() != report['exportSha256']:
        raise ValueError('Browser export does not match the completed seed')
    output = ROOT / 'artifacts/copperminds'
    output.mkdir(parents=True, exist_ok=True)
    browser_archive = output / f'{game}-browser.json.gz'
    browser_archive.write_bytes(gzip.compress(export_bytes, compresslevel=9, mtime=0))
    # The seed process must have exited before packaging its database files.
    archive = output / f'{game}.tar.gz'
    with archive.open('wb') as raw:
        with gzip.GzipFile(filename='', mode='wb', fileobj=raw, mtime=0) as gz:
            with tarfile.open(fileobj=gz, mode='w') as tar:
                for path in sorted(database.rglob('*')):
                    if not path.is_file():
                        continue
                    info = tar.gettarinfo(str(path), arcname=str(path.relative_to(database.parent)))
                    info.uid = info.gid = info.mtime = 0
                    info.uname = info.gname = ''
                    if path.name == 'seed-report.json':
                        portable = {**report, 'databasePath': f'.copperminds/{game}'}
                        content = (json.dumps(portable, indent=2) + '\n').encode()
                        info.size = len(content)
                        tar.addfile(info, io.BytesIO(content))
                    else:
                        with path.open('rb') as stream:
                            tar.addfile(info, stream)
    report.update(databasePath=f'.copperminds/{game}',
                  archiveSha256=hashlib.sha256(archive.read_bytes()).hexdigest(),
                  browserArchiveSha256=hashlib.sha256(browser_archive.read_bytes()).hexdigest())
    (output / f'{game}-seed-report.json').write_text(json.dumps(report, indent=2) + '\n')
    print(f'Packaged {game}: {report["thoughtCount"]} thoughts')


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--game', default='kh1fm')
    package(parser.parse_args().game)
