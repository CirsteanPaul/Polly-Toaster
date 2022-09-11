import React, { useEffect, useState } from 'react';
import Timer from 'types/Timer';
import { calculateTimeLeft } from './utils';

const NewPortal = (): JSX.Element => {
  const [timeLeft, setTimeLeft] = useState<Timer>(calculateTimeLeft());
  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearTimeout(timer);
  });
  return (
    <div className="w-full min-h-screen bg-center bg-new-portal bg-fixed bg-cover flex flex-col items-center p-10 justify-end">
      <div className="bg-overlay rounded-md flex flex-col gap-4 justify-center items-center md:p-14 md:px-20 sm:px-10 sm:p-8 p-20 px-32 text-headline">
        <div className="text-5xl tracking-wide text-center">{`${timeLeft.days}: ${timeLeft.hours}: ${timeLeft.minutes} left`}</div>
        <button type="button" disabled className="px-10 py-2 bg-background text-headline text-4xl flex justify-center items-center">
          Closed
        </button>
      </div>
    </div>
  );
};

export default NewPortal;
