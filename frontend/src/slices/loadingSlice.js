/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import routes from '../routes';

export const fetchData = createAsyncThunk(
  'fetch',
  async (token) => {
    const responce = await axios.get(routes.dataPath(), { headers: { Authorization: `Bearer ${token}` } });
    const { channels, currentChannelId, messages } = responce.data;
    return { channels, currentChannelId, messages };
  },
);

const initialState = {
  loadingState: 'idle',
  loadingError: null,
  data: null,
};

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loadingState = 'loading';
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loadingState = 'idle';
        state.error = null;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loadingState = 'failed';
        state.loadingError = action.error;
      });
  },
});

export const getloadingState = (state) => state.loadingReducer.loadingState;
export const getLoadingError = (state) => state.loadingReducer.loadingError;

export default loadingSlice.reducer;
