export enum SocialPlatform {
  FACEBOOK = "facebook",
  YOUTUBE = "youtube",
  INSTAGRAM = "instagram",
  SPOTIFY = "spotify",
  BANDCAMP = "bandcamp",
}

export enum ArtistCopyBlockType {
  PARAGRAPH = "paragraph",
  QUOTE = "quote",
  HEADING = "heading",
  LIST = "list",
}

export type ArtistCopyParagraphDTO = {
  type: ArtistCopyBlockType.PARAGRAPH;
  text: string;
};

export type ArtistCopyQuoteDTO = {
  type: ArtistCopyBlockType.QUOTE;
  text: string;
  attribution: string;
};

export type ArtistCopyHeadingDTO = {
  type: ArtistCopyBlockType.HEADING;
  text: string;
};

export type ArtistCopyListDTO = {
  type: ArtistCopyBlockType.LIST;
  items: string[];
};

export type ArtistCopyBlockDTO =
  | ArtistCopyParagraphDTO
  | ArtistCopyQuoteDTO
  | ArtistCopyHeadingDTO
  | ArtistCopyListDTO;

export type ArtistSocialLinkDTO = {
  platform: SocialPlatform;
  url: string;
};

export type ArtistProfile = {
  name: string;
  genre: string;
  city: string;
  copy: ArtistCopyBlockDTO[];
  images?: string[];
  credits?: string[];
  heroImage?: string;
  musicLinks?: string[];
  socialLinks?: ArtistSocialLinkDTO[];
};
