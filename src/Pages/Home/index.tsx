import React from "react";
import { PaperTexture } from "@paper-design/shaders-react";
import useEmblaCarousel from "embla-carousel-react";
import WheelGesturesPlugin from "embla-carousel-wheel-gestures";
import Page from "../../Components/Page";
import { useTheme } from "../../Utils/Theme";
import { getColors } from "../../Styles/colors";
import laney from "../../Assets/laney.png";
import quality from "../../Assets/quality.png";
import valves from "../../Assets/valves.png";
import micC414 from "../../Assets/Icons/Poster/icon_poster_mic_c414.png";
import micBeta52a from "../../Assets/Icons/Poster/icon_poster_mic_beta52a.png";
import micE906 from "../../Assets/Icons/Poster/icon_poster_mic_e906.png";
import micMd421 from "../../Assets/Icons/Poster/icon_poster_mic_md421.png";
import micNt5 from "../../Assets/Icons/Poster/icon_poster_mic_nt5.png";
import micSm57 from "../../Assets/Icons/Poster/icon_poster_mic_sm57.png";
import micSm58 from "../../Assets/Icons/Poster/icon_poster_mic_sm58.png";
import {
  Body,
  CarouselContainer,
  CarouselSlide,
  CarouselViewport,
  CTA,
  GalleryGrid,
  GalleryImage,
  GalleryItem,
  Headline,
  HeroGrid,
  HeroPlaceholder,
  HomeShell,
  Panel,
  PrimaryButtonArrow,
  PrimaryButton,
  PrimaryButtonFill,
  PrimaryButtonText,
  ServiceIndex,
  ServiceName,
  ServiceRow,
  ServicesList,
  SubHeading,
  ToolsSectionBackground,
  ToolsSectionContent,
  ToolsSideFadeOverlay,
  ToolsSectionTopTexture,
  ToolsSectionTexture,
  ThreeCol,
  ToolIcon,
  ToolLabel,
  ToolTile,
  ViewFullGearLink,
} from "./styles";

const services = ["Recording", "Mixing", "Production", "Session Work"];
const gallery = [laney, quality, valves];
const toolStickers = [
  { name: "AKG C414 XLS", icon: micC414 },
  { name: "Shure Beta 52A", icon: micBeta52a },
  { name: "Sennheiser e906", icon: micE906 },
  { name: "Sennheiser MD421-2", icon: micMd421 },
  { name: "Rode NT5", icon: micNt5 },
  { name: "Shure SM57", icon: micSm57 },
  { name: "Shure SM58", icon: micSm58 },
];
const brightenHexColor = (hex: string, amount: number) => {
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
  const brighten = (channel: number) =>
    Math.min(255, Math.round(channel + (255 - channel) * amount));
  const nextHex = [brighten(red), brighten(green), brighten(blue)]
    .map((channel) => channel.toString(16).padStart(2, "0"))
    .join("");
  return `#${nextHex}`;
};

const Home: React.FC = () => {
  const { theme } = useTheme();
  const openContactMail = () => {
    window.location.assign("mailto:contact@reddragonrecords.tw");
  };
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start", dragFree: true, skipSnaps: true },
    [WheelGesturesPlugin({ forceWheelAxis: "x" })]
  );
  const autoplayRef = React.useRef<number | null>(null);
  const resetRef = React.useRef<number | null>(null);
  const clearAutoplay = React.useCallback(() => {
    if (autoplayRef.current) {
      window.clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
    if (resetRef.current) {
      window.clearTimeout(resetRef.current);
      resetRef.current = null;
    }
  }, []);
  const startAutoplay = React.useCallback(() => {
    if (!emblaApi) {
      return;
    }
    clearAutoplay();
    autoplayRef.current = window.setInterval(() => {
      emblaApi.scrollNext();
    }, 3000);
  }, [emblaApi, clearAutoplay]);
  const pauseAndResumeAutoplay = React.useCallback(() => {
    clearAutoplay();
    resetRef.current = window.setTimeout(() => {
      startAutoplay();
    }, 3500);
  }, [clearAutoplay, startAutoplay]);

  React.useEffect(() => {
    if (!emblaApi) {
      return;
    }
    emblaApi.on("pointerDown", pauseAndResumeAutoplay);
    startAutoplay();
    return () => {
      emblaApi.off("pointerDown", pauseAndResumeAutoplay);
      clearAutoplay();
    };
  }, [emblaApi, clearAutoplay, pauseAndResumeAutoplay, startAutoplay]);

  const colors = getColors(theme);
  const toolsBackgroundColor = colors.background;
  const toolsDetailColor = brightenHexColor(colors.danger, 0.35);
  return (
    <Page>
      <HomeShell theme={theme}>
        <Panel theme={theme} borderBottomOnly>
          <HeroGrid>
            <div>
              <Headline>
                <Headline>RED</Headline> 
                <Headline>DRAGON</Headline> 
                <Headline>RECORDS</Headline>
              </Headline>
              <SubHeading theme={theme} borderTop>
                Tainan Record Company
              </SubHeading>
              <Body theme={theme}>
                Analog methadologies. Music made by humans. Love for the craft.
              </Body>
              <PrimaryButton theme={theme} onClick={openContactMail}>
                <PrimaryButtonText>Enter The Studio</PrimaryButtonText>
                <PrimaryButtonFill theme={theme} />
                <PrimaryButtonArrow theme={theme}>→</PrimaryButtonArrow>
              </PrimaryButton>
            </div>
            <HeroPlaceholder theme={theme}>
              Hero Visual Placeholder
            </HeroPlaceholder>
          </HeroGrid>
        </Panel>

        <Panel theme={theme} borderBottomOnly>
          <ThreeCol>
            <div>
              <SubHeading theme={theme}>Services</SubHeading>
              <ServicesList>
                {services.map((service, index) => (
                  <ServiceRow key={service} theme={theme}>
                    <ServiceIndex theme={theme}>{`0${index + 1}`}</ServiceIndex>
                    <ServiceName>{service}</ServiceName>
                  </ServiceRow>
                ))}
              </ServicesList>
            </div>
            <div>
              <SubHeading theme={theme}>Created By Music Lovers. Built on the shoulders of giants</SubHeading>
              <Body theme={theme}>
                Red Dragon Records is a recording studio and creative base. Cement your creative ambitions into a permanent realisation.
              </Body>
            </div>
            {/* <div>
              <SubHeading theme={theme}>Sound. Attitude. Art.</SubHeading>
              <Body theme={theme}>
                Bespoke Recording Services.
              </Body>
            </div> */}
          </ThreeCol>
        </Panel>

        <Panel theme={theme}>
          <GalleryGrid>
            {gallery.map((source, index) => (
              <GalleryItem key={`${source}-${index}`} theme={theme}>
                <GalleryImage src={source} alt="Studio placeholder" />
              </GalleryItem>
            ))}
          </GalleryGrid>
        </Panel>

        <Panel theme={theme} bordered noPadding>
          <ToolsSectionBackground $topColor={toolsBackgroundColor}>
            <ToolsSectionTexture aria-hidden="true">
              <PaperTexture
                colorBack={toolsBackgroundColor}
                colorFront={toolsDetailColor}
                contrast={0.06}
                roughness={1}
                fiber={0.1}
                fiberSize={0.01}
                crumples={0.08}
                crumpleSize={0.01}
                folds={0.04}
                foldCount={1}
                drops={0}
                fade={0}
                seed={0}
                scale={0.5}
                fit="cover"
              />
            </ToolsSectionTexture>
            <ToolsSectionTopTexture aria-hidden="true">
              <PaperTexture
                colorBack={colors.background}
                colorFront={colors.danger}
                contrast={0.04}
                roughness={1}
                fiber={0.16}
                fiberSize={0.016}
                crumples={0.14}
                crumpleSize={0.016}
                folds={0.06}
                foldCount={1.2}
                drops={0.03}
                fade={0}
                seed={2}
                scale={0.65}
                fit="cover"
              />
            </ToolsSectionTopTexture>
            <ToolsSectionContent>
              <ToolsSideFadeOverlay />
              <CarouselViewport ref={emblaRef} onWheel={pauseAndResumeAutoplay}>
                <CarouselContainer>
                  {toolStickers.map(({ name, icon }, index) => (
                    <CarouselSlide
                      key={name}
                      theme={theme}
                      $showSeparator
                    >
                      <ToolTile theme={theme}>
                        <ToolIcon src={icon} alt={name} />
                        <ToolLabel>{name}</ToolLabel>
                      </ToolTile>
                    </CarouselSlide>
                  ))}
                </CarouselContainer>
              </CarouselViewport>
                <ViewFullGearLink to="/equipment" theme={theme} borderless>
                  View Full Gear List →
                </ViewFullGearLink>
            </ToolsSectionContent>
          </ToolsSectionBackground>
        </Panel>

        <CTA theme={theme}>
          <SubHeading theme={theme}>Enter The Studio</SubHeading>
          <Body theme={theme}>
            Make something authentic.
          </Body>
          <PrimaryButton theme={theme} onClick={openContactMail}>
            <PrimaryButtonText>Get In Touch</PrimaryButtonText>
            <PrimaryButtonFill theme={theme} />
            <PrimaryButtonArrow theme={theme}>→</PrimaryButtonArrow>
          </PrimaryButton>
        </CTA>
      </HomeShell>
    </Page>
  );
};

export default Home;
