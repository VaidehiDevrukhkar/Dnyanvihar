import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';
import { useTranslation } from 'react-i18next';
import { doc, getDoc } from 'firebase/firestore'; 
import { auth, db } from '../firebase';

const Dashboard = () => {
  const { t } = useTranslation();
  const [quizScores, setQuizScores] = useState({
    english: [],
    maths: [],
    science: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recommendationMessage, setRecommendationMessage] = useState(''); // Message for recommendations
  const [recommendedTopics, setRecommendedTopics] = useState([]); // Store recommended topics

  const user = auth.currentUser;
  const userEmail = user ? user.email : null;

  useEffect(() => {
    const fetchQuizScores = async () => {
      setLoading(true);
      if (userEmail) {
        try {
          const quizRef = doc(db, 'QuizResults', userEmail);
          const quizSnapshot = await getDoc(quizRef);

          if (quizSnapshot.exists()) {
            const quizData = quizSnapshot.data();
            const results = quizData.results || [];

            const groupedResults = results.reduce((acc, quiz) => {
              const section = quiz.section.toLowerCase();
              if (acc[section]) {
                acc[section].push(quiz);
              } else {
                acc[section] = [quiz];
              }
              return acc;
            }, { english: [], maths: [], science: [] });

            setQuizScores(groupedResults);
          } else {
            console.log('No quiz data found');
          }
        } catch (error) {
          setError('Error fetching quiz data');
          console.error('Error fetching quiz scores:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchQuizScores();
  }, [userEmail]);

  const toggleRecommendations = () => {
    const scores = {
      english: quizScores.english.reduce((max, quiz) => Math.max(max, quiz.score), 0),
      maths: quizScores.maths.reduce((max, quiz) => Math.max(max, quiz.score), 0),
      science: quizScores.science.reduce((max, quiz) => Math.max(max, quiz.score), 0),
    };

    // Check if all scores are zero
    if (scores.english === 0 && scores.maths === 0 && scores.science === 0) {
      setRecommendationMessage('Please complete all quizzes to see recommendations.');
      setRecommendedTopics([]);
      return;
    }

    // Determine the maximum score and corresponding subjects
    const maxScore = Math.max(scores.english, scores.maths, scores.science);
    const recommended = [];

    if (scores.english === maxScore) recommended.push('Technical and Analytical Skills');
    if (scores.maths === maxScore) recommended.push('Arts and Humanities');
    if (scores.science === maxScore) recommended.push('Social and Leadership Skills');

    // Handle the case where there are multiple subjects with the same score
    if (recommended.length > 1) {
      setRecommendationMessage('You have shown equal interest in multiple subjects:' + recommended.join(', ') + '.');
    } else {
      setRecommendationMessage(`I'd recommend you pursue: ${recommended[0]}.`);
    }

    setRecommendedTopics(recommended);
  };

  // Function to get career recommendations based on the best subjects
  const getCareerRecommendations = () => {
    const careers = [];

    

    if (recommendedTopics.includes('Technical and Analytical Skills')) {
      careers.push(
        <div>
          <h4>STEM (Science, Technology, Engineering, Mathematics)</h4>
          <ul>
            <li>Engineering:</li>
            <ul>
            <li>B.Tech.-Civil Engineering</li>
            <li>B.Tech.-Computer Science and Engineering</li>
            <li>B.Tech.-Electrical and Electronics Engineering</li>
            <li>B.Tech.-Electronics and Communication Engineering</li>
            <li>B.Tech.-Mechanical Engineering</li>
            </ul>
            <li>Information Technology:</li>
            <ul>
            <li>B.Sc.- Information Technology</li>
            <li>B.Sc. Mathematics</li>
            <li>B.Sc. Chemistry</li>
            <li>B.Sc.- Applied Geology</li>
            </ul>
            <li>Finance and Data Analysis:</li>            
            <ul>
            <li>B.Com- Bachelor of Commerce</li>
            <li>CA- Chartered Accountancy</li>
            <li>CS- Company Secretary</li>
            </ul>
          </ul>
        </div>
      );
    }

    if (recommendedTopics.includes('Arts and Humanities')) {
      careers.push(
        <div>
          <h4>Arts and Humanities</h4>
          <ul>
            <li>Creative Fields:</li>
            <ul>
            <li>Animation, Graphics and Multimedia</li>
            <li>BVA- Bachelor of Visual Arts</li>
            <li>BFD- Bachelor of Fashion Designing</li>
            </ul>
            <li>Communication and Writing:</li>
            <ul>
            <li>BA in English</li>
            <li>BA in Hindi</li>
            <li>BA in History</li>
            <li>BJMC- Bachelor of Journalism and Mass Communication</li>
            </ul>
            <li>Performing Arts:</li>
            <ul>
            <li>Diploma in Dramatic Arts</li>
            </ul>
          </ul>
        </div>
      );
    }

    if (recommendedTopics.includes('Social and Leadership Skills')) {
      careers.push(
        <div>
          <h4>Social Sciences and Business</h4>
          <ul>
            <li>Education:</li>
            <ul>
            <li>B.Ed. (for teaching)</li>
            <li>B.Sc. Nursing (for healthcare)</li>
            <li>MBBS (for a medical career)</li>
            </ul>
            <li>Business and Management:</li>
            <ul>
            <li>BBA- Bachelor of Business Administration</li>
            <li>BBS- Bachelor of Business Studies</li>
            <li>BEM- Bachelor of Event Management</li>
            <li>BTTM- Bachelor of Travel and Tourism Management</li>
            </ul>
            <li>Public Service:</li>
            <ul>
            <li>Civil Services (for governance and administration)</li>
            </ul>
          </ul>
        </div>
      );
    }

    return careers;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="dashboard-container">
      <div className="column">
        <h2>Welcome {user ? user.displayName || user.email : 'Guest'}!</h2>
        
        {/* Chatbot iframe */}
        <iframe
          title='Chatbot'
          src="https://www.chatbase.co/chatbot-iframe/A2FFW4vb5lXH-wz0hnNN3"
          width="100%"
          style={{ height: '30%', minHeight: '500px' }}
          frameBorder="0"
        ></iframe>
      </div>
      
      <div className="column">
        <h3>{t('labels.quizMarks')}</h3>

        {/* English Quiz */}
        <h4>{t('labels.Quiz 1')}<Link to="/quiz-english">Attempt Now!</Link></h4>
        {quizScores.english.length > 0 ? (
          quizScores.english.map((quiz, index) => (
            <p key={index}>
              Score: {quiz.score} | Yes: {quiz.correctAnswers} | No: {quiz.wrongAnswers}
            </p>
          ))
        ) : (
          <p>No scores available</p>
        )}

        {/* Maths Quiz */}
        <h4>{t('labels.Quiz 2')}<Link to="/quiz-maths">Attempt Now!</Link></h4>
        {quizScores.maths.length > 0 ? (
          quizScores.maths.map((quiz, index) => (
            <p key={index}>
              Score: {quiz.score} | Yes: {quiz.correctAnswers} | No: {quiz.wrongAnswers}
            </p>
          ))
        ) : (
          <p>No scores available</p>
        )}

        {/* Science Quiz */}
        <h4>{t('labels.Quiz 3')}<Link to="/quiz-science">Attempt Now!</Link></h4>
        {quizScores.science.length > 0 ? (
          quizScores.science.map((quiz, index) => (
            <p key={index}>
              Score: {quiz.score} | Yes: {quiz.correctAnswers} | No: {quiz.wrongAnswers}
            </p>
          ))
        ) : (
          <p>No scores available</p>
        )}

        {/* Recommendation Button */}
        <button onClick={toggleRecommendations} className="recommendation-button">Recommendation</button>

        {/* Recommendation Message */}
        {recommendationMessage && (
          <p style={{ color: 'red' }}>{recommendationMessage}</p>
        )}

        {/* Display recommended topics */}
        {recommendedTopics.length > 0 && (
          <div>
            <h4>Recommended Topics:</h4>
            <ul>
              {recommendedTopics.map((topic, index) => (
                <li key={index}>{topic}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Career Recommendations */}
        {recommendedTopics.length > 0 && (
          <div>
            <h3>Career Recommendations:</h3>
            {getCareerRecommendations()}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
