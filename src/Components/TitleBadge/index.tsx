import React from "react";
import { Container, Title, Word, WordWrapper } from "./styles";
import { ThemedElementProps } from "../../Theme/types";

const TitleBadge: React.FC<ThemedElementProps> = ({ theme }) => (
  <Container theme={theme}>
    {/* <Badge /> */}
    <Title theme={theme}>
      {/* <WordWrapper chinese={true}>
        <Word>轟</Word>
        <Word>隆</Word>
        <Word>紅</Word>
        <Word>龍</Word>
      </WordWrapper> */}
      <WordWrapper>
        <Word>Red </Word>
        <Word>Dragon </Word>
        <Word>Records </Word>
      </WordWrapper>
    </Title>
  </Container>
);

export default TitleBadge;

//轟隆紅龍
