import { Theme } from "../Utils/Theme/types";
import { Palette } from "./types";
import { getPaletteForTheme } from "../DesignSystem";

export const getColors = (theme: Theme): Palette => {
  return getPaletteForTheme(theme);
};
