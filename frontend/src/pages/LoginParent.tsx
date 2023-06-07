import React, { useState } from 'react';

interface EmailTextBoxProps {
  label: string;
}

const EmailTextBox: React.FC<EmailTextBoxProps> = ({ label }) => {
  const [text, setText] = useState('');
  const [isValid, setIsValid] = useState(true);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
    setIsValid(validateEmail(e.target.value));
    console.log('EmailTextBox - text:', e.target.value);
    console.log('EmailTextBox - isValid:', isValid);
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div>
      <input
        type="text"
        value={text}
        onChange={handleTextChange}
        placeholder={label}
        style={{ border: isValid ? '1px solid #ccc' : '1px solid red' }}
      />
      {!isValid && <p style={{ color: 'red', margin: '4px 0', fontSize: '14px' }}>Invalid email format</p>}
    </div>
  );
};

interface PasswordTextBoxProps {
  label: string;
}

const PasswordTextBox: React.FC<PasswordTextBoxProps> = ({ label }) => {
  const [password, setPassword] = useState('');
  const [isValid, setIsValid] = useState(true);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setIsValid(validatePassword(e.target.value));
    console.log('PasswordTextBox - password:', e.target.value);
    console.log('PasswordTextBox - isValid:', isValid);
  };

  const validatePassword = (password: string) => {
    return password.length >= 6;
  };

  return (
    <div>
      <input
        type="password"
        value={password}
        onChange={handlePasswordChange}
        placeholder={label}
        style={{ border: isValid ? '1px solid #ccc' : '1px solid red' }}
      />
      {!isValid && (
        <p style={{ color: 'red', margin: '4px 0', fontSize: '14px' }}>
          Password should be at least 6 characters long
        </p>
      )}
    </div>
  );
};

const ParentComponent: React.FC = () => {
  return (
    <div>
      <EmailTextBox label="Email" />
      <div style={{ marginTop: '8px' }} />
      <PasswordTextBox label="Password" />
    </div>
  );
};

export default ParentComponent;
