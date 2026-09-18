import { pipeline, env } from "@huggingface/transformers";
import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
env.cacheDir = resolve(".model-cache");
const texts = JSON.parse(await readFile(process.argv[2], "utf8"));
const encoder = await pipeline(
  "feature-extraction",
  "Xenova/all-MiniLM-L6-v2",
  {
    dtype: "fp32",
    device: "cpu",
    revision: "751bff37182d3f1213fa05d7196b954e230abad9",
  },
);
for (let i = 0; i < texts.length; i++) {
  const tokens = encoder.tokenizer(texts[i], { truncation: false });
  if (tokens.input_ids.data.length > 256)
    throw new Error(
      `Thought ${i} exceeds MiniLM's 256-token budget (${tokens.input_ids.data.length}); split the canonical fact without dropping prerequisites.`,
    );
}
const vectors = [];
for (let i = 0; i < texts.length; i += 16) {
  const output = await encoder(texts.slice(i, i + 16), {
    pooling: "mean",
    normalize: true,
  });
  vectors.push(...output.tolist());
  process.stderr.write(
    `Embedded ${Math.min(i + 16, texts.length)}/${texts.length}\n`,
  );
}
await writeFile(process.argv[3], JSON.stringify(vectors));
await encoder.dispose();
