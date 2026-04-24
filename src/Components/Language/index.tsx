import React, { useState } from "react";
import { LanguageSelectProps } from "./types";
import Selector from "../Selector";
import supportedLanguages from "./supportedLanguages.json";
import { NonEmptyArray } from "../../types";

const LanguageSelect: React.FC<LanguageSelectProps> = ({ theme }) => {
  const [languages] = useState(supportedLanguages as NonEmptyArray<string>);

  const [language, setLanguage] = useState(languages[0]);

  const handleSelect = (selection: string) => {
    setLanguage(selection);
  };

  return (
    <Selector
      options={languages}
      selectedOption={language}
      onSelect={handleSelect}
      theme={theme}
    />
  );
};

export default LanguageSelect;
