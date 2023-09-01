import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import routes from '../routes';

const fetchData = createAsyncThunk(
  'fetch',
  async (token) => {
    const responce = await axios.get(routes.dataPath(), { headers: { Authorization: `Bearer ${token}` } });
    const { channels, currentChannelId, messages } = responce.data;
    return { channels, currentChannelId, messages };
  },
);

export const getLoadingState = (state) => state.loadingState;
export const getLoadingError = (state) => state.loadingError;

export default fetchData;
