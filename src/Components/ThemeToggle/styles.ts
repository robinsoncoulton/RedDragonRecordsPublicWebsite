import { getColors } from "./../../Styles/colors";
import styled, { css } from "styled-components";
import { ElementProps } from "./types";
import { Theme } from "../../Theme/types";

export const Container = styled.button<ElementProps>`
  width: 2rem;
  height: 50px;
  position: relative;
  background-color: ${(props) => getColors(props.theme).background};
  border: none;
  direction: rtl;
  cursor: pointer;
`;

export const Sun = styled.div<ElementProps>`
  width: 1.5rem;
  height: 1.5rem;
  margin: 0;
  padding: 0;
  border-radius: 15px;
  position: absolute;
  z-index: 1;
  top: 1rem;
  box-sizing: border-box;

  ${(props) =>
    props.theme === Theme.LIGHT &&
    css`
      background-color: ${(props) => getColors(props.theme).background};
      right: 0;
      box-shadow: 0px 0px 2px 2px
        ${(props) => getColors(props.theme).accentLight};
      transition: background-color 0.3s ease 0.3s, right 0.3s ease,
        box-shadow 0.3s ease 0.5s;
    `}

  ${(props) =>
    props.theme === Theme.DARK &&
    css`
      background-color: ${(props) => getColors(props.theme).background};
      right: 0.5rem;
      transition: background-color 0.3s ease, right 0.3s ease 0.3s,
        box-shadow 0.3s ease;
    `}
`;

export const Moon = styled.div<ElementProps>`
  width: 1.5rem;
  height: 1.5rem;
  margin: 0;
  padding: 0;
  border-radius: 15px;
  background-color: ${(props) => getColors(props.theme).text};
  box-sizing: border-box;
  position: absolute;
  top: 1rem;
`;
