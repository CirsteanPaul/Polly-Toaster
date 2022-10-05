import { createReducer } from '@reduxjs/toolkit';
import IContractData from '../../types/IContractData';
import { setContractInfoBalance, setContractInfoDataAction, setContractInfoLoading, setContractInfoOwner } from '../actions/contract-info-actions';

interface State {
  loading: boolean;
  balance: number;
  owner: string;
  contractData: IContractData;
}
const initialState: State = {
  loading: false,
  balance: 0,
  owner: '',
  contractData: {} as IContractData,
};

const contractInfoReducer = createReducer(initialState, builder =>
  builder
    .addCase(setContractInfoDataAction, (state, action) => ({ ...state, contractData: action.payload }))
    .addCase(setContractInfoLoading, (state, action) => ({ ...state, loading: action.payload }))
    .addCase(setContractInfoBalance, (state, action) => ({ ...state, balance: action.payload }))
    .addCase(setContractInfoOwner, (state, action) => ({ ...state, owner: action.payload })),
);
export default contractInfoReducer;
