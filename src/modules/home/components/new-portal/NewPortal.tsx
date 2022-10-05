import React, { useEffect, useState } from 'react';
import Timer from 'types/Timer';
import InputWhitelist from '../input-whitelist';
import { calculateTimeLeft } from './utils';

const NewPortal = (): JSX.Element => {
  const [timeLeft, setTimeLeft] = useState<Timer>(calculateTimeLeft());
  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearTimeout(timer);
  });
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    setWidth(window.innerWidth);
    window.addEventListener('resize', () => setWidth(window.innerWidth));
    return () => {
      window.removeEventListener('resize', () => setWidth(window.innerWidth));
    };
  }, []);
  if (width < 700) {
    return (
      <div className="relative">
        <img alt="new-portal" src="new-portal-mobile.jpg" className="w-screen pt-7 object-cover" />

        <div
          style={{ transform: 'translate(-50%, -50%)', zIndex: 10 }}
          className="absolute text-headline gap-4 bg-overlay rounded-md md:p-14 md:px-10 sm:px-30 sm:w-full sm:p-8 p-20 px-22  flex flex-col items-center left-1/2 top-1/2"
        >
          <InputWhitelist />
          <div className="text-5xl tracking-wide text-center">{`${timeLeft.days}: ${timeLeft.hours}: ${timeLeft.minutes} left`}</div>
          <button type="button" disabled className="px-10 py-2 bg-background text-headline text-4xl flex justify-center items-center">
            Closed
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="w-full sm:h-screen sm:w-screen sm:bg-new-portal-mobile h-screen bg-center bg-new-portal bg-fixed bg-cover flex flex-col items-center p-10 justify-end">
      <div className="bg-overlay rounded-md flex w-1/2 flex-col gap-4 justify-center items-center md:p-14 md:px-20 sm:px-10 sm:p-8 p-20 px-12 text-headline">
        <InputWhitelist />
        <div className="text-5xl tracking-wide text-center">{`${timeLeft.days}: ${timeLeft.hours}: ${timeLeft.minutes} left`}</div>
        <button type="button" disabled className="px-10 py-2 bg-background text-headline text-4xl flex justify-center items-center">
          Closed
        </button>
      </div>
    </div>
  );
};

export default NewPortal;
