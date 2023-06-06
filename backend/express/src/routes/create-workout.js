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
	const uid = 1;
	queryDb(`INSERT INTO Workouts(uid, name, days) VALUES('${uid}', '${req.body.name}', '${req.body.days.join()}');`,
			(rows) => {
				//Inserts each exercise into the database once the workout has been inserted
				const wid = rows.insertId;
				req.body.exercises.forEach(exercise => {
					queryDb(`INSERT INTO Exercises(wid, name, sets, reps, weight) VALUES('${wid}', '${exercise.name}', '${exercise.sets}', '${exercise.reps}', '${exercise.weight}');`,
							() => {}
					);
				});
			}
	);
});

module.exports = router;
