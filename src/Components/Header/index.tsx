import React from "react";
import {
  HeaderSide,
  LanguageThemeContainer,
  StyledHeader,
  TitleLogoContainer,
} from "./styles";
import Navbar from "../Navbar";
import { useTheme } from "../../Utils/Theme";
import TitleBadge from "../TitleBadge";
import LanguageSelect from "../Language";
import ThemeToggle from "../ThemeToggle";

const Header: React.FC = () => {
  const theme = useTheme();
  const { toggleTheme } = useTheme();

  return (
    <StyledHeader theme={theme.theme}>
      <HeaderSide align="left">
        <Navbar theme={theme.theme} />
      </HeaderSide>
      <TitleLogoContainer>
        <TitleBadge theme={theme.theme} />
      </TitleLogoContainer>
      <HeaderSide align="right">
        <LanguageThemeContainer>
          <LanguageSelect theme={theme.theme} />
          <ThemeToggle handleClick={toggleTheme} theme={theme.theme} />
        </LanguageThemeContainer>
      </HeaderSide>
    </StyledHeader>
  );
};

export default Header;
