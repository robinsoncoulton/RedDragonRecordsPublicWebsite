import styled, { keyframes } from "styled-components";
import { getColors } from "../../Styles/colors";
import { CardContainerProps } from "./types";

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
  height: 12rem;
  margin: 2rem 0;
  border: 1px solid ${(props) => getColors(props.theme).accent};
  color: ${(props) => getColors(props.theme).text};
  display: flex;
  opacity: 0;

  animation: ${fadeIn} 2s ease forwards
    ${({ animationDelay }) => (animationDelay ? animationDelay : 0)}s;
`;

export const ImageWrapper = styled.div`
  height: 100%;
  width: 24rem;
  background-color: ${(props) => getColors(props.theme).accent};
  border: none;
  flex: 0 0 auto;
`;

export const TextWrapper = styled.div`
  display: block;
  padding: 2rem;
  color: ${(props) => getColors(props.theme).text};
  h2,
  p {
    transition: color 0s ease;
  }
`;

export const Image = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;
