"""Refresh every HD treasure and built-in portal configuration; retain source note/access facts."""
import concurrent.futures,re,json,pathlib,importlib.util
folder=pathlib.Path(__file__).parent
spec=importlib.util.spec_from_file_location('source_utils',folder/'source-utils.py');u=importlib.util.module_from_spec(spec);spec.loader.exec_module(u)
worlds=['Traverse Town','La Cité des Cloches','The Grid',"Prankster's Paradise",'Country of the Musketeers','Symphony of Sorcery','The World That Never Was']
def fetch(w):
 url=u.source('Game:'+w); raw=u.fetch('Game:'+w)
 raw=raw[raw.index("==''Kingdom Hearts 3D: Dream Drop Distance''=="):]
 ch=raw.split('===Treasures===')[1].split('\n===')[0];char='';treasures=[]
 for line in ch.splitlines():
  if '{{tab|Sora}}' in line:char='Sora'
  if '{{tab|Riku}}' in line:char='Riku'
  m=re.match(r'\|(\d+)\|\|(.*?)\|\|(.*?)\|\|(.*)',line)
  if m:treasures.append({'world':w,'character':char,'number':int(m[1]),'item':u.hd(m[2]),'itemKind':(re.search(r'Icon (.*?) KH3D',m[2])[1] if re.search(r'Icon (.*?) KH3D',m[2]) else None),'area':u.clean(m[3]),'note':u.hd(m[4]),'source':url})
 portals=[]
 sec=u.template(raw,'InfoPortal')
 params=dict(re.findall(r'\|([SR][A-Za-z]*\d+[a-z]?)=(.*?)(?=\|[SR][A-Za-z]*\d+[a-z]?=|\n|$)',sec))
 for k,v in params.items():
  m=re.fullmatch(r'([SR])type(\d+)([a-z])',k)
  if not m:continue
  c,n,letter=m.groups();suffix=n+letter
  portals.append({'world':w,'character':'Sora' if c=='S' else 'Riku','type':v,'number':int(n),'sourceNumber':params[c+'no'+suffix],'area':u.clean(params.get(c+'loc'+suffix,'')),'reward':u.hd(params.get(c+'rew'+suffix,'')),'forecast':u.clean(params.get(c+'fc'+n,'')),'nightmare':u.clean(params.get(c+'rare'+n,'')),'objective':u.hd(params.get(c+'obj'+suffix,'')),'objectiveReward':u.hd(params.get(c+'objrew'+suffix,'')),'dropPoints':int(params[c+'dp'+suffix]) if c+'dp'+suffix in params else None,'rank':int(params[c+'rank'+suffix]),'unlock':u.clean(params.get(c+n,'Default')),'source':url})
 return {'treasures':treasures,'portals':[p for p in portals if p['type']=='Special'],'builtInPortalConfigurations':[p for p in portals if p['type']!='Special']}
results=list(concurrent.futures.ThreadPoolExecutor(max_workers=4).map(fetch,worlds))
out={k:[x for r in results for x in r[k]] for k in ['treasures','portals','builtInPortalConfigurations']}
assert len(out['treasures'])==438 and len(out['portals'])==78
folder.joinpath('world-facts.json').write_text(json.dumps(out,ensure_ascii=False,indent=2)+'\n')
print({k:len(v) for k,v in out.items()},'notes',sum(bool(x['note']) for x in out['treasures']))
