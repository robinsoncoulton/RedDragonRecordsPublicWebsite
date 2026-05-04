import React from "react";
import { PaperTexture, Warp } from "@paper-design/shaders-react";
import Footer from "../Footer";
import PosterFrame from "../PosterFrame/PosterFrame";
import Header from "../Header";
import { StyledPage, StyledPageContent, StyledPageTexture } from "../Page/styles";
import { useTheme } from "../../Utils/Theme";
import { getColors } from "../../Styles/colors";
import {
  FixedBottomFade,
  FixedBottomWarp,
  FixedTopFade,
  HeaderContainer,
  NorenContainer,
  TaiwanContainer,
  TileRoofContainer,
} from "./layout";
import { IosNotchBuffer } from "./styles";
import Noren from "../Noren";
import TileRoof from "../TileRoof";

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { theme } = useTheme();
  const colors = getColors(theme);
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
            color="#39b9bd"
            height={200}
            circleSize={24}
            depth={8}
            rectangleHeightMultiplier={2}
          />
        </TileRoofContainer>
        <NorenContainer>
          <Noren color={colors.brandDarkest} height={200} width={100} labels={["轟", "隆", "紅", "龍", "音", "樂", "製", "作", "工", "作", "室"]}/>
        </NorenContainer>
      </TaiwanContainer>
      <StyledPage>
        <StyledPageTexture aria-hidden="true">
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
        </StyledPageTexture>
        <StyledPageContent>
          {children}
          <Footer />
        </StyledPageContent>
      </StyledPage>
      <FixedBottomWarp aria-hidden="true">
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
      </FixedBottomWarp>
      <FixedBottomFade aria-hidden="true" />
    </PosterFrame>
  );
};

export default Layout;
