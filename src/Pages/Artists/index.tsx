import React from "react";
import Page from "../../Components/Page";
import ComingSoon from "../ComingSoon";
import {
  FacebookIcon,
  InstagramIcon,
  SpotifyIcon,
  YouTubeIcon,
} from "../../icons";
import { useTheme } from "../../Utils/Theme";
import ArtistCopyContent from "./ArtistCopyContent";
import { artists } from "./data";
import {
  ArtistCredit,
  ArtistCredits,
  ArtistBody,
  ArtistHeroImage,
  ArtistMeta,
  HeroPlaceholder,
  ArtistMusicLinks,
  ArtistName,
  ArtistScrollArea,
  ArtistSocialLink,
  ArtistSocialLinks,
  ArtistSocialFallback,
  ArtistTag,
  ArtistsShell,
  CardReveal,
  CardRevealInner,
  DeckSlide,
  DeckViewport,
  HeroFrame,
  HeroStage,
} from "./styles";
import { SocialPlatform } from "./types";

const socialPlatformIcon: Partial<
  Record<SocialPlatform, React.FunctionComponent<React.SVGProps<SVGSVGElement>>>
> = {
  [SocialPlatform.FACEBOOK]: FacebookIcon,
  [SocialPlatform.YOUTUBE]: YouTubeIcon,
  [SocialPlatform.INSTAGRAM]: InstagramIcon,
  [SocialPlatform.SPOTIFY]: SpotifyIcon,
};

const socialPlatformLabel: Record<SocialPlatform, string> = {
  [SocialPlatform.FACEBOOK]: "Facebook",
  [SocialPlatform.YOUTUBE]: "YouTube",
  [SocialPlatform.INSTAGRAM]: "Instagram",
  [SocialPlatform.SPOTIFY]: "Spotify",
  [SocialPlatform.BANDCAMP]: "Bandcamp",
};

type TransitionState = {
  from: number;
  to: number;
  direction: 1 | -1;
  durationMs?: number;
  spin?: boolean;
};

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
const wrapIndex = (value: number, length: number) => ((value % length) + length) % length;
const wrapOffset = (index: number, position: number, length: number) => {
  const head = wrapIndex(position, length);
  let delta = index - head;
  if (delta > length / 2) {
    delta -= length;
  }
  if (delta < -length / 2) {
    delta += length;
  }
  return delta;
};
const SHOW_ARTISTS_SHOWCASE = true;
const SLIDE_DURATION_MS = 540;
const CONTENT_EXPAND_DELAY_MS = 280;
const SPIN_DURATION_MS = 10000;
const SPIN_INTRO_MS = 1100;
const SPIN_START_SCALE = 0.5;
const easeOutCubic = (progress: number) => 1 - (1 - progress) ** 3;

const ArtistsShowcase: React.FC = () => {
  const { theme } = useTheme();
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [transition, setTransition] = React.useState<TransitionState | null>(null);
  const [elasticOffset, setElasticOffset] = React.useState(0);
  const [isSpinning, setIsSpinning] = React.useState(artists.length > 1);
  const [spinPosition, setSpinPosition] = React.useState(0);
  const [spinReveal, setSpinReveal] = React.useState({
    opacity: 0,
    scale: SPIN_START_SCALE,
  });
  const [contentOpen, setContentOpen] = React.useState(false);
  const panelRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  const overscrollRef = React.useRef(0);
  const animationTimeoutRef = React.useRef<number | null>(null);
  const elasticResetTimeoutRef = React.useRef<number | null>(null);
  const contentOpenTimeoutRef = React.useRef<number | null>(null);
  const ignoreWheelUntilRef = React.useRef(0);

  const clearContentOpenTimeout = React.useCallback(() => {
    if (contentOpenTimeoutRef.current) {
      window.clearTimeout(contentOpenTimeoutRef.current);
      contentOpenTimeoutRef.current = null;
    }
  }, []);

  const expandContentSoon = React.useCallback(
    (delayMs = CONTENT_EXPAND_DELAY_MS) => {
      clearContentOpenTimeout();
      contentOpenTimeoutRef.current = window.setTimeout(() => {
        setContentOpen(true);
        ignoreWheelUntilRef.current = Date.now() + 560;
      }, delayMs);
    },
    [clearContentOpenTimeout]
  );

  React.useEffect(
    () => () => {
      if (animationTimeoutRef.current) {
        window.clearTimeout(animationTimeoutRef.current);
      }
      if (elasticResetTimeoutRef.current) {
        window.clearTimeout(elasticResetTimeoutRef.current);
      }
      if (contentOpenTimeoutRef.current) {
        window.clearTimeout(contentOpenTimeoutRef.current);
      }
    },
    []
  );

  React.useEffect(() => {
    if (artists.length < 2) {
      setIsSpinning(false);
      setContentOpen(true);
      return;
    }
    const targetIndex = Math.floor(Math.random() * artists.length);
    const endPos = artists.length * 3 + targetIndex;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      const t = Math.min(1, elapsed / SPIN_DURATION_MS);
      const intro = easeOutCubic(Math.min(1, elapsed / SPIN_INTRO_MS));
      setSpinPosition(endPos * easeOutCubic(t));
      setSpinReveal({
        opacity: intro,
        scale: SPIN_START_SCALE + (1 - SPIN_START_SCALE) * intro,
      });
      if (t < 1) {
        raf = window.requestAnimationFrame(tick);
        return;
      }
      setSpinPosition(endPos);
      setSpinReveal({ opacity: 1, scale: 1 });
      setActiveIndex(targetIndex);
      setTransition(null);
      setIsSpinning(false);
      expandContentSoon();
    };
    raf = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(raf);
  }, [expandContentSoon]);

  React.useEffect(() => {
    const panel = panelRefs.current[activeIndex];
    if (panel) {
      panel.scrollTop = 0;
    }
  }, [activeIndex]);

  React.useEffect(() => {
    const originalHtmlOverflow = document.documentElement.style.overflow;
    const originalBodyOverflow = document.body.style.overflow;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = originalHtmlOverflow;
      document.body.style.overflow = originalBodyOverflow;
    };
  }, []);

  const triggerSlide = React.useCallback(
    (direction: 1 | -1) => {
      if (transition || isSpinning || !contentOpen) {
        return;
      }
      const nextIndex = wrapIndex(activeIndex + direction, artists.length);
      clearContentOpenTimeout();
      setContentOpen(false);
      setTransition({ from: activeIndex, to: nextIndex, direction, durationMs: SLIDE_DURATION_MS });
      setElasticOffset(0);
      overscrollRef.current = 0;
      if (elasticResetTimeoutRef.current) {
        window.clearTimeout(elasticResetTimeoutRef.current);
      }
      animationTimeoutRef.current = window.setTimeout(() => {
        setActiveIndex(nextIndex);
        setTransition(null);
        expandContentSoon();
      }, SLIDE_DURATION_MS);
    },
    [activeIndex, transition, isSpinning, contentOpen, clearContentOpenTimeout, expandContentSoon]
  );

  const scheduleElasticReset = React.useCallback(() => {
    if (elasticResetTimeoutRef.current) {
      window.clearTimeout(elasticResetTimeoutRef.current);
    }
    elasticResetTimeoutRef.current = window.setTimeout(() => {
      overscrollRef.current = 0;
      setElasticOffset(0);
    }, 110);
  }, []);

  const handleWheel = React.useCallback(
    (event: React.WheelEvent<HTMLDivElement>) => {
      if (transition || isSpinning || !contentOpen) {
        event.preventDefault();
        return;
      }
      if (Date.now() < ignoreWheelUntilRef.current) {
        event.preventDefault();
        return;
      }
      const direction = event.deltaY === 0 ? event.deltaX : event.deltaY;
      if (direction === 0) {
        return;
      }
      const panel = panelRefs.current[activeIndex];
      if (!panel) {
        event.preventDefault();
        triggerSlide(direction > 0 ? 1 : -1);
        return;
      }
      const maxScrollTop = panel.scrollHeight - panel.clientHeight;
      if (maxScrollTop <= 0) {
        event.preventDefault();
        overscrollRef.current = clamp(overscrollRef.current + direction * 0.8, -240, 240);
        setElasticOffset(overscrollRef.current);
        if (Math.abs(overscrollRef.current) > 150) {
          triggerSlide(overscrollRef.current > 0 ? 1 : -1);
          return;
        }
        scheduleElasticReset();
        return;
      }
      const atTop = panel.scrollTop <= 1;
      const atBottom = panel.scrollTop >= maxScrollTop - 1;
      if ((direction > 0 && !atBottom) || (direction < 0 && !atTop)) {
        event.preventDefault();
        panel.scrollTop = Math.max(0, Math.min(maxScrollTop, panel.scrollTop + direction));
        overscrollRef.current = 0;
        setElasticOffset(0);
        return;
      }
      event.preventDefault();
      overscrollRef.current = clamp(overscrollRef.current + direction * 0.8, -240, 240);
      setElasticOffset(overscrollRef.current);
      if (Math.abs(overscrollRef.current) > 150) {
        triggerSlide(overscrollRef.current > 0 ? 1 : -1);
        return;
      }
      scheduleElasticReset();
    },
    [activeIndex, transition, isSpinning, contentOpen, triggerSlide, scheduleElasticReset]
  );

  const heroModeFor = (index: number) => {
    if (transition) {
      if (index === transition.from) {
        return "leaving" as const;
      }
      if (index === transition.to) {
        return "entering" as const;
      }
      return "hidden" as const;
    }
    return index === activeIndex ? ("active" as const) : ("hidden" as const);
  };

  const renderContent = (
    index: number,
    mode: "active" | "entering" | "leaving",
    direction: 1 | -1,
    elastic: number,
    durationMs = SLIDE_DURATION_MS
  ) => {
    const artist = artists[index];
    const hasSocialLinks = Boolean(artist.socialLinks?.length);
    return (
      <DeckSlide
        key={`${artist.name}-${mode}`}
        $mode={mode}
        $direction={direction}
        $elastic={elastic}
        $durationMs={durationMs}
        theme={theme}
      >
        <ArtistScrollArea
          ref={(element) => {
            panelRefs.current[index] = element;
          }}
          theme={theme}
        >
          <ArtistBody>
            <ArtistMeta theme={theme}>
              <ArtistTag>{artist.genre}</ArtistTag>
              <ArtistTag>{artist.city}</ArtistTag>
            </ArtistMeta>
            <ArtistCopyContent blocks={artist.copy} theme={theme} />
            {artist.musicLinks?.length ? (
              <ArtistMusicLinks>
                {artist.musicLinks.map((embedHtml, embedIndex) => (
                  <div
                    key={`${artist.name}-music-${embedIndex}`}
                    dangerouslySetInnerHTML={{ __html: embedHtml }}
                  />
                ))}
              </ArtistMusicLinks>
            ) : null}
            {artist.credits?.length ? (
              <ArtistCredits>
                {artist.credits.map((credit) => (
                  <ArtistCredit key={credit}>{credit}</ArtistCredit>
                ))}
              </ArtistCredits>
            ) : null}
          </ArtistBody>
          {hasSocialLinks ? (
            <ArtistSocialLinks theme={theme}>
              {artist.socialLinks!.map((link) => {
                const Icon = socialPlatformIcon[link.platform];
                const label = socialPlatformLabel[link.platform] ?? link.platform;
                return (
                  <ArtistSocialLink
                    key={`${link.platform}-${link.url}`}
                    theme={theme}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    $textOnly={!Icon}
                  >
                    {Icon ? <Icon /> : <ArtistSocialFallback>{label}</ArtistSocialFallback>}
                  </ArtistSocialLink>
                );
              })}
            </ArtistSocialLinks>
          ) : null}
        </ArtistScrollArea>
      </DeckSlide>
    );
  };

  return (
    <Page>
      <ArtistsShell theme={theme}>
        <DeckViewport
          $compact={!contentOpen}
          onWheel={handleWheel}
          theme={theme}
          style={
            isSpinning
              ? {
                  opacity: spinReveal.opacity,
                  transform: `scale(${spinReveal.scale})`,
                }
              : undefined
          }
        >
          <HeroStage>
            {artists.map((artist, index) => {
              const mode = heroModeFor(index);
              const direction = transition?.direction ?? 1;
              const durationMs = transition?.durationMs ?? SLIDE_DURATION_MS;
              const offset = isSpinning
                ? wrapOffset(index, spinPosition, artists.length)
                : undefined;
              const showName =
                Boolean(artist.heroImage) && !isSpinning && mode !== "hidden";
              return (
                <HeroFrame
                  key={artist.name}
                  $mode={mode}
                  $direction={direction}
                  $durationMs={durationMs}
                  $hasHero={Boolean(artist.heroImage)}
                  $spinning={isSpinning}
                  style={
                    offset === undefined
                      ? undefined
                      : {
                          transform: `translate3d(${offset * 100}%, ${offset * 100}%, 0)`,
                          opacity: Math.abs(offset) < 1.02 ? 1 : 0,
                          zIndex: Math.max(0, Math.round((1.02 - Math.abs(offset)) * 20)),
                        }
                  }
                >
                  {artist.heroImage ? (
                    <ArtistHeroImage src={artist.heroImage} alt="" loading="eager" />
                  ) : (
                    <HeroPlaceholder theme={theme}>{artist.name}</HeroPlaceholder>
                  )}
                  {showName ? (
                    <ArtistName
                      theme={theme}
                      $overlay
                      $animate={mode === "entering" || (mode === "active" && !transition)}
                    >
                      {artist.name}
                    </ArtistName>
                  ) : null}
                </HeroFrame>
              );
            })}
          </HeroStage>
          <CardReveal $open={contentOpen}>
            <CardRevealInner>
              {isSpinning
                ? null
                : renderContent(activeIndex, "active", 1, contentOpen ? elasticOffset : 0)}
            </CardRevealInner>
          </CardReveal>
        </DeckViewport>
      </ArtistsShell>
    </Page>
  );
};

const Artists: React.FC = () => {
  if (!SHOW_ARTISTS_SHOWCASE) {
    return (
      <Page>
        <ComingSoon />
      </Page>
    );
  }
  return <ArtistsShowcase />;
};

export default Artists;
