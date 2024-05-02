import styled from "styled-components";
import { getColors } from "../../Styles/colors";
import { ThemedElementProps } from "../../Theme/types";

interface DualLanguageElement extends ThemedElementProps {
  chinese?: boolean;
}

export const Container = styled.div<ThemedElementProps>`
  border: 0.25rem solid ${(props) => getColors(props.theme).text};
  background-color: ${(props) => getColors(props.theme).background};
  box-sizing: border-box;
  height: min-content;
  padding: 1rem;
  margin: 1rem;
  width: 100%;
`;

export const Badge = styled.img`
  height: min-content;
`;

export const Title = styled.div<DualLanguageElement>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  size: 2rem;

  :last-child {
    flex-grow: 1;
  }

  h1 {
    font-family: "Chinglish1", "Chinese1";
    color: ${(props) => getColors(props.theme).text};
  }
`;

export const Word = styled.h1<DualLanguageElement>``;

export const WordWrapper = styled.div<DualLanguageElement>``;
