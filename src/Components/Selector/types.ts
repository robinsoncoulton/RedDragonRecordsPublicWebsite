import { ThemedElementProps } from "../../Theme/types";
import { NonEmptyArray } from "./../../types";

export interface SelectorProps extends ThemedElementProps {
  options: NonEmptyArray<string>;
  onSelect: (option: string) => void;
}

export interface OptionProps extends ThemedElementProps {
  selected: boolean;
}
