import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";
import { initializeInstallation } from "./pwa";
import { flushStaleCopperminds } from "./jiminy/flush-cache";

initializeInstallation();
if ("caches" in window) {
  void flushStaleCopperminds(new URL(import.meta.env.BASE_URL, document.baseURI).href, caches)
    .catch(() => { /* Restricted cache access must not block the journal. Runtime also rejects old revisions. */ });
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
