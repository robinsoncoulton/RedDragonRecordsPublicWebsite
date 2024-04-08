import React from "react";
import { Background, Wrapper } from "./styles";
import Header from "../Header";
import { useTheme } from "../../Theme";

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const theme = useTheme();
  return (
    <>
      <Background theme={theme.theme}>
        <Wrapper theme={theme.theme}>
          <Header />
          {children}
        </Wrapper>
      </Background>
    </>
  );
};

export default Layout;
