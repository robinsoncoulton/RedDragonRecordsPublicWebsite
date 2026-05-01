import React from "react";
import {
  NorenCloth,
  NorenContainer,
  NorenPanel,
  NorenPole,
  NorenRow,
  NorenWrap,
  NorenWraps,
} from "./styles";

interface NorenProps {
  color: string;
  labels?: string[];
  flagCount?: number;
  width?: number | string;
  height?: number | string;
}

const toPx = (value: number | string) =>
  typeof value === "number" ? `${value}px` : value;

const darkenHex = (hex: string, amount: number) => {
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
  const darken = (channel: number) =>
    Math.max(0, Math.round(channel * (1 - amount)));
  const nextHex = [darken(red), darken(green), darken(blue)]
    .map((channel) => channel.toString(16).padStart(2, "0"))
    .join("");
  return `#${nextHex}`;
};

const Noren: React.FC<NorenProps> = ({
  color,
  labels,
  flagCount,
  width = 96,
  height = 96,
}) => {
  const rowRef = React.useRef<HTMLDivElement | null>(null);
  const probeRef = React.useRef<HTMLDivElement | null>(null);
  const gap = 2;
  const [autoFlagCount, setAutoFlagCount] = React.useState(1);
  const hasLabels = Boolean(labels && labels.length);
  const resolvedFlagCount = hasLabels
    ? labels!.length
    : flagCount
      ? Math.max(1, Math.min(flagCount, autoFlagCount))
      : autoFlagCount;
  const [isGusting, setIsGusting] = React.useState(() =>
    Array.from({ length: resolvedFlagCount }, () => false)
  );
  const [phaseDelays, setPhaseDelays] = React.useState(() =>
    Array.from({ length: resolvedFlagCount }, () => Math.round(Math.random() * -3600))
  );
  const timeoutsRef = React.useRef<Array<number | null>>(
    Array.from({ length: resolvedFlagCount }, () => null)
  );

  React.useEffect(() => {
    if (hasLabels) {
      return;
    }
    const calculateAutoFlagCount = () => {
      if (!rowRef.current || !probeRef.current) {
        return;
      }
      const rowWidth = rowRef.current.getBoundingClientRect().width;
      const panelWidth = probeRef.current.getBoundingClientRect().width;
      if (!rowWidth || !panelWidth) {
        return;
      }
      const nextCount = Math.max(1, Math.floor((rowWidth + gap) / (panelWidth + gap)));
      setAutoFlagCount(nextCount);
    };
    calculateAutoFlagCount();
    const observer = new ResizeObserver(calculateAutoFlagCount);
    if (rowRef.current) {
      observer.observe(rowRef.current);
    }
    if (probeRef.current) {
      observer.observe(probeRef.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [hasLabels, width]);

  React.useEffect(() => {
    setIsGusting(Array.from({ length: resolvedFlagCount }, () => false));
    setPhaseDelays(
      Array.from({ length: resolvedFlagCount }, () => Math.round(Math.random() * -3600))
    );
    timeoutsRef.current.forEach((timeoutId) => {
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    });
    timeoutsRef.current = Array.from({ length: resolvedFlagCount }, () => null);
  }, [resolvedFlagCount]);

  React.useEffect(
    () => () => {
      timeoutsRef.current.forEach((timeoutId) => {
        if (timeoutId) {
          window.clearTimeout(timeoutId);
        }
      });
    },
    []
  );

  const triggerAnimation = (index: number) => {
    setIsGusting((previous) =>
      previous.map((active, currentIndex) =>
        currentIndex === index ? true : active
      )
    );
    const existingTimeout = timeoutsRef.current[index];
    if (existingTimeout) {
      window.clearTimeout(existingTimeout);
    }
    timeoutsRef.current[index] = window.setTimeout(() => {
      setIsGusting((previous) =>
        previous.map((active, currentIndex) =>
          currentIndex === index ? false : active
        )
      );
      timeoutsRef.current[index] = null;
    }, 1200);
  };

  const widthValue = toPx(width);
  const heightValue = toPx(height);
  const shadeColor = darkenHex(color, 0.58);
  const wrapGradient = `linear-gradient(180deg, ${color} 0%, ${darkenHex(
    color,
    0.22
  )} 100%)`;

  return (
    <NorenContainer $clothWidth={widthValue} $clothHeight={heightValue}>
      <NorenPole />
      <NorenRow ref={rowRef}>
        <NorenPanel
          ref={probeRef}
          aria-hidden
          style={{ position: "absolute", visibility: "hidden", pointerEvents: "none" }}
        >
          <NorenWraps>
            <NorenWrap $wrapGradient={wrapGradient} />
            <NorenWrap $wrapGradient={wrapGradient} />
            <NorenWrap $wrapGradient={wrapGradient} />
          </NorenWraps>
          <NorenCloth
            $isGusting={false}
            $phaseDelayMs={0}
            $baseColor={color}
            $shadeColor={shadeColor}
          />
        </NorenPanel>
        {Array.from({ length: resolvedFlagCount }, (_, index) => (
          <NorenPanel key={`noren-panel-${index}`} onMouseEnter={() => triggerAnimation(index)}>
            <NorenWraps>
              <NorenWrap $wrapGradient={wrapGradient} />
              <NorenWrap $wrapGradient={wrapGradient} />
              <NorenWrap $wrapGradient={wrapGradient} />
            </NorenWraps>
            <NorenCloth
              key={`noren-cloth-${index}`}
              $isGusting={isGusting[index]}
              $phaseDelayMs={phaseDelays[index] ?? 0}
              $baseColor={color}
              $shadeColor={shadeColor}
            >
              {labels?.[index] ?? ""}
            </NorenCloth>
          </NorenPanel>
        ))}
      </NorenRow>
    </NorenContainer>
  );
};

export default Noren;
