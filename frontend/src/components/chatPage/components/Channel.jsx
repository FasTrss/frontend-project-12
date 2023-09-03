import React from 'react';
import {
  Button, Dropdown, ButtonGroup,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const Channel = ({
  channel, changeChannel, showModal, currentChannelId,
}) => {
  const { t } = useTranslation();

  const getClassNames = (id) => (id === currentChannelId
    ? 'text-start text-truncate rounded-0 w-100'
    : 'text-start text-truncate rounded-0 w-100 btn-secondary');

  const getVariant = (id) => (id === currentChannelId ? 'secondary' : 'light');

  return (
    <li className="nav-item w-100">
      {channel.removable
        ? (
          <Dropdown key={channel.id} as={ButtonGroup} className="d-flex">
            <Button
              type="button"
              onClick={() => changeChannel(channel.id)}
              variant={getVariant(channel.id)}
              className={getClassNames(channel.id)}
            >
              {`# ${channel.name}`}
            </Button>
            <Dropdown.Toggle
              className="flex-grow-0"
              variant={getVariant(channel.id)}
              split
            >
              <span className="visually-hidden">{t('chat.channels.manageChannels')}</span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => showModal('remove', channel.id)}>{t('chat.channels.remove')}</Dropdown.Item>
              <Dropdown.Item onClick={() => showModal('rename', channel.id)}>{t('chat.channels.rename')}</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )
        : (
          <Button
            type="button"
            variant={getVariant(channel.id)}
            key={channel.id}
            className={getClassNames(channel.id)}
            onClick={() => changeChannel(channel.id)}
          >
            {`# ${channel.name}`}
          </Button>
        )}
    </li>
  );
};

export default Channel;
