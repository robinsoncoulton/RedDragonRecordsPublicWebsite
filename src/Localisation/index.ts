import enLocalisation from "./translations/en";
import zhLocalisation from "./translations/zh";

const localisation = {
  en: enLocalisation,
  zh: zhLocalisation,
};

export default localisation;
export { LocalisationProvider, useLocalisation } from "./LocalisationProvider";
export type { Locale, LocalisationCopy } from "./types";
