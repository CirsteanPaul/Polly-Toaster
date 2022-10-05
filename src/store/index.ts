import { configureStore } from '@reduxjs/toolkit';
import { isDevelopmentMode } from 'config/config';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import rootReducer from './root-reducer';

const isDev = isDevelopmentMode();
const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: isDev,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
