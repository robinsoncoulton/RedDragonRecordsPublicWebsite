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
const handleFooterIconClick = () => undefined;

const Footer: React.FC = () => {
  const { theme } = useTheme();
  return (
    <StyledFooter theme={theme}>
      <FooterLeft>
        <FooterIcon aria-label="Instagram" onClick={handleFooterIconClick}>
          <InstagramIcon />
        </FooterIcon>
        <FooterIcon aria-label="YouTube" onClick={handleFooterIconClick}>
          <YouTubeIcon />
        </FooterIcon>
        <FooterIcon aria-label="Spotify" onClick={handleFooterIconClick}>
          <SpotifyIcon />
        </FooterIcon>
        <FooterIcon aria-label="Facebook" onClick={handleFooterIconClick}>
          <FacebookIcon />
        </FooterIcon>
      </FooterLeft>
      <FooterCenter>{`©${currentYear} Red Dragon Records. All Rights Reserved.`}</FooterCenter>
      <FooterRight>Tainan, Taiwan</FooterRight>
    </StyledFooter>
  );
};

export default Footer;