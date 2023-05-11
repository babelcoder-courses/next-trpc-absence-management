import { type ReactNode } from 'react';
import Navbar from '../Navbar';

export interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Navbar>
        <Navbar.Navbrand></Navbar.Navbrand>
        <Navbar.NavItem to="/articles">Blog</Navbar.NavItem>
      </Navbar>
      <main>{children}</main>
    </>
  );
};

export default Layout;
