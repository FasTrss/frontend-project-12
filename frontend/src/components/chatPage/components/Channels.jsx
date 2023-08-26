import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Col, Button } from 'react-bootstrap';
import { PlusSquare } from 'react-bootstrap-icons';
import { useTranslation } from 'react-i18next';

import { selectors, setCurrentChannelId, getCurrentChannelId } from '../../../slices/channelsSlice.js';
import Channel from './Channel.jsx';

const Channels = ({ showModal }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const channels = useSelector(selectors.selectAll);
  const currentChannelId = useSelector(getCurrentChannelId);

  const changeChannel = (id) => {
    dispatch(setCurrentChannelId(id));
  };

  const openModal = () => {
    showModal('add');
  };

  return (
    <Col className="col-4 col-md-2 border-end px-0 bg-light flex-column d-flex h-100">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t('chat.channels.channels')}</b>
        <Button
          type="button"
          onClick={openModal}
          variant="group-vertical"
          className="p-0 text-primary"
        >
          <span className="visually-hidden">+</span>
          <PlusSquare size="20" />
        </Button>
      </div>
      <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
        {channels.map((channel) => (
          <Channel
            currentChannelId={currentChannelId}
            channel={channel}
            changeChannel={changeChannel}
            showModal={showModal}
            key={channel.id}
          />
        ))}
      </ul>
    </Col>
  );
};

export default Channels;
