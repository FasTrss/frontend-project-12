import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Modal, Form, Button, FormControl,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { useChatWS } from '../../contexts/chatWSContext/ChatWSContext.jsx';
import { getChannelsNames, setCurrentChannelId } from '../../slices/channelsSlice.js';

const getValidationSchema = (channels) => Yup.object().shape({
  newChannelsName: Yup.string()
    .required('chat.modals.requiredField')
    .min(3, 'chat.modals.nameLength')
    .max(20, 'chat.modals.nameLength')
    .notOneOf(channels, 'chat.modals.nameExists'),
});

const AddChannel = ({ isModalVisible, hide }) => {
  const inputRef = useRef(null);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { emitAddChannel } = useChatWS();
  const channels = useSelector(getChannelsNames);

  const handleSubmit = async ({ newChannelsName }) => {
    try {
      const newChannel = {
        name: newChannelsName,
      };
      const channel = await emitAddChannel(newChannel);
      dispatch(setCurrentChannelId(channel.data.id));
      toast.success(t('chat.modals.channelCreated'));
      hide();
    } catch (error) {
      console.error(error);
      toast.warning(t('chat.modals.connectionError'));
    }
  };

  const formik = useFormik({
    initialValues: { newChannelsName: '' },
    onSubmit: handleSubmit,
    validationSchema: getValidationSchema(channels),
  });

  useEffect(() => {
    if (isModalVisible) {
      inputRef.current.focus();
    }
  }, [isModalVisible]);

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{t('chat.modals.addChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <label style={{ display: 'none' }} htmlFor="newChannelsName">{t('chat.modals.channelName')}</label>
            <FormControl
              className="mb-2"
              onChange={formik.handleChange}
              value={formik.values.newChannelsName}
              name="newChannelsName"
              ref={inputRef}
              id="newChannelsName"
              isInvalid={formik.touched.newChannelsName && !!formik.errors.newChannelsName}
            />
            <FormControl.Feedback type="invalid">
              {t(formik.errors.newChannelsName)}
            </FormControl.Feedback>
            <div className="d-flex justify-content-end">
              <Button onClick={hide} className="me-2" variant="secondary">{t('chat.modals.cancel')}</Button>
              <Button type="submit" variant="primary">{t('chat.modals.submit')}</Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
    </>
  );
};

export default AddChannel;
