import { type ReactNode } from 'react';
import Navbar from '../Navbar';
import Toast from '../Toast';

export interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Navbar>
        <Navbar.Navbrand></Navbar.Navbrand>
        <Navbar.NavItem to="/admin">Admin</Navbar.NavItem>
        <Navbar.NavItem to="/leaves">Leaves</Navbar.NavItem>
        <Navbar.NavItem to="/announcements">Announcements</Navbar.NavItem>
        <Navbar.NavItem to="/articles">Blog</Navbar.NavItem>
      </Navbar>
      <main>{children}</main>
      <Toast></Toast>
    </>
  );
};

export default Layout;
