import { MemoryRouter } from "react-router-dom";
import { PaperTexture } from "@paper-design/shaders-react";
import Header from "./index";
import { ThemeProvider, useTheme } from "../../Utils/Theme";
import { getColors } from "../../Styles/colors";

const StoryShell = ({ Story }) => {
  const { theme } = useTheme();
  const colors = getColors(theme);

  return (
    <div
      style={{
        minHeight: "140vh",
        position: "relative",
        overflow: "hidden",
        background: colors.background,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
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
      </div>
      <div style={{ position: "relative", zIndex: 1 }}>
        <Story />
      </div>
    </div>
  );
};

const withProviders = (Story) => (
  <MemoryRouter initialEntries={["/home"]}>
    <ThemeProvider>
      <StoryShell Story={Story} />
    </ThemeProvider>
  </MemoryRouter>
);

const meta = {
  title: "Components/Header",
  component: Header,
  parameters: {
    layout: "fullscreen",
    viewport: {
      viewports: {
        mobileSm: {
          name: "Mobile 360",
          styles: { width: "360px", height: "800px" },
        },
        tablet: {
          name: "Tablet 768",
          styles: { width: "768px", height: "1024px" },
        },
        desktop: {
          name: "Desktop 1280",
          styles: { width: "1280px", height: "900px" },
        },
      },
    },
  },
  decorators: [withProviders],
};

export default meta;

export const Default = {};

export const Mobile = {
  parameters: {
    viewport: { defaultViewport: "mobileSm" },
  },
};

export const Tablet = {
  parameters: {
    viewport: { defaultViewport: "tablet" },
  },
};

export const Desktop = {
  parameters: {
    viewport: { defaultViewport: "desktop" },
  },
};
