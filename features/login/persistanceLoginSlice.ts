import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { ILoginCredential, IUserLogin } from '../../models/baseModel';
import Auth from '../../api/auth';
import showToast from '../../utils/Toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

interface LoginState {
  loginCredential: ILoginCredential | null;
  status: string;
  isAuthenticated: boolean;
}

const initialState: LoginState = {
  loginCredential: null,
  status: 'idle',
  isAuthenticated: false,
};

export const fetchCurrentUser = createAsyncThunk<ILoginCredential>(
  'persistanceLogin/fetchCurrentUser',
  async (_, thunkAPI) => {
    // getData()
    thunkAPI.dispatch(setUser(await AsyncStorage.getItem('user')!));
    try {
      // const userAs = await AsyncStorage.getItem('user');
      // console.log('fetchCurrentUser AsyncStorage', userAs);
      const user = await Auth.loginSingleUser();
      console.log('user fetch', user);
      try {
        await AsyncStorage.setItem('user', JSON.stringify(user.result));

        console.log('Async Storage fetch data saved successfully.');
      } catch (error) {
        console.error('Error saving data Async Storage:', error);
      }
      return user.result;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  },
  {
    condition: () => {
      if (!AsyncStorage.getItem('user')) return false;
    },
  }
);

export const persistanceLoginSlice = createSlice({
  name: 'persistanceLogin',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.loginCredential = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCurrentUser.rejected, (state, action) => {
      console.log(' action rejjj', action);
      state.loginCredential = null;
      AsyncStorage.removeItem('user');
      showToast('error', 'Session expired - please login again');
    });
    builder.addMatcher(isAnyOf(fetchCurrentUser.fulfilled), (state, action) => {
      console.log(' action full', action);
      state.loginCredential = action.payload;
      state.isAuthenticated = true;
    });
  },
});

export const { setUser } = persistanceLoginSlice.actions;
