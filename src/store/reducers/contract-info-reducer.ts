import { createReducer } from '@reduxjs/toolkit';
import IContractData from '../../types/IContractData';
import IHolding from '../../types/IHolding';
import {
  setContractInfoBalance,
  setContractInfoDataAction,
  setContractInfoLoading,
  setContractInfoNftHoldingAction,
  setContractInfoOwner,
  setContractInfoRewardsToClaimAction,
  setRefferalCodeAction,
} from '../actions/contract-info-actions';

interface State {
  loading: boolean;
  balance: number;
  owner: string;
  rewardsToClaim: string;
  contractData: IContractData;
  nftsHolding: IHolding;
  referralCode: string;
}
const initialState: State = {
  loading: false,
  balance: 0,
  owner: '',
  rewardsToClaim: '0',
  nftsHolding: {} as IHolding,
  contractData: {} as IContractData,
  referralCode: '00',
};

const contractInfoReducer = createReducer(initialState, builder =>
  builder
    .addCase(setContractInfoDataAction, (state, action) => ({ ...state, contractData: action.payload }))
    .addCase(setContractInfoNftHoldingAction, (state, action) => ({ ...state, nftsHolding: action.payload }))
    .addCase(setContractInfoLoading, (state, action) => ({ ...state, loading: action.payload }))
    .addCase(setContractInfoBalance, (state, action) => ({ ...state, balance: action.payload }))
    .addCase(setContractInfoRewardsToClaimAction, (state, action) => ({ ...state, rewardsToClaim: action.payload }))
    .addCase(setRefferalCodeAction, (state, action) => ({ ...state, referralCode: action.payload }))
    .addCase(setContractInfoOwner, (state, action) => ({ ...state, owner: action.payload })),
);
export default contractInfoReducer;
