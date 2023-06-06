import React, { useState , useEffect } from 'react';
import ButtonComponent from '../modules/Button';
import imageSrc from '../modules/Icon.png';
//import themeChanger from 'themes.tsx'
import '../themes.css';




function ButtonDisplay() {
  return (
    <>
       <div style={{ position: 'fixed', top: '17%', marginLeft: '30%' }}>
        <img src={imageSrc} alt="Image Description" style={{ width: '40%', height: '100%', borderRadius: '10px', marginLeft: '28%' }} />
          <h1 style={{fontFamily: 'Eurostile Next Pro Bold',fontSize: '60px', position:'fixed',top: '75%', marginLeft: '24%'}}>
            GYMOLOGY
          </h1>
       </div>
      <div style={{fontSize:'30px',marginTop:'300px',marginLeft:'50px',marginBottom:'50px',width:'300px' }}>
        <ButtonComponent destination="/CreateWorkout" text="Create Workout"/>
      </div>
      <div style={{fontSize:'30px',marginTop:'50px',marginLeft:'50px',marginBottom:'100px',width:'300px'}}>
        <ButtonComponent destination="/Presets" text="Presets" />
      </div>
    </>
  );
}




function Home(): React.ReactElement {

  const [theme, setTheme] = useState('light');
  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <>
  

    <h1 className="display-5 text-center">Welcome to the Home Page!</h1>
    <ButtonDisplay/>
    <div className={`App ${theme}`}>
      <button className="btn btn-primary position-absolute bottom-0 end-0" style={{backgroundColor: 'black', borderColor: 'white'}} onClick={toggleTheme}>Toggle Theme</button>
    </div>
    </>
  );
}

export default Home;