import { ethers } from 'ethers';
import { RootState } from '..';

export const blockchainAccountSelector = (state: RootState): string => state.blockchain.account;
export const blockchainProviderSelector = (state: RootState): ethers.providers.Web3Provider | null => state.blockchain.provider;
export const blockchainContractSelector = (state: RootState): ethers.Contract | null => state.blockchain.contract;
export const blockchainLoadingSelector = (state: RootState): boolean => state.blockchain.loading;
export const blockchainIsConnectedSelector = (state: RootState): boolean => state.blockchain.isConnected;
export const blockchainTransactionLoadingSelector = (state: RootState): boolean => state.blockchain.transactionLoading;
export const blockchainTransactionStatusSelector = (state: RootState): number => state.blockchain.transactionStatus;
