import styled from "styled-components";
import { getColors } from "../../Styles/colors";
export const Container = styled.div`
  color: ${({ theme }) => getColors(theme).text};
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  padding-top: 2rem;
`;

export const ImageContainer = styled.div`
  width: 100vw;
  height: 200px;
  position: absolute;
  top: -3rem;
  z-index: -1;
  opacity: 0.2;
`;

export const Image = styled.img`
  objectfit: contain;
  width: 100%;
  max-width: 200px;
  @keyframes rotation {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(359deg);
    }
  }
  animation: rotation 12s infinite linear;
`;

export const BorderedText = styled.p`
  size: 1.5rem;
  border: 1px solid ${({ theme }) => getColors(theme).text};
  padding: 1.4rem 1rem 1rem 1rem;
  margin-top: 1rem;
  text-align: center;
`;

export const Link = styled.a`
  text-decoration: none;
  font-size: 1.5rem;
  color: ${({ theme }) => getColors(theme).text};
`;

interface TextProps {
  left?: boolean;
}

export const Text = styled.p<TextProps>`
  margin-top: 1rem;
  text-align: ${({ left }) => (left ? "left" : "center")};
`;

export const Card = styled.div`
  padding: 1rem;
`;
