const express = require('express');
const router = express.Router();
const queryDb = require('../databases/db.js').queryDb;


router.post('/delete-workout', async (req, res) => {
    const { uid, wid } = req.body;
    const del_exercises_res = await queryDb(`DELETE FROM Exercises WHERE wid='${wid}';`);
    const del_workout_res = await queryDb(`DELETE FROM Workouts WHERE uid='${uid}' AND wid='${wid}';`);

    if(del_exercises_res === null ||
		del_exercises_res === undefined) {
		throw new Error("Error removing exercises");
    }

	if(del_workout_res === null ||
		del_workout_res === undefined) {
		throw new Error("Error removing workout");
	}

    res.sendStatus(201);
});

module.exports = router;
