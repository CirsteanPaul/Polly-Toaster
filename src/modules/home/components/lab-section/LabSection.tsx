import React from 'react';
import { LabCardProps, LabCards as labCards } from './constants';

const LabSection = () => {
  const buildCard = (card: LabCardProps): JSX.Element => {
    return (
      <div key={card.name} className="flex flex-col items-center flex-1">
        <div className="gallery-image border-border flex justify-center flex-col gap-1 items-center lg:px-10 md:px-10 px-20 py-1 bg-headline">
          <h2 className="text-text text-3xl">{card.name}</h2>
          <h5 className="text-text text-xl">{card.position}</h5>
        </div>
        <img alt="gallery" src={card.image} className="h-60 w-60 gallery-image sm:h-40 sm:w-40 md:h-48 md:w-48 border-border object-cover" />
      </div>
    );
  };
  return (
    <>
      <p style={{ borderWidth: '15px' }} className=" my-10 flex items-center justify-center text-center border-border bg-headline sm:text-3xl text-6xl w-full">
        BOOMER LAB SCIENTISTS
      </p>
      <div className=" my-10 grid md:gap-3 md:grid-cols-1 gap-10 grid-cols-2 grid-rows-2">{labCards.map(card => buildCard(card))}</div>
      <p className=" gallery-image w-full sm:text-2xl flex justify-center items-center py-3 px-5 bg-headline text-text text-5xl">A New Portal set to Open!</p>
    </>
  );
};

export default LabSection;
