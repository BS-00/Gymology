import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ButtonComponent from '../modules/Button';
import imageSrc from '../assets/Icon.png';
import '../themes.css';

function ButtonDisplay() {
  return (
    <>
      <div style={{ position: 'fixed', top: '17%', marginLeft: '30%' }}>
        <img src={imageSrc} alt="Image Description" style={{ width: '40%', height: '100%', borderRadius: '10px', marginLeft: '28%' }} />
        <h1 style={{ fontFamily: 'Eurostile Next Pro Bold', fontSize: '60px', position: 'fixed', top: '75%', marginLeft: '24%' }}>
          GYMOLOGY
        </h1>
      </div>
      <div style={{display:'flex',flexDirection:'column'}}>
        <div style={{ fontSize: '30px', marginTop: '230px', marginLeft: '270px', marginBottom: '50px', width: '300px' }}>
          <ButtonComponent destination="/CreateWorkout" text="Create Workout" />
        </div>
        <div style={{ fontSize: '30px', marginTop: '30px', marginLeft: '270px', marginBottom: '100px', width: '300px' }}>
          <ButtonComponent destination="/Presets" text="Presets" />
        </div>
      </div>
    </>
  );
}

function Home(): React.ReactElement {
  const storedTheme = localStorage.getItem('theme');
  const [theme, setTheme] = useState(storedTheme || 'light');
  const navigate = useNavigate();

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/Login');
  };

  return (
    <>
      <h1 className="display-5 text-center">Welcome to the Home Page!</h1>
      <ButtonDisplay />
      <div className={`App ${theme}`}>
        <button
          className="btn btn-primary position-absolute bottom-0 end-0"
          style={{ backgroundColor: 'black', borderColor: 'white' }}
          onClick={toggleTheme}
        >
          Toggle Theme
        </button>
      </div>
      <div>
        <button
          className="btn btn-primary position-absolute bottom-0 start-0"
          style={{ backgroundColor: 'black', borderColor: 'white' }}
          onClick={handleLogout}
        >
          Log out
        </button>
      </div>
    </>
  );
}

export default Home;
