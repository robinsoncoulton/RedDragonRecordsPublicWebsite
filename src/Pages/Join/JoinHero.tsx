import React from "react";
import { Theme } from "../../Utils/Theme/types";
import { LocalisationCopy } from "../../Localisation/types";
import {
  HeroCtaWrap,
  HeroEyebrow,
  HeroHeading,
  HeroIntro,
  HeroTagline,
  JoinHeroSection,
  ScrollCta,
  ScrollCtaArrow,
  ScrollCtaFill,
  ScrollCtaText,
} from "./styles";

type JoinHeroProps = {
  theme: Theme;
  copy: LocalisationCopy["join"]["hero"];
};

const JoinHero: React.FC<JoinHeroProps> = ({ theme, copy }) => {
  const scrollToApplication = () => {
    document.getElementById("join-application")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <JoinHeroSection>
      <HeroEyebrow theme={theme}>{copy.eyebrow}</HeroEyebrow>
      <HeroHeading theme={theme}>{copy.heading}</HeroHeading>
      <HeroTagline theme={theme}>{copy.tagline}</HeroTagline>
      <HeroIntro theme={theme}>{copy.intro}</HeroIntro>
      <HeroCtaWrap>
        <ScrollCta theme={theme} type="button" onClick={scrollToApplication}>
          <ScrollCtaText>{copy.cta}</ScrollCtaText>
          <ScrollCtaFill theme={theme} />
          <ScrollCtaArrow theme={theme}>↓</ScrollCtaArrow>
        </ScrollCta>
      </HeroCtaWrap>
    </JoinHeroSection>
  );
};

export default JoinHero;
