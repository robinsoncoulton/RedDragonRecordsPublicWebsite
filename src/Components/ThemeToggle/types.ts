import { Theme } from "../../Utils/Theme/types";

export interface ThemeToggleProps {
  handleClick: () => void;
  theme: Theme;
}

export interface ElementProps {
  theme: Theme;
}
