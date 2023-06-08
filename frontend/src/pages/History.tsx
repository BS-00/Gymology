import React, { useState, useEffect } from 'react';
import Axios from 'axios';

async function getHistory() {
  if (sessionStorage.getItem('uid') === undefined ||
      sessionStorage.getItem('uid') === null) {
    throw new RangeError('Uid is Null or Undefined');
  }

  const req: { uid: number } = {
    uid: Number(sessionStorage.getItem('uid'))
  };

  let workoutData: { name: string; dateTime: string }[] = [];

  await Axios.post(process.env.REACT_APP_API_URL+'/history', req).then(
    (res) => {
      res.data.forEach((w_row: any) => {
        const workoutName = w_row.workout_name;
        const dateTime = w_row.date_time; // Assuming the backend provides a field named 'date_time'

        workoutData.push({ name: workoutName, dateTime: dateTime });
      });
    }
  );

  return workoutData;
}

function History(): React.ReactElement {
  const storedTheme = localStorage.getItem('theme');
  const [theme, setTheme] = useState(storedTheme || 'light');
  const [workoutData, setWorkoutData] = useState<{ name: string; dateTime: string }[]>([]);

  useEffect(() => {
    document.body.className = theme;

    // Call the getHistory function and set the retrieved workout data
    getHistory().then((data) => {
      setWorkoutData(data);
    });
  }, [theme]);

  return (
    <div className="container">
      <h1 className="display-3 mt-4 text-center">
        Workouts Completed
      </h1>
      <div className="border overflow" style={{ border: '1px solid white', overflow: 'auto' }}>
        {workoutData.length > 0 ? (
          <ul>
            {workoutData.map((workout) => (
              <li key={workout.name}>
                <h2>{workout.name}</h2>
                <p>Date and Time: {workout.dateTime}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>Loading workout data...</p>
        )}
      </div>
    </div>
  );
}

export default History;
