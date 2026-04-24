import React from "react";

const FrameCorner = ({ className = "" }) => (
  <svg
    className={className}
    viewBox="0 0 64 64"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g
      fill="none"
      stroke="var(--frame-outer-color)"
      strokeWidth="3"
      strokeLinecap="square"
      strokeLinejoin="miter"
      vectorEffect="non-scaling-stroke"
    >
      <path d="M4 64 V4 H64" />
      <path d="M4 28 H28 V4" />
      <path d="M14 14 H28 V28 H14 Z" />
    </g>
    <g
      fill="none"
      stroke="var(--frame-inner-color)"
      strokeWidth="1.5"
      strokeLinecap="square"
      strokeLinejoin="miter"
      vectorEffect="non-scaling-stroke"
    >
      <path d="M14 64 V14 H64" />
      <path d="M14 38 H38 V14" strokeWidth="2" />
      <path d="M14 14 H28 V28 H14 Z" />
    </g>
  </svg>
);

export default FrameCorner;
