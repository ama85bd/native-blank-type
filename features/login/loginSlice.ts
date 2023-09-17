import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { ILoginCredential, IUserLogin } from '../../models/baseModel';
import Auth from '../../api/auth';
import showToast from '../../utils/Toast';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getData = async () => {
  try {
    const user = await AsyncStorage.getItem('user');
    const tokenLGED = await AsyncStorage.getItem('tokenLGED');
    const userRole = await AsyncStorage.getItem('userRole');
    if (user !== null) {
      console.log('user getData retrieved successfully:', user);
    } else {
      console.log('Value not found.');
    }
  } catch (error) {
    console.error('Error getting data:', error);
  }
};
interface LoginState {
  loginCredential: ILoginCredential | null;
  status: string;
}

const initialState: LoginState = {
  loginCredential: null,
  status: 'idle',
};

export const loginUser = createAsyncThunk<ILoginCredential, IUserLogin>(
  'login/loginUser',
  async (data, thunkAPI) => {
    try {
      const user = await Auth.loginUser(data);
      try {
        await AsyncStorage.setItem('user', JSON.stringify(user.result));
        await AsyncStorage.setItem(
          'tokenLGED',
          JSON.stringify(user.result.token)
        );
        await AsyncStorage.setItem('userId', JSON.stringify(user.result.id));
        await AsyncStorage.setItem(
          'userRole',
          JSON.stringify(user.result.userRole)
        );
        await AsyncStorage.setItem(
          'companyId',
          JSON.stringify(user.result.companyId)
        );
        console.log('Async Storage Data saved successfully.');
      } catch (error) {
        console.error('Error saving data Async Storage:', error);
      }

      return user.result;
    } catch (error: any) {
      console.log('thunk error', error);
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const fetchCurrentUser = createAsyncThunk<ILoginCredential>(
  'login/loginUser',
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

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    signOut: (state) => {
      state.loginCredential = null;
      AsyncStorage.removeItem('user');
      AsyncStorage.removeItem('tokenLGED');
      AsyncStorage.removeItem('userId');
      AsyncStorage.removeItem('userRole');
      AsyncStorage.removeItem('companyId');
    },
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
    builder.addMatcher(
      isAnyOf(loginUser.fulfilled, fetchCurrentUser.fulfilled),
      (state, action) => {
        console.log(' action full', action);
        state.loginCredential = action.payload;
      }
    );
    builder.addMatcher(isAnyOf(loginUser.rejected), (state, action) => {
      console.log('state', state);
      console.log('action', action);
      console.log(action.payload);
    });

    // builder.addCase(loginUser.pending, (state, action) => {
    //   console.log('action loging', action);
    //   console.log('state loging', state);
    //   state.status = 'pendingUserRegister';
    // });
    // builder.addCase(loginUser.fulfilled, (state, action) => {
    //   console.log('action loging fulfilled', action);
    //   state.loginCredential = action.payload;
    //   state.status = 'idle';
    // });
    // builder.addCase(loginUser.rejected, (state, action) => {
    //   console.log('state loging rejected', state);
    //   console.log('action loging rejected', action);
    //   state.status = 'idle';
    // });
  },
});

export const { signOut, setUser } = loginSlice.actions;
