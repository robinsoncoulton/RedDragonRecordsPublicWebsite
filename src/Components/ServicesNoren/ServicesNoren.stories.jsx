import Noren from "./index";

const labels = ["轟", "隆", "紅", "龍", "音", "樂", "製", "作", "工", "作", "室"];

const meta = {
  title: "Components/ServicesNoren",
  component: Noren,
  args: {
    color: "#4b0e0e",
    width: 100,
    height: 200,
    labels,
  },
  argTypes: {
    color: { control: "color" },
    width: { control: { type: "number", min: 40, max: 180, step: 1 } },
    height: { control: { type: "number", min: 80, max: 320, step: 1 } },
    flagCount: { control: { type: "number", min: 1, max: 20, step: 1 } },
  },
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
  decorators: [
    (Story) => (
      <div
        style={{
          minHeight: "100vh",
          padding: "1.5rem 0.5rem 0.5rem",
          background: "#101015",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <div style={{ width: "100%", maxWidth: "100%" }}>
          <Story />
        </div>
      </div>
    ),
  ],
};

export default meta;

export const LabelList = {};

export const AutoFlagCount = {
  args: {
    labels: undefined,
    flagCount: 14,
    width: 110,
    height: 220,
  },
};

export const Mobile = {
  parameters: {
    viewport: { defaultViewport: "mobileSm" },
  },
};
