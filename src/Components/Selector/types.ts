import { ThemedElementProps } from "../../Utils/Theme/types";
import { NonEmptyArray } from "./../../types";

export interface SelectorProps extends ThemedElementProps {
  options: NonEmptyArray<string>;
  selectedOption: string;
  onSelect: (option: string) => void;
}

export interface OptionProps extends ThemedElementProps {
  selected: boolean;
}

export interface HighlightProps extends ThemedElementProps {
  width: number;
  left: number;
}
