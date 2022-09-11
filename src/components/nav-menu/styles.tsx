/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/require-default-props */
import { Link } from 'react-router-dom';
import * as Scroll from 'react-scroll';
import NavLogoImage from './nav-logo.png';

interface Props {
  children?: any;
}
interface LinkProps {
  to: string;
  active?: boolean;
  children?: any;
  onClick?: () => void;
}

export const NavContainer = ({ children }: Props): JSX.Element => {
  return <nav className="bg-fontBackground w-screen fixed flex justify-between p-2 px-3 z-50">{children}</nav>;
};
export const NavLogo = (): JSX.Element => {
  return <p className="items-center flex justify-center md:text-3xl text-5xl text-headline font-bold">Poly The Toaster</p>;
};
export const NavLinksWrapper = ({ children }: Props): JSX.Element => {
  return <div className="flex gap-5">{children}</div>;
};
export const NavLink = ({ to, active, children }: LinkProps): JSX.Element => {
  return (
    <Link
      to={to}
      className={`bg-transparent cursor-pointer hover:text-[#f1f1f1] hover:opacity-60 text-sm uppercase flex items-center ${active ? 'text-[#f1f1f1]' : 'text-headline'}`}
    >
      {children}
    </Link>
  );
};
export const InsideLink = ({ to, active, children, onClick }: LinkProps): JSX.Element => {
  return (
    <Scroll.Link
      onClick={onClick}
      to={to}
      spy
      activeClass="text-accent"
      //   smooth
      offset={-50}
      smooth="easeInOutQuint"
      duration={500}
      className={`bg-transparent letter tracking-wide cursor-pointer text-3xl hover:text-[#f1f1f1] hover:opacity-60 uppercase flex items-center ${
        active ? 'text-[#f1f1f1]' : 'text-headline'
      }`}
    >
      {children}
    </Scroll.Link>
  );
};
