import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import EmailTextBox from '../modules/EmailTextBox';
import PasswordTextBox from '../modules/PasswordTextBox';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem('isLoggedIn')) {
      navigate('/');
    }
  }, [navigate]);

  const handleEmailChange = (value: string) => {
    setEmail(value);
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
  };

  const handleLogin = () => {
    if (email.trim() === '' || password.trim() === '') {
      window.alert('Email and Password are required.');
      return;
    }

    if (!validateEmail(email) || !validatePassword(password)) {
      window.alert('Please enter valid email and password.');
      return;
    }

    setIsLoading(true);
    axios
      .post('http://localhost:3001/login', { email, password })
      .then((response) => {
        const { uid } = response.data; 
        console.log('Login successful. User ID:', uid);
        sessionStorage.setItem('isLoggedIn', 'true'); 
        sessionStorage.setItem('uid', uid);
        navigate('/');
      })
      .catch((error) => {
        console.error('Login failed:', error);
        window.alert('Login failed. Please try again.');
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
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '200px' }}>
        <h1 style={{ textAlign: 'center' }}>Login</h1>
        <EmailTextBox label="Email" onChange={handleEmailChange} />
        <div style={{ marginTop: '8px' }} />
        <PasswordTextBox label="Password" onChange={handlePasswordChange} />
        <button
          onClick={handleLogin}
          className="my-2 btn btn-primary"
          style={{ width: '100%' }}
          disabled={isLoading}
        >
          {isLoading ? 'Logging In...' : 'Login'}
        </button>
        <div style={{ marginTop: '8px', textAlign: 'center' }}>
          <span>Don't have an account? </span>
          <Link to="/SignUp">Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
