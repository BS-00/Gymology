import React, { useState, ChangeEvent } from 'react';

interface PasswordTextBoxProps {
  label: string;
  onChange: (value: string) => void;
}

const PasswordTextBox: React.FC<PasswordTextBoxProps> = ({ label, onChange }) => {
  const [password, setPassword] = useState('');
  const [isValid, setIsValid] = useState(true);

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    setIsValid(validatePassword(value));
    onChange(value);
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
