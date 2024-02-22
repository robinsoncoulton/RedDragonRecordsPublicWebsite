import React from "react";
import { StyledHeader, TitleLogoContainer } from "./styles";
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
      <Navbar />
      <TitleLogoContainer onClick={handleClick}>
        <TitleBadge />
      </TitleLogoContainer>
      <LanguageSelect />
      <ThemeToggle handleClick={() => toggleTheme()}>Toggle Theme</ThemeToggle>
    </StyledHeader>
  );
};

export default Header;
