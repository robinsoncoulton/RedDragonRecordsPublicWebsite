import styled, { css } from "styled-components";
import { getColors } from "./../../Styles/colors";
import { ThemedElementProps } from "./../../Theme/types";
import { OptionProps } from "./types";

export const Container = styled.div<ThemedElementProps>`
  height: min-content;
  width: min-content;
  padding: 1rem 1rem 1rem 0;
  display: flex;
  flex-wrap: no-wrap;

  button {
    margin-right: 1rem;
  }
  button:last-child {
    margin-right: 0;
  }
`;

export const Option = styled.button<OptionProps>`
  background-color: ${(props) => getColors(props.theme).background};
  color: ${(props) => getColors(props.theme).text};
  white-space: nowrap;
  box-sizing: border-box;
  border-bottom: 3px solid transparent;

  ${(props) =>
    props.selected &&
    css`
      border-bottom: 3px solid ${(props) => getColors(props.theme).text};
    `}

  &:hover {
    cursor: pointer;
    border-bottom: 3px solid ${(props) => getColors(props.theme).text};
    transition: border-color 0.1s ease-in;
  }
`;
