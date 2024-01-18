import React from 'react';
import { useTranslation } from 'react-i18next';
import { Dropdown, ButtonGroup } from 'react-bootstrap';

const LanguageButton = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (language: string) => i18n.changeLanguage(language);

  return (
    <Dropdown as={ButtonGroup}>
      <Dropdown.Toggle
        className="flex-grow-0"
        variant="primary"
      >
        {t('language.currentLanguage')}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={() => changeLanguage('ru')}>
          {t('language.russian')}
        </Dropdown.Item>
        <Dropdown.Item onClick={() => changeLanguage('en')}>
          {t('language.english')}
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default LanguageButton;
