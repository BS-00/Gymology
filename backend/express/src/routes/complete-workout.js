const express = require('express');
const router = express.Router();
const queryDb = require('../databases/db.js').queryDb;


router.post('/complete-workout', async (req, res) => {
    const { uid, wid } = req.body;
    const workout = (await queryDb(`SELECT * FROM Workouts WHERE uid='${uid}' AND wid='${wid}';`))[0];
    const exercises = (await queryDb(`SELECT * FROM Exercises WHERE wid='${wid}';`));
    const insert_history_res = await queryDb(`INSERT INTO History(uid, completion_date, workout_name) VALUES('${uid}', NOW(), '${workout.name}');`);

    exercises.forEach(exercise => {
        queryDb(`INSERT INTO ExerciseHistory(hid, name, sets, reps, weight) VALUES('${insert_history_res.insertId}', '${exercise.name}', '${exercise.sets}', '${exercise.reps}', '${exercise.weight}');`);
    });

    res.sendStatus(201);
});

module.exports = router;
