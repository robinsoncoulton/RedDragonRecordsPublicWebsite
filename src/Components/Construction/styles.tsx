import styled from 'styled-components';
import '../../Fonts/KILLEDDJ.ttf';
import '../../Fonts/hanwangkantan.ttf';
import '../../Fonts/jinmei-poster-calligraphy.ttf';
import '../../Fonts/zhongshan-xingshu.ttf';
import '../../Fonts/Harukaze.ttf';

export const FullPageImage = styled.div`
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  background-color: #0B0000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;

  @media (min-width: 600px)  {
    padding-top: 20px;
   }
`;

export const Logo = styled.img`
  position: static;
  flex: 0 1 auto;
  max-width: 100%;
  height: min-content;
  object-fit: contain;
  margin-bottom: 50px;
  overflow: hidden;

  @media (min-width: 600px)  {
    max-width: 600px;
  }
  
  @keyframes rotation {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(359deg);
    }
  }
  animation: rotation 12s infinite linear;
`;

export const Subtext = styled.p`
   color: #9e2d19;
   flex: 1 0 auto;
   font-family: "MyFont2";
   font-size: 24px;
   text-align: center;

   @media (min-width: 600px)  {
    font-size: 48px;
   }
`;

export const VerticalBanner = styled.div`
  font-family: Chinese1;
  font-size: 15vw;
  color: #9e2d19;
  position: absolute;
  background-color: #0B0000;
  padding: 0 10px;
  top: 0;
  right: 50px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  @media (min-width: 600px)  {
   font-size: 64px;
  }
`;

export const LogoWrapper = styled.div`
  position: relative;
  min-width: min-content;
  min-height: min-content;
`;

export const Character = styled.p`
  flex: 1 1 auto;
`;

export const EmailTo = styled.a`
  text-decoration: none;
  color: #FFF;
  font-family: "MyFont2";
  font-size: 24px;
  transition: 0.2s;
  :hover {
    color: red;
  }
`;

export const Header = styled.h1`
  font-family: 'Chinglish1';
  color: red;
`