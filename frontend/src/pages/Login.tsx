import React from 'react';
import TextBox from '../modules/TextBox';

const Login = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
    <div>
      <h1>Login</h1>
      <div style={{ marginTop: '10px' }} />
      <TextBox label="Email" />
      <div style={{ marginTop: '10px' }} />
      <TextBox label="Password" />
      <button type="submit" className="my-2 btn btn-primary">Login</button>
    </div>
  </div>
);

export default Login;
