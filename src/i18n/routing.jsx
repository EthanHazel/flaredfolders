import { defineRouting } from "next-intl/routing";

const getLocales = () => {
  const context = require.context("../locales", false, /\.json$/);
  return context
    .keys()
    .map((key) => key.replace("./", "").replace(".json", ""));
};

export const routing = defineRouting({
  locales: getLocales(),
  defaultLocale: "en",
});
