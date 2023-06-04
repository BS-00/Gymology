import React, { useState } from 'react';
import ButtonComponent from '../modules/Button';
//import imageSrc from '../modules/Logo.png'
//import './themes.css'
import imageSrc from '../modules/Icon.png'



function ButtonDisplay() {
  return (
    <>
       <div style={{ position: 'fixed', top: '13%', marginLeft: '30%' }}>
        <img src={imageSrc} alt="Image Description" style={{ width: '140%', height: 'auto', borderRadius: '10px' }} />
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
  return (
    
    <>
    <h1 className="display-5 text-center">Welcome to the Home Page!</h1>
    <ButtonDisplay/>
    </>
  );
}

export default Home;