import styled from "styled-components";
import { designTokens, media } from "../../DesignSystem";
import { getColors } from "../../Styles/colors";
import { ThemedElementProps } from "../../Utils/Theme/types";

export const JoinShell = styled.div<ThemedElementProps>`
  width: 100%;
  color: ${({ theme }) => getColors(theme).text};
`;

export const JoinSection = styled.section`
  width: 100%;
  max-width: ${designTokens.size.contentMax};
  margin: 0 auto;
  padding: ${designTokens.spacing.xl};
  box-sizing: border-box;
  ${media.lg} {
    padding: ${designTokens.spacing["5xl"]} ${designTokens.spacing["4xl"]};
  }
`;

export const JoinHeroSection = styled(JoinSection)`
  max-width: ${designTokens.size.proseMax};
  padding-top: ${designTokens.spacing["4xl"]};
  padding-bottom: ${designTokens.spacing["6xl"]};
  ${media.lg} {
    padding-top: ${designTokens.spacing["6xl"]};
    padding-bottom: ${designTokens.spacing["6xl"]};
  }
`;

export const HeroEyebrow = styled.p<ThemedElementProps>`
  font-family: var(--font-body);
  color: ${({ theme }) => getColors(theme).primary};
  font-size: ${designTokens.fontSize.sm};
  letter-spacing: 0.14em;
  text-transform: uppercase;
  text-align: center;
  margin-bottom: ${designTokens.spacing.lg};
`;

export const HeroCtaWrap = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${designTokens.spacing["3xl"]};
`;

export const HeroHeading = styled.h1<ThemedElementProps>`
  font-family: var(--font-subheadline);
  color: ${({ theme }) => getColors(theme).text};
  font-size: ${designTokens.fontSize["4xl"]};
  line-height: ${designTokens.lineHeight.tight};
  margin-bottom: ${designTokens.spacing.lg};
  ${media.lg} {
    font-size: ${designTokens.fontSize["5xl"]};
  }
`;

export const HeroTagline = styled.p<ThemedElementProps>`
  font-family: var(--font-subheadline);
  color: ${({ theme }) => getColors(theme).primary};
  font-size: ${designTokens.fontSize.xl};
  line-height: ${designTokens.lineHeight.compact};
  margin-bottom: ${designTokens.spacing.xl};
  ${media.lg} {
    font-size: ${designTokens.fontSize["2xl"]};
  }
`;

export const HeroIntro = styled.p<ThemedElementProps>`
  font-family: var(--font-body);
  color: ${({ theme }) => getColors(theme).textMuted};
  font-size: ${designTokens.fontSize.lg};
  line-height: ${designTokens.lineHeight.relaxed};
  max-width: 36rem;
  margin-bottom: 0;
`;

export const ScrollCta = styled.button<ThemedElementProps>`
  border: ${designTokens.borderWidth.thin} solid
    ${({ theme }) => getColors(theme).primary};
  color: ${({ theme }) => getColors(theme).primary};
  background: ${({ theme }) => getColors(theme).background};
  border-radius: ${designTokens.radius.md};
  position: relative;
  overflow: hidden;
  padding: ${designTokens.spacing.md} ${designTokens.spacing["4xl"]}
    ${designTokens.spacing.md} ${designTokens.spacing.xl};
  min-width: 14rem;
  font-size: ${designTokens.fontSize.md};
  letter-spacing: 0.08em;
  text-transform: uppercase;
  cursor: pointer;
  transition: color 0.3s cubic-bezier(0.9, 0, 0.1, 1);

  &:hover {
    color: ${({ theme }) => getColors(theme).background};
  }

  &:focus-visible {
    outline: ${designTokens.borderWidth.thin} solid
      ${({ theme }) => getColors(theme).primary};
    outline-offset: 3px;
  }
`;

export const ScrollCtaText = styled.span`
  position: relative;
  z-index: 3;
`;

export const ScrollCtaFill = styled.span<ThemedElementProps>`
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 3.25rem;
  background: ${({ theme }) => getColors(theme).primary};
  border-radius: ${designTokens.radius.md} ${designTokens.radius.md}
    ${designTokens.radius.md} 0;
  z-index: 1;
  transition: width 0.3s cubic-bezier(0.9, 0, 0.1, 1),
    border-radius 0.3s cubic-bezier(0.9, 0, 0.1, 1);
  ${ScrollCta}:hover & {
    width: 100%;
    border-radius: ${designTokens.radius.md};
  }
`;

export const ScrollCtaArrow = styled.span<ThemedElementProps>`
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 3.25rem;
  color: ${({ theme }) => getColors(theme).background};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  z-index: 4;
`;

export const SectionHeading = styled.h2<ThemedElementProps>`
  font-family: var(--font-subheadline);
  color: ${({ theme }) => getColors(theme).primary};
  font-size: ${designTokens.fontSize["2xl"]};
  line-height: ${designTokens.lineHeight.compact};
  margin-bottom: ${designTokens.spacing["3xl"]};
  ${media.lg} {
    font-size: ${designTokens.fontSize["3xl"]};
  }
`;

export const BenefitsGrid = styled.div`
  display: grid;
  gap: ${designTokens.spacing.xl};
  ${media.md} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: ${designTokens.spacing.xxl} ${designTokens.spacing["3xl"]};
  }
`;

export const BenefitItem = styled.article`
  display: flex;
  flex-direction: column;
  gap: ${designTokens.spacing.md};
  padding-top: ${designTokens.spacing.lg};
  border-top: ${designTokens.borderWidth.thin} solid var(--frame-inner-color);
`;

export const BenefitTitle = styled.h3<ThemedElementProps>`
  font-family: var(--font-body);
  color: ${({ theme }) => getColors(theme).text};
  font-size: ${designTokens.fontSize.lg};
  line-height: ${designTokens.lineHeight.compact};
`;

export const BenefitBody = styled.p<ThemedElementProps>`
  font-family: var(--font-body);
  color: ${({ theme }) => getColors(theme).textMuted};
  font-size: ${designTokens.fontSize.md};
  line-height: ${designTokens.lineHeight.normal};
`;

export const IndependenceSection = styled(JoinSection)`
  padding-top: ${designTokens.spacing["5xl"]};
  padding-bottom: ${designTokens.spacing["5xl"]};
  border-top: ${designTokens.borderWidth.thin} solid var(--frame-inner-color);
  border-bottom: ${designTokens.borderWidth.thin} solid var(--frame-inner-color);
  text-align: center;
`;

export const IndependencePrimary = styled.p<ThemedElementProps>`
  font-family: var(--font-subheadline);
  color: ${({ theme }) => getColors(theme).primary};
  font-size: ${designTokens.fontSize["3xl"]};
  line-height: ${designTokens.lineHeight.compact};
  letter-spacing: 0.04em;
  text-transform: uppercase;
  margin-bottom: ${designTokens.spacing.lg};
  ${media.lg} {
    font-size: ${designTokens.fontSize["4xl"]};
  }
`;

export const IndependenceSecondary = styled.p<ThemedElementProps>`
  font-family: var(--font-subheadline);
  color: ${({ theme }) => getColors(theme).text};
  font-size: ${designTokens.fontSize.xl};
  line-height: ${designTokens.lineHeight.compact};
  letter-spacing: 0.04em;
  text-transform: uppercase;
  margin-bottom: ${designTokens.spacing.xxl};
  ${media.lg} {
    font-size: ${designTokens.fontSize["2xl"]};
  }
`;

export const IndependenceBody = styled.p<ThemedElementProps>`
  font-family: var(--font-body);
  color: ${({ theme }) => getColors(theme).textMuted};
  font-size: ${designTokens.fontSize.lg};
  line-height: ${designTokens.lineHeight.relaxed};
  max-width: 42rem;
  margin: 0 auto;
`;

export const ApplicationSection = styled(JoinSection)`
  padding-top: ${designTokens.spacing["5xl"]};
  padding-bottom: ${designTokens.spacing["6xl"]};
  border-top: ${designTokens.borderWidth.thin} solid var(--frame-inner-color);
`;

export const ApplicationLayout = styled.div`
  display: grid;
  gap: ${designTokens.spacing["3xl"]};
  ${media.lg} {
    grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
    gap: ${designTokens.spacing["5xl"]};
    align-items: start;
  }
`;

export const ApplicationIntro = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${designTokens.spacing.lg};
`;

export const ApplicationHeading = styled.h2<ThemedElementProps>`
  font-family: var(--font-subheadline);
  color: ${({ theme }) => getColors(theme).primary};
  font-size: ${designTokens.fontSize["2xl"]};
  line-height: ${designTokens.lineHeight.compact};
  letter-spacing: 0.04em;
  text-transform: uppercase;
  ${media.lg} {
    font-size: ${designTokens.fontSize["3xl"]};
  }
`;

export const ApplicationCopy = styled.p<ThemedElementProps>`
  font-family: var(--font-body);
  color: ${({ theme }) => getColors(theme).textMuted};
  font-size: ${designTokens.fontSize.lg};
  line-height: ${designTokens.lineHeight.relaxed};
`;

export const ApplicationPoints = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: left;
  gap: ${designTokens.spacing.sm};
  text-align: left;
`;

export const ApplicationPoint = styled.li<ThemedElementProps>`
  font-family: var(--font-body);
  color: ${({ theme }) => getColors(theme).text};
  font-size: ${designTokens.fontSize.lg};
  line-height: ${designTokens.lineHeight.compact};
  text-align: left;
`;

export const ApplicationClosing = styled.p<ThemedElementProps>`
  font-family: var(--font-body);
  color: ${({ theme }) => getColors(theme).primary};
  font-size: ${designTokens.fontSize.lg};
  line-height: ${designTokens.lineHeight.normal};
  margin-top: ${designTokens.spacing.md};
`;

export const JoinForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${designTokens.spacing.lg};
`;

export const Field = styled.label`
  display: flex;
  flex-direction: column;
  gap: ${designTokens.spacing.sm};
`;

export const FieldLabel = styled.span<ThemedElementProps>`
  font-family: var(--font-body);
  color: ${({ theme }) => getColors(theme).primary};
  font-size: ${designTokens.fontSize.sm};
  letter-spacing: 0.06em;
  text-transform: uppercase;
`;

export const TextInput = styled.input<ThemedElementProps>`
  font: inherit;
  color: ${({ theme }) => getColors(theme).text};
  background: transparent;
  border: none;
  border-bottom: ${designTokens.borderWidth.thin} solid
    ${({ theme }) => getColors(theme).border};
  border-radius: 0;
  padding: ${designTokens.spacing.md} 0;
  outline: none;
  transition: border-color ${designTokens.duration.fast}
    ${designTokens.easing.standard};

  &:focus {
    border-bottom-color: ${({ theme }) => getColors(theme).primary};
  }

  &:focus-visible {
    outline: ${designTokens.borderWidth.thin} solid
      ${({ theme }) => getColors(theme).primary};
    outline-offset: 2px;
  }

  &::placeholder {
    color: ${({ theme }) => getColors(theme).textMuted};
    opacity: 0.7;
  }
`;

export const TextArea = styled.textarea<ThemedElementProps>`
  font: inherit;
  color: ${({ theme }) => getColors(theme).text};
  background: transparent;
  border: ${designTokens.borderWidth.thin} solid
    ${({ theme }) => getColors(theme).border};
  border-radius: ${designTokens.radius.md};
  padding: ${designTokens.spacing.md};
  min-height: 9rem;
  resize: vertical;
  outline: none;
  transition: border-color ${designTokens.duration.fast}
    ${designTokens.easing.standard};

  &:focus {
    border-color: ${({ theme }) => getColors(theme).primary};
  }

  &:focus-visible {
    outline: ${designTokens.borderWidth.thin} solid
      ${({ theme }) => getColors(theme).primary};
    outline-offset: 2px;
  }

  &::placeholder {
    color: ${({ theme }) => getColors(theme).textMuted};
    opacity: 0.7;
  }
`;

export const FileInput = styled.input<ThemedElementProps>`
  font: inherit;
  color: ${({ theme }) => getColors(theme).text};
  background: transparent;
  border: ${designTokens.borderWidth.thin} solid
    ${({ theme }) => getColors(theme).border};
  border-radius: ${designTokens.radius.md};
  padding: ${designTokens.spacing.md};
  outline: none;
  cursor: pointer;
  transition: border-color ${designTokens.duration.fast}
    ${designTokens.easing.standard};

  &:focus {
    border-color: ${({ theme }) => getColors(theme).primary};
  }

  &:focus-visible {
    outline: ${designTokens.borderWidth.thin} solid
      ${({ theme }) => getColors(theme).primary};
    outline-offset: 2px;
  }

  &::file-selector-button {
    font: inherit;
    margin-right: ${designTokens.spacing.md};
    padding: ${designTokens.spacing.xs} ${designTokens.spacing.md};
    border: ${designTokens.borderWidth.thin} solid
      ${({ theme }) => getColors(theme).primary};
    border-radius: ${designTokens.radius.sm};
    background: transparent;
    color: ${({ theme }) => getColors(theme).primary};
    cursor: pointer;
  }
`;

export const FileHint = styled.span<ThemedElementProps>`
  font-family: var(--font-body);
  color: ${({ theme }) => getColors(theme).textMuted};
  font-size: ${designTokens.fontSize.xs};
  line-height: ${designTokens.lineHeight.normal};
`;

export const Honeypot = styled.input`
  position: absolute;
  left: -10000px;
  opacity: 0;
  pointer-events: none;
`;

export const SubmitButton = styled.button<ThemedElementProps>`
  align-self: center;
  margin-top: ${designTokens.spacing.md};
  border: ${designTokens.borderWidth.thin} solid
    ${({ theme }) => getColors(theme).primary};
  color: ${({ theme }) => getColors(theme).primary};
  background: ${({ theme }) => getColors(theme).background};
  border-radius: ${designTokens.radius.md};
  position: relative;
  overflow: hidden;
  padding: ${designTokens.spacing.md} ${designTokens.spacing["4xl"]}
    ${designTokens.spacing.md} ${designTokens.spacing.xl};
  min-width: 14rem;
  font-size: ${designTokens.fontSize.md};
  letter-spacing: 0.08em;
  text-transform: uppercase;
  cursor: pointer;
  transition: color 0.3s cubic-bezier(0.9, 0, 0.1, 1);

  &:hover:not(:disabled) {
    color: ${({ theme }) => getColors(theme).background};
  }

  &:focus-visible {
    outline: ${designTokens.borderWidth.thin} solid
      ${({ theme }) => getColors(theme).primary};
    outline-offset: 3px;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const SubmitButtonText = styled.span`
  position: relative;
  z-index: 3;
`;

export const SubmitButtonFill = styled.span<ThemedElementProps>`
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 3.25rem;
  background: ${({ theme }) => getColors(theme).primary};
  border-radius: ${designTokens.radius.md} ${designTokens.radius.md}
    ${designTokens.radius.md} 0;
  z-index: 1;
  transition: width 0.3s cubic-bezier(0.9, 0, 0.1, 1),
    border-radius 0.3s cubic-bezier(0.9, 0, 0.1, 1);
  ${SubmitButton}:hover:not(:disabled) & {
    width: 100%;
    border-radius: ${designTokens.radius.md};
  }
`;

export const SubmitButtonArrow = styled.span<ThemedElementProps>`
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 3.25rem;
  color: ${({ theme }) => getColors(theme).background};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  z-index: 4;
`;

export const FormStatus = styled.p<ThemedElementProps & { $tone?: "success" | "error" }>`
  align-self: center;
  text-align: center;
  font-family: var(--font-body);
  font-size: ${designTokens.fontSize.md};
  line-height: ${designTokens.lineHeight.normal};
  color: ${({ theme, $tone }) =>
    $tone === "error"
      ? getColors(theme).danger
      : $tone === "success"
        ? getColors(theme).success
        : getColors(theme).textMuted};
`;
