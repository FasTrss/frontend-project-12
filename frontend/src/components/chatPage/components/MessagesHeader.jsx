import React from 'react';
import { useTranslation } from 'react-i18next';

const MessagesHeader = ({ currentChannelName, numberOfMessages }) => {
  const { t } = useTranslation();

  return (
    <div className="bg-light mb-4 p-3 shadow-sm small">
      <p className="m-0">
        <b>{`# ${currentChannelName}`}</b>
      </p>
      <span className="text-muted">
        {t('chat.messages.quantity.count', { count: numberOfMessages })}
      </span>
    </div>
  );
};

export default MessagesHeader;
