import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';
import { ICompanyList } from '../../models/baseModel';
import Auth from '../../api/auth';
import { RootState } from '../../services/store';

const companyListAdapter = createEntityAdapter<ICompanyList>();

export const fetchCompanyList = createAsyncThunk<ICompanyList[]>(
  'companyList/fetchCompanyList',
  async (_, thunkAPI) => {
    console.log('Auth.getAllCompanies()', Auth);
    try {
      return await Auth.getAllCompanies().then((e) => e.result);
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const companyListSlice = createSlice({
  name: 'companyList',
  initialState: companyListAdapter.getInitialState({
    companyListLoaded: false,
    status: 'idle',
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCompanyList.pending, (state, action) => {
      //   console.log('fetchCompanyList pending', action);
      state.status = 'pendingFetchCompanyList';
    });
    builder.addCase(fetchCompanyList.fulfilled, (state, action) => {
      //   console.log('fetchCompanyList fulfilled', action);

      companyListAdapter.setAll(state, action.payload);
      state.status = 'idle';
      state.companyListLoaded = true;
    });
    builder.addCase(fetchCompanyList.rejected, (state, action) => {
      //   console.log('fetchCompanyList rejected', action);
      state.status = 'idle';
      console.log(action.payload);
    });
  },
});

export const companyListSelector = companyListAdapter.getSelectors(
  (state: RootState) => state.companyList
);
