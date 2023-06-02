import React, { useState } from 'react';

interface PasswordTextBoxProps {
  label: string;
}

const PasswordTextBox: React.FC<PasswordTextBoxProps> = ({ label }) => {
  const [password, setPassword] = useState('');
  const [isValid, setIsValid] = useState(true);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setIsValid(validatePassword(e.target.value));
  };

  const validatePassword = (password: string) => {
    // Validation logic
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

export default PasswordTextBox;
