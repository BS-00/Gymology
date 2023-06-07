import React, { ChangeEvent, useEffect, useState } from 'react';
import PresetsList from '../modules/PresetsList';

// Reminder to make Bootstrap enhancements here


function Presets(): React.ReactElement {

  const storedTheme = localStorage.getItem('theme');
  	const [theme, setTheme] = useState(storedTheme || 'light');

  	useEffect(() => {
    	document.body.className = theme;
  	}, [theme]);

  return (
    <div className="presets-page">
      <PresetsList />
    </div>
  );
}

export default Presets;