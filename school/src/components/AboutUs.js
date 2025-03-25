import React from 'react';
import './AboutUs.css';  
import { useTranslation } from 'react-i18next';

function AboutUs() {
  const { t } = useTranslation();

  return (
    <div id="about-us" className="about-us">
      <div className="grid-container">
        <div className="section">
          <h2 className="section-title">{t('aboutUs.facilities')}</h2>
          <p className="section-content">{t('aboutUs.facilitiesContent')}</p>
        </div>
        <div className="section">
          <h2 className="section-title">{t('aboutUs.achievements')}</h2>
          <p className="section-content">{t('aboutUs.achievementsContent')}</p>
        </div>
        <div className="section">
          <h2 className="section-title">{t('aboutUs.activities')}</h2>
          <p className="section-content">{t('aboutUs.activitiesContent')}</p>
        </div>
        <div className="section">
          <h2 className="section-title">{t('aboutUs.information')}</h2>
          <p className="section-content">{t('aboutUs.informationContent')}</p>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
