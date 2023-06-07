import React from 'react';
import { Link } from 'react-router-dom';

interface ButtonComponentProps {
  destination: string;
  text: string;
}

const ButtonComponent: React.FC<ButtonComponentProps> = ({ destination, text }) => {
  return (
    <Link to={destination}>
      <button className="btn btn-primary btn-lg p-4 mx-6 " style ={{width: '100%'}}>
        {text}
      </button>
    </Link>
  );
};

export default ButtonComponent;
