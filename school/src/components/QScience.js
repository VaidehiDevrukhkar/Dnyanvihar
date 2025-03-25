import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const db = getFirestore();
const auth = getAuth();

// Science Quiz data
export const ScienceData = [
  {
    section: 'Science',
    questions: [
        {
          question: "I enjoy helping people solve their problems.",
          options: ['Yes', 'No'], // Here, 'Yes' is at index 0
          answer: 0,
        },
        {
          question: "I like volunteering and contributing to my community.",
          options: ['Yes', 'No'], // Here, 'Yes' is at index 0
          answer: 0,
        },
        {
          question: "I enjoy teaching and educating others.",
          options: ['Yes', 'No'], // Here, 'Yes' is at index 0
          answer: 0,
        },
        {
          question: "I enjoy taking on leadership roles and responsibilities.",
          options: ['Yes', 'No'], // Here, 'Yes' is at index 0
          answer: 0,
        },
        {
          question: "I like persuading and convincing others.",
          options: ['Yes', 'No'], // Here, 'Yes' is at index 0
          answer: 0,
        },
        {
          question: "I like organizing events and gatherings.",
          options: ['Yes', 'No'], // Here, 'Yes' is at index 0
          answer: 0,
        },
        {
          question: "I enjoy teamwork and collaborative projects.",
          options: ['Yes', 'No'], // Here, 'Yes' is at index 0
          answer: 0,
        },
        {
          question: "I like mentoring and supporting others in their learning.",
          options: ['Yes', 'No'], // Here, 'Yes' is at index 0
          answer: 0,
        },
        {
          question: "I enjoy public speaking and sharing ideas.",
          options: ['Yes', 'No'], // Here, 'Yes' is at index 0
          answer: 0,
        },
        {
          question: "I like to engage in critical thinking and problem-solving in group settings.",
          options: ['Yes', 'No'], // Here, 'Yes' is at index 0
          answer: 0,
        },
            
    ],
  },
];

const QScience = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const navigate = useNavigate();

  const user = auth.currentUser;
  const userEmail = user ? user.email : null; // Get the user's email

  const handleAnswerOptionClick = (index) => {
    setSelectedAnswer(index); // Set selected answer
    if (index === ScienceData[0].questions[currentQuestion].answer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < ScienceData[0].questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null); // Reset selected answer for the next question
    } else {
      setShowScore(true);
      saveQuizResults();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(null); // Reset selected answer for the previous question
    }
  };

  const saveQuizResults = async () => {
    if (!userEmail) {
      console.error('User not logged in');
      return;
    }

    try {
      const quizRef = doc(db, 'QuizResults', userEmail);
      const docSnap = await getDoc(quizRef); // Retrieve existing data

      const dataToStore = {
        section: 'Science',
        score: score,
        totalQuestions: ScienceData[0].questions.length,
        correctAnswers: score,
        wrongAnswers: ScienceData[0].questions.length - score,
        submittedAt: new Date(),
      };

      if (docSnap.exists()) {
        const existingResults = docSnap.data().results || [];
        const index = existingResults.findIndex((result) => result.section === 'Science');

        if (index > -1) {
          existingResults[index] = dataToStore;
        } else {
          existingResults.push(dataToStore);
        }

        await setDoc(quizRef, { results: existingResults }, { merge: true });
      } else {
        await setDoc(quizRef, { results: [dataToStore] });
      }

      console.log('Quiz results stored successfully');
    } catch (error) {
      console.error('Error storing quiz data:', error);
    }
  };

  // Inline CSS for styling
  const styles = {
    container: {
      maxWidth: '600px',
      margin: '0 auto',
      textAlign: 'center',
      padding: '20px',
      backgroundColor: '#f4f4f4',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    question: {
      fontSize: '20px',
      marginBottom: '20px',
      fontWeight: 'bold',
    },
    options: {
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      marginBottom: '20px',
    },
    button: {
      padding: '10px 20px',
      backgroundColor: '#007BFF',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    },
    selectedButton: { // Style for selected button
      backgroundColor: '#ffa500',
    },
    navButtons: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '20px',
    },
    resultPage: {
      textAlign: 'center',
    },
    score: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#28a745',
    },
    disabledButton: {
      padding: '10px 20px',
      backgroundColor: '#c0c0c0',
      color: '#666',
      border: 'none',
      borderRadius: '5px',
      cursor: 'not-allowed',
    },
  };

  return (
    <div style={styles.container}>
      <h1>Social and Leadership Skills</h1>
      {showScore ? (
        <div style={styles.resultPage}>
          <h2>Quiz Completed</h2>
          <p style={styles.score}>
          </p>
          <button style={styles.button} onClick={() => navigate('/dashboard')}>
            Go to Dashboard
          </button>
        </div>
      ) : (
        <div>
          <h2 style={styles.question}>
            {ScienceData[0].questions[currentQuestion].question}
          </h2>
          <div style={styles.options}>
            {ScienceData[0].questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                style={selectedAnswer === index ? { ...styles.button, ...styles.selectedButton } : styles.button} // Change color if selected
                onClick={() => handleAnswerOptionClick(index)}
              >
                {option}
              </button>
            ))}
          </div>

          <div style={styles.navButtons}>
            <button
              onClick={handlePrevious}
              style={currentQuestion === 0 ? styles.disabledButton : styles.button}
              disabled={currentQuestion === 0}
            >
              Previous
            </button>
            <button onClick={handleNext} style={styles.button}>
              {currentQuestion < ScienceData[0].questions.length - 1
                ? 'Next'
                : 'Submit'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QScience;
