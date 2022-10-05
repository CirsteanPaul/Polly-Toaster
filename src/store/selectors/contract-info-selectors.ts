import { RootState } from '..';
import IContractData from '../../types/IContractData';

export const contractInfoBalanceSelector = (state: RootState): number => state.contractInfo.balance;
export const contractInfoOwnerSelector = (state: RootState): string => state.contractInfo.owner;
export const contractInfoLoadingSelector = (state: RootState): boolean => state.contractInfo.loading;
export const contractInfoDataSelector = (state: RootState): IContractData => state.contractInfo.contractData;
