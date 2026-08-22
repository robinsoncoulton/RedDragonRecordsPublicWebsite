import React from "react";

const scheduleIdle = (callback: () => void) => {
  if (typeof window.requestIdleCallback === "function") {
    const id = window.requestIdleCallback(callback, { timeout: 1200 });
    return () => window.cancelIdleCallback(id);
  }
  const timeoutId = window.setTimeout(callback, 1);
  return () => window.clearTimeout(timeoutId);
};

const DeferredMount: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => scheduleIdle(() => setReady(true)), []);

  if (!ready) {
    return null;
  }

  return <>{children}</>;
};

export default DeferredMount;
