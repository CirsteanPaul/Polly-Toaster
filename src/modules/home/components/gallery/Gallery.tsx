import React from 'react';
import { indexes } from './constants';

interface Props {
  source: string;
}
const Gallery = () => {
  const buildImage = ({ source }: Props): JSX.Element => {
    return <img key={source} alt="gallery" src={source} className="h-60 gallery-image w-60 sm:h-28 sm:w-28 md:h-32 md:w-32 border-border object-cover" />;
  };
  return (
    <div className=" flex items-center flex-col w-full  mt-10 gap-4">
      <p style={{ borderWidth: '15px' }} className=" flex items-center justify-center text-center border-border bg-headline sm:text-3xl text-6xl w-full">
        Gallery
      </p>
      <div className=" grid gap-5 grid-cols-3 grid-rows-3">{indexes.map(e => buildImage({ source: `gallery/${e}.jpg` }))}</div>
    </div>
  );
};

export default Gallery;
