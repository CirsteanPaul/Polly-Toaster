/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';

const Footer = () => {
  return (
    <div className="w-full bg-border p-2 px-4 text-footer flex justify-between items-center">
      <div style={{ height: 28, width: 28 }} />
      <p className="text-footer text-xl">Bought to you by the BOOMER LAB SCIENTISTS</p>
      <img
        alt="twitter"
        src="Twitter.png"
        onClick={() => window.open('https://twitter.com/PollyToaster', '_blank')}
        className=" cursor-pointer self-center w-7 h-7 mb-1 object-cover"
      />
    </div>
  );
};

export default Footer;
