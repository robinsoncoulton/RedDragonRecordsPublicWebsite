import React from "react";
import styled from "styled-components";
import Page from "../../Components/Page";
import { designTokens, media } from "../../DesignSystem";
import { getColors } from "../../Styles/colors";
import { useTheme } from "../../Utils/Theme";
import { ThemedElementProps } from "../../Utils/Theme/types";
import { equipmentByCategory } from "./data";

const Shell = styled.div<ThemedElementProps>`
  display: flex;
  flex-direction: column;
  gap: ${designTokens.spacing.xl};
  color: ${({ theme }) => getColors(theme).text};
`;

const Section = styled.section<ThemedElementProps>`
  border: ${designTokens.borderWidth.thin} solid ${({ theme }) => getColors(theme).border};
  padding: ${designTokens.spacing.xl};
`;

const Title = styled.h1`
  font-family: var(--font-headline);
  font-size: ${designTokens.fontSize["5xl"]};
  line-height: ${designTokens.lineHeight.tight};
`;

const CategoryGrid = styled.div`
  display: grid;
  gap: ${designTokens.spacing.lg};
  ${media.md} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const CategoryCard = styled.article<ThemedElementProps>`
  border: ${designTokens.borderWidth.thin} solid ${({ theme }) => getColors(theme).border};
  padding: ${designTokens.spacing.lg};
`;

const CategoryTitle = styled.h2<ThemedElementProps>`
  color: ${({ theme }) => getColors(theme).primary};
  font-size: ${designTokens.fontSize.xl};
  margin-bottom: ${designTokens.spacing.sm};
`;

const List = styled.ul`
  margin: 0;
  padding-left: ${designTokens.spacing.lg};
  display: grid;
  gap: ${designTokens.spacing.xs};
`;

const Item = styled.li`
  font-size: ${designTokens.fontSize.md};
  line-height: ${designTokens.lineHeight.normal};
`;

const Equipment: React.FC = () => {
  const { theme } = useTheme();

  return (
    <Page>
      <Shell theme={theme}>
        <Section theme={theme}>
          <Title>Full Equipment List</Title>
        </Section>
        <Section theme={theme}>
          <CategoryGrid>
            {equipmentByCategory.map(({ category, items }) => (
              <CategoryCard key={category} theme={theme}>
                <CategoryTitle theme={theme}>{category}</CategoryTitle>
                <List>
                  {items.map((item) => (
                    <Item key={item}>{item}</Item>
                  ))}
                </List>
              </CategoryCard>
            ))}
          </CategoryGrid>
        </Section>
      </Shell>
    </Page>
  );
};

export default Equipment;
