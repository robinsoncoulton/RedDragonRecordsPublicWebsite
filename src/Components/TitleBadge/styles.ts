import styled from "styled-components";
import { getColors } from "../../Styles/colors";

export const Container = styled.div`
  border: 1px solid ${(props) => getColors(props.theme).text};
`;

export const Badge = styled.img``;

export const Title = styled.h1`
  font-family: "Chinglish1";
  color: white;
`;
