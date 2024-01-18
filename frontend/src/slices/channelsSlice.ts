/* eslint-disable no-param-reassign */
import {
  createSlice,
  createEntityAdapter,
  createSelector,
  PayloadAction,
  EntityState,
} from '@reduxjs/toolkit';
import fetchData from '../requests/fetchData';

interface Channel {
  id: number;
  name: string;
}

interface ChannelsState {
  entities: Record<number, Channel>;
  currentChannelId: number;
  loadingState: string;
  loadingError: string | null;
  channelsReducer: {
    entities: Record<number, Channel>;
    currentChannelId: number;
    loadingState: 'idle' | 'loading' | 'failed';
    loadingError: string | null;
  }
}

const channelsAdapter = createEntityAdapter<Channel>();

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
    setCurrentChannelId: (state, action: PayloadAction<number>) => {
      state.currentChannelId = action.payload;
    },
    setDefaultChannel: (state) => {
      state.currentChannelId = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loadingState = 'loading';
        state.loadingError = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        channelsAdapter.addMany(state, action.payload.channels);
        state.currentChannelId = action.payload.currentChannelId;
        state.loadingState = 'idle';
        state.loadingError = null;
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

export const selectors = channelsAdapter
  .getSelectors((state) => state.channelsReducer);

export const getLoadingState = (state: ChannelsState) => state.loadingState;
export const getLoadingError = (state: ChannelsState) => state.loadingError;

export const getCurrentChannelId = (state: ChannelsState) => state.channelsReducer.currentChannelId;

export const getCurrentChannel = (state: ChannelsState) => {
  const { currentChannelId } = state.channelsReducer;
  return state.channelsReducer.entities[currentChannelId];
};

export const getChannelsNames = createSelector(
  [(state) => state.channelsReducer.entities],
  (entities) => Object.values(entities).map((channel) => channel.name),
);

export const getChannelById = (id: number) => createSelector(
  [(state) => state.channelsReducer.entities],
  (entities) => entities[id],
);

export default channelsSlice.reducer;
