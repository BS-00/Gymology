import React from 'react';
import { Button } from 'react-bootstrap';
import TextBox from '../modules/TextBox';

const Login = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
    <div>
      <h1>Login</h1>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <TextBox label="Email" />
        <div style={{ marginTop: '10px' }} />
        <TextBox label="Password" />
      </div>
      <div style={{ marginTop: '10px' }} />
      <Button variant="primary">Login</Button>
    </div>
  </div>
);

export default Login;
