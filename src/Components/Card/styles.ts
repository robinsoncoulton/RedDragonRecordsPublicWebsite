import styled, { keyframes } from "styled-components";
import { getColors } from "../../Styles/colors";
import { CardContainerProps } from "./types";
import { designTokens } from "../../DesignSystem";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const Container = styled.div<CardContainerProps>`
  width: 100%;
  height: ${designTokens.size.cardHeight};
  margin: ${designTokens.spacing.xxl} ${designTokens.spacing.none};
  border: ${designTokens.borderWidth.thin} solid
    ${(props) => getColors(props.theme).border};
  color: ${(props) => getColors(props.theme).text};
  display: flex;
  opacity: 0;

  animation: ${fadeIn} 2s ${designTokens.easing.standard} forwards
    ${({ animationDelay }) => (animationDelay ? animationDelay : 0)}s;
`;

export const ImageWrapper = styled.div`
  height: 100%;
  width: ${designTokens.size.imageRailWidth};
  border: none;
  flex: 0 0 auto;
`;

export const TextWrapper = styled.div`
  display: block;
  padding: ${designTokens.spacing.xxl};
  color: ${(props) => getColors(props.theme).text};
  h2,
  p {
    transition: color ${designTokens.duration.instant}
      ${designTokens.easing.standard};
  }
`;

export const Image = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;
