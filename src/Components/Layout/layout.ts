import styled from "styled-components";
export const Frame = styled.div`
  min-height: 100vh;
  padding: 12px;
  position: relative;
  box-sizing: border-box;
  overflow-x: clip;
  @media (max-width: 768px) {
    padding: 10px;
  }
`;

export const FrameInner = styled.div`
  min-height: calc(100vh - 24px);
  border: 2px solid var(--frame-border, #8b1e1e);
  position: relative;
  background: transparent;
  box-sizing: border-box;
  padding: 24px 24px 40px;
  z-index: 1;
  @media (max-width: 768px) {
    min-height: calc(100vh - 20px);
    padding: 18px 16px 28px;
  }
  &::before {
    content: "";
    position: absolute;
    inset: 6px;
    border: 1px solid var(--frame-border, #8b1e1e);
    pointer-events: none;
  }
`;

export const Corner = styled.div`
  position: absolute;
  width: 32px;
  height: 32px;
  color: var(--frame-border, #8b1e1e);
  @media (max-width: 768px) {
    width: 28px;
    height: 28px;
  }
`;

export const CornerTopLeft = styled(Corner)`
  top: -2px;
  left: -2px;
`;

export const CornerTopRight = styled(Corner)`
  top: -2px;
  right: -2px;
  transform: rotate(90deg);
`;

export const CornerBottomLeft = styled(Corner)`
  bottom: -2px;
  left: -2px;
  transform: rotate(-90deg);
`;

export const CornerBottomRight = styled(Corner)`
  bottom: -2px;
  right: -2px;
  transform: rotate(180deg);
`;

export const HeaderTopBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: calc(env(safe-area-inset-top, 0px) + 4.75rem);
  background: #000;
  pointer-events: none;
  z-index: 2001;
`;

export const HeaderContainer = styled.div`
  position: relative;
  z-index: 2002;
  display: flex;
  justify-content: center;
  width: 100%;
`;

export const NorenContainer = styled.div`
  position: relative;
  left: 0;
  right: 0;
  overflow: visible;
`;

export const FixedBottomFade = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 300px;
  pointer-events: none;
  z-index: 999;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 1) 95%
  );
`;

export const FixedBottomWarp = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: -400px;
  height: 500px;
  margin-top: -140px;
  pointer-events: none;
  z-index: 1;
  opacity: 0.9;
  -webkit-mask-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 1) 100%
  );
  mask-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 1) 100%
  );
  > * {
    width: 100%;
    height: 100%;
  }
`;

export const FixedTopFade = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  height: 600px;
  pointer-events: none;
  z-index: 2000;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.01) 36%,
    rgba(0, 0, 0, 0.04) 52%,
    rgba(0, 0, 0, 0.1) 66%,
    rgba(0, 0, 0, 0.22) 76%,
    rgba(0, 0, 0, 0.4) 84%,
    rgba(0, 0, 0, 0.58) 90%,
    rgba(0, 0, 0, 0.74) 94%,
    rgba(0, 0, 0, 0.88) 98%,
    rgba(0, 0, 0, 0.95) 100%
  );
`;