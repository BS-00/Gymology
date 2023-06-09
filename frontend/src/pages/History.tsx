import React, { useState, useEffect } from 'react';
import Axios from 'axios';

type History = {
	workout_name: string,
	completion_date: string
}

async function getHistory() {
	if (sessionStorage.getItem('uid') === undefined ||
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
    <div className="container">
      <h1 className="display-3 mt-4 text-center">
        Workouts Completed
      </h1>
      <div className="border overflow" style={{ border: '1px solid white', overflow: 'auto' }}>
        {histories.length > 0 ? (
          <ul>
            {histories.map((history, i) => {
				return (
					<li key={i}>
						<h2>{history.workout_name}</h2>
						<p>Date and Time: {history.completion_date}</p>
					</li>)
			})}
          </ul>
        ) : (
          <p>Loading workout data...</p>
        )}
      </div>
    </div>
  );
}

export default History;
