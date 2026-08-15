import React from "react";
import { Theme } from "../../Utils/Theme/types";
import {
  BandcampIcon,
  FacebookIcon,
  InstagramIcon,
  SpotifyIcon,
  YouTubeIcon,
} from "../../icons";
import ArtistCopyContent from "./ArtistCopyContent";
import {
  ArtistSocialFallback,
  ArtistSocialLink,
  TradingCard,
  TradingCardBio,
  TradingCardBody,
  TradingCardFooter,
  TradingCardHero,
  TradingCardHeroFallback,
  TradingCardHeroImage,
  TradingCardHeroMedia,
  TradingCardHighlightCollab,
  TradingCardHighlightList,
  TradingCardHighlightMeta,
  TradingCardHighlightRow,
  TradingCardHighlightYear,
  TradingCardInfoBar,
  TradingCardInfoBlock,
  TradingCardInfoValue,
  TradingCardName,
  TradingCardNameText,
  TradingCardRelease,
  TradingCardReleaseCaption,
  TradingCardReleaseEmbed,
  TradingCardReleaseEmbedShield,
  TradingCardReleaseImage,
  TradingCardReleaseItem,
  TradingCardReleaseNav,
  TradingCardReleaseRow,
  TradingCardReleaseTile,
  TradingCardReleaseTrack,
  TradingCardScroll,
  TradingCardSection,
} from "./styles";
import { ArtistProfile, SocialPlatform } from "./types";

const socialPlatformIcon: Partial<
  Record<SocialPlatform, React.FunctionComponent<React.SVGProps<SVGSVGElement>>>
> = {
  [SocialPlatform.FACEBOOK]: FacebookIcon,
  [SocialPlatform.YOUTUBE]: YouTubeIcon,
  [SocialPlatform.INSTAGRAM]: InstagramIcon,
  [SocialPlatform.SPOTIFY]: SpotifyIcon,
  [SocialPlatform.BANDCAMP]: BandcampIcon,
};

const socialPlatformLabel: Record<SocialPlatform, string> = {
  [SocialPlatform.FACEBOOK]: "Facebook",
  [SocialPlatform.YOUTUBE]: "YouTube",
  [SocialPlatform.INSTAGRAM]: "Instagram",
  [SocialPlatform.SPOTIFY]: "Spotify",
  [SocialPlatform.BANDCAMP]: "Bandcamp",
};

type ArtistCardProps = {
  artist: ArtistProfile;
  theme: Theme;
  scrollRef?: (element: HTMLDivElement | null) => void;
  parallaxEnabled?: boolean;
};

const ArtistCard: React.FC<ArtistCardProps> = ({
  artist,
  theme,
  scrollRef,
  parallaxEnabled = false,
}) => {
  const releaseTrackRef = React.useRef<HTMLDivElement | null>(null);
  const heroRef = React.useRef<HTMLDivElement | null>(null);
  const nameRef = React.useRef<HTMLHeadingElement | null>(null);
  const nameTextRef = React.useRef<HTMLSpanElement | null>(null);
  const [nameFontSize, setNameFontSize] = React.useState(56);
  const [nameScaleX, setNameScaleX] = React.useState(1);
  const [heroParallax, setHeroParallax] = React.useState({ x: 0, y: 0 });
  const [activeEmbedKey, setActiveEmbedKey] = React.useState<string | null>(null);
  const releases = artist.featuredReleases ?? [];
  const highlights = artist.sessionHighlights ?? [];
  const socialLinks = artist.socialLinks ?? [];
  const copyBlocks = artist.copy ?? [];
  const bio = artist.bio?.trim() ?? "";
  const showCopy = copyBlocks.length > 0;

  React.useEffect(() => {
    if (!parallaxEnabled) {
      setActiveEmbedKey(null);
    }
  }, [parallaxEnabled]);

  React.useLayoutEffect(() => {
    const hero = heroRef.current;
    const name = nameRef.current;
    const text = nameTextRef.current;
    if (!hero || !name || !text) {
      return;
    }
    const fit = () => {
      const maxSize = Math.min(64, Math.max(32, hero.clientWidth * 0.2));
      const minSize = 18;
      const maxHeight = hero.clientHeight * 0.42;
      const availableWidth = name.clientWidth;
      if (availableWidth <= 0) {
        return;
      }
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      const computed = window.getComputedStyle(text);
      const letterSpacing = Number.parseFloat(computed.letterSpacing) || 0;
      const words = artist.name.toUpperCase().split(/\s+/).filter(Boolean);
      const measureWord = (word: string, size: number) => {
        if (!context) {
          return availableWidth;
        }
        context.font = `${computed.fontWeight || "400"} ${size}px ${computed.fontFamily}`;
        return context.measureText(word).width + letterSpacing * Math.max(0, word.length - 1);
      };
      const measureLongest = (size: number) =>
        words.reduce((max, word) => Math.max(max, measureWord(word, size)), 0);
      const measureLineWidth = (size: number) => {
        if (!context || words.length === 0) {
          return 0;
        }
        context.font = `${computed.fontWeight || "400"} ${size}px ${computed.fontFamily}`;
        const space = context.measureText(" ").width + letterSpacing;
        return words.reduce((total, word, index) => {
          const wordWidth = measureWord(word, size);
          return total + wordWidth + (index > 0 ? space : 0);
        }, 0);
      };
      text.style.transform = "none";
      let low = minSize;
      let high = maxSize;
      let best = minSize;
      for (let i = 0; i < 20; i += 1) {
        const mid = (low + high) / 2;
        text.style.fontSize = `${mid}px`;
        const longest = measureLongest(mid);
        const scaleX = Math.min(1, (availableWidth * 0.98) / Math.max(longest, 1));
        text.style.transform = `scaleX(${scaleX})`;
        if (text.scrollHeight <= maxHeight + 1) {
          best = mid;
          low = mid;
        } else {
          high = mid;
        }
        if (high - low < 0.35) {
          break;
        }
      }
      text.style.fontSize = `${best}px`;
      text.style.transform = "none";
      const longest = measureLongest(best);
      const fullLine = measureLineWidth(best);
      const needsWrap = fullLine > availableWidth * 0.98 && words.length > 1;
      const scaleTarget = needsWrap ? longest : Math.max(longest, fullLine);
      const scaleX = Math.min(1, (availableWidth * 0.98) / Math.max(scaleTarget, 1));
      text.style.fontSize = "";
      text.style.transform = "";
      setNameFontSize(best);
      setNameScaleX(scaleX);
    };
    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(hero);
    observer.observe(name);
    return () => observer.disconnect();
  }, [artist.name]);

  const scrollReleases = (direction: 1 | -1) => {
    const track = releaseTrackRef.current;
    if (!track) {
      return;
    }
    track.scrollBy({ left: direction * track.clientWidth * 0.7, behavior: "smooth" });
  };

  React.useEffect(() => {
    if (!parallaxEnabled || !artist.heroImage) {
      setHeroParallax({ x: 0, y: 0 });
      return;
    }
    const strength = 5.5;
    const onMove = (event: PointerEvent) => {
      const width = window.innerWidth || 1;
      const height = window.innerHeight || 1;
      const nx = (event.clientX / width) * 2 - 1;
      const ny = (event.clientY / height) * 2 - 1;
      setHeroParallax({
        x: -nx * strength,
        y: -ny * strength,
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [parallaxEnabled, artist.heroImage]);

  return (
    <TradingCard theme={theme}>
      <TradingCardScroll
        ref={scrollRef}
        theme={theme}
      >
        <TradingCardHero ref={heroRef}>
          <TradingCardHeroMedia>
            {artist.heroImage ? (
              <TradingCardHeroImage
                src={artist.heroImage}
                alt=""
                loading="eager"
                style={{
                  transform: `translate3d(calc(-50% + ${heroParallax.x}%), calc(-50% + ${heroParallax.y}%), 0)`,
                }}
              />
            ) : (
              <TradingCardHeroFallback />
            )}
          </TradingCardHeroMedia>
          <TradingCardName ref={nameRef} theme={theme}>
            <TradingCardNameText
              ref={nameTextRef}
              $fontSizePx={nameFontSize}
              $scaleX={nameScaleX}
            >
              {artist.name}
            </TradingCardNameText>
          </TradingCardName>
        </TradingCardHero>
        {(artist.genre || artist.city) && (
          <TradingCardInfoBar>
            {artist.genre ? (
              <TradingCardInfoBlock>
                <TradingCardInfoValue theme={theme}>{artist.genre}</TradingCardInfoValue>
              </TradingCardInfoBlock>
            ) : null}
            {artist.city ? (
              <TradingCardInfoBlock $divider={Boolean(artist.genre)}>
                <TradingCardInfoValue theme={theme}>{artist.city}</TradingCardInfoValue>
              </TradingCardInfoBlock>
            ) : null}
          </TradingCardInfoBar>
        )}
        <TradingCardBody>
          {bio ? <TradingCardBio>{bio}</TradingCardBio> : null}
          {showCopy ? <ArtistCopyContent blocks={copyBlocks} theme={theme} /> : null}
          {releases.length ? (
            <TradingCardSection>
              <TradingCardReleaseRow>
                <TradingCardReleaseNav
                  type="button"
                  theme={theme}
                  aria-label="Previous releases"
                  onClick={() => scrollReleases(-1)}
                  disabled={releases.length < 2}
                >
                  ‹
                </TradingCardReleaseNav>
                <TradingCardReleaseTrack ref={releaseTrackRef}>
                  {releases.map((release) => {
                    const releaseKey = `${release.title}-${release.year}`;
                    const hasCover = Boolean(release.coverImage);
                    const cover = hasCover ? (
                      <>
                        <TradingCardReleaseImage src={release.coverImage} alt="" />
                        <TradingCardReleaseCaption>
                          {release.title} {release.year}
                        </TradingCardReleaseCaption>
                      </>
                    ) : null;
                    return (
                      <TradingCardReleaseItem key={releaseKey}>
                        {hasCover ? (
                          release.url ? (
                            <TradingCardRelease
                              theme={theme}
                              href={release.url}
                              target="_blank"
                              rel="noreferrer"
                            >
                              {cover}
                            </TradingCardRelease>
                          ) : (
                            <TradingCardReleaseTile theme={theme}>{cover}</TradingCardReleaseTile>
                          )
                        ) : null}
                        {release.embed ? (
                          <TradingCardReleaseEmbed $active={activeEmbedKey === releaseKey}>
                            <div dangerouslySetInnerHTML={{ __html: release.embed }} />
                            {activeEmbedKey === releaseKey ? null : (
                              <TradingCardReleaseEmbedShield
                                type="button"
                                aria-label={`Play ${release.title}`}
                                onClick={() => setActiveEmbedKey(releaseKey)}
                              />
                            )}
                          </TradingCardReleaseEmbed>
                        ) : null}
                      </TradingCardReleaseItem>
                    );
                  })}
                </TradingCardReleaseTrack>
                <TradingCardReleaseNav
                  type="button"
                  theme={theme}
                  aria-label="Next releases"
                  onClick={() => scrollReleases(1)}
                  disabled={releases.length < 2}
                >
                  ›
                </TradingCardReleaseNav>
              </TradingCardReleaseRow>
            </TradingCardSection>
          ) : null}
          {highlights.length ? (
            <TradingCardSection>
              <TradingCardHighlightList>
                {highlights.map((item) => (
                  <TradingCardHighlightRow
                    key={`${item.role}-${item.title}-${item.collaborator}`}
                    theme={theme}
                  >
                    <TradingCardHighlightMeta>
                      {item.role} • &lsquo;{item.title}&rsquo;
                    </TradingCardHighlightMeta>
                    <TradingCardHighlightCollab>{item.collaborator}</TradingCardHighlightCollab>
                    <TradingCardHighlightYear>{item.year}</TradingCardHighlightYear>
                  </TradingCardHighlightRow>
                ))}
              </TradingCardHighlightList>
            </TradingCardSection>
          ) : null}
        </TradingCardBody>
        {socialLinks.length ? (
          <TradingCardFooter theme={theme}>
            {socialLinks.map((link) => {
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
          </TradingCardFooter>
        ) : null}
      </TradingCardScroll>
    </TradingCard>
  );
};

export default ArtistCard;
