import React from 'react';
import { Routes, Route } from 'react-router-dom';

//Pages
import Home from '../pages/Home';
import CreateWorkout from '../pages/CreateWorkout';

function AppRouter() {
  return (
    <div className="page">
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/CreateWorkout" element={<CreateWorkout />}/>
      </Routes>
    </div>
  );
}

export default AppRouter;