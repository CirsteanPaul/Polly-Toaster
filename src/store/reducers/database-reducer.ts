import { createReducer } from '@reduxjs/toolkit';
import { setDatabaseAddressesAction, setDatabaseLoadingAction } from 'store/actions/database-actions';

interface State {
  loading: boolean;
  addresses: string[];
}
const initialState: State = {
  loading: false,
  addresses: [],
};

const databaseReducer = createReducer(initialState, builder =>
  builder
    .addCase(setDatabaseLoadingAction, (state, action) => ({ ...state, loading: action.payload }))
    .addCase(setDatabaseAddressesAction, (state, action) => ({ ...state, addresses: action.payload })),
);
export default databaseReducer;
