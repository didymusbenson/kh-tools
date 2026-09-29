"""Blender: convert inspected BBS archives to static, unlit GLBs.
Usage: blender -b --python convert-assets.py -- /tmp/bbs-3d-source prototypes/bbs-3d/preview/models
Source character SMDs contain weighted bind poses, no animation. We bake a simple
arm-lowered study pose, not the game's character-select pose or an idle animation.
"""
import bpy, pathlib, sys, math, json, re
from mathutils import Matrix, Euler, Vector
source, output = map(pathlib.Path, sys.argv[sys.argv.index('--')+1:])
output.mkdir(parents=True, exist_ok=True)
report={}
def reset():
 bpy.ops.object.select_all(action='SELECT');bpy.ops.object.delete(use_global=False)
 for m in list(bpy.data.materials): bpy.data.materials.remove(m)
def material(name,path):
 m=bpy.data.materials.new(name);m.use_nodes=True;n=m.node_tree.nodes;n.clear();t=n.new('ShaderNodeTexImage');t.image=bpy.data.images.load(str(path),check_existing=True);t.interpolation='Linear';e=n.new('ShaderNodeEmission');o=n.new('ShaderNodeOutputMaterial');m.node_tree.links.new(t.outputs['Color'],e.inputs['Color']);m.node_tree.links.new(e.outputs[0],o.inputs['Surface']);m.use_backface_culling=False
 return m
def export(name):
 bpy.context.view_layer.update()
 meshes=[o for o in bpy.context.scene.objects if o.type=='MESH'];textures={}
 for o in meshes:
  for m in o.data.materials:
   for n in m.node_tree.nodes:
    if n.type=='TEX_IMAGE':textures[n.image.name]=list(n.image.size)
 stats={'triangles':sum(sum(len(p.vertices)-2 for p in o.data.polygons) for o in meshes),'meshObjects':len(meshes),'materials':len(set(m.name for o in meshes for m in o.data.materials)),'textures':textures}
 bpy.ops.export_scene.gltf(filepath=str(output/f'{name}.glb'),export_format='GLB',export_yup=True,export_animations=False,export_materials='EXPORT',export_image_format='JPEG' if name=='station' else 'AUTO',export_jpeg_quality=90)
 stats['bytes']=(output/f'{name}.glb').stat().st_size;report[name]=stats
for name,shoulders in [('terra',[69,76]),('ventus',[48,58]),('aqua',[47,57])]:
 reset();folder=source/name;lines=next(folder.glob('*.smd')).read_text().splitlines();a=lines.index('nodes')+1;b=lines.index('end',a);nodes={int(x.split()[0]):int(x.split()[2]) for x in lines[a:b]};a=lines.index('time 0')+1;b=lines.index('end',a);world={}
 for x in lines[a:b]:
  n,*v=x.split();n=int(n);v=list(map(float,v));local=Matrix.Translation(Vector(v[:3]))@Euler(v[3:]).to_matrix().to_4x4();world[n]=world[nodes[n]]@local if nodes[n]>=0 else local
 transforms={}
 for n in nodes:
  ancestor=n
  while ancestor not in shoulders and ancestor>=0:ancestor=nodes[ancestor]
  if ancestor>=0:
   p=world[ancestor].translation;angle=math.radians(72)*(1 if p.x>0 else -1);transforms[n]=Matrix.Translation(p)@Matrix.Rotation(angle,4,'Y')@Matrix.Translation(-p)
  else:transforms[n]=Matrix.Identity(4)
 verts=[];uvs=[];normals=[];faces=[];mats=[];i=lines.index('triangles')+1
 while lines[i]!='end':
  mat=lines[i];i+=1;mats.append(int(re.search(r'material(\d+)',mat).group(1)));face=[]
  for _ in range(3):
   v=lines[i].split();i+=1;pos=Vector(list(map(float,v[1:4])));normal=Vector(list(map(float,v[4:7])));uv=tuple(map(float,v[7:9]));count=int(v[9]);p=Vector();nn=Vector();total=0
   for k in range(count):
    bone=int(v[10+k*2]);weight=float(v[11+k*2]);p+=weight*(transforms[bone]@pos);nn+=weight*(transforms[bone].to_3x3()@normal);total+=weight
   if abs(total-1)>0.002:raise ValueError(f'Invalid weights {total}')
   face.append(len(verts));verts.append(p);normals.append(nn.normalized());uvs.append(uv)
  faces.append(face)
 mesh=bpy.data.meshes.new(name);mesh.from_pydata(verts,[],faces);mesh.update();obj=bpy.data.objects.new(name,mesh);bpy.context.collection.objects.link(obj)
 images=list(folder.glob('*.png'));body=next(p for p in images if not p.stem.endswith(('_e','_m')));eye=next(p for p in images if p.stem.endswith('_e'));mouth=next(p for p in images if p.stem.endswith('_m'))
 for j,p in enumerate([body,eye,mouth]):mesh.materials.append(material(f'{name}-{j}',p))
 layer=mesh.uv_layers.new(name='UVMap')
 for p in mesh.polygons:
  p.material_index=mats[p.index];p.use_smooth=True
  for loop in p.loop_indices:layer.data[loop].uv=uvs[mesh.loops[loop].vertex_index]
 mesh.normals_split_custom_set(normals)
 export(name);report[name].update({'smdNodes':len(nodes),'skeletonFrames':sum(x.startswith('time ') for x in lines),'pose':'Authored arm-lowered pose baked from source skin weights. No animation or weapons.'})
reset();folder=source/'station/Wayfind Station';bpy.ops.wm.obj_import(filepath=str(folder/'Wayfind Station.obj'))
# Keep the top platform and shallow rim. Omit tall underside and expensive layered fog/sky.
for o in list(bpy.context.scene.objects):
 if o.type!='MESH':continue
 n=int(o.name.split('_')[1])
 if n not in [7,8,11,12,13,18,19,20,21,22]:bpy.data.objects.remove(o,do_unlink=True)
 else:
  bpy.context.view_layer.objects.active=o;o.select_set(True);bpy.ops.object.transform_apply(location=True,rotation=True,scale=True);o.select_set(False)
  for v in o.data.vertices:v.co*=0.36
  for i,old in enumerate(o.data.materials):
   tex=next(n.image for n in old.node_tree.nodes if n.type=='TEX_IMAGE');o.data.materials[i]=material(old.name+'-unlit',pathlib.Path(tex.filepath))
export('station');report['station']['omitted']='Skybox, layered fog, deep lower pillar; platform diameter 8.995 units.'
(output/'metrics.json').write_text(json.dumps(report,indent=2));print(json.dumps(report,indent=2))
