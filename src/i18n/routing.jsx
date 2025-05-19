import { defineRouting } from "next-intl/routing";

const getLocales = () => {
  const context = require.context("../locales", false, /\.json$/);
  return context
    .keys()
    .map((key) => key.replace("./", "").replace(".json", ""));
};

export const locales = getLocales();
const defaultLocale = "en";

export const routing = defineRouting({
  locales,
  defaultLocale,
});
