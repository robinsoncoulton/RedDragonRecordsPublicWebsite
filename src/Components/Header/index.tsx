import React from "react";
import {
  LanguageThemeContainer,
  StyledHeader,
  TitleLogoContainer,
} from "./styles";
import Navbar from "../Navbar";
import { useNavigate } from "react-router";
import { useTheme } from "../../Theme";
import TitleBadge from "../TitleBadge";
import LanguageSelect from "../Language";
import ThemeToggle from "../ThemeToggle";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const handleClick = () => navigate("/");
  const { toggleTheme } = useTheme();

  return (
    <StyledHeader theme={theme.theme}>
      <Navbar theme={theme.theme} />
      <TitleLogoContainer onClick={handleClick}>
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
