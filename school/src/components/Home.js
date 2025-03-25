import React from 'react';
import './Home.css';
import SchoolPhoto from '../assets/images/school-photo.jpg';
import { useTranslation } from 'react-i18next';

const Home = () => {
  const { t } = useTranslation();

  return (
    <div className="home-container">
      <section className="school-quote">
        <blockquote>
          {t('quote')}
        </blockquote>
      </section>
      
      <section className="school-photo">
        <img src={SchoolPhoto} alt={t('schoolPhotoAlt')} />
      </section>
      
      <section className="vision-mission">
        <div className="vision">
          <h2>{t('vision')}</h2>
          <p>
            {t('visionDesc')}
          </p>
        </div>
        <div className="mission">
          <h2>{t('mission')}</h2>
          <p>
            {t('missionDesc')}
          </p>
        </div>
      </section>
      
      <section className="faculty">
        {/* <h2>Visit Us</h2> */}
        <iframe title='school-location' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d292.7826293210301!2d72.88423443766854!3d19.275568303218172!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b0637c40884b%3A0x8cbd9db909754c50!2s16%2C%20MBMC%20School%20Rd!5e0!3m2!1sen!2sin!4v1728027635637!5m2!1sen!2sin" width="1000" height="350" style={{border:0,}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
      </section>
    </div>
  );
};

export default Home;
