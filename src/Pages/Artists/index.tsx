import React from "react";
import Page from "../../Components/Page";
import ComingSoon from "../ComingSoon";
import { useTheme } from "../../Utils/Theme";
import {
  ArtistCopy,
  ArtistCredit,
  ArtistCredits,
  ArtistImageMock,
  ArtistImageStrip,
  ArtistMeta,
  ArtistName,
  ArtistScrollArea,
  ArtistTag,
  ArtistsHeading,
  ArtistsShell,
  DeckSlide,
  DeckViewport,
} from "./styles";

type ArtistProfile = {
  name: string;
  genre: string;
  city: string;
  copy: string[];
  images: string[];
  credits: string[];
};

const mockArtists: ArtistProfile[] = [
  {
    name: "Neon Widow",
    genre: "Post-Punk / Dream Noise",
    city: "Tainan",
    copy: [
      "A five-piece band folding brittle drum machine rhythms into tape-saturated guitars.",
      "Their live set starts minimal and blooms into dense harmonic walls with spoken-word hooks.",
      "They treat studio sessions like film scenes, writing transitions as if they were camera cuts.",
    ],
    images: ["Live Room", "Tape Echo"],
    credits: ["Debut LP tracking in progress", "Single mixed to 1/4 inch tape", "Tour prep sessions"],
  },
  {
    name: "Salt Cathedral Club",
    genre: "Alt Pop / Disco Guitars",
    city: "Kaohsiung",
    copy: [
      "A producer-fronted project that blends crisp Linn patterns with jagged chorus guitars.",
      "The artist team builds songs from groove first, then folds in vocal counter melodies.",
      "Most sessions are tracked at night with a quick mix pass before sunrise.",
      "Their visual language drives arrangement choices and dynamic drops in each chorus.",
    ],
    images: ["Control Room", "Vocal Booth", "Patch Bay"],
    credits: ["2 EPs released independently", "Sync pitch reel in production", "Live stems archived for remix"],
  },
  {
    name: "Copper Youth",
    genre: "Indie Rock / Garage Soul",
    city: "Taichung",
    copy: [
      "A trio centered on raw drum tones, close-mic bass, and overdriven ribbon-style ambiance.",
      "Songs are cut mostly live, then doubled with contrasting guitar layers for width.",
      "They favor first-take vocals and keep edits to emotion-preserving nudges only.",
    ],
    images: ["Drum Corner", "Amp Stack"],
    credits: ["Full-length album writing camp", "Live-off-floor tracking workflow", "Analog stem print archive"],
  },
  {
    name: "Velvet District",
    genre: "Cinematic R&B / Electronica",
    city: "Taipei",
    copy: [
      "A collaborative project built around low-end synth movement and intimate vocal stacks.",
      "Sessions layer modular textures with organic percussion and baritone guitar swells.",
      "Arrangements are mapped in chapters, each chapter with distinct ambience and reverb depth.",
      "Their releases emphasize headphone detail with broad mono compatibility for club systems.",
    ],
    images: ["Modular Rack", "Percussion Table", "Mix Notes"],
    credits: ["Concept album chapter one complete", "Dolby Atmos prep stems", "Alt vocal cuts archived"],
  },
  {
    name: "Aster North",
    genre: "Folk Noir / Experimental",
    city: "Tainan",
    copy: [
      "A songwriter collective mixing fingerstyle acoustics, bowed textures, and field recordings.",
      "They capture most parts through preamps pushed into gentle harmonic breakup.",
      "Songs evolve from rough demos into layered narratives with choir-like backing passes.",
      "Every session ends with a print-through pass for lo-fi alternate versions.",
    ],
    images: ["Song Map", "Mic Pair", "Late Night Print"],
    credits: ["Acoustic suite recording", "Hybrid analog mastering tests", "Film score cues in development"],
  },
];

type TransitionState = {
  from: number;
  to: number;
  direction: 1 | -1;
};

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
const wrapIndex = (value: number, length: number) => ((value % length) + length) % length;
const SHOW_ARTISTS_SHOWCASE = false;

const ArtistsShowcase: React.FC = () => {
  const { theme } = useTheme();
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [transition, setTransition] = React.useState<TransitionState | null>(null);
  const [elasticOffset, setElasticOffset] = React.useState(0);
  const panelRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  const overscrollRef = React.useRef(0);
  const animationTimeoutRef = React.useRef<number | null>(null);
  const elasticResetTimeoutRef = React.useRef<number | null>(null);
  const ignoreWheelUntilRef = React.useRef(0);

  React.useEffect(
    () => () => {
      if (animationTimeoutRef.current) {
        window.clearTimeout(animationTimeoutRef.current);
      }
      if (elasticResetTimeoutRef.current) {
        window.clearTimeout(elasticResetTimeoutRef.current);
      }
    },
    []
  );

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
      if (transition) {
        return;
      }
      const nextIndex = wrapIndex(activeIndex + direction, mockArtists.length);
      setTransition({ from: activeIndex, to: nextIndex, direction });
      setElasticOffset(0);
      overscrollRef.current = 0;
      if (elasticResetTimeoutRef.current) {
        window.clearTimeout(elasticResetTimeoutRef.current);
      }
      animationTimeoutRef.current = window.setTimeout(() => {
        setActiveIndex(nextIndex);
        setTransition(null);
        ignoreWheelUntilRef.current = Date.now() + 180;
      }, 540);
    },
    [activeIndex, transition]
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
      if (transition) {
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
    [activeIndex, transition, triggerSlide, scheduleElasticReset]
  );

  const renderSlide = (
    index: number,
    mode: "active" | "entering" | "leaving",
    direction: 1 | -1,
    elastic: number
  ) => {
    const artist = mockArtists[index];
    return (
      <DeckSlide key={`${artist.name}-${mode}`} $mode={mode} $direction={direction} $elastic={elastic} theme={theme}>
        <ArtistMeta theme={theme}>
          <ArtistName theme={theme}>{artist.name}</ArtistName>
          <ArtistTag>{artist.genre}</ArtistTag>
          <ArtistTag>{artist.city}</ArtistTag>
        </ArtistMeta>
        <ArtistScrollArea
          ref={(element) => {
            panelRefs.current[index] = element;
          }}
          theme={theme}
        >
          {artist.copy.map((paragraph) => (
            <ArtistCopy key={paragraph} theme={theme}>
              {paragraph}
            </ArtistCopy>
          ))}
          <ArtistImageStrip>
            {artist.images.map((image) => (
              <ArtistImageMock key={image} theme={theme}>
                {image}
              </ArtistImageMock>
            ))}
          </ArtistImageStrip>
          <ArtistCredits>
            {artist.credits.map((credit) => (
              <ArtistCredit key={credit}>{credit}</ArtistCredit>
            ))}
          </ArtistCredits>
        </ArtistScrollArea>
      </DeckSlide>
    );
  };

  return (
    <Page>
      <ArtistsShell theme={theme}>
        <ArtistsHeading theme={theme}>Artists</ArtistsHeading>
        <DeckViewport onWheel={handleWheel} theme={theme}>
          {transition
            ? [
                renderSlide(transition.from, "leaving", transition.direction, 0),
                renderSlide(transition.to, "entering", transition.direction, 0),
              ]
            : renderSlide(activeIndex, "active", 1, elasticOffset)}
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
