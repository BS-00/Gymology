import React, { useState, useEffect } from 'react';
import Axios from 'axios';

type Exercises = {
  name: string,
  sets: number,
  reps: number,
  weight: number
}

type History = {
	completion_date: string,
  workout_name: string,
  exercises: Array<Exercises>
}

async function getHistory() {
	if(sessionStorage.getItem('uid') === undefined ||
		sessionStorage.getItem('uid') === null) {
		throw new RangeError('Uid is Null or Undefined');
	}
	const uid = Number(sessionStorage.getItem('uid'));
	return (await Axios.post(process.env.REACT_APP_API_URL+'/history', { uid: uid })).data.histories;
}

function History(): React.ReactElement {
	const storedTheme = localStorage.getItem('theme');
	const [theme, setTheme] = useState(storedTheme || 'light');
	const [histories, setHistories] = useState<Array<History>>([]);

	useEffect(() => {
		document.body.className = theme;
	}, [theme]);
	
	useEffect(() => {
		getHistory().then(histories => setHistories(histories));
	}, []);

  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-lg-6 mt-5">
          <h1 className="display-4 text-center mb-4">Workouts Completed</h1>
          <div className="card border-0 shadow">
            <div
              className="overflow-auto"
              style={{ maxHeight: '400px', background: 'transparent' }}
              id="historyContainer"
            >
              <ul className="list-group list-group-flush">
                {histories.length > 0 ? (
                  histories.map((history, i) => (
                    <li
                      className="list-group-item bg-transparent"
                      style={{ background: 'transparent' }}
                      key={i}
                    >
                      <h2 className="h5">{history.workout_name}</h2>
                      <p className="mb-0">Date and Time: {history.completion_date}</p>
                      {history.exercises.map(exercise => {
                        return (<div>
                          <p className="text">{exercise.name}</p>
                          <p className="text">{exercise.sets}</p>
                          <p className="text">{exercise.reps}</p>
                          <p className="text">{exercise.weight}</p>
                        </div>);
                      })}
                    </li>
                  ))
                ) : (
                  <li className="list-group-item">Loading workout data...</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default History;
