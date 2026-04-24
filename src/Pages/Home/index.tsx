import React from "react";
import { PaperTexture } from "@paper-design/shaders-react";
import Page from "../../Components/Page";
import { useTheme } from "../../Utils/Theme";
import { getColors } from "../../Styles/colors";
import laney from "../../Assets/laney.png";
import quality from "../../Assets/quality.png";
import valves from "../../Assets/valves.png";
import { ReactComponent as ArtistsIcon } from "../../Assets/artists.svg";
import {
  Body,
  CTA,
  GalleryGrid,
  GalleryImage,
  GalleryItem,
  Headline,
  HeroGrid,
  HeroPlaceholder,
  HomeShell,
  Panel,
  PrimaryButton,
  ServiceIndex,
  ServiceName,
  ServiceRow,
  ServicesList,
  SubHeading,
  ToolsSectionBackground,
  ToolsSectionContent,
  ToolsSectionOverlay,
  ToolsSectionTexture,
  ThreeCol,
  ToolLabel,
  ToolTile,
  ToolsGrid,
  ToolAssetIcon,
} from "./styles";

const services = ["Recording", "Mixing", "Production", "Session Work"];
const tools = [
  "U67 Microphone",
  "Studer A800",
  "API 1608",
  "Marshall JMP",
  "Gibson Les Paul",
];
const gallery = [laney, quality, valves, quality];
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
  const colors = getColors(theme);
  const toolsBackgroundColor = colors.background;
  const toolsDetailColor = brightenHexColor(colors.danger, 1);
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
                Analog warmth. Modern precision. This is temporary wireframe copy
                to block out the hero structure from your reference.
              </Body>
              <PrimaryButton theme={theme}>Enter The Studio →</PrimaryButton>
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
              <SubHeading theme={theme}>Built For Artists. Rooted In Sound.</SubHeading>
              <Body theme={theme}>
                Red Dragon Records is a recording studio and creative base. This
                temporary copy maps your target layout and hierarchy while we
                refine final messaging.
              </Body>
            </div>
            <div>
              <SubHeading theme={theme}>Sound. Attitude. Art.</SubHeading>
              <Body theme={theme}>
                Placeholder bilingual tag line area and supporting callouts.
              </Body>
            </div>
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
          <ToolsSectionBackground $overlayColor={toolsBackgroundColor}>
            <ToolsSectionTexture aria-hidden="true">
              <PaperTexture
                colorBack={toolsBackgroundColor}
                colorFront={toolsDetailColor}
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
            </ToolsSectionTexture>
            <ToolsSectionOverlay $overlayColor={toolsBackgroundColor} />
            <ToolsSectionContent>
              <SubHeading theme={theme}>Tools Of The Craft</SubHeading>
              <ToolsGrid>
                {tools.map((tool) => (
                  <ToolTile key={tool} theme={theme}>
                    <HeroPlaceholder theme={theme}>Asset</HeroPlaceholder>
                    <ToolLabel>{tool}</ToolLabel>
                  </ToolTile>
                ))}
              </ToolsGrid>
            </ToolsSectionContent>
          </ToolsSectionBackground>
        </Panel>

        <CTA theme={theme}>
          <SubHeading theme={theme}>Enter The Studio</SubHeading>
          <Body theme={theme}>
            Let&apos;s make something timeless. Temporary call-to-action copy.
          </Body>
          <PrimaryButton theme={theme}>Get In Touch →</PrimaryButton>
        </CTA>
      </HomeShell>
    </Page>
  );
};

export default Home;
