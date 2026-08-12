import React from "react";
import Page from "../../Components/Page";
import { useTheme } from "../../Utils/Theme";
import { useLocalisation } from "../../Localisation";
import AffiliateApplication from "./AffiliateApplication";
import AffiliateBenefits from "./AffiliateBenefits";
import IndependenceStatement from "./IndependenceStatement";
import JoinHero from "./JoinHero";
import { JoinShell } from "./styles";

const Join: React.FC = () => {
  const { theme } = useTheme();
  const { copy } = useLocalisation();

  return (
    <Page>
      <JoinShell theme={theme}>
        <JoinHero theme={theme} copy={copy.join.hero} />
        <AffiliateBenefits theme={theme} copy={copy.join.benefits} />
        <IndependenceStatement theme={theme} copy={copy.join.independence} />
        <AffiliateApplication theme={theme} copy={copy.join.application} />
      </JoinShell>
    </Page>
  );
};

export default Join;
