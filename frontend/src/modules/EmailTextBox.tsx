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

export default EmailTextBox;
