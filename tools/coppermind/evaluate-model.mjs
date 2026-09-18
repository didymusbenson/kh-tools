import { pipeline, env } from "@huggingface/transformers";
import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";
env.cacheDir = resolve(".model-cache");
const model =
  process.env.JIMINY_MODEL || "onnx-community/SmolLM2-135M-Instruct-ONNX";
const dtype = process.env.JIMINY_DTYPE || "q8";
const started = performance.now();
const generator = await pipeline("text-generation", model, {
  dtype,
  device: "cpu",
  revision: "b8a5c0f183b78c55955a5364f610c36668b5e681",
});
const loadMs = performance.now() - started;
const cases = [
  {
    question: "Where is the Moogle shop?",
    evidence: "The Moogle shop is above the Accessory Shop in Traverse Town.",
    expected: "The Moogle shop is above the Accessory Shop in Traverse Town.",
  },
  {
    question: "How many Gales?",
    evidence: "The recipe requires 3 Gales.",
    expected: "The recipe requires 3 Gales.",
  },
  {
    question: "Tell me the weather.",
    evidence: "The Moogle shop is above the Accessory Shop in Traverse Town.",
    expected: "No matching information in this journal.",
  },
];
const results = [];
for (const c of cases) {
  const start = performance.now();
  const out = await generator(
    [
      {
        role: "system",
        content:
          'Use only the supplied evidence. Copy the exact sentence that answers the question. If unsupported say "No matching information in this journal." No greetings.',
      },
      {
        role: "user",
        content: `Question: ${c.question}\nEvidence: ${c.evidence}`,
      },
    ],
    { max_new_tokens: 70, do_sample: false, return_full_text: false },
  );
  const value = out[0].generated_text;
  const answer = typeof value === "string" ? value : value.at(-1).content;
  results.push({
    ...c,
    answer,
    exact: answer.trim() === c.expected,
    ms: Math.round(performance.now() - start),
  });
}
const report = {
  model,
  revision: "b8a5c0f183b78c55955a5364f610c36668b5e681",
  dtype,
  runtime: "Node ONNX CPU (not iPhone evidence)",
  loadMs: Math.round(loadMs),
  results,
};
await writeFile(
  process.argv[2] || "/tmp/jiminy-model-evaluation.json",
  JSON.stringify(report, null, 2) + "\n",
);
console.log(JSON.stringify(report, null, 2));
await generator.dispose();
