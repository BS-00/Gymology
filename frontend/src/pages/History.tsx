import React, { useState, useEffect } from 'react';
import axios from 'axios';

async function submituid() {
  type uidobject = {
    uid: number;
  };

  if (
    sessionStorage.getItem('uid') === undefined ||
    sessionStorage.getItem('uid') === null
  ) {
    throw new RangeError('NULL or Undefined uid; Check Login!');
  }

  const uid_holder: uidobject = {
    uid: Number(sessionStorage.getItem('uid'))
  };

  let workoutNames: string[] = [];

  await axios.post('http://localhost:3001/get-workouts', uid_holder).then(
    (res) => {
      res.data.forEach((w_row: any) => {
        workoutNames.push(w_row.workout_name);
      });
    }
  );

  return workoutNames;
}

function History(): React.ReactElement {
  const storedTheme = localStorage.getItem('theme');
  const [theme, setTheme] = useState(storedTheme || 'light');
  const [workoutNames, setWorkoutNames] = useState<string[]>([]);

  useEffect(() => {
    document.body.className = theme;

    // Call the submituid function and set the retrieved workout names
    submituid().then((names) => {
      setWorkoutNames(names);
    });
  }, [theme]);

  return (
    <div className="d-flex flex-column align-items-center">
      <h1>History Page</h1>
      {workoutNames.length > 0 ? (
        <ul>
          {workoutNames.map((name) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
      ) : (
        <p>Loading workout names...</p>
      )}
    </div>
  );
}

export default History;


//ill send the userID and the route will send me back all the workouts that are completed that match the user id
//