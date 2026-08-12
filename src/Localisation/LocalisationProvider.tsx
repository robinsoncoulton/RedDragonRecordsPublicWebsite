import React from "react";
import enLocalisation from "./translations/en";
import zhLocalisation from "./translations/zh";
import { Locale, LocalisationCopy } from "./types";

const localisation = {
  en: enLocalisation,
  zh: zhLocalisation,
};

const STORAGE_KEY = "rdr-language";

const localeFromLabel = (label: string): Locale =>
  label === "中文" ? "zh" : "en";

const labelFromLocale = (locale: Locale) => (locale === "zh" ? "中文" : "English");

type LocalisationContextValue = {
  locale: Locale;
  languageLabel: string;
  copy: LocalisationCopy;
  setLanguageLabel: (label: string) => void;
};

const LocalisationContext = React.createContext<LocalisationContextValue | null>(
  null
);

export const LocalisationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [locale, setLocale] = React.useState<Locale>(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored === "zh" || stored === "en" ? stored : "en";
  });

  const setLanguageLabel = React.useCallback((label: string) => {
    const nextLocale = localeFromLabel(label);
    setLocale(nextLocale);
    window.localStorage.setItem(STORAGE_KEY, nextLocale);
  }, []);

  const value = React.useMemo(
    () => ({
      locale,
      languageLabel: labelFromLocale(locale),
      copy: localisation[locale],
      setLanguageLabel,
    }),
    [locale, setLanguageLabel]
  );

  return (
    <LocalisationContext.Provider value={value}>
      {children}
    </LocalisationContext.Provider>
  );
};

export const useLocalisation = () => {
  const context = React.useContext(LocalisationContext);
  if (!context) {
    throw new Error("useLocalisation must be used within LocalisationProvider");
  }
  return context;
};
