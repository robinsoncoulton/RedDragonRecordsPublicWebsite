import React from "react";
import Page from "../../Components/Page";
import { useTheme } from "../../Utils/Theme";
import { useLocalisation } from "../../Localisation";
import {
  PrivacyBody,
  PrivacyHeading,
  PrivacyIntro,
  PrivacyShell,
  PrivacyTitle,
} from "./styles";

const Privacy: React.FC = () => {
  const { theme } = useTheme();
  const { copy } = useLocalisation();
  const privacy = copy.privacy;

  return (
    <Page>
      <PrivacyShell theme={theme}>
        <PrivacyTitle theme={theme}>{privacy.title}</PrivacyTitle>
        <PrivacyIntro theme={theme}>{privacy.intro}</PrivacyIntro>
        <PrivacyHeading theme={theme}>{privacy.analyticsHeading}</PrivacyHeading>
        <PrivacyBody theme={theme}>{privacy.analyticsBody}</PrivacyBody>
        <PrivacyHeading theme={theme}>{privacy.formsHeading}</PrivacyHeading>
        <PrivacyBody theme={theme}>{privacy.formsBody}</PrivacyBody>
        <PrivacyHeading theme={theme}>{privacy.choicesHeading}</PrivacyHeading>
        <PrivacyBody theme={theme}>{privacy.choicesBody}</PrivacyBody>
        <PrivacyBody theme={theme}>{privacy.contact}</PrivacyBody>
      </PrivacyShell>
    </Page>
  );
};

export default Privacy;
