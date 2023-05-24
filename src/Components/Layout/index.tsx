import React from 'react';
import { Background, Wrapper } from './styles';
import Header from '../Header';
import Footer from '../Footer';

interface LayoutProps {
    children?: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => 
<>
    <Background>
        <Wrapper>
            <Header/>
                { children }
            <Footer/>
        </Wrapper>
    </Background>
</>

export default Layout;