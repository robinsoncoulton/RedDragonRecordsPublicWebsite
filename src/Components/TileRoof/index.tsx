import React from "react";
import {
  BackTile,
  CircleTile,
  ConcaveBackTile,
  DepthCapCircle,
  GapTriangle,
  RoofShell,
  RoofTrack,
  TopConnector,
} from "./styles";

interface TileRoofProps {
  color: string;
  width?: number | string;
  height?: number | string;
  circleSize?: number;
  depth?: number;
  rectangleHeightMultiplier?: number;
}

const toPx = (value: number | string) =>
  typeof value === "number" ? `${value}px` : value;

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const normalizeHex = (hex: string) => {
  const normalized = hex.replace("#", "");
  if (normalized.length === 3) {
    return normalized
      .split("")
      .map((char) => `${char}${char}`)
      .join("");
  }
  return normalized;
};

const mixHex = (hexA: string, hexB: string, ratio: number) => {
  const a = normalizeHex(hexA);
  const b = normalizeHex(hexB);
  if (a.length !== 6 || b.length !== 6) {
    return hexA;
  }
  const parsedA = Number.parseInt(a, 16);
  const parsedB = Number.parseInt(b, 16);
  if (Number.isNaN(parsedA) || Number.isNaN(parsedB)) {
    return hexA;
  }
  const mix = (shift: number) => {
    const channelA = (parsedA >> shift) & 255;
    const channelB = (parsedB >> shift) & 255;
    return Math.round(channelA * (1 - ratio) + channelB * ratio);
  };
  const next = [mix(16), mix(8), mix(0)]
    .map((channel) => clamp(channel, 0, 255).toString(16).padStart(2, "0"))
    .join("");
  return `#${next}`;
};

type LayerGeometry = {
  topPx: number;
  heightPx: number;
  depthIndex: number;
};

const buildLayerGeometry = (
  anchorBottomPx: number,
  widthPx: number,
  mainHeightPx: number,
  depthCount: number,
  baseBottomNudgePx = 0
): LayerGeometry[] => {
  if (depthCount <= 0) {
    return [];
  }
  const baseHeightPx = Math.max(1, Math.round(mainHeightPx * 0.66));
  const layers: LayerGeometry[] = [];
  let previousTopPx = Math.round(anchorBottomPx + baseBottomNudgePx - baseHeightPx);
  layers.push({ topPx: previousTopPx, heightPx: baseHeightPx, depthIndex: 0 });
  for (let depthIndex = 1; depthIndex < depthCount; depthIndex += 1) {
    const heightPx = mainHeightPx;
    const topPx = Math.round(previousTopPx + widthPx / 2 - heightPx);
    layers.push({ topPx, heightPx, depthIndex });
    previousTopPx = topPx;
  }
  return layers;
};

const TileRoof: React.FC<TileRoofProps> = ({
  color,
  width = "100%",
  height = 180,
  circleSize = 96,
  depth = 3,
  rectangleHeightMultiplier = 4,
}) => {
  const rootRef = React.useRef<HTMLDivElement | null>(null);
  const [tileCount, setTileCount] = React.useState(8);

  React.useLayoutEffect(() => {
    const element = rootRef.current;
    if (!element) {
      return;
    }
    const syncTileCount = () => {
      const nextWidth = element.getBoundingClientRect().width;
      const effectiveWidth = Math.max(120, nextWidth);
      const targetTriangleWidth = circleSize * 1.5;
      const resolvedGap = Math.max(8, Math.round(targetTriangleWidth * 0.8));
      const step = circleSize + resolvedGap;
      const nextCount = Math.max(4, Math.ceil(effectiveWidth / step) + 2);
      setTileCount((previous) => (previous === nextCount ? previous : nextCount));
    };
    syncTileCount();
    const observer = new ResizeObserver(syncTileCount);
    observer.observe(element);
    window.addEventListener("resize", syncTileCount);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", syncTileCount);
    };
  }, [circleSize]);

  const tileLight = mixHex(color, "#ffffff", 0.24);
  const tileMid = mixHex(color, "#000000", 0.08);
  const tileDark = mixHex(color, "#000000", 0.28);
  const triangleLight = mixHex(color, "#ffffff", 0.16);
  const triangleDark = mixHex(color, "#000000", 0.24);
  const borderColor = mixHex(color, "#000000", 0.22);
  const depthCount = Math.max(0, Math.round(depth));
  const targetTriangleWidth = circleSize * 1.5;
  const resolvedGap = Math.max(8, Math.round(targetTriangleWidth * 0.8));
  const step = circleSize + resolvedGap;
  const triangleTopPx = Math.round(circleSize * 0.68);
  const triangleWidthPx = Math.max(12, Math.round(targetTriangleWidth));
  const triangleHeightPx = Math.max(12, Math.round(circleSize * 0.45));
  const trackWidthPx = Math.round((tileCount - 1) * step + circleSize);
  const resolvedRectangleHeightMultiplier = Math.max(0.25, rectangleHeightMultiplier);
  const backTileHeightPx = Math.round(circleSize * resolvedRectangleHeightMultiplier);
  const triangleBackTileHeightPx = backTileHeightPx;
  const trackHeightPx = Math.round(circleSize + triangleHeightPx + 4);
  const circleLayers = buildLayerGeometry(
    circleSize / 2,
    Math.round(circleSize),
    backTileHeightPx,
    depthCount
  );
  const triangleLayers = buildLayerGeometry(
    triangleTopPx + 5,
    triangleWidthPx,
    triangleBackTileHeightPx,
    depthCount
  );
  const deepestShade = Math.min(0.5, depthCount * 0.09);
  const topConnectorColor = mixHex(tileMid, "#000000", Math.min(0.55, deepestShade + 0.06));
  const topConnectorBorderColor = mixHex(borderColor, "#000000", deepestShade * 0.75);
  const topConnectorHeightPx = Math.max(4, Math.round(circleSize * 0.08));
  const topMostCirclePx = circleLayers.length
    ? circleLayers[circleLayers.length - 1].topPx
    : Number.POSITIVE_INFINITY;
  const topMostTrianglePx = triangleLayers.length
    ? triangleLayers[triangleLayers.length - 1].topPx
    : Number.POSITIVE_INFINITY;
  const topMostDepthPx = Math.min(topMostCirclePx, topMostTrianglePx);

  return (
    <RoofShell ref={rootRef} $width={toPx(width)} $height={toPx(height)}>
      <RoofTrack $trackWidthPx={trackWidthPx} $trackHeightPx={trackHeightPx}>
        {depthCount > 0 && Number.isFinite(topMostDepthPx) && (
          <TopConnector
            $leftPx={0}
            $topPx={Math.round(topMostDepthPx - topConnectorHeightPx + 1)}
            $widthPx={trackWidthPx}
            $heightPx={topConnectorHeightPx}
            $color={topConnectorColor}
            $borderColor={topConnectorBorderColor}
          />
        )}
        {Array.from({ length: tileCount }, (_, index) => {
          const circleLeftPx = Math.round(index * step);
          return circleLayers.map(({ topPx, heightPx, depthIndex }) => {
            const shade = Math.min(0.45, depthIndex * 0.08);
            return (
              <BackTile
                key={`back-${index}-${depthIndex}`}
                $leftPx={circleLeftPx}
                $topPx={topPx}
                $widthPx={Math.round(circleSize)}
                $heightPx={heightPx}
                $layer={-depthIndex}
                $borderColor={mixHex(borderColor, "#000000", shade * 0.7)}
                $tileLight={mixHex(tileLight, "#000000", shade)}
                $tileMid={mixHex(tileMid, "#000000", Math.min(0.5, shade + 0.05))}
                $tileDark={mixHex(tileDark, "#000000", Math.min(0.55, shade + 0.08))}
              />
            );
          });
        })}
        {Array.from({ length: tileCount }, (_, index) => (
          <CircleTile
            key={`circle-${index}`}
            $sizePx={Math.round(circleSize)}
            $leftPx={Math.round(index * step)}
            $borderColor={borderColor}
            $tileLight={tileLight}
            $tileMid={tileMid}
            $tileDark={tileDark}
          />
        ))}
        <CircleTile
          key="edge-circle-start"
          $sizePx={Math.round(circleSize)}
          $leftPx={0}
          $borderColor={borderColor}
          $tileLight={tileLight}
          $tileMid={tileMid}
          $tileDark={tileDark}
        />
        <CircleTile
          key="edge-circle-end"
          $sizePx={Math.round(circleSize)}
          $leftPx={Math.max(0, trackWidthPx - Math.round(circleSize))}
          $borderColor={borderColor}
          $tileLight={tileLight}
          $tileMid={tileMid}
          $tileDark={tileDark}
        />
        {Array.from({ length: Math.max(0, tileCount - 1) }, (_, index) => (
          <GapTriangle
            key={`gap-${index}`}
            $leftPx={Math.round(index * step + circleSize + resolvedGap / 2 - triangleWidthPx / 2)}
            $topPx={triangleTopPx}
            $widthPx={triangleWidthPx}
            $heightPx={triangleHeightPx}
            $borderColor={borderColor}
            $triangleLight={triangleLight}
            $triangleDark={triangleDark}
          />
        ))}
        {Array.from({ length: Math.max(0, tileCount - 1) }, (_, index) => {
          const triangleLeftPx = Math.round(
            index * step + circleSize + resolvedGap / 2 - triangleWidthPx / 2
          );
          return triangleLayers.map(({ topPx, heightPx, depthIndex }) => {
            const shade = Math.min(0.5, depthIndex * 0.09);
            return (
              <ConcaveBackTile
                key={`triangle-back-${index}-${depthIndex}`}
                $leftPx={triangleLeftPx}
                $topPx={topPx}
                $widthPx={triangleWidthPx}
                $heightPx={heightPx}
                $layer={-200 + depthIndex}
                $flatBottom={depthIndex === 0}
                $borderColor={mixHex(borderColor, "#000000", shade * 0.75)}
                $tileLight={mixHex(tileLight, "#000000", shade)}
                $tileMid={mixHex(tileMid, "#000000", Math.min(0.55, shade + 0.06))}
                $tileDark={mixHex(tileDark, "#000000", Math.min(0.6, shade + 0.1))}
              />
            );
          });
        })}
        {depthCount > 0 &&
          Array.from({ length: Math.max(0, tileCount - 1) }, (_, index) => {
            const triangleLeftPx = Math.round(
              index * step + circleSize + resolvedGap / 2 - triangleWidthPx / 2
            );
            const topLayer = triangleLayers[triangleLayers.length - 1];
            if (!topLayer) return null;
            return (
              <DepthCapCircle
                key={`triangle-cap-${index}`}
                $leftPx={triangleLeftPx}
                $topPx={Math.round(topLayer.topPx - triangleWidthPx / 2)}
                $sizePx={triangleWidthPx}
                $color={topConnectorColor}
              />
            );
          })}
      </RoofTrack>
    </RoofShell>
  );
};

export default TileRoof;
