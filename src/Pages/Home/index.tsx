import React from "react";

import Page from "../../Components/Page";
import { Container, BorderedText, Link, Card, Text, Image } from "./styles";
import { useTheme } from "../../Theme";
import { getColors } from "../../Styles/colors";
import record from "../../Assets/record.png";

const Home: React.FC = () => {
  const theme = useTheme();

  console.log(getColors(theme.theme).text);

  return (
    <Page>
      <Container theme={theme.theme}>
        <Link theme={theme.theme} href="mailto:contact@reddragonrecords.tw">
          contact@reddragonrecords.tw
        </Link>

        <Card theme={theme.theme}>
          <Text theme={theme.theme}>
            Please reach out to discuss your project scope and to request a
            quote
          </Text>
        </Card>

        <Image src={record} />

        <Card theme={theme.theme}>
          <BorderedText theme={theme.theme}>
            {" "}
            ~ Bespoke Audio Services ~
          </BorderedText>

          <Text theme={theme.theme}>
            Low cost music recording, mixing and Distribution. Realise your
            creative ambitions without breaking the bank
          </Text>
        </Card>

        <Card theme={theme.theme}>
          <BorderedText theme={theme.theme}>
            ~ Release your music ~
          </BorderedText>

          <Text theme={theme.theme}>
            Share your music with the world with a digital release or physical
            media production including all major streaming services, compact
            disc or vinyl record
          </Text>
        </Card>

        <Card theme={theme.theme}>
          <BorderedText theme={theme.theme}>~ Recent Projects ~</BorderedText>

          <Text left theme={theme.theme}>
            Mirko Liang - Art of the Wheel
          </Text>
          <Text left theme={theme.theme}>
            Temple Smoke - Monolithic Evolution
          </Text>
          <Text left theme={theme.theme}>
            Michael Loncar - Moonlight Drive
          </Text>
        </Card>

        <Card theme={theme.theme}>
          <BorderedText theme={theme.theme}>~ Testimonials ~</BorderedText>
          <Text left theme={theme.theme}>
            "Rob has been an incredible guy to work with, I can&apos;t stress
            enough how helpful he was in making me feel comfortable, balancing
            panic attacks and stress with his Devonian calm and even bringing in
            ideas that saved the day."
          </Text>
          <Text left theme={theme.theme}>
            - Mirko Liang
          </Text>
        </Card>
      </Container>
    </Page>
  );
};
export default Home;
