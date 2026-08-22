import React from "react";
import { ThemeProvider, useTheme } from "../../Utils/Theme";
import BeforeAfterPlayer from "./index";

const ThemedPlayer = (args) => {
  const { theme } = useTheme();
  return <BeforeAfterPlayer {...args} theme={theme} />;
};

const meta = {
  title: "Components/BeforeAfterPlayer",
  component: BeforeAfterPlayer,
  args: {
    srcA: "/demo/before.wav",
    srcB: "/demo/after.wav",
    labelA: "Before",
    labelB: "After",
    crossfadeMs: 200,
  },
  argTypes: {
    srcA: { control: "text" },
    srcB: { control: "text" },
    labelA: { control: "text" },
    labelB: { control: "text" },
    tracks: { control: "object" },
    crossfadeMs: { control: { type: "number", min: 50, max: 1000, step: 50 } },
    theme: { table: { disable: true } },
  },
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div style={{ padding: "1.5rem", minWidth: "22rem" }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
  render: (args) => <ThemedPlayer {...args} />,
};

export default meta;

export const Default = {};

export const RawVsMixed = {
  args: {
    labelA: "Raw",
    labelB: "Mixed",
    crossfadeMs: 280,
  },
};

export const DrumStages = {
  args: {
    srcA: undefined,
    srcB: undefined,
    labelA: undefined,
    labelB: undefined,
    crossfadeMs: 320,
    tracks: [
      { src: "/demo/stage-raw.wav", label: "Raw" },
      { src: "/demo/stage-aligned.wav", label: "Aligned" },
      { src: "/demo/stage-processed.wav", label: "Processed" },
      { src: "/demo/stage-mix.wav", label: "In Mix" },
    ],
  },
};
