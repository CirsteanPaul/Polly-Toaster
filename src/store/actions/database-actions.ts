import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllAddresses, postNewAddress } from 'api/whitelist-requests';
import isArray from 'lodash/isArray';
import toString from 'lodash/toString';
import alertService from 'services/alert-handler';
import { RootState } from 'store';
import { DATABASE__SET_ADDRESSES, DATABASE__SET_LOADING, DATEBASE__SET_MODAL_STATUS, DATABASE__FETCH, DATABASE__ADD_NEW_WHITELIST_ADDRESS } from 'store/constants';
import { databaseAddressesSelector } from 'store/selectors/database-selectors';
import IAddressReponse from 'types/requests/IAddressResponse';

const addressesMapper = (addresses: IAddressReponse[]): string[] => {
  if (!isArray(addresses)) {
    return [];
  }
  return addresses.map(address => toString(address?.address));
};

export const setDatabaseLoadingAction = createAction<boolean>(DATABASE__SET_LOADING);
export const setDatabaseAddressesAction = createAction<string[]>(DATABASE__SET_ADDRESSES);
export const setModalStatusAction = createAction<boolean>(DATEBASE__SET_MODAL_STATUS);

export const fetchDatabaseAddressescActionAsync = createAsyncThunk(DATABASE__FETCH, async (__: never, thunkApi) => {
  thunkApi.dispatch(setDatabaseLoadingAction(true));
  try {
    const addresses = await getAllAddresses();
    const mappedAddress = addressesMapper(addresses);
    thunkApi.dispatch(setDatabaseAddressesAction(mappedAddress));
  } catch (e) {
    // swallow exception
  } finally {
    thunkApi.dispatch(setDatabaseLoadingAction(false));
  }
});
export const postNewWhitelistActionAsync = createAsyncThunk<void, string, { state: RootState }>(DATABASE__ADD_NEW_WHITELIST_ADDRESS, async (address: string, thunkApi) => {
  const currentAddresses = databaseAddressesSelector(thunkApi.getState());
  if (currentAddresses.length >= 1000) {
    alertService.infoPopup({ title: 'Whitelist is full', message: 'Sorry but the limit of the whitelist is already reached' });
    return;
  }
  thunkApi.dispatch(setDatabaseLoadingAction(true));
  try {
    if (!currentAddresses.find(currAddress => currAddress === address)) {
      await postNewAddress({ address });
      alertService.succesPopup({ title: 'Successs', message: 'The address was registered int the whitelist!' });
    } else {
      alertService.errorPopup({ title: 'Error', message: 'The address is already whitelisted!' });
    }
  } catch {
    alertService.errorPopup({ title: 'Error', message: 'Something went wrong!' });
  } finally {
    thunkApi.dispatch(setDatabaseLoadingAction(false));
  }
});
