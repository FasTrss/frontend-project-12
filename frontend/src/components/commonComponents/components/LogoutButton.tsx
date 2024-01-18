import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { useAuth } from '../../../contexts/authContext/AuthContext';
import routes from '../../../routes';

const LogOutButton = () => {
  const { logOut, userData } = useAuth();
  const { t } = useTranslation();

  return (
    userData && (
      <Link to={routes.loginRoute()}>
        <Button onClick={logOut}>
          {t('header.logout')}
        </Button>
      </Link>
    )
  );
};

export default LogOutButton;
