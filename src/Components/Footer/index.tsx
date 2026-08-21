import React from "react";
import { useTheme } from "../../Utils/Theme";
import { useLocalisation } from "../../Localisation";
import { openCookieSettings, trackOutboundClick } from "../../Analytics";
import {
  FacebookIcon,
  InstagramIcon,
  SpotifyIcon,
  YouTubeIcon,
} from "../../icons";
import {
  FooterCenter,
  FooterIcon,
  FooterLeft,
  FooterLinks,
  FooterRight,
  FooterTextButton,
  FooterTextLink,
  StyledFooter,
} from "./styles";

const currentYear = new Date().getFullYear();

const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/reddragonrecordstaiwan",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/watch?v=WpkJLRaLlHA&list=PLC5DK5U_EYSaT4YBBiikV7fklgAvtt2xJ",
  },
  {
    label: "Spotify",
    href: "https://open.spotify.com/album/69jva0Nui1EfyRH1KwGl8J?si=MDUGbR80Q9GZsp3Sz7CSIg",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=100092575400299",
  },
] as const;

const socialIcons = {
  Instagram: InstagramIcon,
  YouTube: YouTubeIcon,
  Spotify: SpotifyIcon,
  Facebook: FacebookIcon,
};

const Footer: React.FC = () => {
  const { theme } = useTheme();
  const { copy } = useLocalisation();
  const footer = copy.footer;

  return (
    <StyledFooter theme={theme}>
      <FooterLeft>
        {socialLinks.map(({ label, href }) => {
          const Icon = socialIcons[label];
          return (
            <FooterIcon
              key={label}
              aria-label={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              onClick={() =>
                trackOutboundClick(href, {
                  content_type: "footer_social",
                  item_id: label.toLowerCase(),
                })
              }
            >
              <Icon />
            </FooterIcon>
          );
        })}
      </FooterLeft>
      <FooterCenter>
        {footer.copyright.replace("{year}", String(currentYear))}
        <FooterLinks>
          <FooterTextLink to="/privacy">{footer.privacy}</FooterTextLink>
          <FooterTextButton type="button" onClick={openCookieSettings}>
            {footer.cookieSettings}
          </FooterTextButton>
        </FooterLinks>
      </FooterCenter>
      <FooterRight>{footer.location}</FooterRight>
    </StyledFooter>
  );
};

export default Footer;
