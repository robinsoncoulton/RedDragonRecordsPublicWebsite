import { ReactNode } from "react";

export interface ButtonProps {
  handleClick: () => void;
  children: ReactNode;
}
