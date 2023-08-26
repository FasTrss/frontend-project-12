import React from 'react';
import { useTranslation } from 'react-i18next';
import { Dropdown, ButtonGroup } from 'react-bootstrap';

const LanguageButton = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (e) => {
    const language = e.target.id;
    i18n.changeLanguage(language);
  };

  return (
    <Dropdown as={ButtonGroup}>
      <Dropdown.Toggle
        className="flex-grow-0"
        variant="primary"
      >
        {t('language.currentLanguage')}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item
          onClick={changeLanguage}
          id="ru"
        >
          {t('language.russian')}
        </Dropdown.Item>
        <Dropdown.Item
          onClick={changeLanguage}
          id="en"
        >
          {t('language.english')}
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default LanguageButton;
