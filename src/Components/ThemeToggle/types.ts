import { Theme } from "../../Theme/types";

export interface ThemeToggleProps {
  handleClick: () => void;
  theme: Theme;
}

export interface ElementProps {
  theme: Theme;
}
