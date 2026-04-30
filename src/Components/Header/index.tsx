import React from "react";
import {
  HeaderContent,
  HeaderSide,
  IosTopBuffer,
  LanguageThemeContainer,
  StyledHeader,
  TitleLogoContainer,
} from "./styles";
import Navbar from "../Navbar";
import { useTheme } from "../../Utils/Theme";
import TitleBadge from "../TitleBadge";
import LanguageSelect from "../Language";
import ThemeToggle from "../ThemeToggle";
import { designTokens } from "../../DesignSystem";

const getSpacingPx = (spacingValue: string) => {
  if (spacingValue.endsWith("rem")) {
    const remValue = Number.parseFloat(spacingValue);
    const rootFontSize = Number.parseFloat(
      window.getComputedStyle(document.documentElement).fontSize
    );
    return remValue * rootFontSize;
  }
  if (spacingValue.endsWith("px")) {
    return Number.parseFloat(spacingValue);
  }
  return Number.parseFloat(spacingValue) || 0;
};

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [isPastThreshold, setIsPastThreshold] = React.useState(false);
  const [forceOpaque, setForceOpaque] = React.useState(false);

  React.useEffect(() => {
    const threshold = getSpacingPx(designTokens.spacing["4xl"]);
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isScrollingUp = currentScrollY < lastScrollY;
      const isScrollingDown = currentScrollY > lastScrollY;
      const pastThreshold = currentScrollY > threshold;
      setIsPastThreshold(pastThreshold);
      if (!pastThreshold) {
        setForceOpaque(true);
      } else if (isScrollingUp) {
        setForceOpaque(true);
      } else if (isScrollingDown) {
        setForceOpaque(false);
      }
      lastScrollY = currentScrollY;
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <IosTopBuffer aria-hidden="true" /><StyledHeader $isPastThreshold={isPastThreshold} $forceOpaque={forceOpaque}>
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
    </>
  );
};

export default Header;
