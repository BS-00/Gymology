import React from 'react';
import { Routes, Route } from 'react-router-dom';

//Pages
import Home from '../pages/Home';
import CreateWorkout from '../pages/CreateWorkout';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp'
import Workouts from '../pages/Workouts';
import About from '../pages/About';
import History from '../pages/History';

function AppRouter() {
  return (
    <div className="page">
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/CreateWorkout" element={<CreateWorkout />}/>
        <Route path="/Login" element={<Login />}/>
        <Route path="/SignUp" element={<SignUp />}/>
        <Route path="/Workouts" element={<Workouts />}/>
        <Route path="/About" element={<About />}/>
        <Route path="/History" element={<History />}/>
      </Routes>
    </div>
  );
}

export default AppRouter;