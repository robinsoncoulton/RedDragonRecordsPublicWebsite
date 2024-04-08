import React from "react";
import { CardProps } from "./types";
import { Container, ImageWrapper, TextWrapper, Image } from "./styles";
import { useTheme } from "../../Theme";

const Card: React.FC<CardProps> = ({ children, src, animationDelay }) => {
  const { theme } = useTheme();

  return (
    <Container animationDelay={animationDelay}>
      <ImageWrapper theme={theme}>{src && <Image src={src} />}</ImageWrapper>
      <TextWrapper theme={theme}>{children}</TextWrapper>
    </Container>
  );
};

export default Card;
