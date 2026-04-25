import React from "react";
import { PaperTexture } from "@paper-design/shaders-react";
import {
  HeaderContent,
  HeaderSide,
  HeaderTexture,
  LanguageThemeContainer,
  StyledHeader,
  TitleLogoContainer,
} from "./styles";
import Navbar from "../Navbar";
import { useTheme } from "../../Utils/Theme";
import { getColors } from "../../Styles/colors";
import TitleBadge from "../TitleBadge";
import LanguageSelect from "../Language";
import ThemeToggle from "../ThemeToggle";

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const colors = getColors(theme);

  return (
    <StyledHeader>
      <HeaderTexture aria-hidden="true">
        <PaperTexture
          colorBack={colors.background}
          colorFront={colors.backgroundAccent}
          contrast={0.12}
          roughness={1}
          fiber={0.05}
          fiberSize={0.01}
          crumples={0}
          crumpleSize={0.01}
          folds={0}
          foldCount={1}
          drops={0}
          fade={0}
          seed={0}
          scale={0.5}
          fit="cover"
        />
      </HeaderTexture>
      <HeaderContent>
        <HeaderSide align="left">
          <Navbar theme={theme} />
        </HeaderSide>
        <TitleLogoContainer>
          <TitleBadge theme={theme} />
        </TitleLogoContainer>
        <HeaderSide align="right">
          <LanguageThemeContainer>
            <LanguageSelect theme={theme} />
            <ThemeToggle handleClick={toggleTheme} theme={theme} />
          </LanguageThemeContainer>
        </HeaderSide>
      </HeaderContent>
    </StyledHeader>
  );
};

export default Header;
