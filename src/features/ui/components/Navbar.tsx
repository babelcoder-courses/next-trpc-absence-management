import { type ReactNode } from 'react';

import NavBrand from './NavBrand';
import NavItem from './NavItem';

export interface NavbarProps {
  children: ReactNode;
}

const Navbar = ({ children }: NavbarProps) => {
  return (
    <nav className="flex w-full items-center justify-between p-4 shadow-md shadow-black/5 lg:flex-wrap lg:justify-start">
      {children}
    </nav>
  );
};

Navbar.Navbrand = NavBrand;
Navbar.NavItem = NavItem;

export default Navbar;
