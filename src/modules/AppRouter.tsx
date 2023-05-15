import React from 'react';
import { Routes, Route } from 'react-router-dom';

//Pages
import Home from '../pages/Home';
import CreateWorkout from '../pages/CreateWorkout';
import Login from '../pages/Login';
import Presets from '../pages/Presets';

function AppRouter() {
  return (
    <div className="page">
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/CreateWorkout" element={<CreateWorkout />}/>
        <Route path="/Login" element={<Login />}/>
        <Route path="/Presets" element={<Presets />}/>
      </Routes>
    </div>
  );
}

export default AppRouter;