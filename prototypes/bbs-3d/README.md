# BBS 3D character-selection feasibility study

Isolated local prototype, September 28, 2026. This does **not** replace the production BBS home, add a main-app dependency, write profile data, or join the PWA cache. The standard PSP models render on the real Wayfinder Station and the scene turns toward the character on pointer hover, keyboard focus, or tap. Open Reports remains a separate action.

## Open

From the repository root:

```sh
python3 -m http.server 4180 --bind 127.0.0.1 --directory prototypes/bbs-3d/preview
```

Then open <http://127.0.0.1:4180/>. The Reports links point to the existing review app on port 4173, which must be running separately. This deliberately separate composition is a feasibility study, not a replacement specification for the approved Home menu.

## Rebuild

The checked-in `preview` is ready to serve. To change the renderer/shell:

```sh
npm ci --prefix prototypes/bbs-3d
npm run build --prefix prototypes/bbs-3d
```

The dependency and lockfile are isolated here. Three.js 0.180.0 (MIT) is bundled locally; no CDN requests occur at runtime. Existing stand-in images and the OFL Chakra font are copied by the build. `preview/THREE-LICENSE.txt` and `preview/assets/kh1-journal/ChakraPetch-OFL.txt` preserve those notices.

To regenerate the models with Blender 5.2:

```sh
python3 prototypes/bbs-3d/fetch-assets.py /tmp/bbs-3d-source
blender -b --python prototypes/bbs-3d/convert-assets.py -- /tmp/bbs-3d-source prototypes/bbs-3d/preview/models
npm run build --prefix prototypes/bbs-3d
```

`sources.json` records the inspected archive hashes. `preview/models/metrics.json` records generated geometry and textures; `preview/payload-metrics.json` records raw/gzip bytes. Gzip is a calculated deployment estimate: the included Python server serves raw files.

## Asset provenance and conversion

- [Terra](https://models.spriters-resource.com/psp/kingdomheartsbirthbysleep/asset/283464/), [Ventus](https://models.spriters-resource.com/psp/kingdomheartsbirthbysleep/asset/283463/), [Aqua](https://models.spriters-resource.com/psp/kingdomheartsbirthbysleep/asset/283465/): uploaded by **Zerox** on The Models Resource.
- [Wayfinder Station / Character Select](https://models.spriters-resource.com/psp/kingdomheartsbirthbysleep/asset/359417/): uploaded by **Eeveeloverthespriter8**.
- Original Kingdom Hearts artwork belongs to its respective Disney / Square Enix rights holders. These are game assets, not newly authored replacement characters.

Character archives contain OBJ plus SMD and three PNGs. SMDs contain real bone parent relationships and vertex weights, but **only one skeleton frame**. OBJ files reference an absent `rdmexport.mtl`; the converter maps the three SMD material slots to body, eye and mouth PNGs. The converter bakes a simple 72° arm-lowered pose using shoulder-descendant weights. It exports static GLBs without a skinning runtime. It does not recreate native stance, hand grips, Keyblades or idle animation.

The station keeps its top and shallow rim, omits the distant sky, layered fog and deep underside, and encodes the five opaque textures as quality-90 JPEG inside GLB. Its original 512px floor textures are not resized. The character PNG textures are retained. Unlit materials use the game's baked texture shading; no real-time shadows/post-processing or continuous idle loop is needed.

## Checks

```sh
npx playwright test --config prototypes/bbs-3d/playwright.config.ts
```

Uses local Chrome by default; `ARS_TEST_CHROMIUM` can select another executable. Desktop and phone-emulated Chromium check rotation/selection without profile writes, render-loop settling, still toggle, reduced-motion loading avoidance, model failure/retry and WebGL fallback. `validation/` holds host-local transition measurements; `review/` has CUA screenshots. Phone emulation is **not** physical-phone GPU, thermal, Safari or network evidence.

The scene observes document visibility and viewport intersection, caps DPR at 1.5, renders only on invalidation/selection transitions, and defaults to stills for reduced motion or save-data preferences. In stills mode after 3D was loaded, the scene remains cached in memory for switching back. Its resources disappear on leaving this standalone page. Production integration should add a component-level disposal lifecycle and versioned on-demand asset caching.
