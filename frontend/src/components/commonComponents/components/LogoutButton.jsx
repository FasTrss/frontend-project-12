import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { useAuth } from '../../../contexts/authContext/AuthContext.jsx';
import routes from '../../../routes.js';

const LogOutButton = () => {
  const { logOut, userData } = useAuth();
  const { t } = useTranslation();

  return (
    userData && (
      <Button as={Link} to={routes.loginRoute()} onClick={logOut}>
        {t('header.logout')}
      </Button>
    )
  );
};

export default LogOutButton;
