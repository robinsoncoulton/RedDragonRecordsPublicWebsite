import { Theme } from "../Theme/types";
import { Palette } from "./types";

const lightThemeColors = {
  primary: "#e60800",
  background: "#EBEBEB",
  accent: "#282828",
  accentLight: "#B8B8B8",
  text: "#09090C",
  white: "#EBEBEB",
};

const darkThemeColors = {
  primary: "#e60800",
  background: "#09090C",
  accent: "#282828",
  accentLight: "#4e4e4e",
  text: "#EBEBEB",
  white: "#EBEBEB",
};

export const getColors = (theme: Theme): Palette => {
  return theme === Theme.LIGHT ? lightThemeColors : darkThemeColors;
};
