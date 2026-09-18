"""No network, embedding runtime, or Chroma dependency is needed for these gates."""
import copy
from pathlib import Path
import sys
import unittest

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / 'tools/coppermind'))
from check_pack import EXPECTED_EMBEDDING, validate_pack
from seed import digest, thoughts


class CommittedPackTest(unittest.TestCase):
    def setUp(self):
        self.data = {
            'schemaVersion': 1, 'game': 'kh1fm', 'version': 'fixture-version', 'recipes': [],
            'entries': [{
                'id': 'kh1fm-fixture', 'game': 'kh1fm', 'category': 'treasure',
                'name': 'A sourced chest', 'summary': 'Find the chest beside the door.',
                'instructions': 'Open the chest.', 'prerequisites': 'Requires High Jump.',
                'tags': ['chest'], 'sources': [{'url': 'https://example.com/source'}],
                'verification': 'source-backed',
            }],
        }
        self.pack = {
            'schemaVersion': 1, 'game': 'kh1fm', 'contentVersion': self.data['version'],
            'contentHash': digest(self.data), 'embedding': dict(EXPECTED_EMBEDDING),
            'thoughts': [{**thought, 'vector': [1.0] + [0.0] * 383}
                         for thought in sorted(thoughts(self.data), key=lambda value: value['id'])],
        }

    def test_complete_source_aligned_pack_passes(self):
        report = validate_pack(self.data, self.pack)
        self.assertEqual(report['entryCount'], 1)
        self.assertEqual(report['thoughtCount'], 3)

    def test_stale_content_is_rejected_even_if_version_was_not_bumped(self):
        changed = copy.deepcopy(self.data)
        changed['entries'][0]['prerequisites'] = 'Requires Glide.'
        with self.assertRaisesRegex(ValueError, 'content hash is stale'):
            validate_pack(changed, self.pack)

    def test_wrong_game_version_and_encoder_are_rejected(self):
        for field, value in [('schemaVersion', True), ('game', 'kh2fm'), ('contentVersion', 'old'),
                             ('embedding', {}), ('embedding', {**EXPECTED_EMBEDDING, 'normalize': 1})]:
            with self.subTest(field=field):
                pack = copy.deepcopy(self.pack)
                pack[field] = value
                with self.assertRaises(ValueError):
                    validate_pack(self.data, pack)

    def test_missing_duplicate_or_reordered_thoughts_are_rejected(self):
        for altered in [self.pack['thoughts'][:-1], self.pack['thoughts'][::-1],
                        [self.pack['thoughts'][0]] * len(self.pack['thoughts'])]:
            with self.assertRaises(ValueError):
                validate_pack(self.data, {**self.pack, 'thoughts': altered})

    def test_text_and_source_metadata_must_match_canonical_compilation(self):
        for field, value in [('text', 'Unsupported claim.'), ('metadata', {})]:
            with self.subTest(field=field):
                pack = copy.deepcopy(self.pack)
                pack['thoughts'][0][field] = value
                with self.assertRaisesRegex(ValueError, 'canonical'):
                    validate_pack(self.data, pack)

    def test_vectors_must_be_finite_numeric_normalized_and_full_length(self):
        for vector in [[], [0.0] * 384, [2.0] + [0.0] * 383,
                       [float('nan')] + [0.0] * 383, [float('inf')] + [0.0] * 383,
                       [True] + [0.0] * 383, ['1'] + [0.0] * 383]:
            with self.subTest(vector=vector[:1]):
                pack = copy.deepcopy(self.pack)
                pack['thoughts'][0]['vector'] = vector
                with self.assertRaises(ValueError):
                    validate_pack(self.data, pack)


if __name__ == '__main__':
    unittest.main()
