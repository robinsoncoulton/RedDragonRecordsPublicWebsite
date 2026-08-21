import { getStoredConsent } from "./consent";

const CLARITY_ID = "y5v921bpsp";

type ClarityFn = (...args: unknown[]) => void;

declare global {
  interface Window {
    clarity?: ClarityFn;
  }
}

let initialized = false;

const isLocalHost = () => {
  const { hostname } = window.location;
  return hostname === "localhost" || hostname === "127.0.0.1";
};

const hasClarityScript = () =>
  Boolean(document.querySelector('script[src*="clarity.ms/tag/"]'));

const ensureClarityStub = () => {
  if (typeof window.clarity === "function") {
    return;
  }
  const queue: unknown[][] = [];
  const clarity: ClarityFn = (...args) => {
    queue.push(args);
  };
  (clarity as ClarityFn & { q?: unknown[][] }).q = queue;
  window.clarity = clarity;
};

export const initClarity = () => {
  if (!CLARITY_ID || isLocalHost()) {
    return;
  }
  if (getStoredConsent() !== "granted") {
    return;
  }

  ensureClarityStub();

  if (!initialized && !hasClarityScript()) {
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.clarity.ms/tag/${CLARITY_ID}`;
    document.head.appendChild(script);
  }

  initialized = true;
  window.clarity?.("consent");
};

export const disableClarity = () => {
  if (typeof window.clarity !== "function") {
    return;
  }
  window.clarity("consent", false);
  window.clarity("stop");
};
