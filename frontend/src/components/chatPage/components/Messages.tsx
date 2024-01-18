import React from 'react';
import { useSelector } from 'react-redux';
import { Col } from 'react-bootstrap';

import { getCurrentMessages } from '../../../slices/messagesSlice';
import { getCurrentChannelId, getCurrentChannel } from '../../../slices/channelsSlice';

import MessagesHeader from './MessagesHeader';
import MessagesBox from './MessagesBox';
import MessagesInput from './MessagesInput';

const Messages = () => {
  const currentChannelId = useSelector(getCurrentChannelId);
  const currentChannel = useSelector(getCurrentChannel);
  const currentsMessages = useSelector(getCurrentMessages(currentChannelId));

  return (
    <Col className="p-0 h-100">
      <div className="d-flex flex-column h-100">
        <MessagesHeader
          currentChannelName={currentChannel?.name}
          numberOfMessages={currentsMessages?.length}
        />
        <MessagesBox messages={currentsMessages} />
        <MessagesInput currentChannelId={currentChannelId} />
      </div>
    </Col>
  );
};

export default Messages;
