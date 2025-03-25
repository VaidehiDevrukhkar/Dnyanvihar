import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Logo from '../assets/LOGO.png'; // Correctly import the logo

const Navbar = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={Logo} alt="School Logo" /> {/* Use the imported logo */}
      </div>
      <ul className="navbar-links">
        <li><Link to="/">{t('Home')}</Link></li>
        <li><Link to="/about">{t('AboutUs')}</Link></li>
        <li><Link to="/admission">{t('Admission')}</Link></li>
        <li><Link to="/academics">{t('Facilities')}</Link></li>
        <li><Link to="/activities">{t('Activities')}</Link></li>
        <li><Link to="/login">{t('Login')}</Link></li>
      </ul>
      <div className="language-switcher">
        <span>{t('navbar.language')}: </span>
        <button onClick={() => changeLanguage('en')}>English</button>
        <button onClick={() => changeLanguage('hi')}>Hindi</button>
        <button onClick={() => changeLanguage('mr')}>Marathi</button>
      </div>
    </nav>
  );
};

export default Navbar;
