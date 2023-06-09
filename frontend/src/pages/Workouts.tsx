import React, { ChangeEvent, useEffect, useState } from 'react';
import WorkoutsLists from '../modules/WorkoutsList';

// Reminder to make Bootstrap enhancements here


function Presets(): React.ReactElement {

  const storedTheme = localStorage.getItem('theme');
  	const [theme, setTheme] = useState(storedTheme || 'light');

  	useEffect(() => {
    	document.body.className = theme;
  	}, [theme]);

  return (
    <div className="presets-page h-100">
      <WorkoutsLists />
    </div>
  );
}

export default Presets;