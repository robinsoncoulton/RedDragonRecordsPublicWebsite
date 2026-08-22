import React from "react";
import { PaperTexture, Warp } from "@paper-design/shaders-react";
import Footer from "../Footer";
import PosterFrame from "../PosterFrame/PosterFrame";
import Header from "../Header";
import CookieBanner from "../CookieBanner";
import DeferredMount from "../DeferredMount";
import { StyledPage, StyledPageContent, StyledPageTexture } from "../Page/styles";
import { useTheme } from "../../Utils/Theme";
import { Theme } from "../../Utils/Theme/types";
import { getColors } from "../../Styles/colors";
import {
  FixedBottomFade,
  FixedBottomWarp,
  FixedTopFade,
  HeaderContainer,
  TaiwanContainer,
  TileRoofContainer,
} from "./layout";
import { IosNotchBuffer } from "./styles";
import TileRoof from "../TileRoof";

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { theme } = useTheme();
  const colors = getColors(theme);
  const roofColor = theme === Theme.DARK ? colors.roofTempleOrange : colors.roofTeal;
  return (
    <PosterFrame>
      <IosNotchBuffer theme={theme} />
      <FixedTopFade aria-hidden="true" />
      <FixedTopFade aria-hidden="true" />
      <HeaderContainer>
        <Header />
      </HeaderContainer>
      <TaiwanContainer>
        <TileRoofContainer>
          <TileRoof
            color={roofColor}
            height={200}
            circleSize={24}
            depth={5}
            rectangleHeightMultiplier={2}
          />
        </TileRoofContainer>
      </TaiwanContainer>
      <StyledPage>
        <StyledPageTexture aria-hidden="true">
          <DeferredMount>
            <PaperTexture
              colorBack={colors.background}
              colorFront={colors.backgroundAccent}
              contrast={0.12}
              roughness={1}
              fiber={0.05}
              fiberSize={0.01}
              crumples={0}
              crumpleSize={0.01}
              folds={0}
              foldCount={1}
              drops={0}
              fade={0}
              seed={0}
              scale={0.5}
              fit="cover"
            />
          </DeferredMount>
        </StyledPageTexture>
        <StyledPageContent>
          {children}
          <Footer />
        </StyledPageContent>
      </StyledPage>
      <FixedBottomWarp aria-hidden="true">
        <DeferredMount>
          <Warp
            colors={["#a7e58b", "#324471", "#0b190e"]}
            proportion={0.62}
            softness={1}
            distortion={0.47}
            swirl={1}
            swirlIterations={7.6}
            shape="edge"
            shapeScale={0.77}
            speed={6.8}
            scale={0.6}
            rotation={180}
          />
        </DeferredMount>
      </FixedBottomWarp>
      <FixedBottomFade aria-hidden="true" />
      <CookieBanner />
    </PosterFrame>
  );
};

export default Layout;
