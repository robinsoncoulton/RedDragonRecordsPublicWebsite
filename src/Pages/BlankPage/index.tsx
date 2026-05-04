import React from "react";
import styled from "styled-components";
import Page from "../../Components/Page";
import { designTokens } from "../../DesignSystem";
import { useTheme } from "../../Utils/Theme";
import { ThemedElementProps } from "../../Utils/Theme/types";
import { getColors } from "../../Styles/colors";

const Shell = styled.div<ThemedElementProps>`
  flex: 1;
  min-height: 50vh;
  width: 100%;
  padding: ${designTokens.spacing["3xl"]};
  color: ${({ theme }) => getColors(theme).text};
`;

const BlankPage: React.FC = () => {
  const { theme } = useTheme();
  return (
    <Page>
      <Shell theme={theme} />
    </Page>
  );
};

export default BlankPage;
