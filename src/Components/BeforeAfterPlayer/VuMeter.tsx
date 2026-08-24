import React from "react";
import { Theme } from "../../Utils/Theme/types";
import { MeterFill, MeterHold, MeterLabel, MeterRow, MeterStack, MeterTrack } from "./styles";
import { clamp01 } from "./utils";

export type VuMeterHandle = {
  setLevels: (peakL: number, peakR: number, holdL: number, holdR: number) => void;
};

type VuMeterProps = {
  theme: Theme;
};

const applyFill = (node: HTMLSpanElement | null, value: number) => {
  if (!node) {
    return;
  }
  node.style.transform = `scaleX(${clamp01(value)})`;
};

const applyHold = (node: HTMLSpanElement | null, value: number) => {
  if (!node) {
    return;
  }
  node.style.left = `${clamp01(value) * 100}%`;
};

export const VuMeter = React.forwardRef<VuMeterHandle, VuMeterProps>(({ theme }, ref) => {
  const fillLRef = React.useRef<HTMLSpanElement | null>(null);
  const fillRRef = React.useRef<HTMLSpanElement | null>(null);
  const holdLRef = React.useRef<HTMLSpanElement | null>(null);
  const holdRRef = React.useRef<HTMLSpanElement | null>(null);

  React.useImperativeHandle(ref, () => ({
    setLevels: (peakL, peakR, holdL, holdR) => {
      applyFill(fillLRef.current, peakL);
      applyFill(fillRRef.current, peakR);
      applyHold(holdLRef.current, holdL);
      applyHold(holdRRef.current, holdR);
    },
  }));

  return (
    <MeterStack aria-hidden="true">
      <MeterRow>
        <MeterLabel>L</MeterLabel>
        <MeterTrack theme={theme}>
          <MeterFill ref={fillLRef} theme={theme} />
          <MeterHold ref={holdLRef} theme={theme} />
        </MeterTrack>
      </MeterRow>
      <MeterRow>
        <MeterLabel>R</MeterLabel>
        <MeterTrack theme={theme}>
          <MeterFill ref={fillRRef} theme={theme} />
          <MeterHold ref={holdRRef} theme={theme} />
        </MeterTrack>
      </MeterRow>
    </MeterStack>
  );
});

VuMeter.displayName = "VuMeter";
