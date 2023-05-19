import React from 'react';
import { Link } from 'react-router-dom';

interface ButtonComponentProps {
  destination: string;
  text: string;
}

const ButtonComponent: React.FC<ButtonComponentProps> = ({ destination, text }) => {
  return (
    <Link to={destination}>
      <button>
        {text}
      </button>
    </Link>
  );
};

export default ButtonComponent;
