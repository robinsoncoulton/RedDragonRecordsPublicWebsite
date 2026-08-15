import artistsConfig from "./artists.json";
import {
  ArtistCopyBlockDTO,
  ArtistCopyBlockType,
  ArtistProfile,
  ArtistSocialLinkDTO,
  FeaturedReleaseDTO,
  SessionHighlightDTO,
  SocialPlatform,
} from "./types";

type ArtistConfigDTO = {
  name: string;
  cardNumber?: number;
  affiliation?: string;
  genre?: string;
  city?: string;
  bio?: string;
  heroImage?: string;
  images?: string[];
  credits?: string[];
  musicLinks?: string[];
  copy?: ArtistCopyBlockDTO[];
  featuredReleases?: Array<Omit<FeaturedReleaseDTO, "coverImage"> & { coverImage?: string }>;
  sessionHighlights?: SessionHighlightDTO[];
  socialLinks?: ArtistSocialLinkDTO[];
};

const artistImageContext = require.context(
  "../../Assets/Artists",
  true,
  /\.(jpe?g|png|webp)$/i
);

const resolveArtistImage = (relativePath?: string) => {
  const path = relativePath?.trim();
  if (!path) {
    return undefined;
  }
  const key = `./${path.replace(/^\.\//, "")}`;
  const match = artistImageContext
    .keys()
    .find((entry: string) => entry.toLowerCase() === key.toLowerCase());
  if (!match) {
    return undefined;
  }
  const loaded = artistImageContext(match) as string | { default: string };
  return typeof loaded === "string" ? loaded : loaded.default;
};

const socialPlatformValues = new Set<string>(Object.values(SocialPlatform));

const normalizeSocialLinks = (links?: ArtistSocialLinkDTO[]) =>
  (links ?? [])
    .map((link) => {
      const platform = String(link.platform).toLowerCase();
      if (!socialPlatformValues.has(platform) || !link.url) {
        return null;
      }
      return {
        platform: platform as SocialPlatform,
        url: link.url,
      };
    })
    .filter((link): link is ArtistSocialLinkDTO => link !== null);

const normalizeCopy = (blocks?: ArtistCopyBlockDTO[]) =>
  (blocks ?? []).flatMap((block): ArtistCopyBlockDTO[] => {
    if (!block || typeof block !== "object" || !("type" in block)) {
      return [];
    }
    const type = String(block.type).toLowerCase();
    if (type === ArtistCopyBlockType.PARAGRAPH && "text" in block && block.text) {
      return [{ type: ArtistCopyBlockType.PARAGRAPH, text: block.text }];
    }
    if (
      type === ArtistCopyBlockType.QUOTE &&
      "text" in block &&
      block.text &&
      "attribution" in block
    ) {
      return [
        {
          type: ArtistCopyBlockType.QUOTE,
          text: block.text,
          attribution: block.attribution,
        },
      ];
    }
    if (type === ArtistCopyBlockType.HEADING && "text" in block && block.text) {
      return [{ type: ArtistCopyBlockType.HEADING, text: block.text }];
    }
    if (
      type === ArtistCopyBlockType.LIST &&
      "items" in block &&
      Array.isArray(block.items)
    ) {
      return [{ type: ArtistCopyBlockType.LIST, items: block.items.filter(Boolean) }];
    }
    return [];
  });

export const artists: ArtistProfile[] = (artistsConfig as ArtistConfigDTO[])
  .map((artist) => {
    const copy = normalizeCopy(artist.copy);
    const featuredReleases = artist.featuredReleases?.map((release) => {
      const coverImage = resolveArtistImage(release.coverImage);
      return coverImage ? { ...release, coverImage } : { ...release, coverImage: undefined };
    });
    const heroImage = resolveArtistImage(artist.heroImage);
    const profile: ArtistProfile = {
      name: artist.name,
      genre: artist.genre ?? "",
      city: artist.city ?? "",
      copy,
      cardNumber: artist.cardNumber,
      affiliation: artist.affiliation ?? "Studio Affiliate",
      bio: artist.bio,
      featuredReleases,
      sessionHighlights: artist.sessionHighlights,
      images: artist.images,
      credits: artist.credits,
      musicLinks: artist.musicLinks,
      socialLinks: normalizeSocialLinks(artist.socialLinks),
    };
    return heroImage ? { ...profile, heroImage } : profile;
  })
  .sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: "base" }))
  .map((artist, index) => ({
    ...artist,
    cardNumber: index + 1,
  }));
