import styled from "styled-components";
import { designTokens } from "../../DesignSystem";

export const Heading = styled.h2`
  font-family: var(--font-subheadline);
  font-size: ${designTokens.fontSize["3xl"]};
  line-height: ${designTokens.lineHeight.compact};
`;
