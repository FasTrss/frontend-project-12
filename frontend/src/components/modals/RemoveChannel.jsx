import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { useChatWS } from '../../contexts/chatWSContext/ChatWSContext.jsx';
import { getChannelId } from '../../slices/modalsSlice.js';
import { setDefaultChannel, removeChannel } from '../../slices/channelsSlice.js';

const RemoveChannel = ({ hide }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { emitRemoveChannel } = useChatWS();

  const removedChannelId = useSelector(getChannelId);

  const handleDelete = () => {
    emitRemoveChannel(removedChannelId)
      .then((status) => {
        console.log(status);
        dispatch(removeChannel(removedChannelId));
        dispatch(setDefaultChannel());
        toast.success(t('chat.modals.channelRemoved'));
        hide();
      })
      .catch((error) => {
        console.log(error);
        toast.warning(t('chat.modals.connectionError'));
      });
  };

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{t('chat.modals.removeChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('chat.modals.areYouSure')}</p>
        <div className="d-flex justify-content-end">
          <Button variant="secondary" className="me-2" onClick={hide}>
            {t('chat.modals.cancel')}
          </Button>
          <Button type="submit" variant="danger" onClick={handleDelete}>
            {t('chat.modals.remove')}
          </Button>
        </div>
      </Modal.Body>
    </>
  );
};

export default RemoveChannel;
