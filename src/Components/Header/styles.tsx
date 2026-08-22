import styled, { css } from "styled-components";
import { designTokens, layoutMedia } from "../../DesignSystem";
import { getColors } from "../../Styles/colors";
import { ThemedElementProps } from "../../Utils/Theme/types";

const mobileHeaderInset = designTokens.spacing.sm;

const maskGradient = css`
  -webkit-mask-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, var(--header-m0)) 0%,
    rgba(0, 0, 0, var(--header-m1)) var(--header-fade-start),
    rgba(0, 0, 0, var(--header-m2)) 100%
  );
  mask-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, var(--header-m0)) 0%,
    rgba(0, 0, 0, var(--header-m1)) var(--header-fade-start),
    rgba(0, 0, 0, var(--header-m2)) 100%
  );
`;

export const StyledHeader = styled.div<{
  $isPastThreshold: boolean;
  $forceOpaque: boolean;
}>`
  @property --header-fade-start {
    syntax: "<percentage>";
    inherits: false;
    initial-value: 100%;
  }
  @property --header-m0 {
    syntax: "<number>";
    inherits: false;
    initial-value: 1;
  }
  @property --header-m1 {
    syntax: "<number>";
    inherits: false;
    initial-value: 1;
  }
  @property --header-m2 {
    syntax: "<number>";
    inherits: false;
    initial-value: 0;
  }
  --header-fade-start: 100%;
  --header-m0: ${({ $isPastThreshold, $forceOpaque }) =>
    $isPastThreshold && !$forceOpaque ? 0.5 : 1};
  --header-m1: ${({ $isPastThreshold, $forceOpaque }) =>
    $isPastThreshold && !$forceOpaque ? 0.25 : 1};
  --header-m2: ${({ $isPastThreshold, $forceOpaque }) =>
    $isPastThreshold && !$forceOpaque ? 0.25 : 0};
  --header-fade-duration: ${({ $isPastThreshold, $forceOpaque }) =>
    !$isPastThreshold || $forceOpaque ? "0.14s" : "0.35s"};
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: ${designTokens.size.contentMax};
  box-sizing: border-box;
  padding-top: env(safe-area-inset-top, 0px);
  overflow: hidden;
  display: flex;
  align-items: center;
  z-index: 2003;
  ${maskGradient}
  transition: --header-fade-start var(--header-fade-duration) ease-in-out,
    --header-m0 var(--header-fade-duration) ease-in-out,
    --header-m1 var(--header-fade-duration) ease-in-out,
    --header-m2 var(--header-fade-duration) ease-in-out;
  :hover {
    --header-fade-start: ${({ $isPastThreshold, $forceOpaque }) =>
      $isPastThreshold && !$forceOpaque ? "90%" : "100%"};
    --header-m0: 1;
    --header-m1: 1;
    --header-m2: 0;
  }
`;

export const HeaderContent = styled.div<{ $sideInsetPx: number }>`
  position: relative;
  z-index: 1;
  --header-side-inset: ${({ $sideInsetPx }) => `${$sideInsetPx}px`};
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  ${layoutMedia.headerDesktop} {
    --header-side-inset: 0px;
  }
`;

export const HeaderSide = styled.div<{ align: "left" | "right" }>`
  flex: 0 0 auto;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: ${(props) =>
    props.align === "left" ? "flex-start" : "flex-end"};
  position: relative;
  z-index: ${designTokens.zIndex.overlay};
  min-width: 0;
  padding-top: ${mobileHeaderInset};
  padding-bottom: ${mobileHeaderInset};
  ${(props) =>
    props.align === "left"
      ? css`
          padding-left: max(
            env(safe-area-inset-left, 0px),
            ${mobileHeaderInset}
          );
          padding-right: 0;
        `
      : css`
          padding-left: 0;
          padding-right: max(
            env(safe-area-inset-right, 0px),
            ${mobileHeaderInset}
          );
        `}
  ${layoutMedia.headerDesktop} {
    padding: ${designTokens.spacing.lg} ${designTokens.spacing.xl};
  }
`;

export const HeaderLogo = styled.img`
  width: ${designTokens.size.brandLogo};
  height: ${designTokens.size.brandLogo};
`;

export const Title = styled.h1`
  font-family: "MyFont";
  font-size: ${designTokens.fontSize["6xl"]};
`;

export const TitleLogoContainer = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: max(calc(100% - (var(--header-side-inset) * 2)), 0px);
  padding-top: ${designTokens.spacing.none};
  padding-bottom: ${designTokens.spacing.none};
  padding-left: ${designTokens.spacing.xs};
  padding-right: ${designTokens.spacing.xs};
  z-index: ${designTokens.zIndex.overlay};
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  > * {
    max-width: 100%;
  }
  ${layoutMedia.headerDesktop} {
    position: relative;
    top: auto;
    bottom: auto;
    left: auto;
    transform: none;
    width: auto;
    padding: ${designTokens.spacing.lg};
    pointer-events: auto;
  }
`;

export const LanguageThemeContainer = styled.div`
  height: min-content;
  width: min-content;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${designTokens.spacing.sm};
`;

export const MobileOnly = styled.div`
  display: flex;
  align-items: center;
  justify-content: inherit;
  ${layoutMedia.headerDesktop} {
    display: none;
  }
`;

export const DesktopOnly = styled.div`
  display: none;
  ${layoutMedia.headerDesktop} {
    display: flex;
    align-items: center;
  }
`;

export const HeaderIconButton = styled.button<ThemedElementProps>`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  width: ${designTokens.size.controlMd};
  height: ${designTokens.size.controlMd};
  padding: 0;
  margin: 0;
  border: 0;
  background: transparent;
  color: ${(props) => getColors(props.theme).text};
  cursor: pointer;
  border-radius: ${designTokens.radius.md};
  flex-shrink: 0;

  &:focus-visible {
    outline: ${designTokens.borderWidth.regular} solid
      ${(props) => getColors(props.theme).accent};
    outline-offset: 2px;
  }
`;

export const BurgerBar = styled.span`
  display: block;
  width: 1.25rem;
  height: 2px;
  background: currentColor;
  border-radius: ${designTokens.radius.pill};
`;

export const MobileNavBackdrop = styled.button`
  position: fixed;
  inset: 0;
  top: var(--header-portal-top, calc(env(safe-area-inset-top, 0px) + 4.75rem));
  z-index: 2500;
  border: 0;
  padding: 0;
  margin: 0;
  cursor: pointer;
  background: rgba(0, 0, 0, 0.45);
`;

export const MobileNavPanel = styled.nav<ThemedElementProps>`
  position: fixed;
  top: var(--header-portal-top, calc(env(safe-area-inset-top, 0px) + 4.75rem));
  left: 0;
  bottom: 0;
  z-index: 2501;
  width: min(17.5rem, 86vw);
  box-sizing: border-box;
  background: ${(props) => getColors(props.theme).background};
  border-right: ${designTokens.borderWidth.strong} solid
    ${(props) => getColors(props.theme).text};
  box-shadow: ${designTokens.shadow.md};
  padding: ${designTokens.spacing.xl} ${designTokens.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${designTokens.spacing.xs};
`;

export const MobileNavLink = styled.button<ThemedElementProps & { $active: boolean }>`
  text-align: left;
  font-size: ${designTokens.fontSize.lg};
  line-height: ${designTokens.lineHeight.compact};
  padding: ${designTokens.spacing.md} ${designTokens.spacing.sm};
  border: 0;
  background: transparent;
  color: ${(props) => getColors(props.theme).text};
  cursor: pointer;
  opacity: ${(props) => (props.$active ? 1 : 0.72)};
  border-radius: ${designTokens.radius.sm};

  &:hover {
    opacity: 1;
  }
`;

export const OptionsBackdrop = styled.button`
  position: fixed;
  inset: 0;
  z-index: 2498;
  border: 0;
  padding: 0;
  margin: 0;
  cursor: pointer;
  background: rgba(0, 0, 0, 0.35);
`;

export const OptionsMenuPanel = styled.div<ThemedElementProps>`
  position: fixed;
  z-index: 2499;
  top: calc(
    var(--header-portal-top, calc(env(safe-area-inset-top, 0px) + 4.75rem)) +
      ${designTokens.spacing.xs}
  );
  right: max(env(safe-area-inset-right, 0px), ${mobileHeaderInset});
  min-width: 12rem;
  max-width: min(18rem, 92vw);
  box-sizing: border-box;
  padding: ${designTokens.spacing.lg};
  background: ${(props) => getColors(props.theme).background};
  border: ${designTokens.borderWidth.strong} solid
    ${(props) => getColors(props.theme).text};
  box-shadow: ${designTokens.shadow.lg};
  display: flex;
  flex-direction: column;
  gap: ${designTokens.spacing.lg};
  align-items: stretch;
`;

export const OptionsMenuLabel = styled.span<ThemedElementProps>`
  font-size: ${designTokens.fontSize.xs};
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: ${(props) => getColors(props.theme).textMuted};
`;

export const CogIconSvg = styled.svg`
  width: ${designTokens.size.iconMd};
  height: ${designTokens.size.iconMd};
  flex-shrink: 0;
`;
