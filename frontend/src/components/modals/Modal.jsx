import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal as BootstrapModal } from 'react-bootstrap';

import AddChannel from './AddChannel.jsx';
import RemoveChannel from './RemoveChannel.jsx';
import RenameChannel from './RenameChannel.jsx';
import { closeModal, getShown, getModalType } from '../../slices/modalsSlice.js';

const modals = {
  add: AddChannel,
  remove: RemoveChannel,
  rename: RenameChannel,
};

const Modal = () => {
  const dispatch = useDispatch();

  const isModalVisible = useSelector(getShown);
  const modalType = useSelector(getModalType);

  const hide = () => {
    dispatch(closeModal());
  };

  const Component = modals[modalType];

  return (
    <BootstrapModal show={isModalVisible} onHide={hide}>
      {Component && <Component show={isModalVisible} hide={hide} />}
    </BootstrapModal>
  );
};

export default Modal;
