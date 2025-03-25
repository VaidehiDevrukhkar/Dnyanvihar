import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './ResultPage.css';

const ResultPage = ({ totalQuestions, correctAnswers, wrongAnswers, percentage }) => {
  const navigate = useNavigate(); // Initialize the navigate function from react-router-dom

  const formattedPercentage = percentage.toFixed(2);

  // Function to handle button click and navigate to the dashboard
  const handleGoBack = () => {
    navigate('/dashboard'); // Navigate to the /dashboard route
  };

  return (
    <div className="result-container">
      <h1 className="result-header">Result</h1>
      <div className="result-details">
        <p><strong>Total Questions:</strong> {totalQuestions}</p>
        <p><strong>Correct Answers:</strong> {correctAnswers}</p>
        <p><strong>Wrong Answers:</strong> {wrongAnswers}</p>
      </div>
      <div className="result-percentage">
        <CircularProgressbar 
          value={percentage} 
          text={`${formattedPercentage}%`} 
          styles={{
            path: {
              stroke: `#4CAF50`, 
              strokeWidth: 8,
            },
            text: {
              fill: '#333',
              fontSize: '1rem', 
              fontWeight: 'bold',
            },
            trail: {
              stroke: '#f0f0f0',
            },
          }} 
        />
      </div>
      <button className="go-back-button" onClick={handleGoBack}>
        Back to Dashboard
      </button>
    </div>
  );
};

export default ResultPage;
