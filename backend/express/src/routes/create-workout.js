const express = require('express');
const router = express.Router();
const queryDb = require('../databases/db.js').queryDb;


router.post('/create-workout', (req, res) => {
	const { uid, workout } = req.body;

	queryDb(`INSERT INTO Workouts(uid, name, days) VALUES('${uid}', '${workout.name}', '${workout.days.join()}');`,
			(rows) => {
				//Inserts each exercise into the database once the workout has been inserted
				workout.exercises.forEach(exercise => {
					queryDb(`INSERT INTO Exercises(wid, name, sets, reps, weight) VALUES('${rows.insertId}', '${exercise.name}', '${exercise.sets}', '${exercise.reps}', '${exercise.weight}');`,
							() => {}
					);
				});
			}
	);
});

module.exports = router;
