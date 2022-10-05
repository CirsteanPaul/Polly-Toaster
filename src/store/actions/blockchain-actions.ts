import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { ethers } from 'ethers';
import { RootState } from '..';
import alertService from '../../services/alert-handler';
import IContractData from '../../types/IContractData';
import IMintRequest from '../../types/requests/IMintRequests';
import { onClickConnect } from '../connection/ts/useMetamask';
import {
  BLOCKCHAIN__SET_CONTRACT,
  BLOCKCHAIN__SET_LOADING,
  BLOCKCHAIN__SET_PROVIDER,
  BLOCKCHAIN__MINT,
  BLOCKCHAIN__FETCH,
  BLOCKCHAIN__SET_ACCOUNT,
  BLOCKCHAIN__DISCONNECT,
  BLOCKCHAIN__SET_IS_CONNECTED,
  BLOCKCHAIN__SET_TRANSACTION_LOADING,
  BLOCKCHAIN__SET_TRANSACTION_STATUS,
} from '../constants';
import { blockchainAccountSelector, blockchainContractSelector } from '../selectors/blockchain-selectors';
import { contractInfoDataSelector } from '../selectors/contract-info-selectors';
import { fecthContractInfo, setContractInfoBalance, setContractInfoDataAction, setContractInfoOwner } from './contract-info-actions';
import initMerkleTree from './merkle';

export const setBlockchainLoading = createAction<boolean>(BLOCKCHAIN__SET_LOADING);
export const setBlockchainContract = createAction<ethers.Contract>(BLOCKCHAIN__SET_CONTRACT);
export const setBlockchainProvider = createAction<any>(BLOCKCHAIN__SET_PROVIDER);
export const setBlockchainAccount = createAction<string>(BLOCKCHAIN__SET_ACCOUNT);
export const setBlockchainIsConnected = createAction<boolean>(BLOCKCHAIN__SET_IS_CONNECTED);
export const setBlockchainTransactionStatus = createAction<number>(BLOCKCHAIN__SET_TRANSACTION_STATUS);
export const setBlockchainTransactionLoading = createAction<boolean>(BLOCKCHAIN__SET_TRANSACTION_LOADING);

export const disconnectBlockchainInfo = createAsyncThunk(BLOCKCHAIN__DISCONNECT, (__: never, thunkApi) => {
  thunkApi.dispatch(setBlockchainAccount(''));
  thunkApi.dispatch(setContractInfoBalance(0));
  thunkApi.dispatch(setContractInfoOwner(''));
  thunkApi.dispatch(setContractInfoDataAction({} as IContractData));
  thunkApi.dispatch(setBlockchainIsConnected(false));
  alertService.succesPopup({ title: 'success', message: 'Wallet disconnected successfully!' });
  // reset data values
});
export const fecthBlockchainInfoAsyncAction = createAsyncThunk(BLOCKCHAIN__FETCH, async (__: never, thunkApi) => {
  thunkApi.dispatch(setBlockchainLoading(true));
  try {
    const data = await onClickConnect('');
    if (data?.provider && data?.balanceContract) {
      thunkApi.dispatch(setBlockchainIsConnected(true));
      thunkApi.dispatch(setBlockchainContract(data.balanceContract));
      thunkApi.dispatch(setBlockchainProvider(data.provider));
      thunkApi.dispatch(setBlockchainAccount(data.currentAccount));
      thunkApi.dispatch(fecthContractInfo());
    }
  } catch {
    // swallow exception
  } finally {
    thunkApi.dispatch(setBlockchainLoading(false));
  }
});
export const blockchainMintNftAsyncAction = createAsyncThunk(BLOCKCHAIN__MINT, async (data: IMintRequest, thunkApi) => {
  const contractData = contractInfoDataSelector(thunkApi.getState() as RootState);
  const contract = blockchainContractSelector(thunkApi.getState() as RootState);
  const account = blockchainAccountSelector(thunkApi.getState() as RootState);
  thunkApi.dispatch(setBlockchainLoading(true));
  try {
    if (contract) {
      let tx;
      const proofs = initMerkleTree(account);
      console.log(proofs);
      if (contractData.presaleStatus === true) {
        if (contractData.whitelistStatus === true) {
          tx = await contract.mint(data.amount, proofs, { value: (Number(contractData.presalePrice) * data.amount).toString() });
        }
        tx = await contract.mint(data.amount, proofs, { value: (Number(contractData.presalePrice) * data.amount).toString() });
      } else {
        tx = await contract.mint(data.amount, proofs, { value: (Number(contractData.publicPrice) * data.amount).toString() });
      }
      await tx.wait();
      thunkApi.dispatch(fecthContractInfo());
      alertService.succesPopup({ title: 'Success', message: 'Your minted succeeded!' });
    }
  } catch (e: any) {
    const errorMsg = e?.error?.message.substring(0, 40);
    // console.log(e?.code, e, e.message);
    // console.error(e.message.substring(0, e.message.indexOf('(')));
    // console.log(e.error);
    if (errorMsg === 'UNPREDICTABLE_GAS_LIMIT') alertService.errorPopup({ title: 'Contract error', message: 'Something went wrong' });
    else alertService.errorPopup({ title: 'Contract error', message: errorMsg || 'Contract failed' });
  } finally {
    thunkApi.dispatch(setBlockchainLoading(false));
  }
});
