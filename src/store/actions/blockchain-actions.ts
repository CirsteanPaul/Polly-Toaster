import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { ethers } from 'ethers';
import { RootState } from '..';
import alertService from '../../services/alert-handler';
import IContractData from '../../types/IContractData';
import IExchangeValue from '../../types/IExchangeValue';
import IMintRequest from '../../types/requests/IMintRequests';
import { onClickConnect } from '../connection/ts/useMetamask';
import {
  BLOCKCHAIN__SET_CONTRACT,
  BLOCKCHAIN__SET_LOADING,
  BLOCKCHAIN__SPEND_TOKENS,
  BLOCKCHAIN__SET_PROVIDER,
  BLOCKCHAIN__MINT,
  BLOCKCHAIN__FETCH,
  BLOCKCHAIN__SET_ACCOUNT,
  BLOCKCHAIN__GET_USD_VALUE,
  BLOCKCHAIN__SET_SPLITTER_CONTRACT,
  BLOCKCHAIN__WITHDRAW,
  BLOCKCHAIN__DISCONNECT,
  BLOCKCHAIN__SET_IS_CONNECTED,
  BLOCKCHAIN__SET_EXCHANGE_VALUE,
  BLOCKCHAIN__SET_TRANSACTION_LOADING,
  BLOCKCHAIN__SET_TRANSACTION_STATUS,
} from '../constants';
import { blockchainAccountSelector, blockchainContractSelector, blockchainSpliterContractSelector } from '../selectors/blockchain-selectors';
import { contractInfoDataSelector, contractInfoReferralCodeSelector } from '../selectors/contract-info-selectors';
import { validateMintingStep, validateNftAction } from './blockchain-utils';
import { fecthContractInfo, setContractInfoBalance, setContractInfoDataAction, setContractInfoLoading, setContractInfoOwner } from './contract-info-actions';

export const setBlockchainLoading = createAction<boolean>(BLOCKCHAIN__SET_LOADING);
export const setBlockchainContract = createAction<ethers.Contract>(BLOCKCHAIN__SET_CONTRACT);
export const setBlockchainSpliterContractAction = createAction<ethers.Contract>(BLOCKCHAIN__SET_SPLITTER_CONTRACT);
export const setBlockchainProvider = createAction<any>(BLOCKCHAIN__SET_PROVIDER);
export const setBlockchainAccount = createAction<string>(BLOCKCHAIN__SET_ACCOUNT);
export const setBlockchainIsConnected = createAction<boolean>(BLOCKCHAIN__SET_IS_CONNECTED);
export const setBlockchainTransactionStatus = createAction<number>(BLOCKCHAIN__SET_TRANSACTION_STATUS);
export const setBlockchainTransactionLoading = createAction<boolean>(BLOCKCHAIN__SET_TRANSACTION_LOADING);
export const setExchangeValueAction = createAction<number>(BLOCKCHAIN__SET_EXCHANGE_VALUE);

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
      thunkApi.dispatch(setBlockchainSpliterContractAction(data.spliterContract));
      thunkApi.dispatch(setBlockchainAccount(data.currentAccount));
      thunkApi.dispatch(fecthContractInfo());
    }
  } catch {
    // swallow exception
  } finally {
    thunkApi.dispatch(setBlockchainLoading(false));
  }
});
export const spendTokensAsyncAction = createAsyncThunk(BLOCKCHAIN__SPEND_TOKENS, async (data: number, thunkApi) => {
  const contract = blockchainContractSelector(thunkApi.getState() as RootState);
  thunkApi.dispatch(setBlockchainTransactionLoading(true));
  try {
    const priceInWei = ethers.utils.parseUnits(data.toString(), 'wei');
    console.log(priceInWei);
    if (contract) {
      const tx = await contract.spendToken(priceInWei);
      tx.wait();
      thunkApi.dispatch(fecthContractInfo());
      thunkApi.dispatch(setBlockchainTransactionStatus(1));
    }
  } catch {
    thunkApi.dispatch(setBlockchainTransactionStatus(-1));
    // swallow exception
  } finally {
    thunkApi.dispatch(setBlockchainTransactionLoading(false));
  }
});
export const blockchainGetUSDvalue = createAsyncThunk(BLOCKCHAIN__GET_USD_VALUE, async (__: never, thunkApi) => {
  thunkApi.dispatch(setBlockchainLoading(true));
  try {
    const response = await fetch('https://api.coinbase.com/v2/exchange-rates?currency=ETH');
    const data: IExchangeValue = await response.json();
    thunkApi.dispatch(setExchangeValueAction(data?.data?.rates?.USD));
  } catch {
    // swallow exception
  } finally {
    thunkApi.dispatch(setBlockchainLoading(false));
  }
});
export const blockchainWithdrawAsyncAction = createAsyncThunk(BLOCKCHAIN__WITHDRAW, async (address: string, thunkApi) => {
  const account = blockchainAccountSelector(thunkApi.getState() as RootState);
  const contract = blockchainSpliterContractSelector(thunkApi.getState() as RootState);
  if (account.toLowerCase() !== address.toLowerCase()) {
    alertService.errorPopup({ title: 'Address Error', message: 'Please confirm with the address you are connected with!' });
    return;
  }
  thunkApi.dispatch(setContractInfoLoading(true));
  try {
    if (contract) {
      const tx = await contract.claimRewards();
      await tx.wait();
      alertService.succesPopup({ title: 'Transaction succeded', message: 'Check your wallet to see the transaction!' });
      thunkApi.dispatch(fecthContractInfo());
    } else {
      alertService.errorPopup({ title: 'Contract failure', message: 'Connection between website and contract is down!' });
    }
  } catch (e) {
    console.log(e);
    alertService.errorPopup({ title: 'Contract failure', message: 'Check your balance, or something in the contract is not working right now!' });
  } finally {
    thunkApi.dispatch(setContractInfoLoading(false));
  }
});
export const blockchainMintNftAsyncAction = createAsyncThunk(BLOCKCHAIN__MINT, async (data: IMintRequest, thunkApi) => {
  const contractData = contractInfoDataSelector(thunkApi.getState() as RootState);
  const contract = blockchainContractSelector(thunkApi.getState() as RootState);
  const refferalCode = contractInfoReferralCodeSelector(thunkApi.getState() as RootState);
  const validation = validateNftAction(data, contractData);
  if (!data.amount) {
    alertService.errorPopup({ title: 'Error', message: "You can't mint 0 nfts" });
    return;
  }
  if (!validation) {
    alertService.errorPopup({ title: 'Max supply exceeded', message: `The whole supply was minted}` });
    return;
  }
  const validateStep = validateMintingStep(contractData);
  if (validateStep) {
    alertService.errorPopup({ title: 'Phase error', message: validateStep });
    return;
  }
  thunkApi.dispatch(setBlockchainLoading(true));
  try {
    if (contract) {
      let tx;
      switch (data.id) {
        case 1:
          tx = await contract.mintTier1(data.amount, refferalCode, { value: (Number(contractData.tier1.cost) * data.amount).toString() });
          break;
        case 2:
          tx = await contract.mintTier2(data.amount, refferalCode, { value: (Number(contractData.tier2.cost) * data.amount).toString() });
          break;
        case 3:
          tx = await contract.mintTier3(data.amount, refferalCode, { value: (Number(contractData.tier3.cost) * data.amount).toString() });
          break;
        default:
          break;
      }
      await tx.wait();
      thunkApi.dispatch(fecthContractInfo());
      alertService.succesPopup({ title: 'Success', message: 'Your minted succeeded!' });
    }
  } catch (e: any) {
    console.log(e);
    console.log(e?.code);
    const errorMsg = e?.code;
    alertService.errorPopup({ title: 'Contract error', message: errorMsg || 'Contract failed' });
  } finally {
    thunkApi.dispatch(setBlockchainLoading(false));
  }
});
