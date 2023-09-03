/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter, createSelector } from '@reduxjs/toolkit';

import { removeChannel } from './channelsSlice';
import fetchData from '../requests/fetchData.js';

const messagesAdapter = createEntityAdapter();

const initialState = messagesAdapter.getInitialState({
  loadingError: null,
  loadingState: 'idle',
});

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: messagesAdapter.addOne,
    addMessages: messagesAdapter.addMany,
  },
  extraReducers: (builder) => {
    builder
      .addCase(removeChannel, (state, action) => {
        const removedChannelId = action.payload;
        const messagesIds = Object.values(state.entities)
          .filter((message) => message.channelId === removedChannelId)
          .map((message) => message.id);
        messagesAdapter.removeMany(state, messagesIds);
      })
      .addCase(fetchData.pending, (state) => {
        state.loadingState = 'loading';
        state.loadingError = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        messagesAdapter.addMany(state, action.payload.messages);
        state.loadingState = 'idle';
        state.loadingError = null;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loadingState = 'failed';
        state.loadingError = action.error.message;
      });
  },
});

export const { addMessage, addMessages } = messagesSlice.actions;

export const getCurrentMessages = (id) => createSelector(
  [(state) => state.messagesReducer.entities],
  (entities) => Object.values(entities).filter((message) => message.channelId === id),
);

export const selectors = messagesAdapter.getSelectors((state) => state.messagesReducer);

export default messagesSlice.reducer;
