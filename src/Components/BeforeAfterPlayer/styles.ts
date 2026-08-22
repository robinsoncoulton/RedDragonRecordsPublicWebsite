import styled from "styled-components";
import { designTokens } from "../../DesignSystem";
import { getColors } from "../../Styles/colors";
import { ThemedElementProps } from "../../Utils/Theme/types";

export const Shell = styled.div<ThemedElementProps>`
  display: grid;
  gap: ${designTokens.spacing.md};
  width: 100%;
  max-width: 36rem;
  padding: ${designTokens.spacing.lg};
  box-sizing: border-box;
  color: ${({ theme }) => getColors(theme).text};
  background: ${({ theme }) => getColors(theme).surfaceMuted};
  border: ${designTokens.borderWidth.thin} solid ${({ theme }) => getColors(theme).border};
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  gap: ${designTokens.spacing.sm};
  flex-wrap: wrap;
`;

export const ControlButton = styled.button<ThemedElementProps & { $active?: boolean }>`
  appearance: none;
  border: ${designTokens.borderWidth.thin} solid
    ${({ theme, $active }) =>
      $active ? getColors(theme).primary : getColors(theme).primary};
  background: ${({ theme, $active }) =>
    $active ? getColors(theme).primary : "transparent"};
  color: ${({ theme, $active }) =>
    $active ? getColors(theme).background : getColors(theme).primary};
  min-width: 5.5rem;
  height: 2.5rem;
  padding: 0 ${designTokens.spacing.md};
  font-family: var(--font-body);
  font-size: ${designTokens.fontSize.sm};
  letter-spacing: 0.06em;
  text-transform: uppercase;
  cursor: pointer;
  transition: background ${designTokens.duration.fast} ${designTokens.easing.standard},
    color ${designTokens.duration.fast} ${designTokens.easing.standard};

  &:hover {
    background: ${({ theme }) => getColors(theme).primary};
    color: ${({ theme }) => getColors(theme).background};
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

export const SideToggle = styled.div<ThemedElementProps>`
  display: inline-flex;
  max-width: 100%;
  overflow-x: auto;
  border: ${designTokens.borderWidth.thin} solid ${({ theme }) => getColors(theme).border};
`;

export const SideButton = styled.button<ThemedElementProps & { $active?: boolean }>`
  appearance: none;
  border: 0;
  margin: 0;
  min-width: 4.5rem;
  height: 2.5rem;
  padding: 0 ${designTokens.spacing.md};
  font-family: var(--font-body);
  font-size: ${designTokens.fontSize.sm};
  letter-spacing: 0.06em;
  text-transform: uppercase;
  white-space: nowrap;
  cursor: pointer;
  color: ${({ theme, $active }) =>
    $active ? getColors(theme).background : getColors(theme).text};
  background: ${({ theme, $active }) =>
    $active ? getColors(theme).primary : "transparent"};
  transition: background ${designTokens.duration.fast} ${designTokens.easing.standard},
    color ${designTokens.duration.fast} ${designTokens.easing.standard};
`;

export const CarouselNav = styled.div`
  display: flex;
  align-items: center;
  gap: ${designTokens.spacing.sm};
  width: 100%;
  min-width: 0;

  ${SideToggle} {
    flex: 1;
    min-width: 0;
  }
`;

export const NavButton = styled.button<ThemedElementProps>`
  appearance: none;
  border: ${designTokens.borderWidth.thin} solid ${({ theme }) => getColors(theme).primary};
  background: transparent;
  color: ${({ theme }) => getColors(theme).primary};
  min-width: 3.5rem;
  height: 2.5rem;
  padding: 0 ${designTokens.spacing.sm};
  font-family: var(--font-body);
  font-size: ${designTokens.fontSize.sm};
  letter-spacing: 0.06em;
  text-transform: uppercase;
  cursor: pointer;
  flex-shrink: 0;
  transition: background ${designTokens.duration.fast} ${designTokens.easing.standard},
    color ${designTokens.duration.fast} ${designTokens.easing.standard};

  &:hover:not(:disabled) {
    background: ${({ theme }) => getColors(theme).primary};
    color: ${({ theme }) => getColors(theme).background};
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

export const StepDots = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  gap: ${designTokens.spacing.xs};
  flex-wrap: wrap;
`;

export const StepDot = styled.button<ThemedElementProps & { $active?: boolean }>`
  appearance: none;
  border: 0;
  margin: 0;
  width: 0.55rem;
  height: 0.55rem;
  padding: 0;
  border-radius: ${designTokens.radius.pill};
  cursor: pointer;
  background: ${({ theme, $active }) =>
    $active ? getColors(theme).primary : getColors(theme).accentLight};
`;

export const ActiveLabel = styled.span`
  display: block;
  width: 100%;
  text-align: center;
  font-size: ${designTokens.fontSize.sm};
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

export const VolumeRow = styled.label`
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: ${designTokens.spacing.sm};
  width: 100%;
`;

export const VolumeLabel = styled.span`
  font-size: ${designTokens.fontSize.xs};
  letter-spacing: 0.08em;
  text-transform: uppercase;
  white-space: nowrap;
`;

export const VolumeValue = styled.span`
  font-size: ${designTokens.fontSize.xs};
  letter-spacing: 0.04em;
  min-width: 2.75rem;
  text-align: right;
`;

export const VolumeSlider = styled.input<ThemedElementProps>`
  width: 100%;
  accent-color: ${({ theme }) => getColors(theme).primary};
  cursor: pointer;
`;
