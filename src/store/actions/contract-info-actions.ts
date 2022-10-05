/* eslint-disable eqeqeq */
import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '..';
import alertService from '../../services/alert-handler';
import IContractData from '../../types/IContractData';
import { CONTRACT_INFO__FETCH, CONTRACT_INFO__SET_DATA, CONTRACT_INFO__SET_BALANCE, CONTRACT_INFO__SET_LOADING, CONTRACT_INFO__SET_OWNER } from '../constants';
import { blockchainAccountSelector, blockchainContractSelector } from '../selectors/blockchain-selectors';
import { mapBigNumberToString, mapBooleanToBoolean, mapFromBigNumberToNumber } from './contract-info-utils';

export const setContractInfoBalance = createAction<number>(CONTRACT_INFO__SET_BALANCE);
export const setContractInfoLoading = createAction<boolean>(CONTRACT_INFO__SET_LOADING);
export const setContractInfoOwner = createAction<string>(CONTRACT_INFO__SET_OWNER);
export const setContractInfoDataAction = createAction<IContractData>(CONTRACT_INFO__SET_DATA);

export const fecthContractInfo = createAsyncThunk(CONTRACT_INFO__FETCH, async (__: never, thunkApi) => {
  const account = blockchainAccountSelector(thunkApi.getState() as RootState);
  const contract = blockchainContractSelector(thunkApi.getState() as RootState);
  thunkApi.dispatch(setContractInfoLoading(true));
  try {
    if (contract) {
      const contractData: IContractData = {
        totalSupply: mapFromBigNumberToNumber(await contract.totalSupply()),
        maxSupply: mapFromBigNumberToNumber(await contract.maxSupply()),
        paused: mapBooleanToBoolean(await contract.paused()),
        whitelistStatus: mapBooleanToBoolean(await contract.whitelistStatus()),
        presaleStatus: mapBooleanToBoolean(await contract.presaleStatus()),
        publicPrice: mapBigNumberToString(await contract.publicPrice()),
        presalePrice: mapBigNumberToString(await contract.presalePrice()),
      };
      thunkApi.dispatch(setContractInfoDataAction(contractData));
      alertService.succesPopup({ title: 'Succes', message: 'Wallet connected!' });
    }
  } catch (e) {
    alertService.errorPopup({ title: 'Contract failed', message: "Contract couldn't be fetched correctly" });
    // swallow exception
  } finally {
    thunkApi.dispatch(setContractInfoLoading(false));
  }
});
