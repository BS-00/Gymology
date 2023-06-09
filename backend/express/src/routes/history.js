const express = require('express');
const router = express.Router();
const queryDb = require('../databases/db.js').queryDb;

router.post('/history', async (req, res) => {
    const completion_histories = await queryDb(`SELECT * FROM History WHERE uid='${req.body.uid}';`);

    if (completion_histories === null || 
        completion_histories === undefined) {
        throw new Error("Error getting completed workouts");
    }

    let histories = [];
    for (history of completion_histories) {
        const localCompletionDate = new Date(history.completion_date).toLocaleString();
        histories.push({
            completion_date: localCompletionDate,
            workout_name: history.workout_name,
            exercises: await queryDb(`SELECT * FROM ExerciseHistory WHERE hid=${history.hid}`)
        });
    }

    res.send({ histories: histories });
});

module.exports = router;
