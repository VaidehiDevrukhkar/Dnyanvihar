import React from 'react';
import './Activities.css';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // Import translation hook
import sportsDayImg from '../assets/images/sport1.jpeg';
import independenceDayImg from '../assets/images/img1.jpeg';
import drawingImg from '../assets/images/rakhi18.jpeg';
import ecoClubImg from '../assets/images/eco1.jpeg';
import aadivasiDivasImg from '../assets/images/adi2.jpeg';
import CultureImg from '../assets/images/cult1.jpeg';

const activitiesData = [
  {
    title: 'aboutUs.activitiesPage.sportsDay.title', // Updated translation key
    image: sportsDayImg,
    description: 'aboutUs.activitiesPage.sportsDay.description', // Updated translation key
    path: '/sports',
  },
  {
    title: 'aboutUs.activitiesPage.independenceDay.title',
    image: independenceDayImg,
    description: 'aboutUs.activitiesPage.independenceDay.description',
    path: '/independence',
  },
  {
    title: 'aboutUs.activitiesPage.rakshabandhan.title',
    image: drawingImg,
    description: 'aboutUs.activitiesPage.rakshabandhan.description',
    path: '/rakhi',
  },
  {
    title: 'aboutUs.activitiesPage.ecoClub.title',
    image: ecoClubImg,
    description: 'aboutUs.activitiesPage.ecoClub.description',
    path: '/ecoclub',
  },
  {
    title: 'aboutUs.activitiesPage.adivasiDivas.title',
    image: aadivasiDivasImg,
    description: 'aboutUs.activitiesPage.adivasiDivas.description',
    path: '/adivasi',
  },
  {
    title: 'aboutUs.activitiesPage.culturalDay.title',
    image: CultureImg,
    description: 'aboutUs.activitiesPage.culturalDay.description',
    path: '/cult',
  },
];

const ActivitiesPage = () => {
  const { t } = useTranslation(); // Initialize translation

  return (
    <div className="activities-page">
      
      {activitiesData.map((activity, index) => (
        <div className="activity-item" key={index}>
          <Link to={activity.path || '/'}>
            <img src={activity.image} alt={t(activity.title)} className="activity-image" />
          </Link>
          <h3 className="activity-title">{t(activity.title)}</h3>
          <p className="activity-description">{t(activity.description)}</p>
        </div>
      ))}
    </div>
  );
};

export default ActivitiesPage;
