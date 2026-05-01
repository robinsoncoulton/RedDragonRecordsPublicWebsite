import React from "react";
import { createPortal } from "react-dom";
import {
  BurgerBar,
  CogIconSvg,
  DesktopOnly,
  HeaderContent,
  HeaderIconButton,
  HeaderSide,
  LanguageThemeContainer,
  MobileNavBackdrop,
  MobileNavLink,
  MobileNavPanel,
  MobileOnly,
  OptionsBackdrop,
  OptionsMenuLabel,
  OptionsMenuPanel,
  StyledHeader,
  TitleLogoContainer,
} from "./styles";
import Navbar from "../Navbar";
import { useTheme } from "../../Utils/Theme";
import TitleBadge from "../TitleBadge";
import LanguageSelect from "../Language";
import ThemeToggle from "../ThemeToggle";
import { designTokens } from "../../DesignSystem";
import { useRouteNavigation } from "../Navbar/useRouteNavigation";

const getSpacingPx = (spacingValue: string) => {
  if (spacingValue.endsWith("rem")) {
    const remValue = Number.parseFloat(spacingValue);
    const rootFontSize = Number.parseFloat(
      window.getComputedStyle(document.documentElement).fontSize
    );
    return remValue * rootFontSize;
  }
  if (spacingValue.endsWith("px")) {
    return Number.parseFloat(spacingValue);
  }
  return Number.parseFloat(spacingValue) || 0;
};

const syncHeaderPortalTop = (el: HTMLElement) => {
  const bottom = el.getBoundingClientRect().bottom;
  document.documentElement.style.setProperty("--header-portal-top", `${bottom}px`);
};

const clearHeaderPortalTop = () => {
  document.documentElement.style.removeProperty("--header-portal-top");
};

const CogGlyph: React.FC = () => (
  <CogIconSvg viewBox="0 0 24 24" fill="none" aria-hidden>
    <path
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.019.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.213-1.281z"
    />
    <path
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </CogIconSvg>
);

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [isPastThreshold, setIsPastThreshold] = React.useState(false);
  const [forceOpaque, setForceOpaque] = React.useState(false);
  const [navOpen, setNavOpen] = React.useState(false);
  const [optionsOpen, setOptionsOpen] = React.useState(false);
  const [sideInsetPx, setSideInsetPx] = React.useState(0);
  const headerRootRef = React.useRef<HTMLDivElement>(null);
  const leftSideRef = React.useRef<HTMLDivElement>(null);
  const rightSideRef = React.useRef<HTMLDivElement>(null);
  const { options, selectedOption, onSelect } = useRouteNavigation();

  React.useEffect(() => {
    const threshold = getSpacingPx(designTokens.spacing["4xl"]);
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isScrollingUp = currentScrollY < lastScrollY;
      const isScrollingDown = currentScrollY > lastScrollY;
      const pastThreshold = currentScrollY > threshold;
      setIsPastThreshold(pastThreshold);
      if (!pastThreshold) {
        setForceOpaque(true);
      } else if (isScrollingUp) {
        setForceOpaque(true);
      } else if (isScrollingDown) {
        setForceOpaque(false);
      }
      lastScrollY = currentScrollY;
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  React.useLayoutEffect(() => {
    const el = headerRootRef.current;
    if (!el) return;
    const apply = () => syncHeaderPortalTop(el);
    apply();
    const ro = new ResizeObserver(apply);
    ro.observe(el);
    window.addEventListener("resize", apply);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", apply);
      clearHeaderPortalTop();
    };
  }, []);

  React.useLayoutEffect(() => {
    if (!navOpen && !optionsOpen) return;
    const el = headerRootRef.current;
    if (el) syncHeaderPortalTop(el);
  }, [navOpen, optionsOpen]);

  React.useLayoutEffect(() => {
    const left = leftSideRef.current;
    const right = rightSideRef.current;
    if (!left || !right) return;
    const syncSideInset = () => {
      const nextInset = Math.max(left.offsetWidth, right.offsetWidth);
      setSideInsetPx((prev) => (prev === nextInset ? prev : nextInset));
    };
    syncSideInset();
    const ro = new ResizeObserver(syncSideInset);
    ro.observe(left);
    ro.observe(right);
    window.addEventListener("resize", syncSideInset);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", syncSideInset);
    };
  }, []);

  React.useEffect(() => {
    if (!navOpen && !optionsOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setNavOpen(false);
        setOptionsOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navOpen, optionsOpen]);

  const openNav = () => {
    setOptionsOpen(false);
    setNavOpen(true);
  };

  const openOptions = () => {
    setNavOpen(false);
    setOptionsOpen(true);
  };

  const portalTarget = typeof document !== "undefined" ? document.body : null;

  const mobileNavPortal =
    navOpen &&
    portalTarget &&
    createPortal(
      <>
        <MobileNavBackdrop
          type="button"
          aria-label="Close navigation"
          onClick={() => setNavOpen(false)}
        />
        <MobileNavPanel id="header-mobile-nav" theme={theme}>
          {options.map((label) => (
            <MobileNavLink
              key={label}
              type="button"
              theme={theme}
              $active={label === selectedOption}
              onClick={() => {
                onSelect(label);
                setNavOpen(false);
              }}
            >
              {label}
            </MobileNavLink>
          ))}
        </MobileNavPanel>
      </>,
      portalTarget
    );

  const optionsPortal =
    optionsOpen &&
    portalTarget &&
    createPortal(
      <>
        <OptionsBackdrop type="button" aria-label="Close" onClick={() => setOptionsOpen(false)} />
        <OptionsMenuPanel theme={theme} role="dialog" aria-label="Site options">
          <div>
            <OptionsMenuLabel theme={theme}>Language</OptionsMenuLabel>
            <LanguageSelect theme={theme} />
          </div>
          <div>
            <OptionsMenuLabel theme={theme}>Theme</OptionsMenuLabel>
            <ThemeToggle handleClick={toggleTheme} theme={theme} />
          </div>
        </OptionsMenuPanel>
      </>,
      portalTarget
    );

  return (
    <StyledHeader
      ref={headerRootRef}
      $isPastThreshold={isPastThreshold}
      $forceOpaque={forceOpaque}
    >
      <HeaderContent $sideInsetPx={sideInsetPx}>
        <HeaderSide ref={leftSideRef} align="left">
          <MobileOnly>
            <HeaderIconButton
              type="button"
              theme={theme}
              aria-expanded={navOpen}
              aria-controls="header-mobile-nav"
              aria-label="Open navigation menu"
              onClick={() => (navOpen ? setNavOpen(false) : openNav())}
            >
              <BurgerBar />
              <BurgerBar />
              <BurgerBar />
            </HeaderIconButton>
          </MobileOnly>
          <DesktopOnly>
            <Navbar theme={theme} />
          </DesktopOnly>
        </HeaderSide>
        <TitleLogoContainer>
          <TitleBadge theme={theme} />
        </TitleLogoContainer>
        <HeaderSide ref={rightSideRef} align="right">
          <MobileOnly>
            <HeaderIconButton
              type="button"
              theme={theme}
              aria-expanded={optionsOpen}
              aria-label="Open site options"
              onClick={() => (optionsOpen ? setOptionsOpen(false) : openOptions())}
            >
              <CogGlyph />
            </HeaderIconButton>
          </MobileOnly>
          <DesktopOnly>
            <LanguageThemeContainer>
              <LanguageSelect theme={theme} />
              <ThemeToggle handleClick={toggleTheme} theme={theme} />
            </LanguageThemeContainer>
          </DesktopOnly>
        </HeaderSide>
      </HeaderContent>
      {mobileNavPortal}
      {optionsPortal}
    </StyledHeader>
  );
};

export default Header;
