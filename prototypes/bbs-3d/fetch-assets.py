"""Download the four user-selected public model archives for conversion.
Usage: python3 prototypes/bbs-3d/fetch-assets.py /tmp/bbs-3d-source
"""
import pathlib,sys,subprocess,re,zipfile,hashlib,json
root=pathlib.Path(sys.argv[1]);root.mkdir(parents=True,exist_ok=True);manifest=[]
for name,asset in [('station',359417),('terra',283464),('ventus',283463),('aqua',283465)]:
 url=f'https://models.spriters-resource.com/psp/kingdomheartsbirthbysleep/asset/{asset}/';page=root/f'{name}.html';archive=root/f'{name}.zip'
 subprocess.run(['curl','-L','--fail','--silent','--show-error',url,'-o',str(page)],check=True)
 download=re.search(r'href="([^"]+)" id="download"',page.read_text()).group(1)
 if not download.startswith('/media/assets/'):raise ValueError('Unexpected download path')
 subprocess.run(['curl','-L','--fail','--silent','--show-error','https://models.spriters-resource.com'+download,'-o',str(archive)],check=True)
 with zipfile.ZipFile(archive) as z:
  destination=(root/name).resolve()
  for item in z.infolist():
   target=(destination/item.filename).resolve()
   if destination not in target.parents and target!=destination:raise ValueError('Unsafe archive path')
  z.extractall(destination)
 manifest.append({'name':name,'page':url,'archiveBytes':archive.stat().st_size,'sha256':hashlib.sha256(archive.read_bytes()).hexdigest()})
(root/'sources.json').write_text(json.dumps(manifest,indent=2))
