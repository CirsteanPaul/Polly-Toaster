import { RootState } from 'store';

export const databaseLoadingSelector = (state: RootState): boolean => state.database.loading;
export const databaseAddressesSelector = (state: RootState): string[] => state.database.addresses;
