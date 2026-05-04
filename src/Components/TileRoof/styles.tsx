import styled from "styled-components";

interface RoofShellProps {
  $width: string;
  $height: string;
}

interface RoofTrackProps {
  $trackWidthPx: number;
  $trackHeightPx: number;
}

interface CircleTileProps {
  $sizePx: number;
  $leftPx: number;
  $borderColor: string;
  $tileLight: string;
  $tileMid: string;
  $tileDark: string;
}

interface GapTriangleProps {
  $leftPx: number;
  $topPx: number;
  $widthPx: number;
  $heightPx: number;
  $borderColor: string;
  $triangleLight: string;
  $triangleDark: string;
}

interface BackTileProps {
  $leftPx: number;
  $topPx: number;
  $widthPx: number;
  $heightPx: number;
  $layer: number;
  $borderColor: string;
  $tileLight: string;
  $tileMid: string;
  $tileDark: string;
}

interface ConcaveBackTileProps {
  $leftPx: number;
  $topPx: number;
  $widthPx: number;
  $heightPx: number;
  $layer: number;
  $flatBottom: boolean;
  $borderColor: string;
  $tileLight: string;
  $tileMid: string;
  $tileDark: string;
}

interface TopConnectorProps {
  $leftPx: number;
  $topPx: number;
  $widthPx: number;
  $heightPx: number;
  $color: string;
  $borderColor: string;
}

interface DepthCapCircleProps {
  $leftPx: number;
  $topPx: number;
  $sizePx: number;
  $color: string;
}

export const RoofShell = styled.div<RoofShellProps>`
  position: relative;
  width: ${({ $width }) => $width};
  height: ${({ $height }) => $height};
  overflow: visible;
`;

export const RoofTrack = styled.div<RoofTrackProps>`
  position: absolute;
  left: 50%;
  bottom: 0;
  width: ${({ $trackWidthPx }) => `${$trackWidthPx}px`};
  height: ${({ $trackHeightPx }) => `${$trackHeightPx}px`};
  transform: translateX(-50%);
  z-index: 0;
  isolation: isolate;
`;

export const CircleTile = styled.div<CircleTileProps>`
  position: absolute;
  z-index: 2;
  left: ${({ $leftPx }) => `${$leftPx}px`};
  top: 0;
  width: ${({ $sizePx }) => `${$sizePx}px`};
  height: ${({ $sizePx }) => `${$sizePx}px`};
  border-radius: 999px;
  border: 1px solid ${({ $borderColor }) => $borderColor};
  background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.2) 0%,
      rgba(255, 255, 255, 0.02) 32%,
      rgba(255, 255, 255, 0.02) 68%,
      rgba(0, 0, 0, 0.22) 100%
    ),
    linear-gradient(
      180deg,
      ${({ $tileLight }) => $tileLight} 0%,
      ${({ $tileMid }) => $tileMid} 44%,
      ${({ $tileDark }) => $tileDark} 100%
    );
  box-shadow: inset 0 2px 2px rgba(255, 255, 255, 0.32),
    inset 0 -4px 7px rgba(0, 0, 0, 0.2), 0 2px 3px rgba(0, 0, 0, 0.12);
`;

export const GapTriangle = styled.div<GapTriangleProps>`
  position: absolute;
  z-index: 1;
  left: ${({ $leftPx }) => `${$leftPx}px`};
  top: ${({ $topPx }) => `${$topPx}px`};
  width: ${({ $widthPx }) => `${$widthPx}px`};
  height: ${({ $heightPx }) => `${$heightPx}px`};
  clip-path: polygon(
    0% 0%,
    50% 5%,
    100% 0%,
    95% 22%,
    90% 38%,
    84% 58%,
    74% 78%,
    50% 100%,
    26% 78%,
    16% 58%,
    10% 38%,
    5% 22%
  );
  -webkit-clip-path: polygon(
    0% 0%,
    50% 5%,
    100% 0%,
    95% 22%,
    90% 38%,
    84% 58%,
    74% 78%,
    50% 100%,
    26% 78%,
    16% 58%,
    10% 38%,
    5% 22%
  );
  border: 1px solid ${({ $borderColor }) => $borderColor};
  background: linear-gradient(
    180deg,
    ${({ $triangleLight }) => $triangleLight} 0%,
    ${({ $triangleDark }) => $triangleDark} 100%
  );
  box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.25),
    inset 0 -2px 3px rgba(0, 0, 0, 0.18);
`;

export const BackTile = styled.div<BackTileProps>`
  position: absolute;
  z-index: ${({ $layer }) => $layer};
  left: ${({ $leftPx }) => `${$leftPx}px`};
  top: ${({ $topPx }) => `${$topPx}px`};
  width: ${({ $widthPx }) => `${$widthPx}px`};
  height: ${({ $heightPx }) => `${$heightPx}px`};
  border-top-left-radius: ${({ $widthPx }) => `${Math.round($widthPx / 2)}px`};
  border-top-right-radius: ${({ $widthPx }) => `${Math.round($widthPx / 2)}px`};
  border-bottom-left-radius: ${({ $widthPx }) => `${Math.round($widthPx * 0.1)}px`};
  border-bottom-right-radius: ${({ $widthPx }) => `${Math.round($widthPx * 0.1)}px`};
  border: 1px solid ${({ $borderColor }) => $borderColor};
  background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.14) 0%,
      rgba(255, 255, 255, 0.03) 35%,
      rgba(255, 255, 255, 0.03) 66%,
      rgba(0, 0, 0, 0.2) 100%
    ),
    linear-gradient(
      180deg,
      ${({ $tileLight }) => $tileLight} 0%,
      ${({ $tileMid }) => $tileMid} 42%,
      ${({ $tileDark }) => $tileDark} 100%
    );
  box-shadow: inset 0 1px 2px rgba(255, 255, 255, 0.24),
    inset 0 -4px 6px rgba(0, 0, 0, 0.16);
`;

export const ConcaveBackTile = styled.div<ConcaveBackTileProps>`
  position: absolute;
  z-index: ${({ $layer }) => $layer};
  left: ${({ $leftPx }) => `${$leftPx}px`};
  top: ${({ $topPx }) => `${$topPx}px`};
  width: ${({ $widthPx }) => `${$widthPx}px`};
  height: ${({ $heightPx }) => `${$heightPx}px`};
  border-top-left-radius: ${({ $widthPx }) => `${Math.round($widthPx * 0.08)}px`};
  border-top-right-radius: ${({ $widthPx }) => `${Math.round($widthPx * 0.08)}px`};
  border-bottom-left-radius: ${({ $flatBottom, $widthPx }) =>
    $flatBottom ? "0px" : `${Math.round($widthPx * 0.5)}px`};
  border-bottom-right-radius: ${({ $flatBottom, $widthPx }) =>
    $flatBottom ? "0px" : `${Math.round($widthPx * 0.5)}px`};
  border: 1px solid ${({ $borderColor }) => $borderColor};
  background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.1) 0%,
      rgba(255, 255, 255, 0.02) 34%,
      rgba(255, 255, 255, 0.02) 66%,
      rgba(0, 0, 0, 0.24) 100%
    ),
    linear-gradient(
      180deg,
      ${({ $tileLight }) => $tileLight} 0%,
      ${({ $tileMid }) => $tileMid} 36%,
      ${({ $tileDark }) => $tileDark} 100%
    );
  -webkit-mask: radial-gradient(125% 34% at 50% -8%, transparent 41%, #000 43%) top/100% 26%
      no-repeat,
    linear-gradient(#000 0 0);
  mask: radial-gradient(125% 34% at 50% -8%, transparent 41%, #000 43%) top/100% 26% no-repeat,
    linear-gradient(#000 0 0);
  box-shadow: inset 0 2px 3px rgba(0, 0, 0, 0.26),
    inset 0 -2px 3px rgba(255, 255, 255, 0.16), 0 3px 4px rgba(0, 0, 0, 0.12);
`;

export const TopConnector = styled.div<TopConnectorProps>`
  position: absolute;
  z-index: -500;
  left: ${({ $leftPx }) => `${$leftPx}px`};
  top: ${({ $topPx }) => `${$topPx}px`};
  width: ${({ $widthPx }) => `${$widthPx}px`};
  height: ${({ $heightPx }) => `${$heightPx}px`};
  background: ${({ $color }) => $color};
  border: 1px solid ${({ $borderColor }) => $borderColor};
`;

export const DepthCapCircle = styled.div<DepthCapCircleProps>`
  position: absolute;
  z-index: -100;
  left: ${({ $leftPx }) => `${$leftPx}px`};
  top: ${({ $topPx }) => `${$topPx}px`};
  width: ${({ $sizePx }) => `${$sizePx}px`};
  height: ${({ $sizePx }) => `${$sizePx}px`};
  border-radius: 999px;
  background: ${({ $color }) => $color};
`;
