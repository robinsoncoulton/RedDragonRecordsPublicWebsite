import React from "react";
import { Theme } from "../../Utils/Theme/types";
import {
  ActiveLabel,
  CarouselNav,
  NavButton,
  SideButton,
  SideToggle,
  StepDot,
  StepDots,
} from "./styles";
import { BeforeAfterTrack } from "./types";

type TrackSelectProps = {
  theme: Theme;
  tracks: BeforeAfterTrack[];
  activeIndex: number;
  onSelect: (index: number) => void;
};

export const TrackSelect: React.FC<TrackSelectProps> = ({
  theme,
  tracks,
  activeIndex,
  onSelect,
}) => {
  if (tracks.length === 2) {
    return (
      <SideToggle theme={theme}>
        {tracks.map((track, index) => (
          <SideButton
            key={`${track.label}-${index}`}
            theme={theme}
            type="button"
            $active={activeIndex === index}
            onClick={() => onSelect(index)}
          >
            {track.label}
          </SideButton>
        ))}
      </SideToggle>
    );
  }

  return (
    <>
      <ActiveLabel>{tracks[activeIndex]?.label}</ActiveLabel>
      <CarouselNav>
        <NavButton
          theme={theme}
          type="button"
          disabled={activeIndex === 0}
          onClick={() => onSelect(activeIndex - 1)}
        >
          Prev
        </NavButton>
        <SideToggle theme={theme}>
          {tracks.map((track, index) => (
            <SideButton
              key={`${track.label}-${index}`}
              theme={theme}
              type="button"
              $active={activeIndex === index}
              onClick={() => onSelect(index)}
            >
              {track.label}
            </SideButton>
          ))}
        </SideToggle>
        <NavButton
          theme={theme}
          type="button"
          disabled={activeIndex === tracks.length - 1}
          onClick={() => onSelect(activeIndex + 1)}
        >
          Next
        </NavButton>
      </CarouselNav>
      <StepDots>
        {tracks.map((track, index) => (
          <StepDot
            key={`${track.label}-dot-${index}`}
            theme={theme}
            type="button"
            $active={activeIndex === index}
            aria-label={track.label}
            title={track.label}
            onClick={() => onSelect(index)}
          />
        ))}
      </StepDots>
    </>
  );
};
