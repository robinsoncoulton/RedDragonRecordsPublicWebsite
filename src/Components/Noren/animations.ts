import { keyframes } from "styled-components";

export const norenBreeze = keyframes`
  0% {
    clip-path: polygon(0% 0%, 100% 0%, 99% 100%, 1% 100%);
    box-shadow: 0.18rem 0.2rem 0.4rem rgba(0, 0, 0, 0.08);
  }
  50% {
    clip-path: polygon(
      0% 0%,
      100% 0%,
      calc(99% - var(--noren-breeze-right-offset, 2%)) 100%,
      calc(1% + var(--noren-breeze-left-offset, 4%)) 100%
    );
    box-shadow: 0.3rem 0.35rem 0.6rem rgba(0, 0, 0, 0.14);
  }
  100% {
    clip-path: polygon(0% 0%, 100% 0%, 99% 100%, 1% 100%);
    box-shadow: 0.18rem 0.2rem 0.4rem rgba(0, 0, 0, 0.08);
  }
`;

export const norenGust = keyframes`
  0% {
    clip-path: polygon(0% 0%, 100% 0%, 99% 100%, 1% 100%);
    box-shadow: 0.3rem 0.35rem 0.6rem rgba(0, 0, 0, 0.14);
  }
  45% {
    clip-path: polygon(
      0% 0%,
      100% 0%,
      calc(99% - var(--noren-gust-right-peak-offset, 9%)) 100%,
      calc(1% + var(--noren-gust-left-peak-offset, 15%)) 100%
    );
    box-shadow: 1.15rem 1.1rem 1.65rem rgba(0, 0, 0, 0.34);
  }
  72% {
    clip-path: polygon(
      0% 0%,
      100% 0%,
      calc(99% - var(--noren-gust-right-secondary-offset, 13%)) 100%,
      calc(1% + var(--noren-gust-left-secondary-offset, 5%)) 100%
    );
    box-shadow: 0.72rem 0.85rem 1.25rem rgba(0, 0, 0, 0.26);
  }
  100% {
    clip-path: polygon(0% 0%, 100% 0%, 99% 100%, 1% 100%);
    box-shadow: 0.18rem 0.2rem 0.4rem rgba(0, 0, 0, 0.08);
  }
`;

export const norenShadeGust = keyframes`
  0% {
    opacity: 0.8;
  }
  38% {
    opacity: 1;
  }
  48% {
    opacity: 1;
  }
  100% {
    opacity: 0.8;
  }
`;
