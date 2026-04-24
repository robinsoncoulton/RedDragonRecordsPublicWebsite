import React, { createContext, useEffect, useState, useContext } from "react";
import { Theme, ThemeContextType, ThemeProviderProps } from "./types";
import { getColors } from "../../Styles/colors";
import { designTokens } from "../../DesignSystem";

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState(Theme.DARK);

  useEffect(() => {
    const colors = getColors(theme);
    document.documentElement.style.setProperty(
      "--theme-transition-duration",
      designTokens.duration.normal
    );
    document.documentElement.style.setProperty(
      "--theme-transition-easing",
      designTokens.easing.standard
    );
    document.documentElement.style.setProperty(
      "--frame-background",
      colors.background
    );
    document.documentElement.style.setProperty("--app-background", colors.background);
    document.documentElement.style.setProperty("--frame-border", colors.accent);
    document.documentElement.style.setProperty(
      "--frame-inner-color",
      colors.frameInner
    );
    document.documentElement.style.setProperty(
      "--footer-icon-hover-color",
      colors.footerIconHover
    );
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT
    );
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
