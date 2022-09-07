/* eslint-disable eqeqeq */
import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '..';
import alertService from '../../services/alert-handler';
import { addressNull } from '../../types/constants';
import IContractData from '../../types/IContractData';
import IHolding from '../../types/IHolding';
import {
  CONTRACT_INFO__FETCH,
  CONTRACT_INFO__SET_DATA,
  CONTRACT_INFO__SET_NFTS_HOLDING,
  CONTRACT_INFO__SET_BALANCE,
  CONTRACT_INFO__SET_REWARDS,
  CONTRACT_INFO__SET_REFERRAL_CODE,
  CONTRACT_INFO__SET_LOADING,
  CONTRACT_INFO__SET_OWNER,
} from '../constants';
import { blockchainAccountSelector, blockchainContractSelector, blockchainSpliterContractSelector } from '../selectors/blockchain-selectors';
import { contractInfoReferralCodeSelector } from '../selectors/contract-info-selectors';
import { getTierInformation, mapBigNumberToString, mapBooleanToBoolean, mapFromBigNumberToNumber, mapHoldingResponseToHolding } from './contract-info-utils';

export const setContractInfoBalance = createAction<number>(CONTRACT_INFO__SET_BALANCE);
export const setContractInfoLoading = createAction<boolean>(CONTRACT_INFO__SET_LOADING);
export const setContractInfoOwner = createAction<string>(CONTRACT_INFO__SET_OWNER);
export const setContractInfoDataAction = createAction<IContractData>(CONTRACT_INFO__SET_DATA);
export const setContractInfoNftHoldingAction = createAction<IHolding>(CONTRACT_INFO__SET_NFTS_HOLDING);
export const setContractInfoRewardsToClaimAction = createAction<string>(CONTRACT_INFO__SET_REWARDS);
export const setRefferalCodeAction = createAction<string>(CONTRACT_INFO__SET_REFERRAL_CODE);

export const fecthContractInfo = createAsyncThunk(CONTRACT_INFO__FETCH, async (__: never, thunkApi) => {
  const account = blockchainAccountSelector(thunkApi.getState() as RootState);
  const contract = blockchainContractSelector(thunkApi.getState() as RootState);
  const spliterContract = blockchainSpliterContractSelector(thunkApi.getState() as RootState);
  thunkApi.dispatch(setContractInfoLoading(true));
  try {
    if (contract) {
      if (spliterContract) {
        const rewardsPending = mapBigNumberToString(await spliterContract.getUnclaimedRewards(account));
        thunkApi.dispatch(setContractInfoRewardsToClaimAction(rewardsPending));
      }
      const contractData: IContractData = {
        balance: mapFromBigNumberToNumber(await contract.balanceOf(account)),
        saleStep: mapFromBigNumberToNumber(await contract.SALE_STEP()),
        whitelist1: mapBooleanToBoolean(await contract.MAP_WHITELIST1(account)),
        whitelist2: mapBooleanToBoolean(await contract.MAP_WHITELIST2(account)),
        tier1: await getTierInformation(contract, 1),
        tier2: await getTierInformation(contract, 2),
        tier3: await getTierInformation(contract, 3),
      };
      const nftsHoldingResponse = await contract.getHoldingTiersCount(account);
      const nftHolding = mapHoldingResponseToHolding(nftsHoldingResponse);
      const referralCode = contractInfoReferralCodeSelector(thunkApi.getState() as RootState);
      if (referralCode !== '') {
        const isReferral: string = await contract.MAP_ADDRESS_FROM_REFERRAL(referralCode);
        if (isReferral === addressNull) {
          thunkApi.dispatch(setRefferalCodeAction('00'));
        }
      }
      thunkApi.dispatch(setContractInfoDataAction(contractData));
      thunkApi.dispatch(setContractInfoNftHoldingAction(nftHolding));
      alertService.succesPopup({ title: 'Succes', message: 'Wallet connected!' });
    }
  } catch (e) {
    console.log(e);
    alertService.errorPopup({ title: 'Contract failed', message: "Contract couldn't be fetched correctly" });
    // swallow exception
  } finally {
    thunkApi.dispatch(setContractInfoLoading(false));
  }
});
