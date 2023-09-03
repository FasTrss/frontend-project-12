import React from 'react';
import { Navbar, Container, ButtonGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import LogOutButton from './components/LogoutButton';
import LoginButton from './components/LoginButton';
import LanguageButton from './components/LanguageButton';
import routes from '../../routes';

const Header = () => {
  const { t } = useTranslation();

  return (
    <Navbar bg="wight" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to={routes.chatRoute()}>{t('header.name')}</Navbar.Brand>
        <ButtonGroup>
          <LanguageButton />
          <LogOutButton />
          <LoginButton />
        </ButtonGroup>
      </Container>
    </Navbar>
  );
};

export default Header;
