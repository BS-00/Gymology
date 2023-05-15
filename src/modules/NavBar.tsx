import React from 'react';
import { Link } from 'react-router-dom';

function NavBar(): React.ReactElement {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark top-0">
      <ul className="flex-row justify-content-evenly container-fluid navbar-nav">
        <li className="nav-item">
          <Link to="/" className="nav-link">Home</Link>
        </li>
        <li className="nav-item">
          <Link to="/CreateWorkout" className="nav-link">Create Workout</Link>
        </li>
        <li className="nav-item">
          <Link to="/Login" className="nav-link">Login</Link>
        </li>
        <li className="nav-item">
          <Link to="/Presets" className="nav-link">Presets</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;