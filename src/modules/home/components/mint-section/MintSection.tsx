import React, { useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store';
import { blockchainMintNftAsyncAction, fecthBlockchainInfoAsyncAction } from 'store/actions/blockchain-actions';
import { blockchainIsConnectedSelector, blockchainLoadingSelector } from 'store/selectors/blockchain-selectors';
import { contractInfoDataSelector, contractInfoLoadingSelector } from 'store/selectors/contract-info-selectors';
import AppLoaderOverlay from 'components/app-loader-overlay';
import { ethers } from 'ethers';
import Background from './background-animation.mp4';
import mobileBackground from './background-mobile.mp4';

const MintSection = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const [value, setValue] = useState(1);
  const dispatch = useAppDispatch();
  const contractData = useAppSelector(contractInfoDataSelector);
  const isConnected = useAppSelector(blockchainIsConnectedSelector);
  const handleMint = () => {
    if (isConnected) {
      dispatch(blockchainMintNftAsyncAction({ amount: value }));
    } else {
      dispatch(fecthBlockchainInfoAsyncAction());
    }
  };
  const isLoading = useAppSelector(blockchainLoadingSelector);
  const contractIsLoading = useAppSelector(contractInfoLoadingSelector);
  const calculatedPrice = useMemo(() => {
    if (!isConnected) return null;
    if (contractData?.presaleStatus) {
      if (contractData?.presalePrice) return ethers.utils.formatEther(contractData?.presalePrice);
    }
    if (contractData?.publicPrice) return ethers.utils.formatEther(contractData?.publicPrice);
    return null;
  }, [contractData, isConnected]);
  useEffect(() => {
    window.addEventListener('resize', () => setWidth(window.innerWidth));
    return () => {
      window.removeEventListener('resize', () => setWidth(window.innerWidth));
    };
  }, [width]);
  if (isLoading || contractIsLoading) {
    return <AppLoaderOverlay />;
  }
  return (
    <div className=" mt-16 pt-0 p-4 px-0 relative w-screen">
      <video autoPlay muted className="relative" id="myVideo" loop>
        <source src={width < 600 ? mobileBackground : Background} id="hvid" type="video/mp4" />
      </video>
      <div style={{ transform: 'translate(-50%, -50%)' }} className="absolute md:w-full w-1/2 rounded-md top-1/2 left-1/2 bg-overlay items-center flex flex-col gap-6 p-5 px-5">
        <h1 className="uppercase sm:text-3xl text-6xl text-headline ">Mint your polly</h1>
        <p className="sm:text-2xl text-3xl text-headline"> {`${contractData?.totalSupply || 0} / ${contractData?.maxSupply || 10000}`}</p>
        <div className="sm:text-2xl flex flex-col gap-1 items-center justify-center">
          <p className="sm:text-xl text-2xl text-headline"> Price</p>
          <p className="sm:text-2xl text-3xl text-headline"> {`${calculatedPrice || 0.03} ETH`}</p>
        </div>
        <button type="button" className=" rounded-md py-2 px-10 bg-headline text-text text-3xl tracking-wider" onClick={handleMint}>
          {isConnected ? 'Mint' : 'Connect'}
        </button>
      </div>
    </div>
  );
};

export default MintSection;
