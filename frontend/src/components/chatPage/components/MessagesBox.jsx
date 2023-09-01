import React, { useEffect } from 'react';
import { animateScroll } from 'react-scroll';

const MessagesBox = ({ messages }) => {
  useEffect(() => {
    animateScroll.scrollToBottom({ containerId: 'messages-box', duration: 0 });
  }, [messages]);

  return (
    <div id="messages-box" className="chat-messages overflow-auto px-5">
      {messages.map((message) => (
        <div key={message.id} className="text-break mb-2">
          <b>{message.username}</b>
          {`: ${message.body}`}
        </div>
      ))}
    </div>
  );
};

export default MessagesBox;
