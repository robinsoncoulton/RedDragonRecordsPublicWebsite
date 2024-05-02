import styled from "styled-components";
import { ThemedElementProps } from "../../Theme/types";
import { getColors } from "../../Styles/colors";

const borderSize = 1;
const borderBottomSize = 8;

export const Background = styled.div<ThemedElementProps>`
  display: flex;
  justify-content: center;
  margin: 0;
`;

export const Wrapper = styled.div`
  background-color: ${(props) => getColors(props.theme).background};
  box-sizing: border-box;
  padding: ${borderSize}rem ${borderSize * 2.5}rem;
  width: 100%;
  padding-bottom: 10rem;
  position: relative;
  z-index: -1;
`;

const BorderShape = styled.div<ThemedElementProps>`
  position: fixed;

  background-color: ${(props) => getColors(props.theme).frameColor};
`;

const BorderHorizontalShape = styled(BorderShape)`
  width: 100%;
  height: ${borderSize}rem;
`;

const BorderVerticalShape = styled(BorderShape)`
  height: 100%;
  width: ${borderSize}rem;
`;

export const Top = styled(BorderHorizontalShape)`
  top: 0;
  left: 0;
`;
export const Right = styled(BorderVerticalShape)`
  top: 0;
  right: 0;
`;
export const Bottom = styled(BorderHorizontalShape)`
  height: ${borderBottomSize}rem;
  bottom: 0;
  right: 0;
`;
export const Left = styled(BorderVerticalShape)`
  top: 0;
  left: 0;
`;

const BorderCorner = styled.div<ThemedElementProps>`
  position: fixed;
  width: ${borderSize}rem;
  height: ${borderSize}rem;
  margin: ${borderSize}rem;
  border: 3px solid ${(props) => getColors(props.theme).borderOuterColor};
  background-color: ${(props) => getColors(props.theme).frameColor};
`;

export const TopLeft = styled(BorderCorner)`
  left: 0;
  top: 0;
  border-top: none;
  border-left: none;
`;
export const TopRight = styled(BorderCorner)`
  top: 0;
  right: 0;
  border-top: none;
  border-right: none;
`;
export const BottomRight = styled(BorderCorner)`
  bottom: ${borderBottomSize - borderSize}rem;
  right: 0;
  border-bottom: none;
  border-right: none;
`;
export const BottomLeft = styled(BorderCorner)`
  bottom: ${borderBottomSize - borderSize}rem;
  left: 0;
  border-bottom: none;
  border-left: none;
`;

export const Border = styled.div`
  position: fixed;
  top: 1rem;
  border: 3px solid ${(props) => getColors(props.theme).borderOuterColor};
  width: calc(100vw - ${borderSize * 2}rem - 6px);
  height: calc(100% - ${borderBottomSize + borderSize}.4rem); //subdivision hack
`;

export const InnerTop = styled(Top)`
  margin-top: ${borderSize / 2}rem;
  background-color: ${(props) => getColors(props.theme).borderCenter};
`;
export const InnerRight = styled(Right)`
  margin-right: ${borderSize / 2}rem;
  background-color: ${(props) => getColors(props.theme).borderCenter};
`;
export const InnerBottom = styled(Bottom)`
  margin-bottom: ${borderSize / 2}rem;
  background-color: ${(props) => getColors(props.theme).borderCenter};
`;
export const InnerLeft = styled(Left)`
  margin-left: ${borderSize / 2}rem;
  background-color: ${(props) => getColors(props.theme).borderCenter};
`;
export const InnerBorder = styled(Border)`
  border: 3px solid ${(props) => getColors(props.theme).borderInnerColor};
  width: calc(100vw - ${borderSize * 3}rem - 6px);
  height: calc(100% - ${borderBottomSize + borderSize * 2}.4rem);
  top: ${borderSize * 1.5}rem;
`;

export const InnerTopLeft = styled(TopLeft)`
  left: ${borderSize / 2}rem;
  top: ${borderSize / 2}rem;
  background-color: ${(props) => getColors(props.theme).borderCenter};
  border-color: ${(props) => getColors(props.theme).borderInnerColor};
`;
export const InnerTopRight = styled(TopRight)`
  right: ${borderSize / 2}rem;
  top: ${borderSize / 2}rem;
  background-color: ${(props) => getColors(props.theme).borderCenter};
  border-color: ${(props) => getColors(props.theme).borderInnerColor};
`;
export const InnerBottomRight = styled(BottomRight)`
  right: ${borderSize / 2}rem;
  bottom: ${borderBottomSize - borderSize / 2}rem;
  background-color: ${(props) => getColors(props.theme).borderCenter};
  border-color: ${(props) => getColors(props.theme).borderInnerColor};
`;
export const InnerBottomLeft = styled(BottomLeft)`
  left: ${borderSize / 2}rem;
  bottom: ${borderBottomSize - borderSize / 2}rem;
  background-color: ${(props) => getColors(props.theme).borderCenter};
  border-color: ${(props) => getColors(props.theme).borderInnerColor};
`;

const WordContainer = styled.div`
  background-color: ${(props) => getColors(props.theme).borderCenter};
  // position: fixed;
  padding: ${borderSize};
  border: none;
  top: 1px;
  position: relative;
`;

export const HeadingContainerSpacer = styled.div`
  position: fixed;
  bottom: ${borderBottomSize - 1.1}rem;
  width: 200px;
`;

export const Heading = styled.h1`
  font-family: "Chinglish1", "Chinese1";
  size: 4rem;
  text-align: center;
  color: white;
`;

export const RedContainer = styled(WordContainer)`
  bottom: ${borderBottomSize};
  border 3px solid ${(props) => getColors(props.theme).borderInnerColor};
  border-bottom: none;
  height: 2rem;
  color: none;
`;
export const DragonContainer = styled(WordContainer)`
  bottom: ${borderBottomSize};
  height: ${borderSize / 2 - 0.2}rem;
`;
export const RecordsContainer = styled(WordContainer)`
  bottom: ${borderBottomSize};
  border 3px solid ${(props) => getColors(props.theme).borderOuterColor};
  border-top: none;
`;

export const OverlayTextContainer = styled.div`
  width: 100%;
  height: min-content;
  position: absolute;
  top: 0;
  text-align: center;
`;

const OverlayHeader = styled(Heading)`
  position: relative;
  background-color: ${(props) => getColors(props.theme).borderCenter};
  color: ${(props) => getColors(props.theme).text};
`;

export const OverlayHeaderRed = styled(OverlayHeader)`
  top: calc(-1.1rem);
  border: 3px solid ${(props) => getColors(props.theme).borderInnerColor};
  border-bottom: none;
  width: min-content;
  margin: auto;
  width: 90px;
  font-size: 2rem;
  top: calc(-2.4rem + 1px);
`;

export const OverlayHeaderDragon = styled(OverlayHeader)`
  top: 1rem;
  width: min-content;
  margin: 0 auto;
  font-size: calc(3.2rem);
  top: -${borderSize * 2.3}rem;
  max-width: min-content;
`;

export const OverlayHeaderRecords = styled(OverlayHeader)`
  border: 3px solid ${(props) => getColors(props.theme).borderOuterColor};
  border-top: none;
  bottom: -1.1rem;
  width: 150px;
  margin: auto;
  font-size: 1.75rem;
  top calc(-3rem + 5px);
`;

export const EmailTo = styled.a`
  text-decoration: none;
  color: ${(props) => getColors(props.theme).text};
  font-family: "Chinese1";
  font-size: 1rem;
  :hover {
    color: red;
  }

  height: min-content;
  width: min-content;
  display: flex;
  flex-direction: row;
  position: fixed;
  bottom: 0;
  left: 0;
  margin-left: 1rem;
  margin-bottom: 2.5rem;
  background-color: none;
`;

export const LayoutWrapper = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;
// export const Border = styled.div``;

// /* Extra small devices (phones, 600px and down) */
// @media only screen and (max-width: 600px) {

// }

// /* Small devices (portrait tablets and large phones, 600px and up) */
// @media only screen and (min-width: 600px) {

// }

// /* Medium devices (landscape tablets, 768px and up) */
// @media only screen and (min-width: 768px) {

// }

// /* Large devices (laptops/desktops, 992px and up) */
// @media only screen and (min-width: 992px) {

// }

// /* Extra large devices (large laptops and desktops, 1200px and up) */
// @media only screen and (min-width: 1200px) {

// }
