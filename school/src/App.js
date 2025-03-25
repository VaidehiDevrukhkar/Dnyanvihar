import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import NavbarAfterLogin from './components/NavbarAfterLogin';
import About from './components/AboutUs';
import Admission from './components/Admission';
import Academics from './components/Academics';
import Activities from './components/Activities';
import Footer from './components/Footer'; 
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Rakhi from './components/rakhi'; 
import Adivasi from './components/adivasi';
import Ecoclub from './components/ecoclub'; 
import Lib from './components/lib';
import Comp from './components/comp';
import Cult from './components/cult'; 
import Independence from './components/independence';
import Sports from './components/Sports'; 
import Dashboard from './components/Dashboard';
import NotFound from './components/NotFound'; 
import Quiz from './components/Quiz';
import './i18n';
import './App.css';
import QEnglish from './components/QEnglish';
import QMaths from './components/QMaths';
import QScience from './components/QScience';
import QSocialScience from './components/QSocialScience';
import ResultPage from './components/ResultPage'; // Import the ResultPage component
import useAuth from './hooks/useAuth'; // Make sure this matches the export
import Smartboard from './components/smartboard';

function App() {
  const { user } = useAuth();
  
  return (
    <Router>
      <div className="App">
      {/* <Navbar /> */}
      {user ? <NavbarAfterLogin /> : <Navbar />}
      
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/admission" element={<Admission />} />
          <Route path="/academics" element={<Academics />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/sports" element={<Sports />} /> 
          <Route path="/rakhi" element={<Rakhi />} /> 
          <Route path="/adivasi" element={<Adivasi />} />
          <Route path="/ecoclub" element={<Ecoclub />} /> 
          <Route path="/library" element={<Lib />} />
          <Route path="/smartboard" element={<Smartboard />} /> {/* Smartboard route */}
          <Route path="/comp" element={<Comp />} />
          <Route path="/cult" element={<Cult />} />
          <Route path="/independence" element={<Independence />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/Quiz" element={<Quiz />} />
          <Route path="/quiz-english" element={<QEnglish />} />
          <Route path="/quiz-maths" element={<QMaths />} />
          <Route path="/quiz-science" element={<QScience />} />
          <Route path="/quiz-socialscience" element={<QSocialScience />} />

          
          {/* Add the ResultPage route */}
          <Route 
            path="/result" 
            element={<ResultPage totalQuestions={10} correctAnswers={7} wrongAnswers={3} percentage={70} />} 
          />

          {/* Fallback route for 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer /> 
      </div>
    </Router>
  );
}
export default App;