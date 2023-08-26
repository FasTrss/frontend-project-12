/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  type: null,
  channelId: null,
  shown: false,
};

const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    openModal: (state, { payload }) => {
      state.type = payload.type;
      state.channelId = payload.id;
      state.shown = true;
    },
    closeModal: (state) => {
      state.shown = false;
    },
  },
});

export const { openModal, closeModal } = modalsSlice.actions;
export const getModalType = (state) => state.modalsReducer.type;
export const getChannelId = (state) => state.modalsReducer.channelId;
export const getShown = (state) => state.modalsReducer.shown;
export default modalsSlice.reducer;
