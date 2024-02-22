import { Theme } from "../Theme/types";
import { Palette } from "./types";

const lightThemeColors = {
  primary: "#e60800",
  background: "#101015",
  accent: "#282828",
  accentLight: "#4e4e4e",
  text: "#FFFFFF",
};

const darkThemeColors = {
  primary: "#e60800",
  background: "#101015",
  accent: "#282828",
  accentLight: "#4e4e4e",
  text: "#FFFFFF",
};

export const getColors = (theme: Theme): Palette => {
  return theme === Theme.LIGHT ? lightThemeColors : darkThemeColors;
};
