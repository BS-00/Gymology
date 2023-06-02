import React from 'react';
import EmailTextBox from '../modules/EmailTextBox';
import PasswordTextBox from '../modules/PasswordTextBox';

const SignUp = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '200px' }}>
      <h1 style={{ textAlign: 'center' }}>Sign Up</h1>
      <EmailTextBox label="Email" />
      <div style={{ marginTop: '8px' }} />
      <PasswordTextBox label="Password" />
      <div style={{ marginTop: '8px' }} />
      <PasswordTextBox label="Confirm Password" />
      <button type="submit" className="my-2 btn btn-primary" style={{ width: '100%' }}>
        Sign Up
      </button>
      <div style={{ marginTop: '8px', textAlign: 'center' }}>
        <span>Already have an account? </span>
        <a href="Login">Login</a>
      </div>
    </div>
  </div>
);

export default SignUp;
