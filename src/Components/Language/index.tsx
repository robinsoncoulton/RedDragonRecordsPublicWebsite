import React, { useState } from "react";
import { LanguageSelectProps } from "./types";
import Selector from "../Selector";
import supportedLanguages from "./supportedLanguages.json";
import { NonEmptyArray } from "../../types";
import { useLocalisation } from "../../Localisation";

const LanguageSelect: React.FC<LanguageSelectProps> = ({ theme }) => {
  const [languages] = useState(supportedLanguages as NonEmptyArray<string>);
  const { languageLabel, setLanguageLabel } = useLocalisation();

  const handleSelect = (selection: string) => {
    setLanguageLabel(selection);
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
