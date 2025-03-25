import React, { useState } from 'react';
import { QuizData } from './QuizData';
import '../styles/Quiz.css'; 
import ResultPage from '../components/ResultPage';
import { app } from '../firebase';  // Firebase app setup
import { getFirestore, doc, setDoc } from 'firebase/firestore';  // Firestore methods
import { getAuth } from 'firebase/auth'; 

const db = getFirestore(app);  
const auth = getAuth(app);      // Firebase Auth for user info

const Quiz = () => {
    const [currentSection, setCurrentSection] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);

    const user = auth.currentUser;  // Get current user info
    const userId = user ? user.uid : null;
    const username = user ? user.displayName : 'Guest';

    // Handle answer click and scoring
    const handleAnswerOptionClick = (index) => {
        if (index === QuizData[currentSection].questions[currentQuestion].answer) {
            setScore(score + 1);
        }

        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < QuizData[currentSection].questions.length) {
            setCurrentQuestion(nextQuestion);
        } else {
            setShowScore(true);
            saveQuizResults();  // Save results after quiz
        }
    };

    const handleNextQuestion = () => {
        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < QuizData[currentSection].questions.length) {
            setCurrentQuestion(nextQuestion);
        } else {
            setShowScore(true);
            saveQuizResults(); 
        }
    };

    const handleNextSection = () => {
        if (currentSection < QuizData.length - 1) {
            setCurrentSection(currentSection + 1);
            setCurrentQuestion(0);
            setScore(0); 
            setShowScore(false);
        } else {
            alert('You have completed all sections!');
        }
    };

    const saveQuizResults = async () => {
        try {
            const quizRef = doc(db, 'Quiz', userId);  // Reference to Firestore doc

            const dataToStore = {
                username: username,  
                userId: userId,      
                score: score,        
                section: QuizData[currentSection].section,  // Store section of the quiz
                totalQuestions: QuizData[currentSection].questions.length,
                correctAnswers: score,
                wrongAnswers: QuizData[currentSection].questions.length - score,
                submittedAt: new Date()  // Timestamp
            };
            
            // Store the quiz result in Firestore
            await setDoc(quizRef, dataToStore, { merge: true }); 
            console.log('Quiz results stored successfully');
        } catch (error) {
            console.error('Error storing quiz data:', error);
        }
    };

    return (
        <div className="quiz-container">
            {showScore ? (
                <ResultPage 
                    totalQuestions={QuizData[currentSection].questions.length}
                    totalScore={score * 10} 
                    correctAnswers={score}
                    wrongAnswers={QuizData[currentSection].questions.length - score}
                    percentage={(score / QuizData[currentSection].questions.length) * 100}
                    nextSection={handleNextSection}
                />
            ) : (
                <>
                    <header className="quiz-header">
                        <h1>{QuizData[currentSection].section} Quiz</h1>
                    </header>
                    <div className="question-section">
                        <div className="question-count">
                            <span>Question {currentQuestion + 1}</span>/{QuizData[currentSection].questions.length}
                        </div>
                        <div className="question-text">{QuizData[currentSection].questions[currentQuestion].question}</div>
                    </div>
                    <div className="answer-section">
                        {QuizData[currentSection].questions[currentQuestion].options.map((option, index) => (
                            <button className="answer-button" onClick={() => handleAnswerOptionClick(index)} key={index}>
                                {option}
                            </button>
                        ))}
                    </div>
                    <button className="next-button" onClick={handleNextQuestion}>
                        Next Question
                    </button>
                </>
            )}
        </div>
    );
};

export default Quiz;
