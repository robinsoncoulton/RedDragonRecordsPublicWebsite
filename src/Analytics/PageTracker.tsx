import React from "react";
import { useLocation } from "react-router-dom";
import { getStoredConsent } from "./consent";
import { initClarity } from "./clarity";
import { initAnalytics, trackPageView } from "./gtag";

const PageTracker: React.FC = () => {
  const location = useLocation();

  React.useEffect(() => {
    if (getStoredConsent() !== "granted") {
      return;
    }
    initAnalytics();
    initClarity();
    trackPageView(`${location.pathname}${location.search}`);
  }, [location.pathname, location.search]);

  return null;
};

export default PageTracker;
