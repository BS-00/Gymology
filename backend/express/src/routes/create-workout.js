const express = require('express');
const router = express.Router();
const queryDb = require('../databases/db.js').queryDb;


/* REQ FORMAT
{
	uid: number
	workout: workout type
}

workout format
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
	queryDb(`INSERT INTO Workouts(uid, name, days) VALUES('${req.body.uid}', '${req.body.workout.name}', '${req.body.workout.days.join()}');`,
			(rows) => {
				//Inserts each exercise into the database once the workout has been inserted
				req.body.workout.exercises.forEach(exercise => {
					queryDb(`INSERT INTO Exercises(wid, name, sets, reps, weight) VALUES('${rows.insertId}', '${exercise.name}', '${exercise.sets}', '${exercise.reps}', '${exercise.weight}');`,
							() => {}
					);
				});
			}
	);
});

module.exports = router;
