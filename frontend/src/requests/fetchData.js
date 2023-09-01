import  createAsyncThunk from '@reduxjs/toolkit';
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

export default fetchData;