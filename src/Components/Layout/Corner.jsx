import React from "react";

const Corner = ({ className = "" }) => (
  <svg
    className={className}
    viewBox="0 0 40 40"
    aria-hidden="true"
    focusable="false"
  >
    <path d="M2 38V2h36" fill="none" stroke="currentColor" strokeWidth="2" />
    <path d="M8 32V8h24" fill="none" stroke="currentColor" strokeWidth="2" />
    <path d="M8 18h10V8" fill="none" stroke="currentColor" strokeWidth="2" />
  </svg>
);

export default Corner;
