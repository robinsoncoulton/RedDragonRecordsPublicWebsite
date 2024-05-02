import React from "react";
import {
  Background,
  Top,
  Right,
  Bottom,
  Left,
  TopLeft,
  BottomLeft,
  BottomRight,
  TopRight,
  Border,
  Wrapper,
  InnerBorder,
  InnerBottom,
  InnerBottomLeft,
  InnerBottomRight,
  InnerLeft,
  InnerRight,
  InnerTop,
  InnerTopLeft,
  InnerTopRight,
  DragonContainer,
  RecordsContainer,
  RedContainer,
  Heading,
  HeadingContainerSpacer,
  OverlayHeaderRed,
  OverlayHeaderDragon,
  OverlayHeaderRecords,
  OverlayTextContainer,
  EmailTo,
} from "./styles";
import { useTheme } from "../../Theme";
import { LanguageThemeContainer } from "../Header/styles";
import LanguageSelect from "../Language";
import ThemeToggle from "../ThemeToggle";

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const theme = useTheme();

  return (
    <>
      <Background theme={theme.theme}>
        <InnerTop theme={theme.theme} />
        <InnerRight theme={theme.theme} />
        <InnerBottom theme={theme.theme} />
        <InnerLeft theme={theme.theme} />
        <InnerBorder theme={theme.theme} />
        <InnerTopLeft theme={theme.theme} />
        <InnerTopRight theme={theme.theme} />
        <InnerBottomRight theme={theme.theme} />
        <InnerBottomLeft theme={theme.theme} />
        <Top theme={theme.theme} />
        <Right theme={theme.theme} />
        <Bottom theme={theme.theme} />
        <Left theme={theme.theme} />
        <Border theme={theme.theme} />
        <TopLeft theme={theme.theme} />
        <TopRight theme={theme.theme} />
        <BottomRight theme={theme.theme} />
        <BottomLeft theme={theme.theme} />
        <HeadingContainerSpacer theme={theme.theme}>
          <RedContainer theme={theme.theme}>
            <Heading theme={theme.theme}>RED</Heading>
          </RedContainer>
          <DragonContainer theme={theme.theme}>
            <Heading theme={theme.theme}>DRAGON</Heading>
          </DragonContainer>
          <RecordsContainer theme={theme.theme}>
            <Heading theme={theme.theme}>RECRODS</Heading>
          </RecordsContainer>
          <OverlayTextContainer theme={theme.theme}>
            <OverlayHeaderRed theme={theme.theme}>RED</OverlayHeaderRed>
            <OverlayHeaderDragon theme={theme.theme}>
              DRAGON
            </OverlayHeaderDragon>
            <OverlayHeaderRecords theme={theme.theme}>
              RECORDS
            </OverlayHeaderRecords>
          </OverlayTextContainer>
        </HeadingContainerSpacer>
        <EmailTo theme={theme.theme} href="mailto: contact@reddragonrecords.tw">
          Enquiries
        </EmailTo>
        <LanguageThemeContainer>
          <LanguageSelect theme={theme.theme} />
          <ThemeToggle handleClick={theme.toggleTheme} theme={theme.theme} />
        </LanguageThemeContainer>
      </Background>
      <Wrapper theme={theme.theme}>{children}</Wrapper>
    </>
  );
};

export default Layout;
