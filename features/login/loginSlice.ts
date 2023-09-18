import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { ILoginCredential, IUserLogin } from '../../models/baseModel';
// import Auth from '../../api/auth';
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
let axiosConfig = {
  headers: {
    'Content-Type': 'application/json-patch+json',
    'Access-Control-Allow-Origin': '*',
  },
};
export const loginUser = createAsyncThunk<ILoginCredential, IUserLogin>(
  'login/loginUser',
  async (data, thunkAPI) => {
    console.log('data', data);
    console.log('thunkAPI', thunkAPI);
    try {
      const uninterceptedAxiosInstance = axios.create();
      const user: any = await uninterceptedAxiosInstance
        .post('http://192.168.0.103:5000/api/auth/login', data, axiosConfig)
        .then((res) => res.data.result);

      // Auth.loginUser(data);
      console.log('user', user);
      try {
        await AsyncStorage.setItem('user', JSON.stringify(user));
        await AsyncStorage.setItem('tokenLGED', JSON.stringify(user.token));
        await AsyncStorage.setItem('userId', JSON.stringify(user.id));
        await AsyncStorage.setItem('userRole', JSON.stringify(user.userRole));
        await AsyncStorage.setItem('companyId', JSON.stringify(user.companyId));
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

// export const fetchCurrentUser = createAsyncThunk<ILoginCredential>(
//   'login/fetchCurrentUser',
//   async (_, thunkAPI) => {
//     // getData()
//     thunkAPI.dispatch(setUser(await AsyncStorage.getItem('user')!));
//     try {
//       // const userAs = await AsyncStorage.getItem('user');
//       // console.log('fetchCurrentUser AsyncStorage', userAs);
//       const user = await Auth.loginSingleUser();
//       console.log('user fetch', user);
//       try {
//         await AsyncStorage.setItem('user', JSON.stringify(user.result));

//         console.log('Async Storage fetch data saved successfully.');
//       } catch (error) {
//         console.error('Error saving data Async Storage:', error);
//       }
//       return user.result;
//     } catch (error: any) {
//       return thunkAPI.rejectWithValue({ error: error.data });
//     }
//   },
//   {
//     condition: () => {
//       if (!AsyncStorage.getItem('user')) return false;
//     },
//   }
// );

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
      state.isAuthenticated = false;
    },
    setUser: (state, action) => {
      state.loginCredential = action.payload;
    },
  },
  extraReducers: (builder) => {
    // builder.addCase(fetchCurrentUser.rejected, (state, action) => {
    //   console.log(' action rejjj', action);
    //   state.loginCredential = null;
    //   AsyncStorage.removeItem('user');
    //   showToast('error', 'Session expired - please login again');
    // });
    // builder.addMatcher(
    //   isAnyOf(loginUser.fulfilled, fetchCurrentUser.fulfilled),
    //   (state, action) => {
    //     console.log(' action full', action);
    //     state.loginCredential = action.payload;
    //     state.isAuthenticated = true;
    //   }
    // );
    // builder.addMatcher(isAnyOf(loginUser.rejected), (state, action) => {
    //   console.log('state', state);
    //   console.log('action', action);
    //   console.log(action.payload);
    // });

    builder.addCase(loginUser.pending, (state, action) => {
      console.log('action loging', action);
      console.log('state loging', state);
      state.status = 'pendingUserRegister';
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      console.log('action loging fulfilled', action);
      state.loginCredential = action.payload;
      state.status = 'idle';
      state.isAuthenticated = true;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      console.log('state loging rejected', state);
      console.log('action loging rejected', action);
      state.status = 'idle';
    });
  },
});

export const { signOut, setUser } = loginSlice.actions;
