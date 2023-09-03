/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter, createSelector } from '@reduxjs/toolkit';
import fetchData from '../requests/fetchData.js';

const channelsAdapter = createEntityAdapter();

const initialState = channelsAdapter.getInitialState({
  currentChannelId: 1,
  loadingState: 'idle',
  loadingError: null,
});

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannel: channelsAdapter.addOne,
    addChannels: channelsAdapter.addMany,
    updateChannel: channelsAdapter.updateOne,
    removeChannel: channelsAdapter.removeOne,
    setCurrentChannelId: (state, { payload }) => {
      state.currentChannelId = payload;
    },
    setDefaultChannel: (state) => {
      state.currentChannelId = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loadingState = 'loading';
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        channelsAdapter.addMany(state, action.payload.channels);
        state.currentChannelId = action.payload.currentChannelId;
        state.loadingState = 'idle';
        state.error = null;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loadingState = 'failed';
        state.loadingError = action.error.message;
      });
  },
});

export const {
  addChannel,
  addChannels,
  updateChannel,
  removeChannel,
  setCurrentChannelId,
  setDefaultChannel,
} = channelsSlice.actions;

export const selectors = channelsAdapter.getSelectors((state) => state.channelsReducer);

export const getLoadingState = (state) => state.loadingState;
export const getLoadingError = (state) => state.loadingError;

export const getCurrentChannelId = (state) => state.channelsReducer.currentChannelId;

export const getCurrentChannel = (state) => {
  const { currentChannelId } = state.channelsReducer;
  return state.channelsReducer.entities[currentChannelId];
};

export const getChannelsNames = createSelector(
  [(state) => state.channelsReducer.entities],
  (entities) => Object.values(entities).map((channel) => channel.name),
);

export const getChannelById = (id) => createSelector(
  [(state) => state.channelsReducer.entities],
  (entities) => entities[id],
);

export default channelsSlice.reducer;
