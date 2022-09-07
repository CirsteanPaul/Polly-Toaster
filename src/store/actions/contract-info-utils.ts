import { BigNumber, Contract } from 'ethers';
import IHolding from '../../types/IHolding';
import ITier from '../../types/ITier';

export const mapFromBigNumberToNumber = (data: BigNumber): number => data.toNumber();
export const mapBooleanToBoolean = (data: boolean): boolean => Boolean(data);
export const mapBigNumberToString = (data: BigNumber): string => data.toString();
export const mapHoldingResponseToHolding = (data: any): IHolding => ({
  tier1Count: data?.tier1Count?.toNumber(),
  tier2Count: data?.tier2Count?.toNumber(),
  tier3Count: data?.tier3Count?.toNumber(),
});

export const getTierInformation = async (contract: Contract, tier: number): Promise<ITier> => {
  switch (tier) {
    case 2:
      return {
        cost: mapBigNumberToString(await contract.tier2Cost()),
        supply: mapFromBigNumberToNumber(await contract.TIER2_COUNTER()),
        totalSupply: mapFromBigNumberToNumber(await contract.TIER2_SUPPLY()),
      };
    case 3:
      return {
        cost: mapBigNumberToString(await contract.tier3Cost()),
        supply: mapFromBigNumberToNumber(await contract.TIER3_COUNTER()),
        totalSupply: mapFromBigNumberToNumber(await contract.TIER3_SUPPLY()),
      };
    default: {
      return {
        cost: mapBigNumberToString(await contract.tier1Cost()),
        supply: mapFromBigNumberToNumber(await contract.TIER1_COUNTER()),
        totalSupply: mapFromBigNumberToNumber(await contract.TIER1_SUPPLY()),
      };
    }
  }
};
