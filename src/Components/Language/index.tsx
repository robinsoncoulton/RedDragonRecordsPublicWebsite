import React, { useState } from "react";
import { LanguageSelectProps } from "./types";
import Selector from "../Selector";
import supportedLanguages from "./supportedLanguages.json";
import { NonEmptyArray } from "../../types";
import { useLocalisation } from "../../Localisation";
import { trackEvent } from "../../Analytics";

const LanguageSelect: React.FC<LanguageSelectProps> = ({ theme }) => {
  const [languages] = useState(supportedLanguages as NonEmptyArray<string>);
  const { languageLabel, setLanguageLabel } = useLocalisation();

  const handleSelect = (selection: string) => {
    if (selection === languageLabel) {
      return;
    }
    setLanguageLabel(selection);
    trackEvent("change_language", {
      locale: selection === "中文" ? "zh" : "en",
    });
  };

  return (
    <Selector
      options={languages}
      selectedOption={languageLabel}
      onSelect={handleSelect}
      theme={theme}
    />
  );
};

export default LanguageSelect;
