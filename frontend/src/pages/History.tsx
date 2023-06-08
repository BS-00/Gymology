import React, { ChangeEvent, useEffect, useState } from 'react';

function History(): React.ReactElement {
    const storedTheme = localStorage.getItem('theme');
        const [theme, setTheme] = useState(storedTheme || 'light');
  
        useEffect(() => {
          document.body.className = theme;
        }, [theme]);
    return (
     <h1>
        History Page
     </h1>
    );
  }
  
  export default History;