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

const debugMode = () =>
  new URLSearchParams(window.location.search).has("gtag_debug");

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

let defaultConsentSent = false;

const ensureGtagStub = () => {
  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag !== "function") {
    window.gtag = function () {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer.push(arguments);
    };
  }
  if (defaultConsentSent) {
    return;
  }
  defaultConsentSent = true;
  window.gtag("consent", "default", {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
};

export const updateAnalyticsConsent = (granted: boolean) => {
  ensureGtagStub();
  window.gtag("consent", "update", {
    analytics_storage: granted ? "granted" : "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
};

const hasGtagScript = () =>
  Boolean(document.querySelector('script[src*="googletagmanager.com/gtag/js"]'));

const sendConfig = (path: string) => {
  window.gtag("config", MEASUREMENT_ID, {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
    ...(debugMode() ? { debug_mode: true } : {}),
  });
};

export const initAnalytics = () => {
  if (!MEASUREMENT_ID || isLocalHost()) {
    return;
  }
  if (getStoredConsent() !== "granted") {
    return;
  }

  setAnalyticsDisabled(false);
  ensureGtagStub();
  updateAnalyticsConsent(true);

  if (initialized) {
    return;
  }

  if (!hasGtagScript()) {
    window.gtag("js", new Date());
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
    document.head.appendChild(script);
  }

  initialized = true;
};

export const trackPageView = (path: string) => {
  if (!canTrack() || typeof window.gtag !== "function") {
    return;
  }
  sendConfig(path);
};

export const trackEvent = (name: string, params?: AnalyticsEventParams) => {
  if (!canTrack() || typeof window.gtag !== "function") {
    return;
  }
  window.gtag("event", name, params);
};

export const currentPagePath = () =>
  `${window.location.pathname}${window.location.search}`;
