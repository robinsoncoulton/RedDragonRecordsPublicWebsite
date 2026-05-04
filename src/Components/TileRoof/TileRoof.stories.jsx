import React from "react";
import TileRoof from "./index";

const meta = {
  title: "Components/TileRoof",
  component: TileRoof,
  args: {
    color: "#39b9bd",
    width: "100%",
    height: 190,
    circleSize: 96,
    depth: 3,
    rectangleHeightMultiplier: 2,
  },
  argTypes: {
    color: { control: "color" },
    height: { control: { type: "number", min: 120, max: 280, step: 1 } },
    circleSize: { control: { type: "number", min: 50, max: 160, step: 1 } },
    depth: { control: { type: "number", min: 0, max: 8, step: 1 } },
    rectangleHeightMultiplier: {
      control: { type: "number", min: 0.25, max: 6, step: 0.25 },
    },
  },
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div
        style={{
          minHeight: "100vh",
          width: "100%",
          background: "linear-gradient(180deg, #7b3636 0%, #8b3333 55%, #5d191a 100%)",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          padding: "2rem 1rem 1rem",
        }}
      >
        <div style={{ width: "min(1100px, 100%)" }}>
          <Story />
        </div>
      </div>
    ),
  ],
};

export default meta;

export const Default = {};

export const Narrow = {
  args: {
    width: 420,
    circleSize: 82,
    height: 170,
  },
};

export const Dense = {
  args: {
    circleSize: 92,
    depth: 4,
    height: 180,
  },
};
