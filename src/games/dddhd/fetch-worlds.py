"""Refresh factual chest/portal inventory; no source guide prose is retained."""
import concurrent.futures,urllib.request,urllib.parse,re,json,pathlib
worlds=['Traverse Town','La Cité des Cloches','The Grid',"Prankster's Paradise",'Country of the Musketeers','Symphony of Sorcery','The World That Never Was']
def clean(s):
 parts=re.split(r'<br\s*/?>',s)
 if any('{{KHDDDHD}}' in x for x in parts):s='; '.join(x for x in parts if '{{KH3D}}' not in x)
 s=re.sub(r'\[\[File:[^\]]+\]\]','',s)
 s=re.sub(r'<ref.*?</ref>','',s,flags=re.S)
 s=re.sub(r'\[\[([^\]|]+)\|([^\]]+)\]\]',r'\2',s)
 s=re.sub(r'\[\[([^\]]+)\]\]',r'\1',s)
 s=re.sub(r'{{c\|([^|]+)\|[^}]+}}',r'\1',s)
 s=re.sub(r'{{[^}]+}}','',s)
 s=re.sub(r'<[^>]+>','; ',s)
 return re.sub(r'\s+',' ',s).strip()
def fetch(w):
 url='https://www.khwiki.com/'+urllib.parse.quote('Game:'+w.replace(' ','_'),safe=':')
 raw=urllib.request.urlopen(url+'?action=raw').read().decode()
 raw=raw[raw.index("==''Kingdom Hearts 3D: Dream Drop Distance''=="):]
 ch=raw.split('===Treasures===')[1].split('\n===')[0]
 char='';treasures=[]
 for line in ch.splitlines():
  if '{{tab|Sora}}' in line:char='Sora'
  if '{{tab|Riku}}' in line:char='Riku'
  m=re.match(r'\|(\d+)\|\|(.*?)\|\|(.*?)\|\|',line)
  if m:treasures.append({'world':w,'character':char,'number':int(m[1]),'item':clean(m[2]),'area':clean(m[3]),'source':url})
 portals=[]
 if '{{InfoPortal' in raw:
  sec=raw.split('{{InfoPortal')[1].split('\n}}')[0]
  # Only parameter delimiters (not inner templates) start with recognized letter keys.
  params=dict(re.findall(r'\|([SR][A-Za-z]+\d+[a-z]?)=(.*?)(?=\|[SR][A-Za-z]+\d+[a-z]?=|\n|$)',sec))
  for k,v in params.items():
   m=re.fullmatch(r'([SR])type(\d+)([a-z])',k)
   if not m or v!='Special':continue
   c,n,letter=m.groups();suffix=n+letter
   portals.append({'world':w,'character':'Sora' if c=='S' else 'Riku','number':int(n),'area':clean(params.get(c+'loc'+suffix,'')),'reward':clean(params.get(c+'rew'+suffix,'')),'forecast':clean(params.get(c+'fc'+n,'')),'nightmare':clean(params.get(c+'rare'+n,'')),'source':url})
 return {'treasures':treasures,'portals':portals}
results=list(concurrent.futures.ThreadPoolExecutor(max_workers=4).map(fetch,worlds))
out={k:[x for r in results for x in r[k]] for k in ['treasures','portals']}
assert len(out['treasures'])==438,len(out['treasures'])
assert len(out['portals'])==78,len(out['portals'])
pathlib.Path(__file__).with_name('world-facts.json').write_text(json.dumps(out,ensure_ascii=False,indent=2)+'\n')
print({k:len(v) for k,v in out.items()})
