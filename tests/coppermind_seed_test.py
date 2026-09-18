import importlib.util, json, tempfile, unittest
from pathlib import Path
spec=importlib.util.spec_from_file_location('seed',Path(__file__).resolve().parents[1]/'tools/coppermind/seed.py')
seed=importlib.util.module_from_spec(spec);spec.loader.exec_module(seed)
class SeedTest(unittest.TestCase):
    def data(self,game):
        return {'game':game,'version':'test','entries':[{'id':'shared-name','game':game,'category':'guide','name':'Test fact','summary':'One isolated fact.','instructions':'Find the chest.','tags':['test'],'sources':[{'url':'https://example.com'}],'verification':'source-backed'}]}
    def test_idempotence_isolation(self):
        with tempfile.TemporaryDirectory() as tmp:
            def embed(texts):return [[1.0]+[0.0]*383 for _ in texts]
            one=Path(tmp)/'one.json'; two=Path(tmp)/'two.json'
            a=seed.seed(self.data('fixture-a'),tmp,one,embed)
            original=one.read_bytes()
            seed.seed(self.data('fixture-a'),tmp,one,embed)
            self.assertEqual(original,one.read_bytes())
            b=seed.seed(self.data('fixture-b'),tmp,two,embed)
            self.assertNotEqual(a['databasePath'],b['databasePath'])
            self.assertTrue((Path(a['databasePath'])/'chroma.sqlite3').exists())
            self.assertTrue(all(t['metadata']['game']=='fixture-a' for t in json.loads(one.read_text())['thoughts']))
    def test_unresolved_excluded_and_bounded(self):
        d=self.data('fixture'); d['entries'][0]['summary']='Long word. '*200
        self.assertTrue(all(len(t['text'])<800 for t in seed.thoughts(d)))
        d['entries'][0]['verification']='unresolved'
        self.assertEqual(seed.thoughts(d),[])
if __name__=='__main__':unittest.main()
