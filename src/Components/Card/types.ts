import { ReactNode } from "react";
import { StringLiteral } from "typescript";

export interface CardProps {
  children: ReactNode;
  src?: string;
  animationDelay?: number;
}

export interface CardContainerProps {
  animationDelay?: number;
}
