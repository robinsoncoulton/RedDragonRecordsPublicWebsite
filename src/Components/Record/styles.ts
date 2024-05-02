import styled from "styled-components";

export interface GrooveProps {
  diameter: number;
  color?: string;
}

export const VinylRecord = styled.div<GrooveProps>`
  height: ${({ diameter }) => diameter}rem;
  width: ${({ diameter }) => diameter}rem;
  border-radius: 50%;
  background-color: black;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Circle = styled.div<GrooveProps>`
  width: ${({ diameter }) => diameter}rem;
  height: ${({ diameter }) => diameter}rem;
  border-radius: 50%;
  ${({ color }) => (color ? `background-color: ${color};` : ``)}
  position: absolute;
  border: 1px solid #444;
`;
