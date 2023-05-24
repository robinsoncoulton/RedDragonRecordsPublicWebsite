import React from 'react';
import { FullPageImage, Logo, Subtext, VerticalBanner, LogoWrapper, Character, EmailTo, Header } from './styles';
import record from '../../Assets/record.png';

const Construction: React.FC = () => 
    <>
      <FullPageImage>
        <LogoWrapper>
            <Logo src={record} />
            <VerticalBanner>
                <Character>轟</Character>
                <Character>隆</Character>
                <Character>紅</Character>
                <Character>龍</Character>
            </VerticalBanner>
        </LogoWrapper>
        <Subtext>
            <Header>RED DRAGON RECORDS</Header>
            <p>Coming soon...</p>
            <EmailTo href="mailto: contact@reddragonrecords.tw">Enquiries</EmailTo>
        </Subtext>
      </FullPageImage>
    </>

export default Construction;