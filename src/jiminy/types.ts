export interface JiminyProgress {
  phase: "idle" | "downloading" | "loading" | "ready" | "error";
  message: string;
  percent?: number;
}
export interface JiminyCitation {
  entryId: string;
  name: string;
  href: string;
}
export interface JiminyAnswer {
  text: string;
  citations: JiminyCitation[];
  mode: "exact" | "retrieval" | "model" | "scope" | "missing";
}
export interface Thought {
  id: string;
  text: string;
  metadata: {
    game: string;
    edition: string;
    entryId: string;
    category: string;
    kind: string;
    name: string;
    world: string;
    area: string;
    tags: string;
    verification: string;
  };
  vector: number[];
}
export interface CoppermindPack {
  schemaVersion: 1;
  game: string;
  contentVersion: string;
  embedding: {
    model: string;
    dtype: string;
    dimensions: number;
    pooling: string;
    normalize: boolean;
    revision: string;
  };
  thoughts: Thought[];
}
export const MODEL_NAME = "SmolLM2 135M Instruct";
export const MODEL_ID = "onnx-community/SmolLM2-135M-Instruct-ONNX";
export const EMBEDDING_MODEL = "Xenova/all-MiniLM-L6-v2";
export const AI_DISCLAIMER = `AI DISCLAIMER: This is Data Jiminy. He runs on an open source SLM called ${MODEL_NAME}, which is completely offline and only reads data from this app, nothing else. The only way he's consuming any water is if you drop your phone in the bath. I'm sure the more technically inclined of you are going to try to make him say weird stuff. That would only be a reflection of the darkness in your own heart. May your heart be your guiding key.`;
export const AI_LIMITATIONS =
  "Offline answers work after the one-time model and journal downloads. Jiminy processes this guide, your question and this session’s context on your device, without web access or unrelated device data. The pretrained model can make mistakes; check the linked journal entries.";

export const EMBEDDING_REVISION = "751bff37182d3f1213fa05d7196b954e230abad9";
export const MODEL_REVISION = "b8a5c0f183b78c55955a5364f610c36668b5e681";
