import styled from "styled-components";
import { designTokens } from "../../DesignSystem";

export const Text = styled.p`
  font-family: var(--font-body);
  font-size: ${designTokens.fontSize.md};
  line-height: ${designTokens.lineHeight.normal};
`;
