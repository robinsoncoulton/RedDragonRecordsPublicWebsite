import styled from "styled-components";
import { designTokens } from "../../DesignSystem";

export const StyledHero = styled.img`
  width: 100%;
`;

export const StyledIframe = styled.iframe`
  width: ${designTokens.breakpoint.xxl} !important;
  height: 65.625rem !important;
  margin: ${designTokens.spacing.none} !important;
`;

export const CarouselContainer = styled.div`
  width: 100%;
  height: 100%;
`;

interface CardProps {
  verticalOffsetType?: "top" | "bottom";
  verticalOffset?: string;
  horizontalOffsetType?: "right" | "left";
  horizontalOffset?: string;
}

export const CarouselCard = styled.div<CardProps>`
  position: absolute;
  right: ${(props) =>
    props.horizontalOffsetType === "right" && props.horizontalOffset
      ? `${props.horizontalOffset}px`
      : "unset"};
  left: ${(props) =>
    props.horizontalOffsetType === "left" && props.horizontalOffset
      ? `${props.horizontalOffset}px`
      : "unset"};
  top: ${(props) =>
    props.verticalOffsetType === "top" && props.verticalOffset
      ? `${props.verticalOffset}px`
      : "unset"};
  bottom: ${(props) =>
    props.verticalOffsetType === "bottom" && props.verticalOffset
      ? `${props.verticalOffset}px`
      : "unset"};
  z-index: ${designTokens.zIndex.raised};
  padding: ${designTokens.spacing["4xl"]};
  color: #fff;
  max-width: 31.25rem;
  word-wrap: wrap;
`;
export const CarouselCardText = styled.p`
  color: #fff;
`;