//import EmailTextBox from '../modules/EmailTextBox';
//import PasswordTextBox from '../modules/PasswordTextBox';
import React from 'react';
import ParentComponent from './LoginParent';

import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '200px' }}>
        <h1 style={{ textAlign: 'center' }}>Login</h1>
        <ParentComponent />
        <Link to="/" className="my-2 btn btn-primary" style={{ width: '100%'}}>
          Login
        </Link>
        <div style={{ marginTop: '8px', textAlign: 'center' }}>
          <span>Don't have an account? </span>
          <Link to="/SignUp">Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
