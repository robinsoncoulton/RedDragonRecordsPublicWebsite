import styled from "styled-components";
import { ThemedElementProps } from "../../Theme/types";
import { getColors } from "../../Styles/colors";

export const Background = styled.div<ThemedElementProps>`
  background-color: ${(props) => getColors(props.theme).background};
  display: flex;
  justify-content: center;
  margin: 0;
  padding: 2rem 0;
  height: 100%;
`;

export const Wrapper = styled.div`
  position: relative;
  margin: 0 1rem;
  padding: 0 6rem;
  width: 100%;
  max-width: 1400px;
  min-height: 90vh;
  box-sizing: border-box;
  background-color: ${(props) => getColors(props.theme).background};
  border: 3px solid ${(props) => getColors(props.theme).accent};
`;

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
