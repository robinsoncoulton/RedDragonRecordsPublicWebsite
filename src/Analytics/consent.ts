export type AnalyticsConsent = "granted" | "denied";

export const ANALYTICS_CONSENT_KEY = "rdr-analytics-consent";
export const COOKIE_BANNER_OPEN_EVENT = "rdr-analytics-banner-open";

const isConsent = (value: string | null): value is AnalyticsConsent =>
  value === "granted" || value === "denied";

export const getStoredConsent = (): AnalyticsConsent | null => {
  const stored = window.localStorage.getItem(ANALYTICS_CONSENT_KEY);
  return isConsent(stored) ? stored : null;
};

export const setStoredConsent = (consent: AnalyticsConsent) => {
  window.localStorage.setItem(ANALYTICS_CONSENT_KEY, consent);
};

export const openCookieSettings = () => {
  window.dispatchEvent(new Event(COOKIE_BANNER_OPEN_EVENT));
};
