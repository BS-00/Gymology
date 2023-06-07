import React, { ChangeEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import EmailTextBox from '../modules/EmailTextBox';
import PasswordTextBox from '../modules/PasswordTextBox';

const SignUp = () => {

  const storedTheme = localStorage.getItem('theme');
  	const [theme, setTheme] = useState(storedTheme || 'light');

  	useEffect(() => {
    	document.body.className = theme;
  	}, [theme]);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (value: string) => {
    setEmail(value);
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
  };

  const handleSignUp = () => {
    if (email.trim() === '' || password.trim() === '') {
      window.alert('Email and Password are required.');
      return;
    }

    if (!validateEmail(email)) {
      window.alert('Invalid email format.');
      return;
    }

    if (!validatePassword(password)) {
      window.alert('Password must be at least 6 characters long.');
      return;
    }

    setIsLoading(true);
    axios
      .post('http://localhost:3001/signup', { email, password })
      .then((response) => {
        console.log('User signed up successfully');
        navigate('/Login');
      })
      .catch((error) => {
        console.error('Failed to sign up:', error);
        window.alert('Sign up failed. Please try again.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 6;
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '200px' }}>
        <h1 style={{ textAlign: 'center' }}>Sign Up</h1>
        <EmailTextBox label="Email" onChange={handleEmailChange} />
        <div style={{ marginTop: '8px' }} />
        <PasswordTextBox label="Password" onChange={handlePasswordChange} />
        <button
          onClick={handleSignUp}
          className="my-2 btn btn-primary"
          style={{ width: '100%', cursor: isLoading ? 'not-allowed' : 'pointer' }}
          disabled={isLoading}
        >
          {isLoading ? 'Signing Up...' : 'Sign Up'}
        </button>
        <div style={{ marginTop: '8px', textAlign: 'center' }}>
          <span>Already have an account? </span>
          <Link to="/Login">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
