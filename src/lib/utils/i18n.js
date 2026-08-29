import { register, init, getLocaleFromNavigator } from "svelte-i18n";

const settings = JSON.parse(localStorage.getItem("settings"));

const locales = import.meta.glob("../../locales/*.json");

for (const path in locales) {
  const locale = path.match(/([^/]+)\.json$/)?.[1];

  if (locale) {
    register(locale, locales[path]);
  }
}

init({
  fallbackLocale: "en-US",
  initialLocale: settings?.language ?? getLocaleFromNavigator(),
});
