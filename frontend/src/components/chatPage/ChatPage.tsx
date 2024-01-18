/* eslint-disable react/jsx-no-useless-fragment */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Spinner } from 'react-bootstrap';
import { useAuth } from '../../contexts/authContext/AuthContext';
import fetchData from '../../requests/fetchData';
import { getLoadingState, getLoadingError } from '../../slices/channelsSlice';
import Channels from './components/Channels';
import Messages from './components/Messages';
import Modal from '../modals/Modal';
import Error from './components/Error';
import { openModal } from '../../slices/modalsSlice';
import routes from '../../routes';

const Chat = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [hasError, setHasError] = useState(false);

  const loadingError = useSelector(getLoadingError);
  const loadingState = useSelector(getLoadingState);

  const { userData, logOut } = useAuth();

  useEffect(() => {
    dispatch(fetchData(userData.token));
  }, [dispatch, userData.token]);

  useEffect(() => {
    if (loadingError) {
      if (loadingError.response.status === 401) {
        logOut();
        navigate(routes.loginRoute());
      } else {
        setHasError(true);
      }
    }
  }, [loadingError, logOut, navigate]);

  const showModal = (type: string, id: number | null = null) => {
    dispatch(openModal({ type, id }));
  };

  return loadingState === 'loading'
    ? (
      <div className="h-100 d-flex justify-content-center align-items-center">
        <Spinner variant="secondary" />
      </div>
    )
    : (
      <>
        {hasError
          ? <Error />
          : (
            <Container className="h-100 my-4 overflow-hidden rounded shadow">
              <Row className="h-100 bg-white flex-md-row">
                <Channels showModal={showModal} />
                <Messages />
              </Row>
              <Modal />
            </Container>
          )}
      </>
    );
};

export default Chat;
