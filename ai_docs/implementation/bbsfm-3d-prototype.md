# BBS 3D selection scene — feasibility result

September 28, 2026. **Technically viable; motion, poses and production integration remain unapproved.** The working prototype is isolated from the current BBS journal. No production route, profile storage, main dependency manifest or PWA cache has changed.

## Review

- [Open isolated 3D preview](http://127.0.0.1:4180/)
- [Reopen/rebuild instructions and asset provenance](../../prototypes/bbs-3d/README.md)
- [Desktop screenshot](../../prototypes/bbs-3d/review/terra-desktop.png)
- [Phone-size screenshot](../../prototypes/bbs-3d/review/aqua-phone.png)

Hover or keyboard-focus a character, or tap on a phone-sized display. The station and all three models rotate together over 700 ms, putting the selected character at the front, on their corresponding colored station region. This only changes the preview. Open Reports is a separate navigation action. Reduced-motion users start with stills and can explicitly enable 3D with rotation off. The normal BBS home remains available on port 4173.

This minimal prototype tests the scene; it does not replace the accepted home navigation (Final Chapter/shared menus).

## Actual asset findings

The standard PSP archives are sufficient for this prototype; no high-poly alternatives were needed. The source pages are [Terra](https://models.spriters-resource.com/psp/kingdomheartsbirthbysleep/asset/283464/), [Ventus](https://models.spriters-resource.com/psp/kingdomheartsbirthbysleep/asset/283463/), [Aqua](https://models.spriters-resource.com/psp/kingdomheartsbirthbysleep/asset/283465/) and [Wayfinder Station](https://models.spriters-resource.com/psp/kingdomheartsbirthbysleep/asset/359417/). Downloads were inspected locally rather than estimating cost from ZIP sizes.

| Asset | Converted GLB bytes | Triangles | Source character skeleton nodes | Texture sizes |
|---|---:|---:|---:|---|
| Terra | 268,104 | 1,628 | 84 | 256×256 body, 128×64 eye, 32×64 mouth |
| Ventus | 278,840 | 1,659 | 87 | 256×256 body, 128×64 eye, 32×32 mouth |
| Aqua | 293,564 | 1,804 | 86 | 256×256 body, 128×64 eye, 32×32 mouth |
| Station, trimmed | 432,604 | 3,229 | — | Four 512×512 floor textures; one 128×256 rim |
| **Total** | **1,273,112** | **8,320** | — | **14 unique textures** |

The full scene is **19 draw calls** with static unlit meshes. Approximate texture allocation is **6.65 MiB including full mip chains** assuming decoded RGBA8; this is arithmetic from image dimensions, not a GPU-memory profiler result. The scene caps pixel ratio at 1.5 and uses no live shadows or post-processing.

Source character SMDs have genuine parented bones and vertex weights, but only one skeleton frame apiece. Their rest pose has arms extended. The prototype uses those weights to bake a new relaxed pose, with the arms lowered 72°. It contains no native idle animation, native selection stance, weapon model or hand grip. This proves usable rig data exists; it does not establish exact animation parity. Model shoulder/hand silhouettes still need art review.

The station includes a much larger sky/fog/underside environment than needed. The conversion retains the floor and shallow rim, drops those distant/layered pieces and changes the five opaque station textures to quality-90 JPEG. The character PNGs remain intact. Local GLB conversion also resolves the character OBJs' missing MTL reference using the SMD material slots.

## Payload and performance

The scene, bundled renderer, shell, stylesheet and HTML total **about 1.85 MB raw / 0.97 MB gzip**. This excludes the existing stand-in portrait/stage images and font; exact per-file figures are in [payload-metrics.json](../../prototypes/bbs-3d/preview/payload-metrics.json). The gzip number is a calculated compression estimate; the Python preview server serves uncompressed files. The source archives totaled 2,569,194 bytes, which is a different measure.

The renderer is loaded only after this isolated preview is onscreen. Reduced-motion/save-data preferences skip both the renderer and all models by default. Selection transitions schedule frames; once settled, no continuous render loop runs. Hidden documents, offscreen scenes and still-image mode pause rendering. Asset or WebGL failure leaves working still-image navigation; failed asset loads clean up partial GPU resources and can retry.

Desktop-host Chromium checks observed roughly **16.7 ms median / 16.7 ms p95 frame intervals**, and approximately **0.6 ms p95 CPU time in the renderer call** during the two measured transitions. These short local samples are encouraging, but CPU render-call duration is not GPU completion time, and localhost loading is not a mobile network benchmark. [Desktop measurements](../../prototypes/bbs-3d/validation/desktop.json) and [phone-size emulation measurements](../../prototypes/bbs-3d/validation/phone-emulation.json) record the exact latest run.

## Validation and remaining approval work

**Eight browser checks passed** across desktop and phone-emulated Chromium: independent preview navigation, keyboard focus/tap selection, stopping after a transition, stopping in stills mode, reduced-motion avoiding 3D requests, model-failure fallback/retry, and unavailable-WebGL fallback. CUA screenshots confirm the real textured models and station render together at desktop and 390px widths. A physical phone, Safari/iOS, network throttling, long-session thermal behavior, and GPU timing have **not** been tested.

Before integrating:

- Approve the rotation duration, camera framing, phone crop and stills choice against the native selection reference.
- Decide whether the authored relaxed poses suffice temporarily; authentic stances need manual rig posing/reference matching or separately sourced animation. Native Keyblades are absent and would need separate assets and hand alignment.
- Run on actual target phones and Safari. Set a measured performance budget and retain the static fallback.
- Integrate as a lazy Home-only component with teardown/disposal when leaving Home, keeping preview state separate from the active journal character.
- Add explicit on-demand caching/versioning if 3D must work offline; do not put this experimental payload in the current global precache.
- Keep the user's asset/visual approval separate from feasibility. This study makes no final-fidelity claim.

Changed files are confined to `prototypes/bbs-3d/` and this report. The reproducible converter, isolated npm lockfile, source archive hashes, GLBs, local renderer build, browser tests and review evidence are included there. Nothing has been committed or deployed.
