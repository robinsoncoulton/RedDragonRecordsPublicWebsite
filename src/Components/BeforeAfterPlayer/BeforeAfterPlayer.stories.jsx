import React from "react";
import { ThemeProvider, useTheme } from "../../Utils/Theme";
import { getColors } from "../../Styles/colors";
import BeforeAfterPlayer from "./index";
import dommesilPremix from "../../Assets/Audio/Dommesil (Premix).wav";
import dommesilMixed from "../../Assets/Audio/Dommesil (mixed).wav";
import highwayOriginal from "../../Assets/Audio/Highway to Hell Loop (Originals).wav";
import highwayEdited from "../../Assets/Audio/Highway to Hell Loop (edits).wav";
import highwayMixed from "../../Assets/Audio/Highway to Hell Loop (mixed).wav";
import highwayBand from "../../Assets/Audio/Highway to Hell Loop (band).wav";

const Stage = ({ children, onBind }) => {
  const { theme } = useTheme();
  const colors = getColors(theme);
  const stageRef = React.useRef(null);

  React.useEffect(() => {
    onBind((frame) => {
      const node = stageRef.current;
      if (!node) {
        return;
      }
      node.style.setProperty("--pulse", String(frame.pulse));
      node.style.setProperty("--energy", String(frame.energy));
    });
  }, [onBind]);

  return (
    <div
      ref={stageRef}
      style={{
        padding: "2.5rem 1.5rem",
        minWidth: "24rem",
        minHeight: "28rem",
        background: `color-mix(in srgb, ${colors.background} calc(100% - var(--energy, 0) * 18%), ${colors.primary})`,
        boxShadow: `inset 0 0 calc(var(--pulse, 0) * 3.5rem) color-mix(in srgb, ${colors.primary} calc(var(--pulse, 0) * 22%), transparent)`,
        transition: "none",
      }}
    >
      {children}
    </div>
  );
};

const ThemedPlayer = React.forwardRef((args, ref) => {
  const { theme } = useTheme();
  const levelsRef = React.useRef(() => undefined);
  const bindLevels = React.useCallback((handler) => {
    levelsRef.current = handler;
  }, []);

  return (
    <Stage onBind={bindLevels}>
      <BeforeAfterPlayer
        {...args}
        theme={theme}
        ref={ref}
        onLevels={(frame) => {
          levelsRef.current(frame);
          args.onLevels?.(frame);
        }}
      />
    </Stage>
  );
});

ThemedPlayer.displayName = "ThemedPlayer";

const ApiDemo = (args) => {
  const playerRef = React.useRef(null);
  return (
    <div>
      <ThemedPlayer {...args} ref={playerRef} />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.5rem",
          marginTop: "1rem",
        }}
      >
        <button type="button" onClick={() => playerRef.current?.play()}>
          API Play
        </button>
        <button type="button" onClick={() => playerRef.current?.pause()}>
          API Pause
        </button>
        <button type="button" onClick={() => playerRef.current?.togglePlay()}>
          API Toggle
        </button>
        <button type="button" onClick={() => playerRef.current?.seek(10)}>
          Seek 10s
        </button>
        <button type="button" onClick={() => playerRef.current?.select(1)}>
          Select B
        </button>
        <button type="button" onClick={() => playerRef.current?.setLoop(true)}>
          Loop On
        </button>
      </div>
    </div>
  );
};

const meta = {
  title: "Components/BeforeAfterPlayer",
  component: BeforeAfterPlayer,
  args: {
    crossfadeMs: 200,
    showProgress: false,
    showWaveform: false,
    showMeter: false,
  },
  argTypes: {
    srcA: { control: "text" },
    srcB: { control: "text" },
    labelA: { control: "text" },
    labelB: { control: "text" },
    tracks: { control: "object" },
    crossfadeMs: { control: { type: "number", min: 50, max: 1000, step: 50 } },
    showProgress: { control: "boolean" },
    showWaveform: { control: "boolean" },
    showMeter: { control: "boolean" },
    theme: { table: { disable: true } },
    onLevels: { table: { disable: true } },
  },
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
  render: (args) => <ThemedPlayer {...args} />,
};

export default meta;

export const Dommesil = {
  args: {
    srcA: dommesilPremix,
    srcB: dommesilMixed,
    labelA: "Premix",
    labelB: "Mixed",
    crossfadeMs: 280,
    showProgress: true,
    showWaveform: true,
    showMeter: true,
  },
};

export const HighwayToHell = {
  args: {
    srcA: undefined,
    srcB: undefined,
    labelA: undefined,
    labelB: undefined,
    crossfadeMs: 320,
    showProgress: true,
    showWaveform: true,
    showMeter: true,
    tracks: [
      { src: highwayOriginal, label: "Original" },
      { src: highwayEdited, label: "Edited" },
      { src: highwayMixed, label: "Mixed" },
      { src: highwayBand, label: "Band" },
    ],
  },
};

export const Api = {
  args: {
    srcA: dommesilPremix,
    srcB: dommesilMixed,
    labelA: "Premix",
    labelB: "Mixed",
    crossfadeMs: 280,
    showProgress: true,
    showWaveform: true,
    showMeter: true,
  },
  render: (args) => <ApiDemo {...args} />,
};
