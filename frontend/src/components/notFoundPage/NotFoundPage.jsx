import React from 'react';
import { useTranslation } from 'react-i18next';

import image from '../../assets/notFound.jpg';
import routes from '../../routes';

const NotfoundPage = () => {
  const { t } = useTranslation();

  return (
    <div className="text-center">
      <img src={image} alt={t('notFound.pageNotFound')} className="img-fluid h-25" />
      <h1 className="h4 text-muted">{t('notFound.pageNotFound')}</h1>
      <p className="text-muted">
        {t('notFound.visit')}
        <a href={routes.chatRoute()}>{t('notFound.mainPage')}</a>
      </p>
    </div>
  );
};

export default NotfoundPage;
