import { locale } from "svelte-i18n";
import { version } from "../../../package.json";

const DEFAULT_SETTINGS = {
  returningUser: false,
  lastUsedVersion: version,
  theme: "dark",
  language: locale,
  saveBind: "save", // Sets Ctrl + S to export instead of project save if enabled
  unsavedWarning: true, // Enables the "Are you sure you want to leave?" warning if there's unsaved changes
};

/**
 * Initializes the settings.
 * Makes it so that if there's any settings missing from the current key that it will
 * load the default settings for the ones that are missing.
 */
export async function initSession() {
  const currentSettings = localStorage.getItem("settings");
  const newSettings = JSON.stringify({
    ...DEFAULT_SETTINGS,
    ...(currentSettings ? JSON.parse(currentSettings) : {}),
  });

  localStorage.setItem("settings", newSettings);

  locale.set(JSON.parse(newSettings).language);
}

/**
 * Updates the settings in local storage and dispatches a custom
 * event to notify the tab.
 * @param {JSON} newSettings
 */
export function updateSettings(newSettings) {
  localStorage.setItem("settings", JSON.stringify(newSettings));
  window.dispatchEvent(new Event("settings-updated"));
}

import { writable } from "svelte/store";

function createSettingsStore() {
  const initial = JSON.parse(localStorage.getItem("settings") || "{}");
  const { subscribe, set, update } = writable(initial);

  return {
    subscribe,
    set(value) {
      localStorage.setItem("settings", JSON.stringify(value));
      set(value);
    },
    update(fn) {
      update((current) => {
        const next = fn(current);
        localStorage.setItem("settings", JSON.stringify(next));
        return next;
      });
    },
  };
}

export const settingsStore = createSettingsStore();

if (typeof window !== "undefined") {
  window.addEventListener("storage", (e) => {
    if (e.key === "settings") {
      settingsStore.set(JSON.parse(e.newValue || "{}"));
    }
  });
}
