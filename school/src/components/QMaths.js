import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const db = getFirestore();
const auth = getAuth();

// Quiz data
export const MathsData = [
  {
    section: "Maths",
    questions: [
      {
        question: "I enjoy drawing, painting, or creating visual art.",
        options: ['Yes', 'NO'],
        answer: 0,
      },
      {
        question: "I like expressing myself through music or dance.",
        options: ['Yes', 'NO'],
        answer: 0,
      },
      {
        question: "I like writing poetry or stories.",
        options: ['Yes', 'NO'],
        answer: 0,
      },
      {
        question: "I enjoy using technology to enhance creativity.",
        options: ['Yes', 'NO'],
        answer: 0,
      },
      {
        question: "I like to experiment with different art forms and techniques.",
        options: ['Yes', 'NO'],
        answer: 0,
      },
      {
        question: "I enjoy designing and building projects from scratch.",
        options: ['Yes', 'NO'],
        answer: 0,
      },
      {
        question: "I like conducting creative workshops or classes.",
        options: ['Yes', 'NO'],
        answer: 0,
      },
      {
        question: "I enjoy collaborating with others on creative projects.",
        options: ['Yes', 'NO'],
        answer: 0,
      },
      {
        question: "I like to share my creative work with others.",
        options: ['Yes', 'NO'],
        answer: 0,
      },
      {
        question: "I enjoy exploring new ideas and innovations in art.",
        options: ['Yes', 'NO'],
        answer: 0,
      }
    ],
  },
];

const QMaths = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null); // Initialize selectedAnswer
  const navigate = useNavigate();

  const user = auth.currentUser;
  const userEmail = user ? user.email : null; // Get the user's email

  const handleAnswerOptionClick = (index) => {
    setSelectedAnswer(index);
    if (index === MathsData[0].questions[currentQuestion].answer) {
      setScore(score + 1);
    }
  };

  const handleNext = async () => {
    if (currentQuestion < MathsData[0].questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null); // Reset selected answer for the next question
    } else {
      setShowScore(true);
      await saveQuizResults(); // Ensure results are saved before showing the score
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
        section: 'Maths',
        score: score,
        totalQuestions: MathsData[0].questions.length,
        correctAnswers: score,
        wrongAnswers: MathsData[0].questions.length - score,
        submittedAt: new Date(),
      };

      if (docSnap.exists()) {
        const existingResults = docSnap.data().results || [];
        const index = existingResults.findIndex((result) => result.section === 'Maths');

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
      <h1>Arts and Humanities</h1>
      {showScore ? (
        <div style={styles.resultPage}>
          <h2>Quiz Completed</h2>
          <p style={styles.score}>
            Thank you for Attempting the quiz!
          </p>
          <button style={styles.button} onClick={() => navigate('/dashboard')}>
            Go to Dashboard
          </button>
        </div>
      ) : (
        <div>
          <h2 style={styles.question}>
            {MathsData[0].questions[currentQuestion].question}
          </h2>
          <div style={styles.options}>
            {MathsData[0].questions[currentQuestion].options.map((option, index) => (
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
              {currentQuestion < MathsData[0].questions.length - 1
                ? 'Next'
                : 'Submit'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QMaths;
