import { createReducer } from '@reduxjs/toolkit';
import { setDatabaseAddressesAction, setDatabaseLoadingAction, setModalStatusAction } from 'store/actions/database-actions';

interface State {
  loading: boolean;
  addresses: string[];
  modalStatus: boolean;
}
const initialState: State = {
  loading: false,
  addresses: [],
  modalStatus: false,
};

const databaseReducer = createReducer(initialState, builder =>
  builder
    .addCase(setModalStatusAction, (state, action) => ({ ...state, modalStatus: action.payload }))
    .addCase(setDatabaseLoadingAction, (state, action) => ({ ...state, loading: action.payload }))
    .addCase(setDatabaseAddressesAction, (state, action) => ({ ...state, addresses: action.payload })),
);
export default databaseReducer;
