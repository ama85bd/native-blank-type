import { configureStore } from '@reduxjs/toolkit';
import { loginSlice } from '../features/login/loginSlice';
import {
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from 'react-redux/es/exports';

export const store = configureStore({
  reducer: {
    login: loginSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
