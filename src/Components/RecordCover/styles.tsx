import styled, { keyframes } from "styled-components";
import { getColors } from "../../Styles/colors";
import { GrooveProps } from "./types";
import { Heading } from "../Heading/styles";
import { Text } from "../Text/styles";

const slideRight = keyframes`
  from {
    left: 0;
  }
  to {
    left: 17rem;
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 0.8;
  }
`;

const fadeInText = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const Container = styled.div`
  width: 100%;
  height: 35rem;
  background-color: ${(props) => getColors(props.theme).background};
  position: relative;
  overflow: hidden;
  margin-bottom: 8rem;
`;

export const BackgroundImage = styled.img`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  display: block;
  object-fit: cover;
`;

export const VinylRecord = styled.div`
  height: 35rem;
  width: 35rem;
  border-radius: 300px;
  background-color: black;
  position: absolute;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  animation: ${slideRight} 2s ease forwards;
`;

export const Sleeve = styled.img`
  height: 35rem;
  width: 35rem;
  border-radius: 2%;
  position: relative;
  z-index; 100;
`;

export const Circle = styled.div<GrooveProps>`
  width: ${({ diameter }) => diameter}rem;
  height: ${({ diameter }) => diameter}rem;
  border-radius: 50%;
  ${({ color }) => (color ? `background-color: ${color};` : ``)}
  border: 1px solid #444;
`;

export const Overlay = styled.div`
  background-color: ${(props) => getColors(props.theme).background};
  position: absolute;
  opacity: 0;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  animation: ${fadeIn} 2s ease forwards 1s;
`;

export const TextContainer = styled.div`
  position: absolute;
  top: 2rem;
  right: 0;
  max-width: 300px;
  margin-right: 1rem;
  padding: 1rem;
  text-align: center;
`;

export const StyledHeading = styled(Heading)`
  color: ${({ theme }) => getColors(theme).white};
  animation: ${fadeIn};
`;

export const StyledText = styled(Text)`
  color: ${({ theme }) => getColors(theme).white};
  animation: ${fadeInText};
`;
