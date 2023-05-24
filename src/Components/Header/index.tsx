import React from 'react';
import { StyledHeader, HeaderLogo, Title, TitleLogoContainer } from './styles';
import Content from '../../Content';
import Navbar from '../Navbar';
import headerLogo from '../../Assets/portrait.png';
import { useNavigate } from 'react-router';

const Header: React.FC = () => {
    const navigate = useNavigate();
    const handleClick = () => navigate('/');   

    return <StyledHeader>
        <TitleLogoContainer onClick={handleClick}>
            <HeaderLogo src={headerLogo}/>
            <Title>LOUD Studios</Title>
        </TitleLogoContainer>
        {Content.headerText}
        <Navbar/>
    </StyledHeader>
}

export default Header;