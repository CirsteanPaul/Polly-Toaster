import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllAddresses, postNewAddress } from 'api/whitelist-requests';
import isArray from 'lodash/isArray';
import toString from 'lodash/toString';
import { RootState } from 'store';
import { DATABASE__SET_ADDRESSES, DATABASE__SET_LOADING, DATABASE__FETCH, DATABASE__ADD_NEW_WHITELIST_ADDRESS } from 'store/constants';
import { databaseAddressesSelector } from 'store/selectors/database-selectors';
import Swal from 'sweetalert2';
import IAddressReponse from 'types/requests/IAddressResponse';

const addressesMapper = (addresses: IAddressReponse[]): string[] => {
  if (!isArray(addresses)) {
    return [];
  }
  return addresses.map(address => toString(address?.address));
};

export const setDatabaseLoadingAction = createAction<boolean>(DATABASE__SET_LOADING);
export const setDatabaseAddressesAction = createAction<string[]>(DATABASE__SET_ADDRESSES);

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
  thunkApi.dispatch(setDatabaseLoadingAction(true));
  try {
    if (!currentAddresses.find(currAddress => currAddress === address)) {
      await postNewAddress({ address });
      Swal.fire({
        title: 'Success',
        icon: 'success',
        text: 'The address was registered int the whitelist!',
        timer: 3000,
      });
    } else {
      Swal.fire({
        title: 'Error',
        icon: 'error',
        text: 'The address is already whitelisted!',
        timer: 3000,
      });
    }
  } catch {
    Swal.fire({
      title: 'Error',
      icon: 'error',
      text: 'Something went wrong!',
      timer: 3000,
    });
  } finally {
    thunkApi.dispatch(setDatabaseLoadingAction(false));
  }
});
