import React, { useState } from 'react';
import './Signup.css';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import img from '../assets/images/rakhi4.jpeg';
import { updateProfile } from 'firebase/auth'; // Import updateProfile

const Signup = () => {
  const [username, setUsername] = useState(''); // New state for username
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize navigate

  // Password validation function
  const isPasswordStrong = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    return password.length >= minLength && hasUpperCase && hasLowerCase && hasDigit && hasSpecialChar;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    
    // Check if the password is strong
    if (!isPasswordStrong(password)) {
      setError('Password must be at least 8 characters long, and include uppercase, lowercase, a number, and a special character.');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update user's profile with the username
      await updateProfile(user, {
        displayName: username,
      });

      alert('Signed up successfully');
      navigate('/login'); // Navigate to login after signup
    } catch (err) {
      setError('Failed to sign up: ' + err.message);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-left">
        <img src={img} alt="School" />
      </div>
      <div className="signup-right">
        <h2>Sign Up</h2>
        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Sign Up</button>
          {error && <p className="error-message">{error}</p>}
        </form>
        <p>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
