import React from 'react';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate
import { auth } from '../firebase'; // Adjust the path as necessary
import { signOut } from 'firebase/auth';
import { useTranslation } from 'react-i18next'; // Import useTranslation
import Logo from '../assets/LOGO.png'; // Import logo

function NavbarAfterLogin() {
  const navigate = useNavigate(); // Initialize useNavigate
  const { t, i18n } = useTranslation(); // Initialize translation hook

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login'); // Redirect to login page after logout
      console.log("User logged out successfully");
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang); // Change the language
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={Logo} alt="School Logo" /> {/* Use the imported logo */}
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/" className="nav-link">{t('Home')}</Link>
        </li>
        <li>
          <Link to="/about" className="nav-link">{t('AboutUs')}</Link>
        </li>
        <li>
          <Link to="/admission" className="nav-link">{t('Admission')}</Link>
        </li>
        <li>
          <Link to="/academics" className="nav-link">{t('Facilities')}</Link>
        </li>
        <li>
          <Link to="/activities" className="nav-link">{t('Activities')}</Link>
        </li>
        <li>
          <Link to="/dashboard" className="nav-link">{t('Dashboard')}</Link>
        </li>
        <li>
          <Link to="#" onClick={handleLogout} className="nav-link">
            {t('Logout')} {/* Use translation for Logout */}
          </Link>
        </li>
      </ul>
      {/* Language Switcher */}
      <div className="language-switcher">
        <span>{t('navbar.language')}: </span>
        <button onClick={() => changeLanguage('en')}>English</button>
        <button onClick={() => changeLanguage('hi')}>हिन्दी</button>
        <button onClick={() => changeLanguage('mr')}>मराठी</button>
      </div>
    </nav>
  );
}

export default NavbarAfterLogin;
