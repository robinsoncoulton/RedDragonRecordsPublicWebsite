import { Theme } from "../../Utils/Theme/types";

export type BeforeAfterTrack = {
  src: string;
  label: string;
};

export type BeforeAfterPlayerProps = {
  theme: Theme;
  tracks?: BeforeAfterTrack[];
  srcA?: string;
  srcB?: string;
  labelA?: string;
  labelB?: string;
  crossfadeMs?: number;
};
