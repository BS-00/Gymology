const express = require('express');
const router = express.Router();
const queryDb = require('../databases/db.js').queryDb;


router.post('/delete-workout', async (req, res) => {
    const { uid, wid } = req.body;
    const del_exercises_res = await queryDb(`DELETE FROM Exercises WHERE wid='${wid}';`);
    const del_workout_res = await queryDb(`DELETE FROM Workouts WHERE uid='${uid}' AND wid='${wid}';`);

    if(query_res === null ||
       query_res === undefined) {
	throw new RangeError("Error removing workout");
    }

    res.sendStatus(201);
});

module.exports = router;
