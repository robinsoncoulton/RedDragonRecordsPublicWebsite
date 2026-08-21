import { getStoredConsent } from "./consent";

export type AnalyticsEventParams = Record<
  string,
  string | number | boolean | undefined
>;

const MEASUREMENT_ID = process.env.REACT_APP_GA_MEASUREMENT_ID ?? "";

type GtagFn = (...args: unknown[]) => void;

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: GtagFn;
  }
}

let initialized = false;

const isLocalHost = () => {
  const { hostname } = window.location;
  return hostname === "localhost" || hostname === "127.0.0.1";
};

const disableKey = () => `ga-disable-${MEASUREMENT_ID}`;

export const canTrack = () =>
  Boolean(MEASUREMENT_ID) &&
  !isLocalHost() &&
  getStoredConsent() === "granted";

export const setAnalyticsDisabled = (disabled: boolean) => {
  if (!MEASUREMENT_ID) {
    return;
  }
  (window as unknown as Record<string, boolean>)[disableKey()] = disabled;
};

export const initAnalytics = () => {
  if (initialized || !MEASUREMENT_ID || isLocalHost()) {
    return;
  }
  if (getStoredConsent() !== "granted") {
    return;
  }

  setAnalyticsDisabled(false);
  window.dataLayer = window.dataLayer || [];
  window.gtag = (...args: unknown[]) => {
    window.dataLayer.push(args);
  };
  window.gtag("js", new Date());
  window.gtag("config", MEASUREMENT_ID, { send_page_view: false });

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
  document.head.appendChild(script);
  initialized = true;
};

export const trackPageView = (path: string) => {
  if (!canTrack() || typeof window.gtag !== "function") {
    return;
  }
  window.gtag("event", "page_view", {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  });
};

export const trackEvent = (name: string, params?: AnalyticsEventParams) => {
  if (!canTrack() || typeof window.gtag !== "function") {
    return;
  }
  window.gtag("event", name, params);
};

export const currentPagePath = () =>
  `${window.location.pathname}${window.location.search}`;
