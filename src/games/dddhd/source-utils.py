"""Shared, edition-aware KHWiki factual extraction helpers (no raw prose persisted)."""
import os,pathlib,re,urllib.request,urllib.parse,html

def source(name):return 'https://www.khwiki.com/'+urllib.parse.quote(name.replace(' ','_'),safe=':')
def fetch(name):
 cache=os.environ.get('DDD_SOURCE_CACHE')
 path=pathlib.Path(cache)/(name.replace('/','_')+'.raw') if cache else None
 if path and path.exists():raw=path.read_text()
 else:raw=urllib.request.urlopen(source(name)+'?action=raw',timeout=45).read().decode()
 if raw.lstrip().upper().startswith('#REDIRECT'):
  target=re.search(r'\[\[([^\]]+)\]\]',raw).group(1);return fetch(target)
 return raw

def clean(s):
 s=re.sub(r'<!--.*?-->','',s,flags=re.S)
 s=re.sub(r'<ref\b[^>]*/>','',s)
 s=re.sub(r'<ref\b[^>]*>.*?</ref>','',s,flags=re.S)
 s=re.sub(r'\[\[File:[^\]]+\]\]','',s,flags=re.I)
 s=re.sub(r'\[\[([^\]|]+)\|([^\]]+)\]\]',r'\2',s)
 s=re.sub(r'\[\[([^\]]+)\]\]',r'\1',s)
 s=re.sub(r'{{(?:c|a|h)\|([^|}]+)(?:\|[^}]+)?}}',r'\1',s)
 s=re.sub(r'{{button\|(?:t|dsx)}}','deck',s,flags=re.I)
 s=re.sub(r'{{nihongo\|([^|]+)\|.*?}}',r'\1',s)
 s=re.sub(r'{{[^{}]*}}','',s)
 s=re.sub(r'<br\s*/?>','; ',s)
 s=re.sub(r'<[^>]+>','',s)
 return re.sub(r'\s+',' ',html.unescape(s).replace("'''",'').replace("''",'')).strip()

def hd(s):
 parts=re.split(r'<br\s*/?>',s)
 if '{{KHDDDHD}}' in s or '{{KH3DHD}}' in s:
  parts=[x for x in parts if '{{KH3D}}' not in x]
 return clean('; '.join(parts))

def template(raw,name):
 match=re.search(r'{{'+re.escape(name)+r'\s*(?:\n|\|)',raw,re.I)
 if not match:return ''
 start=match.start();depth=0
 for t in re.finditer(r'{{|}}',raw[start:]):
  depth+=1 if t[0]=='{{' else -1
  if depth==0:return raw[start:start+t.end()]
 raise ValueError('Unclosed template '+name)

def params(raw):
 return {k:v.strip() for k,v in re.findall(r'(?:^|\n)\s*\|\s*([A-Za-z][A-Za-z0-9]*)=(.*?)(?=\n\s*\||\n}}|$)',raw,re.S)}
