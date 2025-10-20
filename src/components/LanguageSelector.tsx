import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Language } from '../utils/translations';

const LanguageSelector: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
  };

  return (
    <div className="language-selector">
      <span className="language-label">{t('selectLanguage')}</span>
      <div className="language-buttons">
        <button
          className={`language-button ${language === 'en' ? 'active' : ''}`}
          onClick={() => handleLanguageChange('en')}
        >
          {t('english')}
        </button>
        <button
          className={`language-button ${language === 'de' ? 'active' : ''}`}
          onClick={() => handleLanguageChange('de')}
        >
          {t('german')}
        </button>
      </div>
    </div>
  );
};

export default LanguageSelector;
