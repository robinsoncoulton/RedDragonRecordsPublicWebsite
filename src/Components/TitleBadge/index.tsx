import React from "react";
import { Badge, Container, Title } from "./styles";
import { ThemedElementProps } from "../../Theme/types";

const TitleBadge: React.FC<ThemedElementProps> = ({ theme }) => (
  <Container theme={theme}>
    {/* <Badge /> */}
    <Title theme={theme}>Red Dragon Records</Title>
  </Container>
);

export default TitleBadge;
