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
  background: color-mix(
    in srgb,
    ${({ theme }) => getColors(theme).surfaceMuted}
      calc(100% - var(--energy, 0) * 16%),
    ${({ theme }) => getColors(theme).primary}
  );
  border: ${designTokens.borderWidth.thin} solid
    color-mix(
      in srgb,
      ${({ theme }) => getColors(theme).border} calc(100% - var(--pulse, 0) * 32%),
      ${({ theme }) => getColors(theme).primary}
    );
  box-shadow: 0 0 calc(0.2rem + var(--pulse, 0) * 1.15rem)
    color-mix(
      in srgb,
      ${({ theme }) => getColors(theme).primary} calc(var(--pulse, 0) * 28%),
      transparent
    );
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

export const WaveformStack = styled.div<ThemedElementProps>`
  position: relative;
  width: 100%;
  overflow: hidden;
  cursor: pointer;
  background: ${({ theme }) => getColors(theme).background};
  border: ${designTokens.borderWidth.thin} solid ${({ theme }) => getColors(theme).border};
  touch-action: none;
`;

export const WaveformArea = styled.div`
  position: relative;
`;

export const WaveformOverlay = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
`;

export const WaveformCanvas = styled.canvas`
  display: block;
  width: 100%;
  vertical-align: top;
`;

export const WaveformLabels = styled.div<{ $rows: number }>`
  position: absolute;
  inset: 0;
  display: grid;
  grid-template-rows: repeat(${({ $rows }) => $rows}, 1fr);
  pointer-events: none;
`;

export const WaveformLabel = styled.span<ThemedElementProps & { $active?: boolean }>`
  display: flex;
  align-items: flex-start;
  padding: ${designTokens.spacing.xs} ${designTokens.spacing.sm};
  font-size: ${designTokens.fontSize.xs};
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme, $active }) =>
    $active ? getColors(theme).primary : getColors(theme).textMuted};
`;

export const MeterStack = styled.div`
  display: grid;
  gap: ${designTokens.spacing.xs};
  width: 100%;
`;

export const MeterRow = styled.div`
  display: grid;
  grid-template-columns: 0.9rem 1fr;
  align-items: center;
  gap: ${designTokens.spacing.sm};
`;

export const MeterLabel = styled.span`
  font-size: ${designTokens.fontSize.xs};
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

export const MeterTrack = styled.div<ThemedElementProps>`
  position: relative;
  height: 0.55rem;
  overflow: hidden;
  background: ${({ theme }) => getColors(theme).background};
  border: ${designTokens.borderWidth.thin} solid ${({ theme }) => getColors(theme).border};
`;

export const MeterFill = styled.span<ThemedElementProps>`
  display: block;
  width: 100%;
  height: 100%;
  transform: scaleX(0);
  transform-origin: left center;
  background: linear-gradient(
    90deg,
    ${({ theme }) => getColors(theme).success} 0%,
    ${({ theme }) => getColors(theme).brandHighlight} 68%,
    ${({ theme }) => getColors(theme).primary} 100%
  );
`;

export const MeterHold = styled.span<ThemedElementProps>`
  position: absolute;
  top: 0;
  left: 0;
  width: 0.125rem;
  height: 100%;
  margin-left: -0.0625rem;
  background: ${({ theme }) => getColors(theme).text};
`;
