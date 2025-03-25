import React from 'react';
import './after_login.css';
// import SchoolPhoto from '../assets/images/school-photo.jpg';
// import Faculty1 from '../assets/images/faculty1.jpg';
import { useNavigate } from 'react-router-dom'; // Assuming you're using React Router for navigation
import NavbarAfterLogin from './components/NavbarAfterLogin';
import { useAuth } from '../context/AuthContext'; // Import the useAuth hook

const Home = () => {
  const navigate = useNavigate();
  const user = useAuth(); // Get the current user from the context

  // Function to handle button click and navigate to dashboard
  const handleDashboardClick = () => {
    navigate('/Dashboard'); // Adjust the path to your actual dashboard route
  };

  return (
    <div className="home-container">
      <NavbarAfterLogin />
      
      <Home/>
      {/* Display the logged-in username */}
      <section className="welcome-message">
        <h3>Welcome, {user ? user.displayName || user.email : 'Guest'}!</h3>
      </section>

      {/* Dashboard button */}
      <section className="dashboard">
        <button onClick={handleDashboardClick} className="dashboard-btn">
          Go to Dashboard
        </button>
      </section>
    </div>
  );
};

export default Home;
