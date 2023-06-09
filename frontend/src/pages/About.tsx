import React, { ChangeEvent, useEffect, useState } from 'react';

function About(): React.ReactElement {
  const storedTheme = localStorage.getItem('theme');
  	const [theme, setTheme] = useState(storedTheme || 'light');

  	useEffect(() => {
    	document.body.className = theme;
  	}, [theme]);
  return (
    <div className="container d-flex flex-column justify-content-between align-items-center" style={{ minHeight: '93vh' }}>
      <h1 className="display-3">About Gymology</h1>
      <div style={{ textAlign: 'center' }}>
        <p className="fs-3">
          Gymology is your ultimate fitness companion! Here you can find the tools to create any kind of workout plan that is suited for both beginners and certified gym bros.
        </p>
        <p className="fs-3">
          Our mission is to empower individuals to better organize and record their workout routines. With Gymology, you can keep a scientific log of your gym sessions.
        </p>
        <p className="fs-3">
          Join Gymology today to embrace a fitness lifestyle with science!
        </p>
      </div>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <p className="fs-6">
          Made by Brandon Skarka, Dawit Taddese, Jan Kasen, and Jesus Muniz Garcia.
        </p>
        <p className="fs-6">
          UCLA CS 35L Software Construction Project. Spring 2023.
        </p>
      </div>
    </div>
  );
}

export default About;
