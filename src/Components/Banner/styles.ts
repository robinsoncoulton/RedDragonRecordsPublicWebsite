import styled from "styled-components";
import { TailsInterface } from "./types";
import { getColors } from "../../Styles/colors";

export const Tails = styled.div<TailsInterface>`
  border: 0.25rem solid ${({ theme }) => getColors(theme).text};
  width: 10rem;
  box-sizing: border-box;
  margin-bottom: 1rem;
`;

export const Container = styled.div`
  margin: 2rem;
  color: ${({ theme }) => getColors(theme).text};
  display: flex;
  justify-content: center;
`;

export const Body = styled.div`
  border: 0.25rem solid ${({ theme }) => getColors(theme).text};
  background-color: ${({ theme }) => getColors(theme).background};
  color: ${({ theme }) => getColors(theme).text};
  width: min-content;
  white-space: nowrap;
  padding: 1.5rem 4rem 1rem 4rem;
  font-size: 1.5rem;
  box-sizing: border-box;
  margin-top: 1rem;
  position: absolute;
`;

export const Spacer = styled.div`
  border: 0.25rem solid transparent;
  background-color: ${({ theme }) => getColors(theme).background};
  width: min-content;
  white-space: nowrap;
  padding: 2rem;
  font-size: 1rem;
  box-sizing: border-box;
  opacity: 0;
`;
