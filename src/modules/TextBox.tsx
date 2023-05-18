import React, { useState } from 'react';

interface TextBoxProps {
  label: string;
}

const TextBox: React.FC<TextBoxProps> = ({ label }) => {
  const [text, setText] = useState('');

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  return (
    <div>
      <label>{label}:</label>
      <input
        type="text"
        value={text}
        onChange={handleTextChange}
        placeholder={`Enter ${label.toLowerCase()}`}
      />
    </div>
  );
};

export default TextBox;
