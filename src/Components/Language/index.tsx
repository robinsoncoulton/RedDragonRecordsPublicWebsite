/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { LanguageSelectProps } from "./types";
import Selector from "../Selector";
import supportedLanguages from "./supportedLanguages.json";
import { NonEmptyArray } from "../../types";

const LanguageSelect: React.FC<LanguageSelectProps> = ({ theme }) => {
  const [languages, setLanguages] = useState(
    supportedLanguages as NonEmptyArray<string>
  );

  const [language, setLanguage] = useState(languages[0]);

  const handleSelect = (selection: string) => {
    setLanguage(selection);
  };

  useEffect(() => {
    console.log(language);
  }, [language]);

  return <Selector options={languages} onSelect={handleSelect} theme={theme} />;
};

export default LanguageSelect;
