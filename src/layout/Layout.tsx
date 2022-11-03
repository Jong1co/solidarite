import React, { ReactNode } from "react";
import styled from "styled-components";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return <StyledLayout>{children}</StyledLayout>;
};

const StyledLayout = styled.main`
  width: 100%;
  max-width: 1000px;
  margin: auto;
`;

export default Layout;
