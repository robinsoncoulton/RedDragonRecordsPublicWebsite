import React from "react";
import { PaperTexture } from "@paper-design/shaders-react";
import useEmblaCarousel from "embla-carousel-react";
import WheelGesturesPlugin from "embla-carousel-wheel-gestures";
import Page from "../../Components/Page";
import Noren from "../../Components/Noren";
import TileRoof from "../../Components/TileRoof";
import DeferredMount from "../../Components/DeferredMount";
import { useTheme } from "../../Utils/Theme";
import { Theme } from "../../Utils/Theme/types";
import { getColors } from "../../Styles/colors";
import { designTokens } from "../../DesignSystem";
import { useLocalisation } from "../../Localisation";
import { trackEvent } from "../../Analytics";
import micC414 from "../../Assets/Icons/Poster/icon_poster_mic_c414.webp";
import micBeta52a from "../../Assets/Icons/Poster/icon_poster_mic_beta52a.webp";
import micE906 from "../../Assets/Icons/Poster/icon_poster_mic_e906.webp";
import micMd421 from "../../Assets/Icons/Poster/icon_poster_mic_md421.webp";
import micNt5 from "../../Assets/Icons/Poster/icon_poster_mic_nt5.webp";
import micSm57 from "../../Assets/Icons/Poster/icon_poster_mic_sm57.webp";
import micSm58 from "../../Assets/Icons/Poster/icon_poster_mic_sm58.webp";
import gearBlackstar from "../../Assets/Icons/Poster/icon_poster_gear_blackstar.webp";
import gearGibsonSg from "../../Assets/Icons/Poster/icon_poster_gear_gibson_sg.webp";
import gearGodin from "../../Assets/Icons/Poster/icon_poster_gear_godin.webp";
import gearJazzmaster from "../../Assets/Icons/Poster/icon_poster_gear_jazzmaster.webp";
import gearLaney from "../../Assets/Icons/Poster/icon_poster_gear_laney.webp";
import gearLudwig from "../../Assets/Icons/Poster/icon_poster_gear_ludwig.webp";
import gearMarshallJvm410 from "../../Assets/Icons/Poster/icon_poster_gear_marshall_jvm410.webp";
import gearPaiste from "../../Assets/Icons/Poster/icon_poster_gear_paiste.webp";
import gearStrat from "../../Assets/Icons/Poster/icon_poster_gear_strat.webp";
import gearTelecaster from "../../Assets/Icons/Poster/icon_poster_gear_telecaster.webp";
import {
  Body,
  CarouselContainer,
  CarouselSlide,
  CarouselViewport,
  CTA,
  Headline,
  HeadlineDragon,
  HeadlineRecords,
  HeadlineRed,
  HeroCopy,
  HeroDivider,
  HeroGrid,
  HeroLeftShade,
  HeroRightShade,
  HeroLogo,
  HeroPicture,
  HeroPlaceholder,
  HeroImageShade,
  MobileRoofShade,
  HomeShell,
  Panel,
  PrimaryButtonArrow,
  PrimaryButton,
  PrimaryButtonFill,
  PrimaryButtonText,
  ServiceIndex,
  ServicesPanelShell,
  ServiceName,
  ServiceRow,
  ServiceBorderFrame,
  ServicesList,
  ServicesLayout,
  ServicesDetail,
  ServicesCarouselViewport,
  ServicesCarouselContainer,
  ServicesCarouselSlide,
  ServiceDetailTitle,
  ServicesPips,
  ServicePip,
  SubHeading,
  ToolsSectionBackground,
  ToolsSectionContent,
  ToolsSideFadeOverlay,
  ToolsSectionTopTexture,
  ToolsSectionTexture,
  ToolIcon,
  ToolLabel,
  ToolTile,
  ViewFullGearLink,
  ButtonContainer,
  NorenContainer,
  MobileTileRoofContainer,
} from "./styles";

const getServiceBodyParagraphs = (body: string | string[]) =>
  (Array.isArray(body) ? body : [body]).map((paragraph) => paragraph.trim()).filter(Boolean);
const toolStickers = [
  { name: "AKG C414 XLS", icon: micC414 },
  { name: "Shure Beta 52A", icon: micBeta52a },
  { name: "Sennheiser e906", icon: micE906 },
  { name: "Sennheiser MD421-2", icon: micMd421 },
  { name: "Rode NT5", icon: micNt5 },
  { name: "Shure SM57", icon: micSm57 },
  { name: "Shure SM58", icon: micSm58 },
  { name: "Blackstar HT-5", icon: gearBlackstar },
  { name: "Gibson SG", icon: gearGibsonSg },
  { name: "Godin Radiator", icon: gearGodin },
  { name: "Fender Jazzmaster", icon: gearJazzmaster },
  { name: "Laney L5 Lionheart", icon: gearLaney },
  { name: "Ludwig Classic Maple", icon: gearLudwig },
  { name: "Marshall JVM410H", icon: gearMarshallJvm410 },
  { name: "Paiste 2002", icon: gearPaiste },
  { name: "Fender Stratocaster", icon: gearStrat },
  { name: "Fender Telecaster", icon: gearTelecaster },
];
const shuffleArray = <T,>(items: T[]) => {
  const nextItems = [...items];
  for (let index = nextItems.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [nextItems[index], nextItems[randomIndex]] = [
      nextItems[randomIndex],
      nextItems[index],
    ];
  }
  return nextItems;
};
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
  const { copy } = useLocalisation();
  const home = copy.home;
  const services = home.services.items;
  const randomizedToolStickers = React.useMemo(
    () => shuffleArray(toolStickers),
    []
  );
  const openContactMail = () => {
    trackEvent("generate_lead", { method: "mailto" });
    window.location.assign("mailto:contact@reddragonrecords.tw");
  };
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start", dragFree: true, skipSnaps: true },
    [WheelGesturesPlugin({ forceWheelAxis: "x" })]
  );
  const [servicesEmblaRef, servicesEmblaApi] = useEmblaCarousel(
    { loop: false, align: "start", containScroll: "trimSnaps" },
    [WheelGesturesPlugin({ forceWheelAxis: "x" })]
  );
  const [selectedServiceIndex, setSelectedServiceIndex] = React.useState(0);
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

  React.useEffect(() => {
    if (!servicesEmblaApi) {
      return;
    }
    const onSelect = () => {
      setSelectedServiceIndex(servicesEmblaApi.selectedScrollSnap());
    };
    onSelect();
    servicesEmblaApi.on("select", onSelect);
    servicesEmblaApi.on("reInit", onSelect);
    return () => {
      servicesEmblaApi.off("select", onSelect);
      servicesEmblaApi.off("reInit", onSelect);
    };
  }, [servicesEmblaApi]);

  React.useEffect(() => {
    if (!servicesEmblaApi) {
      return;
    }
    const root = servicesEmblaApi.rootNode();
    const desktopQuery = window.matchMedia(
      `(min-width: ${designTokens.breakpoint.lg})`
    );
    let observer: ResizeObserver | null = null;
    const observeSelected = () => {
      observer?.disconnect();
      if (desktopQuery.matches) {
        root.style.height = "";
        return;
      }
      const slide =
        servicesEmblaApi.slideNodes()[servicesEmblaApi.selectedScrollSnap()];
      if (!slide) {
        return;
      }
      observer = new ResizeObserver((entries) => {
        const entry = entries[0];
        if (!entry) {
          return;
        }
        root.style.height = `${entry.contentRect.height}px`;
      });
      observer.observe(slide);
    };
    observeSelected();
    servicesEmblaApi.on("select", observeSelected);
    servicesEmblaApi.on("reInit", observeSelected);
    desktopQuery.addEventListener("change", observeSelected);
    return () => {
      observer?.disconnect();
      servicesEmblaApi.off("select", observeSelected);
      servicesEmblaApi.off("reInit", observeSelected);
      desktopQuery.removeEventListener("change", observeSelected);
      root.style.height = "";
    };
  }, [servicesEmblaApi]);

  const selectService = (index: number) => {
    setSelectedServiceIndex(index);
    servicesEmblaApi?.scrollTo(index);
    const service = services[index];
    if (service) {
      trackEvent("select_content", {
        content_type: "service",
        item_id: service.name,
      });
    }
  };

  const colors = getColors(theme);
  const roofColor = theme === Theme.DARK ? colors.roofTempleOrange : colors.roofTeal;
  const toolsBackgroundColor = colors.background;
  const toolsDetailColor = brightenHexColor(colors.danger, 0.35);
  return (
    <Page>
      <HomeShell theme={theme}>
        <Panel theme={theme} borderBottomOnly noPadding>
          <HeroLeftShade aria-hidden="true" />
          <HeroRightShade aria-hidden="true" />
          <NorenContainer>
            <Noren
              fullWidth
              color={colors.brandDarkest}
              height={200}
              width={100}
              labels={home.norenLabels}
            />
          </NorenContainer>
          <HeroGrid>
            <HeroCopy>
              <Headline>
                <HeadlineRed>{home.hero.red}</HeadlineRed>
                <HeadlineDragon>{home.hero.dragon}</HeadlineDragon>
                <HeadlineRecords>{home.hero.records}</HeadlineRecords>
              </Headline>
              <HeroDivider theme={theme} />
              <SubHeading theme={theme}>
                {home.hero.tagline}
              </SubHeading>
              <Body theme={theme}>
                {home.hero.intro}
              </Body>
              <ButtonContainer>
                <PrimaryButton theme={theme} onClick={openContactMail}>
                  <PrimaryButtonText>{home.hero.cta}</PrimaryButtonText>
                  <PrimaryButtonFill theme={theme} />
                  <PrimaryButtonArrow theme={theme}>→</PrimaryButtonArrow>
                </PrimaryButton>
              </ButtonContainer>
            </HeroCopy>
            <HeroPlaceholder theme={theme}>
              <HeroPicture>
                <source
                  type="image/avif"
                  srcSet="/hero-artists-800.avif 800w, /hero-artists-1600.avif 1600w"
                  sizes="(min-width: 1024px) 55vw, 92vw"
                />
                <source
                  type="image/webp"
                  srcSet="/hero-artists-800.webp 800w, /hero-artists-1600.webp 1600w"
                  sizes="(min-width: 1024px) 55vw, 92vw"
                />
                <HeroLogo
                  src="/hero-artists-1600.webp"
                  srcSet="/hero-artists-800.webp 800w, /hero-artists-1600.webp 1600w"
                  sizes="(min-width: 1024px) 55vw, 92vw"
                  width={1600}
                  height={826}
                  decoding="async"
                  alt={home.hero.imageAlt}
                />
              </HeroPicture>
            </HeroPlaceholder>
          </HeroGrid>
          <HeroImageShade aria-hidden="true" />
        </Panel>

        <MobileTileRoofContainer aria-hidden="true">
          <TileRoof
            color={roofColor}
            height={150}
            circleSize={24}
            depth={5}
            rectangleHeightMultiplier={2}
          />
          <MobileRoofShade />
        </MobileTileRoofContainer>
        <Panel theme={theme} borderBottomOnly noPadding>
          <ServicesPanelShell>
            <ServicesLayout>
              <div>
                <SubHeading theme={theme}>{home.services.heading}</SubHeading>
                <ServicesList>
                  {services.map((service, index) => (
                    <ServiceRow
                      key={service.name}
                      theme={theme}
                      type="button"
                      $active={selectedServiceIndex === index}
                      onClick={() => selectService(index)}
                      aria-pressed={selectedServiceIndex === index}
                    >
                      {selectedServiceIndex === index ? (
                        <ServiceBorderFrame theme={theme} aria-hidden="true" />
                      ) : null}
                      <ServiceIndex
                        theme={theme}
                        $active={selectedServiceIndex === index}
                      >{`0${index + 1}`}</ServiceIndex>
                      <ServiceName>{service.name}</ServiceName>
                    </ServiceRow>
                  ))}
                </ServicesList>
              </div>
              <ServicesDetail>
                <ServicesCarouselViewport ref={servicesEmblaRef}>
                  <ServicesCarouselContainer>
                    {services.map((service) => (
                      <ServicesCarouselSlide key={service.name}>
                        <ServiceDetailTitle>{service.name}</ServiceDetailTitle>
                        {getServiceBodyParagraphs(service.body).map(
                          (paragraph, paragraphIndex) => (
                            <Body key={`${service.name}-${paragraphIndex}`} theme={theme}>
                              {paragraph}
                            </Body>
                          )
                        )}
                      </ServicesCarouselSlide>
                    ))}
                  </ServicesCarouselContainer>
                </ServicesCarouselViewport>
                <ServicesPips aria-label={home.services.slidesLabel}>
                  {services.map((service, index) => (
                    <ServicePip
                      key={service.name}
                      theme={theme}
                      type="button"
                      $active={selectedServiceIndex === index}
                      onClick={() => selectService(index)}
                      aria-label={home.services.showService.replace("{name}", service.name)}
                      aria-current={selectedServiceIndex === index}
                    />
                  ))}
                </ServicesPips>
              </ServicesDetail>
            </ServicesLayout>
          </ServicesPanelShell>
        </Panel>

        <Panel theme={theme} bordered noPadding>
          <ToolsSectionBackground $topColor={toolsBackgroundColor}>
            <ToolsSectionTexture aria-hidden="true">
              <DeferredMount>
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
              </DeferredMount>
            </ToolsSectionTexture>
            <ToolsSectionTopTexture aria-hidden="true">
              <DeferredMount>
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
              </DeferredMount>
            </ToolsSectionTopTexture>
            <ToolsSectionContent>
              <ToolsSideFadeOverlay />
              <CarouselViewport ref={emblaRef} onWheel={pauseAndResumeAutoplay}>
                <CarouselContainer>
                  {randomizedToolStickers.map(({ name, icon }, index) => (
                    <CarouselSlide
                      key={name}
                      theme={theme}
                      $showSeparator
                    >
                      <ToolTile theme={theme}>
                        <ToolIcon
                          src={icon}
                          alt={name}
                          width={300}
                          height={300}
                          loading="lazy"
                          decoding="async"
                        />
                        <ToolLabel>{name}</ToolLabel>
                      </ToolTile>
                    </CarouselSlide>
                  ))}
                </CarouselContainer>
              </CarouselViewport>
                <ViewFullGearLink to="/studio/equipment" theme={theme} borderless>
                  {home.tools.viewFullGear}
                </ViewFullGearLink>
            </ToolsSectionContent>
          </ToolsSectionBackground>
        </Panel>

        <CTA theme={theme}>
          <SubHeading theme={theme}>{home.cta.heading}</SubHeading>
          <Body theme={theme}>
            {home.cta.body}
          </Body>
          <PrimaryButton theme={theme} onClick={openContactMail}>
            <PrimaryButtonText>{home.cta.button}</PrimaryButtonText>
            <PrimaryButtonFill theme={theme} />
            <PrimaryButtonArrow theme={theme}>→</PrimaryButtonArrow>
          </PrimaryButton>
        </CTA>
      </HomeShell>
    </Page>
  );
};

export default Home;
