"""Verify a committed browser pack against canonical content without model downloads."""
from __future__ import annotations

import argparse
import json
import math
from pathlib import Path
import sys

from seed import MODEL, ROOT, digest, thoughts


EXPECTED_EMBEDDING = {
    'model': MODEL,
    'dtype': 'fp32',
    'dimensions': 384,
    'pooling': 'mean',
    'normalize': True,
    'revision': '751bff37182d3f1213fa05d7196b954e230abad9',
}


def validate_pack(data, pack):
    if not isinstance(pack, dict) or type(pack.get('schemaVersion')) is not int or pack['schemaVersion'] != 1:
        raise ValueError('Unsupported Coppermind pack schema; expected version 1.')
    if pack.get('game') != data.get('game'):
        raise ValueError('The Coppermind pack belongs to a different game.')
    if pack.get('contentVersion') != data.get('version'):
        raise ValueError('The Coppermind content version is stale. Re-seed after building the canonical content.')
    if pack.get('contentHash') != digest(data):
        raise ValueError('The Coppermind content hash is stale. Re-seed after building the canonical content.')
    if digest(pack.get('embedding')) != digest(EXPECTED_EMBEDDING):
        raise ValueError('The Coppermind embedding settings do not match the pinned browser encoder.')

    expected = sorted(thoughts(data), key=lambda thought: thought['id'])
    actual = pack.get('thoughts')
    if not expected or not isinstance(actual, list) or len(actual) != len(expected):
        raise ValueError(f'The Coppermind thought count is incomplete; expected {len(expected)} source-backed thoughts.')
    ids = set()
    for position, (record, canonical) in enumerate(zip(actual, expected)):
        if not isinstance(record, dict):
            raise ValueError(f'Thought {position} is not an object.')
        identifier = record.get('id')
        if not isinstance(identifier, str) or identifier in ids:
            raise ValueError(f'Thought {position} has an invalid or repeated ID.')
        ids.add(identifier)
        for field in ('id', 'text', 'metadata'):
            if record.get(field) != canonical[field]:
                raise ValueError(f'Thought {identifier}: {field} differs from canonical source-backed content.')
        vector = record.get('vector')
        if not isinstance(vector, list) or len(vector) != EXPECTED_EMBEDDING['dimensions']:
            raise ValueError(f'Thought {identifier}: expected a 384-dimensional vector.')
        if any(type(value) not in (int, float) or not math.isfinite(value) for value in vector):
            raise ValueError(f'Thought {identifier}: the vector contains a non-finite or nonnumeric value.')
        squared_norm = math.fsum(value * value for value in vector)
        if not math.isclose(squared_norm, 1.0, rel_tol=0.0, abs_tol=0.00001):
            raise ValueError(f'Thought {identifier}: the vector is not L2 normalized.')
    return {
        'game': data['game'],
        'contentVersion': data['version'],
        'thoughtCount': len(actual),
        'entryCount': len({record['metadata']['entryId'] for record in actual}),
        'contentHash': pack['contentHash'],
    }


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--input', type=Path, default=ROOT / 'public/data/kh1fm.json')
    parser.add_argument('--pack', type=Path, default=ROOT / 'public/data/kh1fm-coppermind.json')
    args = parser.parse_args()
    try:
        data = json.loads(args.input.read_text(encoding='utf-8'))
        pack = json.loads(args.pack.read_text(encoding='utf-8'))
        report = validate_pack(data, pack)
    except (OSError, ValueError, KeyError, TypeError) as error:
        print(f'Coppermind pack verification failed: {error}', file=sys.stderr)
        return 1
    print(json.dumps(report, indent=2))
    return 0


if __name__ == '__main__':
    sys.exit(main())
