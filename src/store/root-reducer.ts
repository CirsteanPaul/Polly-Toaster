import { combineReducers } from '@reduxjs/toolkit';
import blockchainReducer from './reducers/blockchain-reducer';
import contractInfoReducer from './reducers/contract-info-reducer';
import databaseReducer from './reducers/database-reducer';

const rootReducer = combineReducers({
  blockchain: blockchainReducer,
  contractInfo: contractInfoReducer,
  database: databaseReducer,
});
export default rootReducer;
