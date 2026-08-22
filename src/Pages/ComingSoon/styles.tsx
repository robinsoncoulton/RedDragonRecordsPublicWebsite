import styled from "styled-components";
import "./fonts.css";
import { designTokens, media } from "../../DesignSystem";
import { getColors } from "../../Styles/colors";
import { ThemedElementProps } from "../../Utils/Theme/types";

export const FullPageImage = styled.div<ThemedElementProps>`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;


  ${media.sm} {
    padding-top: ${designTokens.spacing.xl};
  }
`;

export const Logo = styled.img`
  position: static;
  flex: 0 1 auto;
  max-width: 100%;
  height: min-content;
  object-fit: contain;
  margin-bottom: ${designTokens.spacing["4xl"]};
  overflow: hidden;

  ${media.sm} {
    max-width: 37.5rem;
  }

  @keyframes rotation {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(359deg);
    }
  }
  animation: rotation ${designTokens.duration.spin} infinite linear;
`;

export const Subtext = styled.p<ThemedElementProps>`
  color: ${(props) => getColors(props.theme).primary};
  flex: 1 0 auto;
  font-family: "MyFont2";
  font-size: ${designTokens.fontSize["2xl"]};
  text-align: center;
  bottom: 0;
  padding-bottom: ${designTokens.spacing.xl};

  ${media.sm} {
    font-size: ${designTokens.fontSize["5xl"]};
  }
`;

export const VerticalBanner = styled.div<ThemedElementProps>`
  font-family: Chinese1;
  font-size: 15vw;
  color: ${(props) => getColors(props.theme).primary};
  position: absolute;
  padding: ${designTokens.spacing.none} ${designTokens.spacing.md};
  top: 0;
  right: ${designTokens.spacing["4xl"]};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  ${media.sm} {
    font-size: ${designTokens.fontSize["6xl"]};
  }
`;

export const LogoWrapper = styled.div`
  position: relative;
  min-width: min-content;
  min-height: min-content;
`;

export const Character = styled.p`
  flex: 1 1 auto;
`;

export const EmailTo = styled.a`
  text-decoration: none;
  color: #fff;
  font-family: "MyFont2";
  font-size: ${designTokens.fontSize["2xl"]};
  transition: ${designTokens.duration.normal};
  :hover {
    color: #dc2626;
  }
`;

export const Header = styled.h1<ThemedElementProps>`
  font-family: "Chinglish1";
  color: ${(props) => getColors(props.theme).primary};
  font-size: ${designTokens.fontSize["5xl"]};
  line-height: ${designTokens.lineHeight.tight};
`;
