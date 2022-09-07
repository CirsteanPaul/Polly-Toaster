import { RootState } from '..';
import IContractData from '../../types/IContractData';
import IHolding from '../../types/IHolding';

export const contractInfoBalanceSelector = (state: RootState): number => state.contractInfo.balance;
export const contractInfoOwnerSelector = (state: RootState): string => state.contractInfo.owner;
export const contractInfoLoadingSelector = (state: RootState): boolean => state.contractInfo.loading;
export const contractInfoReferralCodeSelector = (state: RootState): string => state.contractInfo.referralCode;
export const contractInfoDataSelector = (state: RootState): IContractData => state.contractInfo.contractData;
export const contractInfoHoldingSelector = (state: RootState): IHolding => state.contractInfo.nftsHolding;
export const contractInfoRewardsToClaimSelector = (state: RootState): string => state.contractInfo.rewardsToClaim;

export const contractInfoTotalSharesSelector = (state: RootState): number => {
  const holding = contractInfoHoldingSelector(state);
  return holding.tier1Count * 0.04 + holding.tier2Count * 0.5 + holding.tier3Count * 1.25;
};
