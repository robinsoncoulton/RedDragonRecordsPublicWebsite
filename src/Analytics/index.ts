import { trackEvent } from "./gtag";

export {
  getStoredConsent,
  setStoredConsent,
  openCookieSettings,
  COOKIE_BANNER_OPEN_EVENT,
} from "./consent";
export type { AnalyticsConsent } from "./consent";
export {
  initAnalytics,
  trackPageView,
  trackEvent,
  canTrack,
  currentPagePath,
  setAnalyticsDisabled,
  updateAnalyticsConsent,
} from "./gtag";
export type { AnalyticsEventParams } from "./gtag";
export { initClarity, disableClarity } from "./clarity";

const domainFromUrl = (url: string) => {
  try {
    return new URL(url, window.location.origin).hostname;
  } catch {
    return "";
  }
};

export const trackOutboundClick = (
  url: string,
  params?: Record<string, string>
) => {
  trackEvent("click", {
    link_url: url,
    link_domain: domainFromUrl(url),
    outbound: true,
    ...params,
  });
};
