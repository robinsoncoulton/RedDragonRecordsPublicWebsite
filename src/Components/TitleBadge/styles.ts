import styled from "styled-components";
import { getColors } from "../../Styles/colors";
import { ThemedElementProps } from "../../Theme/types";

export const Container = styled.div<ThemedElementProps>`
  border: 0.25rem solid ${(props) => getColors(props.theme).text};
  background-color: ${(props) => getColors(props.theme).background};
  box-sizing: border-box;
  height: min-content;
  padding: 0 1rem;
`;

export const Badge = styled.img`
  height: min-content;
`;

export const Title = styled.h1<ThemedElementProps>`
  font-family: "Chinglish1";
  color: ${(props) => getColors(props.theme).text};
  font-size: 4rem;
`;
