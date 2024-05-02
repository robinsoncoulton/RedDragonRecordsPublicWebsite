import React from "react";
import {
  Container,
  Sleeve,
  VinylRecord,
  Circle,
  BackgroundImage,
  Overlay,
  StyledHeading,
  StyledText,
  TextContainer,
} from "./styles";
import templeSmoke from "../../Assets/temple_smoke.png";
import templeSmokeLive from "../../Assets/temple_smoke_live.jpeg";
import { useTheme } from "../../Theme";
import Record from "../Record";

const RecordCover: React.FC = () => {
  const { theme } = useTheme();

  return (
    <Container>
      <BackgroundImage src={templeSmokeLive} />
      <Overlay />
      <Record />
      <Sleeve src={templeSmoke} />
      <TextContainer theme={theme}>
        <StyledHeading theme={theme}>Temple Smoke</StyledHeading>
        <StyledText theme={theme}>
          Taking inspiration from the Heavy music from the 70s and 90s, Temple
          Smoke brings the best of Sabbath Esque heavy metal and combines it
          with elements of Desert Rock, Psychedelic Rock, Grunge and doom.
        </StyledText>
      </TextContainer>
    </Container>
  );
};

export default RecordCover;
