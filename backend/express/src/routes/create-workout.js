const express = require('express');
const router = express.Router();
const queryDb = require('../databases/db.js').queryDb;


router.post('/create-workout', async (req, res) => {
	const { uid, workout } = req.body;
	const query_res = await queryDb(`INSERT INTO Workouts(uid, name, days, completion_date) VALUES('${uid}', '${workout.name}', '${workout.days.join()}', NULL);`);
	
	if(query_res === null ||
	   query_res === undefined) {
		throw new RangeError("Error inserting workout into database");
	}

	//Inserts each exercise into the database once the workout has been inserted
	workout.exercises.forEach(exercise => {
		queryDb(`INSERT INTO Exercises(wid, name, sets, reps, weight) VALUES('${query_res.insertId}', '${exercise.name}', '${exercise.sets}', '${exercise.reps}', '${exercise.weight}');`);
	});

	res.sendStatus(201);
});

module.exports = router;