import React from 'react';
import { StyledPage } from './styles';
import Layout from '../Layout';

interface PageProps {
    children?: React.ReactNode
}

const Page: React.FC<PageProps> = ({ children }) =>
<>
  <Layout>
    <StyledPage>
        {children}
    </StyledPage>
  </Layout>
</>;

export default Page;
