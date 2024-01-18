import React, { useRef, useEffect, FC } from 'react';
import { useFormik } from 'formik';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { ArrowRightSquare } from 'react-bootstrap-icons';
import { useTranslation } from 'react-i18next';
import leoProfanity from 'leo-profanity';

import { useChatWS } from '../../../contexts/chatWSContext/ChatWSContext';
import { useAuth } from '../../../contexts/authContext/AuthContext';

interface MessagesInputProps {
  currentChannelId: number;
}

const MessagesInput: FC<MessagesInputProps> = ({ currentChannelId }) => {
  const inputRef = useRef(null);
  const { t } = useTranslation();
  const { emitSendMessage } = useChatWS();
  const { userData } = useAuth();

  const handleSubmit = async ({ message }, actions) => {
    if (message) {
      const filteredMessage = leoProfanity.clean(message);
      const newMessage = {
        body: filteredMessage,
        channelId: currentChannelId,
        username: userData.username,
      };
      await emitSendMessage(newMessage);
      actions.resetForm();
    }
  };

  const formik = useFormik({
    initialValues: { message: '' },
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div className="mt-auto px-5 py-3">
      <Form className="py-1 border rounded-2" onSubmit={formik.handleSubmit}>
        <InputGroup>
          <Form.Control
            className="border-0 p-0 ps-2"
            type="text"
            name="message"
            placeholder={t('chat.messages.enterMessage')}
            id="message"
            aria-label={t('chat.messages.newMessage')}
            value={formik.values.message}
            onChange={formik.handleChange}
            ref={inputRef}
          />
          <Button
            type="submit"
            variant="link"
            className="btn-group-vertical text-dark"
          >
            <ArrowRightSquare size={20} />
          </Button>
        </InputGroup>
      </Form>
    </div>
  );
};

export default MessagesInput;
