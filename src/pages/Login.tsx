import React from 'react';
import { Button } from 'react-bootstrap';
import TextBox from '../modules/TextBox';

const Login = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '40vh' }}>
    <div>
      <h1>Login</h1>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <TextBox label="Email" />
        <TextBox label="Password" />
      </div>
      <Button variant="primary">Login</Button>
    </div>
  </div>
);

export default Login;
