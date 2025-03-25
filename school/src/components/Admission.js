import React from 'react';
import { useTranslation } from 'react-i18next';
import './Admission.css';

function Admission() {
  const { t } = useTranslation();

  return (
    <div className="admission-container">
      <div className="admission">
        <h1>{t('admission.admissionProcedure')}</h1>
        <ul>
          {t('admission.admissionSteps', { returnObjects: true }).map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ul>
      </div>
      
      <div className="eligibility">
        <h1>{t('admission.eligibilityCriteria')}</h1>
        <ul>
          {t('admission.eligibilitySteps', { returnObjects: true }).map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Admission;
