import React from "react";
import Layout from "../Layout";
import Record from "../Record";
import { RecordContainer } from "./styles";

interface PageProps {
  children?: React.ReactNode;
}

const Page: React.FC<PageProps> = ({ children }) => {
  return (
    <>
      <Layout>
        {children}

        <RecordContainer>
          <Record />
        </RecordContainer>
      </Layout>
    </>
  );
};

export default Page;
