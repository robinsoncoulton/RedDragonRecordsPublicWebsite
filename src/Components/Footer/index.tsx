import React from "react";
import { useTheme } from "../../Utils/Theme";
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
  FooterRight,
  StyledFooter,
} from "./styles";

const currentYear = new Date().getFullYear();

const Footer: React.FC = () => {
  const { theme } = useTheme();
  return (
    <StyledFooter theme={theme}>
      <FooterLeft>
        <FooterIcon
          aria-label="Instagram"
          href="https://www.instagram.com/reddragonrecordstaiwan"
          target="_blank"
          rel="noreferrer"
        >
          <InstagramIcon />
        </FooterIcon>
        <FooterIcon
          aria-label="YouTube"
          href="https://www.youtube.com/watch?v=WpkJLRaLlHA&list=PLC5DK5U_EYSaT4YBBiikV7fklgAvtt2xJ"
          target="_blank"
          rel="noreferrer"
        >
          <YouTubeIcon />
        </FooterIcon>
        <FooterIcon
          aria-label="Spotify"
          href="https://open.spotify.com/album/69jva0Nui1EfyRH1KwGl8J?si=MDUGbR80Q9GZsp3Sz7CSIg"
          target="_blank"
          rel="noreferrer"
        >
          <SpotifyIcon />
        </FooterIcon>
        <FooterIcon
          aria-label="Facebook"
          href="https://www.facebook.com/profile.php?id=100092575400299"
          target="_blank"
          rel="noreferrer"
        >
          <FacebookIcon />
        </FooterIcon>
      </FooterLeft>
      <FooterCenter>{`©${currentYear} Red Dragon Records. All Rights Reserved.`}</FooterCenter>
      <FooterRight>Tainan, Taiwan</FooterRight>
    </StyledFooter>
  );
};

export default Footer;