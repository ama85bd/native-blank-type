import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const ROCKET_URL = 'https://apidev.lged.gov.bd/api/auth/login';

export const fetchRockets = createAsyncThunk<any>(
  'rockets/fetchRockets',
  async () => {
    const response = await axios.post(ROCKET_URL, {
      email: 'ashique@lged.gov.bd',
      password: 'Lged@1234',
    });
    console.log('response test', response);
    return response.data;
  }
);

const initialState = {
  rockets: [],
  status: 'idle',
  error: null,
};

const rocketsSlice = createSlice({
  name: 'rockets',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRockets.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRockets.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.rockets = action.payload;
      })
      .addCase(fetchRockets.rejected, (state, action) => {
        state.status = 'failed';
        // state.error = action.error.message;
      });
  },
});

export const selectAllRockets = (state: any) => state.rockets.rockets;
export const getRocketsStatus = (state: any) => state.rockets.status;
export const getRocketsError = (state: any) => state.rockets.error;

export default rocketsSlice.reducer;
