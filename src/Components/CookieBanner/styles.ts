import styled from "styled-components";
import { Link } from "react-router-dom";
import { designTokens, media } from "../../DesignSystem";
import { getColors } from "../../Styles/colors";
import { ThemedElementProps } from "../../Utils/Theme/types";

export const Banner = styled.div<ThemedElementProps>`
  position: fixed;
  left: ${designTokens.spacing.md};
  right: ${designTokens.spacing.md};
  bottom: calc(${designTokens.spacing.md} + env(safe-area-inset-bottom, 0px));
  z-index: 3000;
  display: flex;
  flex-direction: column;
  gap: ${designTokens.spacing.md};
  padding: ${designTokens.spacing.lg};
  background: ${({ theme }) => getColors(theme).surface};
  color: ${({ theme }) => getColors(theme).text};
  border: ${designTokens.borderWidth.thin} solid
    ${({ theme }) => getColors(theme).border};
  border-radius: ${designTokens.radius.md};
  box-shadow: ${designTokens.shadow.lg};
  ${media.md} {
    left: 50%;
    right: auto;
    width: min(42rem, calc(100vw - ${designTokens.spacing["3xl"]}));
    transform: translateX(-50%);
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

export const BannerCopy = styled.p`
  margin: 0;
  font-size: ${designTokens.fontSize.sm};
  line-height: ${designTokens.lineHeight.normal};
`;

export const BannerLink = styled(Link)<ThemedElementProps>`
  color: ${({ theme }) => getColors(theme).primary};
  margin-left: ${designTokens.spacing.xs};
`;

export const BannerActions = styled.div`
  display: flex;
  flex-shrink: 0;
  gap: ${designTokens.spacing.sm};
`;

export const BannerButton = styled.button<ThemedElementProps & { $primary?: boolean }>`
  border: ${designTokens.borderWidth.thin} solid
    ${({ theme }) => getColors(theme).primary};
  background: ${({ theme, $primary }) =>
    $primary ? getColors(theme).primary : "transparent"};
  color: ${({ theme, $primary }) =>
    $primary ? getColors(theme).background : getColors(theme).primary};
  border-radius: ${designTokens.radius.md};
  padding: ${designTokens.spacing.sm} ${designTokens.spacing.lg};
  font-size: ${designTokens.fontSize.xs};
  letter-spacing: 0.08em;
  text-transform: uppercase;
  cursor: pointer;
`;
