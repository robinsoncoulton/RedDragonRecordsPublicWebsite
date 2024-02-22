import styled from "styled-components";
import "../../Fonts/powdwrk5.ttf";
import { getColors } from "../../Styles/colors";

export const StyledHeader = styled.div`
  background-color: ${(props) => {
    return getColors(props.theme).background;
  }};
  position: relative;
  top: 0;
  display: flex;
  justify-content: space-between;
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
