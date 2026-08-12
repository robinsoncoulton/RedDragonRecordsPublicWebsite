import React from "react";
import { Theme } from "../../Utils/Theme/types";
import { LocalisationCopy } from "../../Localisation/types";
import {
  BenefitBody,
  BenefitItem,
  BenefitTitle,
  BenefitsGrid,
  JoinSection,
  SectionHeading,
} from "./styles";

type AffiliateBenefitsProps = {
  theme: Theme;
  copy: LocalisationCopy["join"]["benefits"];
};

const AffiliateBenefits: React.FC<AffiliateBenefitsProps> = ({ theme, copy }) => (
  <JoinSection>
    <SectionHeading theme={theme}>{copy.heading}</SectionHeading>
    <BenefitsGrid>
      {copy.items.map((benefit) => (
        <BenefitItem key={benefit.title}>
          <BenefitTitle theme={theme}>{benefit.title}</BenefitTitle>
          <BenefitBody theme={theme}>{benefit.body}</BenefitBody>
        </BenefitItem>
      ))}
    </BenefitsGrid>
  </JoinSection>
);

export default AffiliateBenefits;
