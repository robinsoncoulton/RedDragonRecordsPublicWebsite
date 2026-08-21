import React from "react";
import { useTheme } from "../../Utils/Theme";
import { useLocalisation } from "../../Localisation";
import {
  COOKIE_BANNER_OPEN_EVENT,
  currentPagePath,
  getStoredConsent,
  initAnalytics,
  setAnalyticsDisabled,
  setStoredConsent,
  trackPageView,
} from "../../Analytics";
import {
  Banner,
  BannerActions,
  BannerButton,
  BannerCopy,
  BannerLink,
} from "./styles";

const CookieBanner: React.FC = () => {
  const { theme } = useTheme();
  const { copy } = useLocalisation();
  const [visible, setVisible] = React.useState(
    () => getStoredConsent() === null
  );

  React.useEffect(() => {
    const onOpen = () => setVisible(true);
    window.addEventListener(COOKIE_BANNER_OPEN_EVENT, onOpen);
    return () => window.removeEventListener(COOKIE_BANNER_OPEN_EVENT, onOpen);
  }, []);

  if (!visible) {
    return null;
  }

  const accept = () => {
    setStoredConsent("granted");
    setAnalyticsDisabled(false);
    initAnalytics();
    trackPageView(currentPagePath());
    setVisible(false);
  };

  const decline = () => {
    setStoredConsent("denied");
    setAnalyticsDisabled(true);
    setVisible(false);
  };

  return (
    <Banner theme={theme} role="dialog" aria-label={copy.cookies.message}>
      <BannerCopy>
        {copy.cookies.message}{" "}
        <BannerLink theme={theme} to="/privacy">
          {copy.cookies.learnMore}
        </BannerLink>
      </BannerCopy>
      <BannerActions>
        <BannerButton theme={theme} type="button" onClick={decline}>
          {copy.cookies.decline}
        </BannerButton>
        <BannerButton theme={theme} type="button" $primary onClick={accept}>
          {copy.cookies.accept}
        </BannerButton>
      </BannerActions>
    </Banner>
  );
};

export default CookieBanner;
