import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const db = getFirestore();
const auth = getAuth();

// Quiz data
export const SocialScienceData = [
  {
    section: "Social Science",
    questions: [
      {
        question: "Who was the first President of India?",
        options: ["Mahatma Gandhi", "Jawaharlal Nehru", "Dr. Rajendra Prasad", "Subhas Chandra Bose"],
        answer: 2,
      },
      {
        question: "Which movement was started by Mahatma Gandhi in 1942?",
        options: ["Non-cooperation Movement", "Quit India Movement", "Dandi March", "Civil Disobedience Movement"],
        answer: 1,
      },
      {
        question: "In which year did India gain independence?",
        options: ["1945", "1946", "1947", "1948"],
        answer: 2,
      },
      // ... other questions
    ],
  },
];

const QSocialScience = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const navigate = useNavigate();

  const user = auth.currentUser;
  const userEmail = user ? user.email : null; // Get the user's email

  const handleAnswerOptionClick = (index) => {
    if (index === SocialScienceData[0].questions[currentQuestion].answer) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < SocialScienceData[0].questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
      saveQuizResults(); // Call to save results when all questions are answered
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
        section: 'Social Science',
        score: score,
        totalQuestions: SocialScienceData[0].questions.length,
        correctAnswers: score,
        wrongAnswers: SocialScienceData[0].questions.length - score,
        submittedAt: new Date(),
      };

      if (docSnap.exists()) {
        // If document exists, check for existing results for Social Science
        const existingResults = docSnap.data().results || [];
        const index = existingResults.findIndex((result) => result.section === 'Social Science');

        if (index > -1) {
          // Update existing result
          existingResults[index] = dataToStore;
        } else {
          // Add new result
          existingResults.push(dataToStore);
        }

        await setDoc(quizRef, { results: existingResults }, { merge: true });
      } else {
        // Create a new document with results
        await setDoc(quizRef, { results: [dataToStore] });
      }

      console.log('Quiz results stored successfully');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error storing quiz data:', error);
    }
  };

  return (
    <div>
      <h1>Social Science Quiz</h1>
      {showScore ? (
        <div>
          <h2>Quiz Completed</h2>
          <p>You scored {score} out of {SocialScienceData[0].questions.length}.</p>
          <button onClick={() => navigate('/dashboard')}>Go to Dashboard</button>
        </div>
      ) : (
        <div>
          <h2>{SocialScienceData[0].questions[currentQuestion].question}</h2>
          {SocialScienceData[0].questions[currentQuestion].options.map((option, index) => (
            <button key={index} onClick={() => handleAnswerOptionClick(index)}>
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default QSocialScience;
