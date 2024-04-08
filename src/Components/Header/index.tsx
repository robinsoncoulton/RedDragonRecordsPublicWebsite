import React from "react";
import {
  LanguageThemeContainer,
  StyledHeader,
  TitleLogoContainer,
} from "./styles";
import Navbar from "../Navbar";
import { useTheme } from "../../Theme";
import TitleBadge from "../TitleBadge";
import LanguageSelect from "../Language";
import ThemeToggle from "../ThemeToggle";

const Header: React.FC = () => {
  const theme = useTheme();
  const { toggleTheme } = useTheme();

  return (
    <StyledHeader theme={theme.theme}>
      <Navbar theme={theme.theme} />
      <TitleLogoContainer>
        <TitleBadge theme={theme.theme} />
      </TitleLogoContainer>
      <LanguageThemeContainer>
        <LanguageSelect theme={theme.theme} />
        <ThemeToggle handleClick={toggleTheme} theme={theme.theme} />
      </LanguageThemeContainer>
    </StyledHeader>
  );
};

export default Header;
