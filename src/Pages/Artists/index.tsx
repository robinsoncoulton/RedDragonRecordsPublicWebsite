import React from "react";
import Page from "../../Components/Page";
import ComingSoon from "../ComingSoon";
import { useTheme } from "../../Utils/Theme";
import ArtistCard from "./ArtistCard";
import { artists } from "./data";
import {
  AlphabetLetter,
  AlphabetRail,
  AlphabetTrack,
  ArtistsHeading,
  ArtistsShell,
  ArtistsShadow,
  ArtistsTitleBar,
  CardFrame,
  CardStage,
  DeckNavButton,
  DeckViewport,
  InvisibleSearch,
  SearchFlash,
  SearchFlashText,
} from "./styles";
import { DECK_PEEK_STAGES, ELASTIC_TRIGGER, peekExitOffset } from "./deckConfig";

type TransitionState = {
  from: number;
  to: number;
  direction: 1 | -1;
  durationMs?: number;
};

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const LETTER_COUNT = LETTERS.length;
const LETTER_HEIGHT = 36;
const ALPHABET_COPIES = 5;
const ALPHABET_MID_COPY = Math.floor(ALPHABET_COPIES / 2);
const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
const wrapIndex = (value: number, length: number) => ((value % length) + length) % length;
const SHOW_ARTISTS_SHOWCASE = true;
const SLIDE_DURATION_MS = 540;
const CONTENT_EXPAND_DELAY_MS = 280;
const ALPHABET_FRICTION = 0.92;
const ALPHABET_SNAP_MS = 420;
const easeOutCubic = (progress: number) => 1 - (1 - progress) ** 3;

const sortedArtistIndices = artists
  .map((artist, index) => ({ index, name: artist.name.toLowerCase() }))
  .sort((a, b) => a.name.localeCompare(b.name))
  .map((entry) => entry.index);

const artistInitial = (index: number) => {
  const char = artists[index]?.name.trim().charAt(0).toUpperCase() ?? "A";
  return /[A-Z]/.test(char) ? char : "A";
};

const findArtistForLetter = (letter: string) => {
  const code = letter.toUpperCase().charCodeAt(0);
  const match = sortedArtistIndices.find((index) => {
    const initial = artistInitial(index).charCodeAt(0);
    return initial >= code;
  });
  return match ?? sortedArtistIndices[0] ?? 0;
};

const findArtistForQuery = (query: string) => {
  const normalized = query.trim().toLowerCase();
  if (!normalized) {
    return null;
  }
  const startsWith = sortedArtistIndices.find((index) =>
    artists[index].name.toLowerCase().startsWith(normalized)
  );
  if (startsWith !== undefined) {
    return startsWith;
  }
  return (
    sortedArtistIndices.find((index) => artists[index].name.toLowerCase().includes(normalized)) ??
    null
  );
};

const ArtistsShowcase: React.FC = () => {
  const { theme } = useTheme();
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [transition, setTransition] = React.useState<TransitionState | null>(null);
  const [elasticOffset, setElasticOffset] = React.useState(0);
  const [contentOpen, setContentOpen] = React.useState(true);
  const [selectedLetter, setSelectedLetter] = React.useState(artistInitial(0));
  const [searchQuery, setSearchQuery] = React.useState("");
  const [searchFlash, setSearchFlash] = React.useState({ text: "", key: 0 });
  const [alphabetOffset, setAlphabetOffset] = React.useState(
    -(ALPHABET_MID_COPY * LETTER_COUNT + 0) * LETTER_HEIGHT
  );
  const panelRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  const overscrollRef = React.useRef(0);
  const animationTimeoutRef = React.useRef<number | null>(null);
  const elasticResetTimeoutRef = React.useRef<number | null>(null);
  const contentOpenTimeoutRef = React.useRef<number | null>(null);
  const ignoreWheelUntilRef = React.useRef(0);
  const alphabetRailRef = React.useRef<HTMLElement | null>(null);
  const alphabetOffsetRef = React.useRef(alphabetOffset);
  const alphabetVelocityRef = React.useRef(0);
  const alphabetRafRef = React.useRef<number | null>(null);
  const alphabetDraggingRef = React.useRef(false);
  const alphabetLastYRef = React.useRef(0);
  const alphabetLastTsRef = React.useRef(0);
  const landedLetterRef = React.useRef(selectedLetter);
  const searchInputRef = React.useRef<HTMLInputElement | null>(null);
  const deckViewportRef = React.useRef<HTMLElement | null>(null);
  const goToArtistRef = React.useRef<(index: number) => void>(() => undefined);
  const triggerSlideRef = React.useRef<(direction: 1 | -1) => void>(() => undefined);
  const activeIndexRef = React.useRef(activeIndex);
  const transitionRef = React.useRef(transition);
  const contentOpenRef = React.useRef(contentOpen);
  activeIndexRef.current = activeIndex;
  transitionRef.current = transition;
  contentOpenRef.current = contentOpen;

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

  const syncAlphabetOffset = React.useCallback((next: number) => {
    alphabetOffsetRef.current = next;
    setAlphabetOffset(next);
  }, []);

  const normalizeAlphabetOffset = React.useCallback((offset: number) => {
    const loopHeight = LETTER_COUNT * LETTER_HEIGHT;
    const centerCopyStart = -ALPHABET_MID_COPY * loopHeight;
    let next = offset;
    while (next > centerCopyStart + loopHeight * 0.5) {
      next -= loopHeight;
    }
    while (next < centerCopyStart - loopHeight * 0.5) {
      next += loopHeight;
    }
    return next;
  }, []);

  const letterFromOffset = React.useCallback((offset: number, railHeight: number) => {
    const centerY = -offset + railHeight / 2 - LETTER_HEIGHT / 2;
    const index = wrapIndex(Math.round(centerY / LETTER_HEIGHT), LETTER_COUNT);
    return LETTERS[index];
  }, []);

  const offsetForLetter = React.useCallback((letter: string, railHeight: number) => {
    const index = LETTERS.indexOf(letter.toUpperCase());
    const letterIndex = index < 0 ? 0 : index;
    const absoluteIndex = ALPHABET_MID_COPY * LETTER_COUNT + letterIndex;
    return -(absoluteIndex * LETTER_HEIGHT - railHeight / 2 + LETTER_HEIGHT / 2);
  }, []);

  const landOnLetter = React.useCallback((letter: string) => {
    if (letter === landedLetterRef.current) {
      setSelectedLetter(letter);
      return;
    }
    landedLetterRef.current = letter;
    setSelectedLetter(letter);
    const artistIndex = findArtistForLetter(letter);
    goToArtistRef.current(artistIndex);
  }, []);

  const snapAlphabetToNearest = React.useCallback(() => {
    const rail = alphabetRailRef.current;
    if (!rail) {
      return;
    }
    const railHeight = rail.clientHeight;
    const letter = letterFromOffset(alphabetOffsetRef.current, railHeight);
    const target = offsetForLetter(letter, railHeight);
    const start = alphabetOffsetRef.current;
    const delta = target - start;
    const started = performance.now();
    const tick = (now: number) => {
      const progress = Math.min(1, (now - started) / ALPHABET_SNAP_MS);
      const next = start + delta * easeOutCubic(progress);
      syncAlphabetOffset(next);
      if (progress < 1) {
        alphabetRafRef.current = window.requestAnimationFrame(tick);
        return;
      }
      syncAlphabetOffset(normalizeAlphabetOffset(target));
      landOnLetter(letter);
      alphabetRafRef.current = null;
    };
    alphabetRafRef.current = window.requestAnimationFrame(tick);
  }, [
    landOnLetter,
    letterFromOffset,
    normalizeAlphabetOffset,
    offsetForLetter,
    syncAlphabetOffset,
  ]);

  const runAlphabetMomentum = React.useCallback(() => {
    const step = () => {
      if (alphabetDraggingRef.current) {
        alphabetRafRef.current = null;
        return;
      }
      alphabetVelocityRef.current *= ALPHABET_FRICTION;
      if (Math.abs(alphabetVelocityRef.current) < 0.08) {
        alphabetVelocityRef.current = 0;
        snapAlphabetToNearest();
        return;
      }
      const next = normalizeAlphabetOffset(
        alphabetOffsetRef.current + alphabetVelocityRef.current
      );
      syncAlphabetOffset(next);
      const rail = alphabetRailRef.current;
      if (rail) {
        setSelectedLetter(letterFromOffset(next, rail.clientHeight));
      }
      alphabetRafRef.current = window.requestAnimationFrame(step);
    };
    alphabetRafRef.current = window.requestAnimationFrame(step);
  }, [letterFromOffset, normalizeAlphabetOffset, snapAlphabetToNearest, syncAlphabetOffset]);

  const goToArtist = React.useCallback(
    (nextIndex: number) => {
      const fromIndex = activeIndexRef.current;
      if (nextIndex === fromIndex || nextIndex < 0 || nextIndex >= artists.length) {
        return;
      }
      const direction: 1 | -1 = nextIndex > fromIndex ? 1 : -1;
      clearContentOpenTimeout();
      setContentOpen(false);
      setElasticOffset(0);
      overscrollRef.current = 0;
      if (elasticResetTimeoutRef.current) {
        window.clearTimeout(elasticResetTimeoutRef.current);
      }
      activeIndexRef.current = nextIndex;
      setActiveIndex(nextIndex);
      const leavingPanel = panelRefs.current[fromIndex];
      if (leavingPanel) {
        leavingPanel.scrollTop = 0;
      }
      setTransition({ from: fromIndex, to: nextIndex, direction, durationMs: SLIDE_DURATION_MS });
      const letter = artistInitial(nextIndex);
      landedLetterRef.current = letter;
      setSelectedLetter(letter);
      const rail = alphabetRailRef.current;
      if (rail) {
        syncAlphabetOffset(normalizeAlphabetOffset(offsetForLetter(letter, rail.clientHeight)));
      }
      if (animationTimeoutRef.current) {
        window.clearTimeout(animationTimeoutRef.current);
      }
      animationTimeoutRef.current = window.setTimeout(() => {
        setTransition(null);
        expandContentSoon();
      }, SLIDE_DURATION_MS);
    },
    [
      clearContentOpenTimeout,
      expandContentSoon,
      normalizeAlphabetOffset,
      offsetForLetter,
      syncAlphabetOffset,
    ]
  );

  goToArtistRef.current = goToArtist;

  React.useEffect(() => {
    const rail = alphabetRailRef.current;
    if (!rail) {
      return;
    }
    syncAlphabetOffset(offsetForLetter(artistInitial(0), rail.clientHeight));
  }, [offsetForLetter, syncAlphabetOffset]);

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
      if (alphabetRafRef.current) {
        window.cancelAnimationFrame(alphabetRafRef.current);
      }
    },
    []
  );

  React.useEffect(() => {
    const panel = panelRefs.current[activeIndex];
    if (panel) {
      panel.scrollTop = 0;
    }
  }, [activeIndex]);

  React.useEffect(() => {
    document.body.classList.add("artists-page");
    return () => {
      document.body.classList.remove("artists-page");
    };
  }, []);

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
      goToArtist(wrapIndex(activeIndexRef.current + direction, artists.length));
      deckViewportRef.current?.focus({ preventScroll: true });
    },
    [goToArtist]
  );

  triggerSlideRef.current = triggerSlide;

  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) {
        return;
      }
      const isArrow =
        event.key === "ArrowRight" ||
        event.key === "ArrowDown" ||
        event.key === "ArrowLeft" ||
        event.key === "ArrowUp";
      if (!isArrow) {
        const target = event.target as HTMLElement | null;
        const tag = target?.tagName?.toLowerCase();
        if (tag === "input" || tag === "textarea" || target?.isContentEditable) {
          if (target !== searchInputRef.current) {
            return;
          }
        }
        if (event.key.length === 1 || event.key === "Backspace") {
          searchInputRef.current?.focus();
        }
        return;
      }
      const target = event.target as HTMLElement | null;
      const tag = target?.tagName?.toLowerCase();
      if (
        (tag === "input" || tag === "textarea" || target?.isContentEditable) &&
        target !== searchInputRef.current
      ) {
        return;
      }
      event.preventDefault();
      if (document.activeElement instanceof HTMLIFrameElement) {
        document.activeElement.blur();
      }
      if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        triggerSlide(1);
        return;
      }
      triggerSlide(-1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [triggerSlide]);

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
      if (transition || !contentOpen) {
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
        if (Math.abs(overscrollRef.current) > ELASTIC_TRIGGER) {
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
      if (Math.abs(overscrollRef.current) > ELASTIC_TRIGGER) {
        triggerSlide(overscrollRef.current > 0 ? 1 : -1);
        return;
      }
      scheduleElasticReset();
    },
    [activeIndex, transition, contentOpen, triggerSlide, scheduleElasticReset]
  );

  React.useEffect(() => {
    const panel = panelRefs.current[activeIndex];
    if (!panel) {
      return;
    }
    let lastY = 0;
    let tracking = false;
    const onTouchStart = (event: TouchEvent) => {
      if (event.touches.length !== 1) {
        return;
      }
      lastY = event.touches[0].clientY;
      tracking = true;
      overscrollRef.current = 0;
      setElasticOffset(0);
    };
    const onTouchMove = (event: TouchEvent) => {
      if (!tracking || transitionRef.current || !contentOpenRef.current) {
        return;
      }
      if (event.touches.length !== 1) {
        return;
      }
      const y = event.touches[0].clientY;
      const delta = lastY - y;
      lastY = y;
      if (delta === 0) {
        return;
      }
      const maxScrollTop = panel.scrollHeight - panel.clientHeight;
      const atTop = panel.scrollTop <= 1;
      const atBottom = panel.scrollTop >= maxScrollTop - 1;
      const overscrolling =
        maxScrollTop <= 0 || (delta > 0 && atBottom) || (delta < 0 && atTop);
      if (!overscrolling) {
        overscrollRef.current = 0;
        setElasticOffset(0);
        return;
      }
      overscrollRef.current = clamp(overscrollRef.current + delta * 0.9, -240, 240);
      setElasticOffset(overscrollRef.current);
      if (Math.abs(overscrollRef.current) > ELASTIC_TRIGGER) {
        tracking = false;
        triggerSlideRef.current(overscrollRef.current > 0 ? 1 : -1);
      }
    };
    const onTouchEnd = () => {
      tracking = false;
      scheduleElasticReset();
    };
    panel.addEventListener("touchstart", onTouchStart, { passive: true });
    panel.addEventListener("touchmove", onTouchMove, { passive: true });
    panel.addEventListener("touchend", onTouchEnd);
    panel.addEventListener("touchcancel", onTouchEnd);
    return () => {
      panel.removeEventListener("touchstart", onTouchStart);
      panel.removeEventListener("touchmove", onTouchMove);
      panel.removeEventListener("touchend", onTouchEnd);
      panel.removeEventListener("touchcancel", onTouchEnd);
    };
  }, [activeIndex, scheduleElasticReset]);

  const handleAlphabetWheel = React.useCallback(
    (event: React.WheelEvent<HTMLElement>) => {
      event.preventDefault();
      event.stopPropagation();
      if (alphabetRafRef.current) {
        window.cancelAnimationFrame(alphabetRafRef.current);
        alphabetRafRef.current = null;
      }
      alphabetVelocityRef.current = clamp(
        alphabetVelocityRef.current + event.deltaY * 0.35,
        -42,
        42
      );
      const next = normalizeAlphabetOffset(
        alphabetOffsetRef.current + alphabetVelocityRef.current * 0.35
      );
      syncAlphabetOffset(next);
      const rail = alphabetRailRef.current;
      if (rail) {
        setSelectedLetter(letterFromOffset(next, rail.clientHeight));
      }
      runAlphabetMomentum();
    },
    [letterFromOffset, normalizeAlphabetOffset, runAlphabetMomentum, syncAlphabetOffset]
  );

  const handleAlphabetPointerDown = React.useCallback(
    (event: React.PointerEvent<HTMLElement>) => {
      event.preventDefault();
      if (alphabetRafRef.current) {
        window.cancelAnimationFrame(alphabetRafRef.current);
        alphabetRafRef.current = null;
      }
      alphabetDraggingRef.current = true;
      alphabetVelocityRef.current = 0;
      alphabetLastYRef.current = event.clientY;
      alphabetLastTsRef.current = event.timeStamp;
      event.currentTarget.setPointerCapture(event.pointerId);
    },
    []
  );

  const handleAlphabetPointerMove = React.useCallback(
    (event: React.PointerEvent<HTMLElement>) => {
      if (!alphabetDraggingRef.current) {
        return;
      }
      const delta = event.clientY - alphabetLastYRef.current;
      const dt = Math.max(1, event.timeStamp - alphabetLastTsRef.current);
      alphabetLastYRef.current = event.clientY;
      alphabetLastTsRef.current = event.timeStamp;
      alphabetVelocityRef.current = clamp((delta / dt) * 16, -48, 48);
      const next = normalizeAlphabetOffset(alphabetOffsetRef.current + delta);
      syncAlphabetOffset(next);
      const rail = alphabetRailRef.current;
      if (rail) {
        setSelectedLetter(letterFromOffset(next, rail.clientHeight));
      }
    },
    [letterFromOffset, normalizeAlphabetOffset, syncAlphabetOffset]
  );

  const handleAlphabetPointerUp = React.useCallback(() => {
    if (!alphabetDraggingRef.current) {
      return;
    }
    alphabetDraggingRef.current = false;
    runAlphabetMomentum();
  }, [runAlphabetMomentum]);

  const handleSearchChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value.replace(/[^a-zA-Z0-9\s'-]/g, "");
      setSearchQuery(value);
      if (value) {
        setSearchFlash((current) => ({ text: value, key: current.key + 1 }));
      }
      const match = findArtistForQuery(value);
      if (match !== null) {
        goToArtist(match);
      }
    },
    [goToArtist]
  );

  const handleSearchBlur = React.useCallback(() => {
    setSearchQuery("");
    setSearchFlash({ text: "", key: 0 });
  }, []);

  const poseForCenter = (index: number, center: number) => {
    const stages = Math.min(DECK_PEEK_STAGES, Math.max(0, artists.length - 1));
    if (index === center) {
      return { mode: "active" as const, offset: 0 };
    }
    for (let depth = 1; depth < artists.length; depth += 1) {
      if (index === wrapIndex(center - depth, artists.length)) {
        if (depth <= stages) {
          return { mode: "peek" as const, offset: -depth };
        }
        return {
          mode: "hidden" as const,
          offset: peekExitOffset(-1) - (depth - stages - 1),
        };
      }
      if (index === wrapIndex(center + depth, artists.length)) {
        if (depth === 1) {
          return { mode: "hidden" as const, offset: peekExitOffset(1) };
        }
        return {
          mode: "hidden" as const,
          offset: peekExitOffset(1) + (depth - 1),
        };
      }
    }
    return { mode: "hidden" as const, offset: peekExitOffset(1) + artists.length };
  };

  const cardPoseFor = (index: number) => {
    const current = poseForCenter(index, activeIndex);
    if (transition || elasticOffset === 0) {
      return { ...current, tracking: false };
    }
    const direction: 1 | -1 = elasticOffset > 0 ? 1 : -1;
    const incomingIndex = wrapIndex(activeIndex + direction, artists.length);
    if (index !== activeIndex && index !== incomingIndex) {
      return { ...current, tracking: false };
    }
    const progress = Math.min(1, Math.abs(elasticOffset) / ELASTIC_TRIGGER);
    const target = poseForCenter(index, incomingIndex);
    return {
      mode: current.mode,
      offset: current.offset + (target.offset - current.offset) * progress,
      tracking: true,
    };
  };

  const navDisabled = artists.length < 2;

  const alphabetLetters = React.useMemo(
    () =>
      Array.from({ length: ALPHABET_COPIES }, (_, copy) =>
        LETTERS.map((letter) => ({
          key: `${copy}-${letter}`,
          letter,
        }))
      ).flat(),
    []
  );

  return (
    <Page>
      <ArtistsShadow>
        <ArtistsShell theme={theme}>
        <ArtistsTitleBar>
          <DeckNavButton
            type="button"
            theme={theme}
            $side="prev"
            aria-label="Previous artist"
            disabled={navDisabled}
            onClick={() => triggerSlide(-1)}
          >
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M14.5 5.5 8 12l6.5 6.5"
                stroke="currentColor"
                strokeWidth="2.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </DeckNavButton>
          <ArtistsHeading theme={theme}>Artists</ArtistsHeading>
          <DeckNavButton
            type="button"
            theme={theme}
            $side="next"
            aria-label="Next artist"
            disabled={navDisabled}
            onClick={() => triggerSlide(1)}
          >
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M9.5 5.5 16 12l-6.5 6.5"
                stroke="currentColor"
                strokeWidth="2.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </DeckNavButton>
        </ArtistsTitleBar>
        <AlphabetRail
          ref={alphabetRailRef}
          onWheel={handleAlphabetWheel}
          onPointerDown={handleAlphabetPointerDown}
          onPointerMove={handleAlphabetPointerMove}
          onPointerUp={handleAlphabetPointerUp}
          onPointerCancel={handleAlphabetPointerUp}
          aria-label="Alphabet index"
        >
          <AlphabetTrack style={{ transform: `translate3d(0, ${alphabetOffset}px, 0)` }}>
            {alphabetLetters.map(({ key, letter }) => (
              <AlphabetLetter
                key={key}
                type="button"
                theme={theme}
                $active={letter === selectedLetter}
                tabIndex={-1}
                onClick={() => {
                  const rail = alphabetRailRef.current;
                  if (!rail) {
                    return;
                  }
                  if (alphabetRafRef.current) {
                    window.cancelAnimationFrame(alphabetRafRef.current);
                  }
                  alphabetVelocityRef.current = 0;
                  const target = offsetForLetter(letter, rail.clientHeight);
                  syncAlphabetOffset(normalizeAlphabetOffset(target));
                  landOnLetter(letter);
                }}
              >
                {letter}
              </AlphabetLetter>
            ))}
          </AlphabetTrack>
        </AlphabetRail>
        <InvisibleSearch
          ref={searchInputRef}
          value={searchQuery}
          onChange={handleSearchChange}
          onBlur={handleSearchBlur}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          aria-label="Search artists"
        />
        <SearchFlash
          key={searchFlash.key}
          theme={theme}
          $active={searchFlash.text.length > 0}
          aria-hidden={!searchFlash.text}
        >
          <SearchFlashText theme={theme}>{searchFlash.text}</SearchFlashText>
        </SearchFlash>
        <DeckViewport
          ref={deckViewportRef}
          tabIndex={0}
          onWheel={handleWheel}
          theme={theme}
        >
          <CardStage>
            {artists.map((artist, index) => {
              const pose = cardPoseFor(index);
              const isSelected = index === activeIndex;
              const interactive = isSelected && !transition;
              return (
                <CardFrame
                  key={artist.name}
                  $mode={isSelected ? "active" : pose.mode}
                  $offset={pose.offset}
                  $tracking={pose.tracking}
                  $interactive={interactive}
                >
                  <ArtistCard
                    artist={artist}
                    theme={theme}
                    parallaxEnabled={interactive}
                    scrollRef={(element) => {
                      panelRefs.current[index] = element;
                    }}
                  />
                </CardFrame>
              );
            })}
          </CardStage>
        </DeckViewport>
        </ArtistsShell>
      </ArtistsShadow>
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
