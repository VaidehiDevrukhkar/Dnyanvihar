import React, { useState } from 'react';
import './Login.css';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { Link, useNavigate } from 'react-router-dom';
import img from '../assets/images/rakhi4.jpeg';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize navigate

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      alert('Logged in successfully');
      navigate('/after-login'); // Redirect after successful login
    } catch (err) {
      setError('Failed to log in: ' + err.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <img src={img} alt="School" />
      </div>
      <div className="login-right">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required // Make it a required field
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required // Make it a required field
          />
          <button type="submit">Log In</button>
          {error && <p className="error-message">{error}</p>}
        </form>
        <p>
          Don't have an account? <Link to="/signup">Sign up here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
