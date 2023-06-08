import React from 'react';
import { Link } from 'react-router-dom';
import imageSrc from '../assets/Icon.png';

function NavBar(): React.ReactElement {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark top-0">
      <ul className="flex-row justify-content-evenly container-fluid navbar-nav">
        <li className="nav-item" style={{ display: 'flex', alignItems: 'center' }}>
          <Link to="/" className="nav-link"><img src={imageSrc} alt="Description of the image" style={{ width: '50px', marginRight: '10px' }} /></Link>
        </li>
        <li className="nav-item">
          <Link to="/" className="nav-link">Home</Link>
        </li>
        <li className="nav-item">
          <Link to="/CreateWorkout" className="nav-link">Create Workout</Link>
        </li>
        <li className="nav-item">
          <Link to="/Presets" className="nav-link">Workouts</Link>
        </li>
        <li className="nav-item">
          <Link to="/History" className="nav-link">History</Link>
        </li>
        <li className="nav-item">
          <Link to="/About" className="nav-link">About</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
