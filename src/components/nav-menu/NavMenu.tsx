/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { InsideLink, NavContainer, NavLinksWrapper, NavLogo } from './styles';
import './styles.css';

const NavMenu = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    setWidth(window.innerWidth);
    window.addEventListener('resize', () => setWidth(window.innerWidth));
    return () => {
      window.removeEventListener('resize', () => setWidth(window.innerWidth));
    };
  }, []);
  const buildButton = (): JSX.Element => {
    return (
      <button type="button" onClick={() => setIsOpen(prev => !prev)} className={`${isOpen ? 'active' : ''} sm:mx-5 mx-10 self-center cursor-pointer burger`}>
        <div className={`${isOpen ? 'active' : ''} cursor-pointer strip burger-strip-4`}>
          <div />
          <div />
          <div />
        </div>
      </button>
    );
  };

  if (width < 1000) {
    return (
      <NavContainer>
        <NavLogo />
        {buildButton()}
        <div className={`menu-overlay ${isOpen ? 'active-menu' : ''}`}>
          <InsideLink onClick={() => setIsOpen(false)} to="story-section">
            story
          </InsideLink>
          <InsideLink onClick={() => setIsOpen(false)} to="gallery-section">
            gallery
          </InsideLink>
          <InsideLink onClick={() => setIsOpen(false)} to="lab-section">
            team
          </InsideLink>
          <InsideLink onClick={() => setIsOpen(false)} to="new-portal">
            secret
          </InsideLink>
        </div>
      </NavContainer>
    );
  }
  return (
    <NavContainer>
      <NavLogo />
      <NavLinksWrapper>
        <InsideLink to="story-section">Story</InsideLink>
        <InsideLink to="gallery-section">gallery</InsideLink>
        <InsideLink to="lab-section">team</InsideLink>
        <InsideLink to="new-portal">secret</InsideLink>
        <img
          alt="twitter"
          src="Twitter.png"
          onClick={() => window.open('https://twitter.com/PollyToaster', '_blank')}
          className=" cursor-pointer self-center w-7 h-7 mb-1 object-cover"
        />
      </NavLinksWrapper>
    </NavContainer>
  );
};

export default NavMenu;
