import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import EmailTextBox from '../modules/EmailTextBox';
import PasswordTextBox from '../modules/PasswordTextBox';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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

    console.log('Logging in with email:', email, 'and password:', password);
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
        >
          Login
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
