import { Theme } from "../Theme/types";
import { Palette } from "./types";

const lightThemeColors = {
  primary: "#e60800",
  background: "#EBEBEB",
  accent: "#282828",
  accentLight: "#B8B8B8",
  text: "#09090C",
  white: "#EBEBEB",
  borderInnerColor: "#A70000",
  borderCenter: "#EBEBEB",
  borderOuterColor: "#0D1321",
  frameColor: "#FBF6EF",
};

const darkThemeColors = {
  primary: "#851D1D",
  background: "#121217",
  accent: "#423030",
  accentLight: "#423030",
  text: "#EBEBEB",
  white: "#EBEBEB",
  borderInnerColor: "#851D1D",
  borderCenter: "#09090C",
  borderOuterColor: "#EBEBEB",
  frameColor: "#09090C",
};

export const getColors = (theme: Theme): Palette => {
  return theme === Theme.LIGHT ? lightThemeColors : darkThemeColors;
};
