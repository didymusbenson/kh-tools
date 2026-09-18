import { readFile, writeFile, mkdir, readdir } from "node:fs/promises";
import { gunzipSync } from "node:zlib";
import { resolve } from "node:path";

// Keep large generated JSON out of git while shipping ordinary JSON to browsers.
const directory = resolve("artifacts/copperminds");
const files = await readdir(directory).catch(() => []);
await mkdir("public/data", { recursive: true });
for (const file of files.filter((name) =>
  /^[a-z0-9-]+-browser\.json\.gz$/.test(name),
)) {
  const game = file.replace("-browser.json.gz", "");
  const bytes = gunzipSync(await readFile(resolve(directory, file)));
  const pack = JSON.parse(bytes.toString("utf8"));
  if (pack.game !== game) throw new Error(`Wrong game in ${file}`);
  await writeFile(resolve("public/data", `${game}-coppermind.json`), bytes);
  console.log(
    `Restored ${game} browser pack (${pack.thoughts.length} thoughts).`,
  );
}
