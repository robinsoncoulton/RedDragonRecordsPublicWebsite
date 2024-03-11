import React from "react";
import { Container, Tails, Body, Spacer } from "./styles";
import { useTheme } from "../../Theme";

const Banner: React.FC = () => {
  const { theme } = useTheme();
  return (
    <>
      <Container>
        <Tails theme={theme} left />
        <Spacer>Bespoke Audio Services</Spacer>
        <Body theme={theme}>Bespoke Audio Services</Body>
        <Tails theme={theme} right />
      </Container>
    </>
  );
};

export default Banner;
