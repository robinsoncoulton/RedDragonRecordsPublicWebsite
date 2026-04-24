import styled, { keyframes } from "styled-components";
import { getColors } from "../../Styles/colors";
import { GrooveProps } from "./types";
import { Heading } from "../Heading/styles";
import { Text } from "../Text/styles";
import { designTokens } from "../../DesignSystem";

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
  height: ${designTokens.size.heroHeight};
  position: relative;
  overflow: hidden;
  margin-bottom: ${designTokens.spacing["6xl"]};
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
  height: ${designTokens.size.heroHeight};
  width: ${designTokens.size.heroHeight};
  border-radius: ${designTokens.radius.round};
  position: absolute;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  animation: ${slideRight} 2s ${designTokens.easing.standard} forwards;
`;

export const Sleeve = styled.img`
  height: ${designTokens.size.heroHeight};
  width: ${designTokens.size.heroHeight};
  border-radius: 2%;
  position: relative;
  z-index: 100;
`;

export const Circle = styled.div<GrooveProps>`
  width: ${({ diameter }) => diameter}rem;
  height: ${({ diameter }) => diameter}rem;
  border-radius: ${designTokens.radius.round};
  position: absolute;
  border: ${designTokens.borderWidth.thin} solid #444;
`;

export const Overlay = styled.div`
  position: absolute;
  opacity: 0;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  animation: ${fadeIn} 2s ${designTokens.easing.standard} forwards 1s;
`;

export const TextContainer = styled.div`
  position: absolute;
  top: ${designTokens.spacing.xxl};
  right: 0;
  max-width: 18.75rem;
  margin-right: ${designTokens.spacing.lg};
  padding: ${designTokens.spacing.lg};
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
