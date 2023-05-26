import React, { useEffect, useState } from 'react';
import mobileBackground from './background-mobile.mp4';
import Background from './background-animation.mp4';

const MintSection = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const handleMint = () => {
    console.log('mint');
  };
  useEffect(() => {
    window.addEventListener('resize', () => setWidth(window.innerWidth));
    return () => {
      window.removeEventListener('resize', () => setWidth(window.innerWidth));
    };
  }, [width]);
  return (
    <div className=" mt-16 pt-0 p-4 px-0 relative w-screen">
      <video autoPlay muted className="relative" id="myVideo" loop>
        <source src={width < 600 ? mobileBackground : Background} id="hvid" type="video/mp4" />
      </video>
      <div style={{ transform: 'translate(-50%, -50%)' }} className="absolute md:w-full w-1/2 rounded-md top-1/2 left-1/2 bg-overlay items-center flex flex-col gap-6 p-5 px-5">
        <h1 className="uppercase sm:text-3xl text-6xl text-headline ">Mint your Polly</h1>
        <p className="sm:text-2xl text-3xl text-headline"> 0 / 2000</p>
        <div className="sm:text-2xl flex flex-col gap-1 items-center justify-center">
          <p className="sm:text-xl text-2xl text-headline"> Price</p>
          <p className="sm:text-2xl text-3xl text-headline"> 0.03 ETH</p>
        </div>
        <button type="button" className=" rounded-md py-2 px-10 bg-headline text-text text-3xl tracking-wider" onClick={handleMint}>
          Mint
        </button>
      </div>
    </div>
  );
};

export default MintSection;
