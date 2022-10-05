import { BigNumber } from 'ethers';

export const mapFromBigNumberToNumber = (data: BigNumber): number => data.toNumber();
export const mapBooleanToBoolean = (data: boolean): boolean => Boolean(data);
export const mapBigNumberToString = (data: BigNumber): string => data.toString();
