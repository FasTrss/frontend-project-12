import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import {
  Modal, Form, Button, FormControl, FormLabel,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { useChatWS } from '../../contexts/chatWSContext/ChatWSContext.jsx';
import { getChannelsNames, getChannelById } from '../../slices/channelsSlice.js';
import { getChannelId } from '../../slices/modalsSlice.js';

const getValidationSchema = (channelsNames) => Yup.object().shape({
  newName: Yup.string()
    .required('chat.modals.requiredField')
    .min(3, 'chat.modals.nameLength')
    .max(20, 'chat.modals.nameLength')
    .notOneOf(channelsNames, 'chat.modals.nameExists'),
});

const RenameChannel = ({ isModalVisible, hide }) => {
  const { t } = useTranslation();
  const { emitRenameChannel } = useChatWS();
  const inputRef = useRef(null);

  const channelsNames = useSelector(getChannelsNames);
  const renamedChannelId = useSelector(getChannelId);
  const renamedChannel = useSelector(getChannelById(renamedChannelId));

  const handleSubmit = async ({ newName }) => {
    try {
      await emitRenameChannel(newName, renamedChannelId);
      toast.success(t('chat.modals.channelRenamed'));
      hide();
    } catch (error) {
      console.log(error);
      toast.warning(t('chat.modals.connectionError'));
    }
  };

  const formik = useFormik({
    initialValues: { newName: renamedChannel.name },
    onSubmit: handleSubmit,
    validationSchema: getValidationSchema(channelsNames),
  });

  useEffect(() => {
    if (isModalVisible) {
      inputRef.current.focus();
    }
  }, [isModalVisible]);

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{t('chat.modals.renameChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <FormLabel className="visually-hidden" htmlFor="newName">
              {t('chat.modals.channelName')}
            </FormLabel>
            <FormControl
              className="mb-2"
              onChange={formik.handleChange}
              value={formik.values.newName}
              name="newName"
              ref={inputRef}
              id="newName"
              isInvalid={formik.touched.newName && !!formik.errors.newName}
            />
            <FormControl.Feedback type="invalid">
              {t(formik.errors.newName)}
            </FormControl.Feedback>
            <div className="d-flex justify-content-end">
              <Button
                onClick={hide}
                className="me-2"
                variant="secondary"
              >
                {t('chat.modals.cancel')}
              </Button>
              <Button type="submit" variant="primary">{t('chat.modals.submit')}</Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
    </>
  );
};

export default RenameChannel;
