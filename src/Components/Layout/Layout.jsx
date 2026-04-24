import React from "react";
import Corner from "./Corner";
import "./layout.css";

const Layout = ({ children }) => (
  <div className="frame">
    <div className="frame__inner">
      <Corner className="corner corner--tl" />
      <Corner className="corner corner--tr" />
      <Corner className="corner corner--bl" />
      <Corner className="corner corner--br" />
      {children}
    </div>
  </div>
);

export default Layout;
