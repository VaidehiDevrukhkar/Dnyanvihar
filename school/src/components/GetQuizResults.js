import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const db = getFirestore();
const auth = getAuth();

const getQuizResults = async () => {
  try {
    const user = auth.currentUser;
    const userId = user ? user.uid : null;
    const quizRef = doc(db, 'QuizResults', userId);
    const quizDoc = await getDoc(quizRef);
    if (quizDoc.exists()) {
      const quizResults = quizDoc.data();
      console.log('Quiz results:', quizResults);
      return quizResults;
    } else {
      console.log('No quiz results found!');
      return null;
    }
  } catch (error) {
    console.error('Error retrieving quiz results:', error);
    return null;
  }
};

export default getQuizResults;