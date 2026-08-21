import styled from "styled-components";
import { designTokens, media } from "../../DesignSystem";
import { getColors } from "../../Styles/colors";
import { ThemedElementProps } from "../../Utils/Theme/types";

export const PrivacyShell = styled.div<ThemedElementProps>`
  width: 100%;
  max-width: ${designTokens.size.proseMax};
  margin: 0 auto;
  padding: ${designTokens.spacing["4xl"]} ${designTokens.spacing.xl}
    ${designTokens.spacing["6xl"]};
  color: ${({ theme }) => getColors(theme).text};
  ${media.lg} {
    padding: ${designTokens.spacing["6xl"]} ${designTokens.spacing["4xl"]};
  }
`;

export const PrivacyTitle = styled.h1<ThemedElementProps>`
  font-family: var(--font-subheadline);
  color: ${({ theme }) => getColors(theme).text};
  font-size: ${designTokens.fontSize["4xl"]};
  line-height: ${designTokens.lineHeight.tight};
  margin-bottom: ${designTokens.spacing.xl};
`;

export const PrivacyIntro = styled.p<ThemedElementProps>`
  font-family: var(--font-body);
  color: ${({ theme }) => getColors(theme).textMuted};
  font-size: ${designTokens.fontSize.lg};
  line-height: ${designTokens.lineHeight.relaxed};
  margin-bottom: ${designTokens.spacing["3xl"]};
`;

export const PrivacyHeading = styled.h2<ThemedElementProps>`
  font-family: var(--font-subheadline);
  color: ${({ theme }) => getColors(theme).primary};
  font-size: ${designTokens.fontSize.xl};
  margin: ${designTokens.spacing["3xl"]} 0 ${designTokens.spacing.md};
`;

export const PrivacyBody = styled.p<ThemedElementProps>`
  font-family: var(--font-body);
  color: ${({ theme }) => getColors(theme).text};
  font-size: ${designTokens.fontSize.md};
  line-height: ${designTokens.lineHeight.relaxed};
  margin-bottom: ${designTokens.spacing.lg};
`;
