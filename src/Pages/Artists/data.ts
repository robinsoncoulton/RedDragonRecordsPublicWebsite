import artistsConfig from "./artists.json";
import { ArtistProfile } from "./types";

type ArtistConfigDTO = Omit<ArtistProfile, "heroImage"> & {
  heroImage?: string;
};

const artistHeroContext = require.context(
  "../../Assets/Artists",
  true,
  /\.(jpe?g|png|webp)$/i
);

const resolveHeroImage = (relativePath?: string) => {
  const path = relativePath?.trim();
  if (!path) {
    return undefined;
  }
  const key = `./${path.replace(/^\.\//, "")}`;
  const match = artistHeroContext
    .keys()
    .find((entry: string) => entry.toLowerCase() === key.toLowerCase());
  if (!match) {
    return undefined;
  }
  const loaded = artistHeroContext(match) as string | { default: string };
  return typeof loaded === "string" ? loaded : loaded.default;
};

export const artists: ArtistProfile[] = (artistsConfig as ArtistConfigDTO[]).map(
  (artist) => {
    const { heroImage: heroImagePath, ...rest } = artist;
    const heroImage = resolveHeroImage(heroImagePath);
    return heroImage ? { ...rest, heroImage } : rest;
  }
);
