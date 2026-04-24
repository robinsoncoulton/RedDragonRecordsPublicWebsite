import React from "react";
import Layout from "../Layout";

interface PageProps {
  children?: React.ReactNode;
}

const Page: React.FC<PageProps> = ({ children }) => {
  return <Layout>{children}</Layout>;
};

export default Page;
