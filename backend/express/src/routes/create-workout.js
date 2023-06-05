const express = require('express');
const router = express.Router();
const queryDb = require('../databases/db.js').queryDb;


/* REQ FORMAT
{
name: string
days: ['M', 'TU', 'W', 'TH', 'F', 'SA', 'SU'] (each of type string, only one of these options)
exercises: [] (each of type exercise)
}

exercise format
{
name: string
sets: positive int
reps: positive int
weight: positive int
}
*/

router.post('/create-workout', (req, res) => {
	queryDb(`INSERT INTO Workouts(uid, name, days) VALUES(${0, req.name, req.days})`,
			(rows, fields) => {
				console.log("ROWS: ", rows);
				console.log("FIELDS: ", fields);
			}
	);
	/*
	for (exercise in req.exercises) {
	queryDb("INSERT INTO Exercises(wid, sets, reps, weight)", );
	}
	*/
});

module.exports = router;
