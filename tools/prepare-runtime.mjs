import { readdir, copyFile, mkdir } from "node:fs/promises";
import { dirname } from "node:path";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const runtime = dirname(dirname(require.resolve("onnxruntime-web")));
const target = new URL("../public/ort/", import.meta.url);
await mkdir(target, { recursive: true });
const files = await readdir(`${runtime}/dist`);
for (const name of files.filter((name) =>
  /^ort-wasm-simd-threaded.*\.(mjs|wasm)$/.test(name),
)) {
  await copyFile(`${runtime}/dist/${name}`, new URL(name, target));
}
console.log("Prepared local ONNX browser runtime.");
