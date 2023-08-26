import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

import routes from '../../../routes';

const LoginButton = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();

  return (
    pathname === routes.signupRoute() && (
      <Button as={Link} to={routes.loginRoute()}>
        {t('header.login')}
      </Button>
    )
  );
};

export default LoginButton;
