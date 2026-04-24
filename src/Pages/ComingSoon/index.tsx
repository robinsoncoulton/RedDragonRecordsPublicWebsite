import React from "react";
import record from "../../Assets/record.png";
import { useTheme } from "../../Utils/Theme";
import {
  Character,
  EmailTo,
  FullPageImage,
  Header,
  Logo,
  LogoWrapper,
  Subtext,
  VerticalBanner,
} from "./styles";

const ComingSoon: React.FC = () => {
  const { theme } = useTheme();
  return (
      <FullPageImage theme={theme}>
        <LogoWrapper>
          <Logo src={record} />
          <VerticalBanner theme={theme}>
            <Character>轟</Character>
            <Character>隆</Character>
            <Character>紅</Character>
            <Character>龍</Character>
          </VerticalBanner>
        </LogoWrapper>
        <Subtext theme={theme}>
          <Header theme={theme}>RED DRAGON RECORDS</Header>
          <p>Coming soon...</p>
          <EmailTo href="mailto: contact@reddragonrecords.tw">Enquiries</EmailTo>
        </Subtext>
      </FullPageImage>
  );
};

export default ComingSoon;
