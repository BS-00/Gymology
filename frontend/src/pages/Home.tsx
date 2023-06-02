import React, { useState } from 'react';
import ButtonComponent from '../modules/Button';
//import DaysOfWeekSelector from '../modules/DaysOfWeekSelector';


function ButtonDisplay() {
  return (
    <>
      <div style={{fontSize:'30px',marginTop:'300px',marginLeft:'50px',marginBottom:'50px',width:'300px'}}>
        <ButtonComponent destination="/CreateWorkout" text="Create Workout" />
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