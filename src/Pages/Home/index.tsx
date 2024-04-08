import React from "react";

import Page from "../../Components/Page";
import RecordCover from "../../Components/RecordCover";
import Card from "../../Components/Card";
import Banner from "../../Components/Banner";
import { Heading } from "../../Components/Heading/styles";
import { Text } from "../../Components/Text/styles";
import laney from "../../Assets/laney.png";
import quality from "../../Assets/quality.png";
import valves from "../../Assets/valves.png";

const Home: React.FC = () => (
  <Page>
    <RecordCover />
    <Banner />
    <Card src={laney} animationDelay={2}>
      <Heading>Recording</Heading>
      <Text>
        Capture your music using professional quality equipment. Project scope
        is discussed with the engineer before beginning. Artists receive an
        end-of-day mix at the end of the session
      </Text>
    </Card>
    <Card src={quality} animationDelay={2.2}>
      <Heading>Mixing</Heading>
      <Text>
        Using Vintage-Style analogue equipment and modern industry techniques,
        bring the best of classic and contemporary sounds to your tracks
      </Text>
    </Card>
    <Card src={valves} animationDelay={2.4}>
      <Heading>Disribution</Heading>
      <Text>
        Share your music with the world with a digital release or physical media
        production including all major streaming services, compact disc or vinyl
        record.
      </Text>
    </Card>
  </Page>
);

export default Home;
