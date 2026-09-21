import { registerSW } from "virtual:pwa-register";
import { hasSavedJournal } from "./pwa-cache";

export const BUILD_REVISION = import.meta.env.VITE_BUILD_REVISION || "development";
type InstallationState = {
  offline: boolean;
  update: boolean;
  checking: boolean;
  message: string;
};
let state: InstallationState = { offline: false, update: false, checking: false, message: "" };
const listeners = new Set<() => void>();
let registration: ServiceWorkerRegistration | undefined;
let updateWorker: ((reloadPage?: boolean) => Promise<void>) | undefined;
let lastCheck = 0;
export const getInstallationState = () => state;
export function subscribeInstallation(listener: () => void) {
  listeners.add(listener);
  return () => { listeners.delete(listener); };
}
function publish(next: Partial<InstallationState>) {
  state = { ...state, ...next };
  listeners.forEach((listener) => listener());
}

export async function checkForAppUpdate() {
  if (state.checking) return;
  if (!navigator.onLine) {
    publish({ message: "Connect to the internet to check for updates." });
    return;
  }
  if (!registration) {
    publish({ message: "Update checking is not available yet. Try again shortly." });
    return;
  }
  publish({ checking: true, message: "Checking for updates…" });
  lastCheck = Date.now();
  try {
    await registration.update();
    publish({
      update: state.update || !!registration.waiting,
      message: state.update || registration.waiting
        ? "A journal update is ready."
        : registration.installing
          ? "An update is downloading. You can keep using the journal."
          : "You have the latest available journal.",
    });
  } catch {
    publish({ message: "Could not check for updates. Please try again when connected." });
  } finally {
    publish({ checking: false });
  }
}

export async function applyAppUpdate() {
  try {
    await updateWorker?.(true);
  } catch {
    publish({ message: "The update could not be loaded. Try again." });
  }
}

export function initializeInstallation() {
  if (updateWorker) return;
  updateWorker = registerSW({
    immediate: true,
    onNeedRefresh() {
      publish({ update: true, message: "A journal update is ready." });
      window.dispatchEvent(new Event("ars-update-ready"));
    },
    onOfflineReady() {
      publish({ offline: true, message: state.update ? "A journal update is ready." : "The journal has been saved for offline use." });
      window.dispatchEvent(new Event("ars-offline-ready"));
    },
    onRegisteredSW(_url, current) {
      registration = current;
      if (current?.waiting) publish({ update: true });
      if (current?.active && "caches" in window) {
        void hasSavedJournal(new URL(import.meta.env.BASE_URL, document.baseURI).href,
          (url) => caches.match(url, { ignoreSearch: true }))
          .then((offline) => publish({ offline: state.offline || offline }))
          .catch(() => { /* Cache access can be unavailable in private browsing. */ });
      }
      void checkForAppUpdate();
    },
    onRegisterError() {
      publish({ message: "Offline installation is unavailable in this browser." });
    },
  });
  const checkWhenVisible = () => {
    if (document.visibilityState === "visible" && Date.now() - lastCheck > 60_000)
      void checkForAppUpdate();
  };
  document.addEventListener("visibilitychange", checkWhenVisible);
  window.addEventListener("focus", checkWhenVisible);
  window.addEventListener("online", () => void checkForAppUpdate());
  window.addEventListener("ars-apply-update", () => void applyAppUpdate());
}
