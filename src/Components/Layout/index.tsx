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
  HeaderTopBackdrop,
} from "./layout";

interface LayoutProps {
  children?: React.ReactNode;
}

const darkenHexColor = (hex: string, amount: number) => {
  const normalized = hex.replace("#", "");
  const expanded =
    normalized.length === 3
      ? normalized
          .split("")
          .map((char) => `${char}${char}`)
          .join("")
      : normalized;
  if (expanded.length !== 6) {
    return hex;
  }
  const parsed = Number.parseInt(expanded, 16);
  if (Number.isNaN(parsed)) {
    return hex;
  }
  const red = (parsed >> 16) & 255;
  const green = (parsed >> 8) & 255;
  const blue = parsed & 255;
  const darken = (channel: number) => Math.max(0, Math.round(channel * (1 - amount)));
  const nextHex = [darken(red), darken(green), darken(blue)]
    .map((channel) => channel.toString(16).padStart(2, "0"))
    .join("");
  return `#${nextHex}`;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { theme } = useTheme();
  const colors = getColors(theme);
  return (
    <PosterFrame>
      <FixedTopFade aria-hidden="true" />
      <FixedTopFade aria-hidden="true" />
      <HeaderContainer>
        <HeaderTopBackdrop aria-hidden="true" />
        <Header />
      </HeaderContainer>
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
