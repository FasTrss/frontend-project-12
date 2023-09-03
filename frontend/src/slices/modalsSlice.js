/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  type: null,
  channelId: null,
  isModalVisible: false,
};

const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    openModal: (state, { payload }) => {
      state.type = payload.type;
      state.channelId = payload.id;
      state.isModalVisible = true;
    },
    closeModal: (state) => {
      state.isModalVisible = false;
    },
  },
});

export const { openModal, closeModal } = modalsSlice.actions;
export const getModalType = (state) => state.modalsReducer.type;
export const getChannelId = (state) => state.modalsReducer.channelId;
export const getShown = (state) => state.modalsReducer.isModalVisible;
export default modalsSlice.reducer;
