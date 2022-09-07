import { combineReducers } from '@reduxjs/toolkit';
import blockchainReducer from './reducers/blockchain-reducer';
import contractInfoReducer from './reducers/contract-info-reducer';

const rootReducer = combineReducers({
  blockchain: blockchainReducer,
  contractInfo: contractInfoReducer,
});
export default rootReducer;
