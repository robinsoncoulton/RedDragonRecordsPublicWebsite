import styled from "styled-components";
import "../../Fonts/powdwrk5.ttf";
import { getColors } from "../../Styles/colors";

export const StyledHeader = styled.div`
  background-color: ${(props) => {
    return getColors(props.theme).background;
  }};

  position: relative;
  top: 0;
  margin: 4rem 0 1rem 0;
  display: flex;
  justify-content: space-between;
  align-items: end;
  margin-bottom: 4rem;
`;

export const HeaderLogo = styled.img`
  width: 100px;
  height: 100px;
`;

export const Title = styled.h1`
  font-family: "MyFont";

  font-size: 42pt;
`;

export const TitleLogoContainer = styled.div`
  display: flex;
  > * {
    margin-right: 20px;
  }
  align-items: center;
`;

export const LanguageThemeContainer = styled.div`
  height: min-content;
  width: min-content;
  display: flex;
  flex-direction: row;
`;
