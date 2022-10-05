import { ethers } from 'ethers';

export interface MetamaskData {
  balance: number;
  chainId: number;
  chainName: string;
  currentAccount: string;
  provider: ethers.providers.Web3Provider;
  balanceContract: ethers.Contract;
}
