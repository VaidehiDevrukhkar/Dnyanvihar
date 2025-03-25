import React from 'react';
import './Academics.css';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Import images
import comp1 from '../assets/images/comp1.jpeg';
import lib1 from '../assets/images/lib1.jpeg';
import smartboard from '../assets/images/f1.jpeg';

const activitiesData = [
    { 
        title: 'aboutUs.activityDetails.computerLab.title',
        image: comp1, 
        description: 'aboutUs.activityDetails.computerLab.description',
        path: '/comp' // Add appropriate paths
    },
    { 
        title: 'aboutUs.activityDetails.library.title',
        image: lib1, 
        description: 'aboutUs.activityDetails.library.description',
        path: '/library' // Add appropriate paths
    },
    { 
        title: 'aboutUs.activityDetails.smartboard.title', // Ensure smartboard follows the same structure
        image: smartboard, 
        description: 'aboutUs.activityDetails.smartboard.description',
        path: '/smartboard'
    }
];

const AcademicsPage = () => {
    const { t } = useTranslation(); // Initialize translation

    return (
        <div className="activities-page">
            {activitiesData.map((activity, index) => (
                <div className="activity-item" key={index}>
                    <Link to={activity.path || '/'}> {/* Link to specific paths */}
                        <img src={activity.image} alt={t(activity.title)} className="activity-image" />
                    </Link>
                    <h3 className="activity-title">{t(activity.title)}</h3>
                    <p className="activity-description">{t(activity.description)}</p>
                </div>
            ))}
        </div>
    );
};

export default AcademicsPage;