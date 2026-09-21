import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  base: process.env.BASE_URL || "./",
  define: {
    "import.meta.env.VITE_BUILD_REVISION": JSON.stringify(
      (process.env.GITHUB_SHA || process.env.VITE_BUILD_REVISION || "development").slice(0, 12),
    ),
  },
  build: { emptyOutDir: true },
  plugins: [
    react(),
    VitePWA({
      registerType: "prompt",
      injectRegister: false,
      manifest: {
        name: "Ars Arcanum — Kingdom Hearts Journal",
        short_name: "Ars Arcanum",
        description: "Your offline Kingdom Hearts completion journal.",
        theme_color: "#264e40",
        background_color: "#f2edda",
        display: "standalone",
        start_url: "./",
        scope: "./",
        icons: [
          { src: "assets/icon-192.png", sizes: "192x192", type: "image/png" },
          { src: "assets/icon-512.png", sizes: "512x512", type: "image/png" },
        ],
      },
      workbox: {
        inlineWorkboxRuntime: true,
        dontCacheBustURLsMatching:
          /assets\/[^/]+-[A-Za-z0-9_-]{8,}\.(?:js|css|wasm)$/,
        globPatterns: [
          "**/*.{js,mjs,css,html,ico,png,svg,jpg,json,woff2,wasm}",
        ],
        maximumFileSizeToCacheInBytes: 32 * 1024 * 1024,
        cleanupOutdatedCaches: true,
        navigateFallback: "index.html",
      },
      devOptions: { enabled: false },
    }),
  ],
});
