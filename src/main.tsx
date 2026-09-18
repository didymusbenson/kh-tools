import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";
import { registerSW } from "virtual:pwa-register";

const updateServiceWorker = registerSW({
  onNeedRefresh() {
    window.dispatchEvent(new Event("ars-update-ready"));
  },
  onOfflineReady() {
    window.dispatchEvent(new Event("ars-offline-ready"));
  },
  onRegisterError(error) {
    console.warn("Offline installation unavailable", error);
  },
});
window.addEventListener("ars-apply-update", () => {
  void updateServiceWorker(true);
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
