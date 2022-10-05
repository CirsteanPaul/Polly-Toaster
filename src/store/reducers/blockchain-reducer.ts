import { createReducer } from '@reduxjs/toolkit';
import { ethers } from 'ethers';
import {
  setBlockchainLoading,
  setBlockchainTransactionLoading,
  setBlockchainProvider,
  setBlockchainIsConnected,
  setBlockchainContract,
  setBlockchainAccount,
  setBlockchainTransactionStatus,
} from '../actions/blockchain-actions';

interface State {
  loading: boolean;
  account: string;
  provider: any;
  isConnected: boolean;
  transactionLoading: boolean;
  transactionStatus: number;
  contract: any;
}
const initialState: State = {
  loading: false,
  account: '',
  provider: null,
  transactionLoading: false,
  transactionStatus: 0,
  isConnected: false,
  contract: null,
};

const blockchainReducer = createReducer(initialState, builder =>
  builder
    .addCase(setBlockchainContract, (state, action) => ({ ...state, contract: action.payload }))
    .addCase(setBlockchainProvider, (state, action) => ({ ...state, provider: action.payload }))
    .addCase(setBlockchainLoading, (state, action) => ({ ...state, loading: action.payload }))
    .addCase(setBlockchainIsConnected, (state, action) => ({ ...state, isConnected: action.payload }))
    .addCase(setBlockchainTransactionStatus, (state, action) => ({ ...state, transactionStatus: action.payload }))
    .addCase(setBlockchainTransactionLoading, (state, action) => ({ ...state, transactionLoading: action.payload }))
    .addCase(setBlockchainAccount, (state, action) => ({ ...state, account: action.payload })),
);
export default blockchainReducer;
