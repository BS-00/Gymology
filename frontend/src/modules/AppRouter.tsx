import React from 'react';
import { Routes, Route } from 'react-router-dom';

//Pages
import Home from '../pages/Home';
import CreateWorkout from '../pages/CreateWorkout';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp'
import Presets from '../pages/Presets';
import About from '../pages/About';

function AppRouter() {
  return (
    <div className="page">
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/CreateWorkout" element={<CreateWorkout />}/>
        <Route path="/Login" element={<Login />}/>
        <Route path="/SignUp" element={<SignUp />}/>
        <Route path="/Presets" element={<Presets />}/>
        <Route path="/About" element={<About />}/>
      </Routes>
    </div>
  );
}

export default AppRouter;