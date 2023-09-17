// import { configureStore } from '@reduxjs/toolkit';

// export const store = configureStore({
//   reducer: {},
// });

// export const server = 'https://apidev.lged.gov.bd/api/auth/login';

import { configureStore } from '@reduxjs/toolkit';
import { loginSlice } from '../features/login/loginSlice';
import {
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from 'react-redux/es/exports';
import rocketReducer from '../features/login/testSlice';

export const store = configureStore({
  reducer: {
    login: loginSlice.reducer,
    rockets: rocketReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
