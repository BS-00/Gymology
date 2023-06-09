const express = require('express');
const router = express.Router();
const queryDb = require('../databases/db.js').queryDb;

router.post('/history', async (req, res) => {
    const completion_histories = await queryDb(`SELECT * FROM History WHERE uid='${req.body.uid}';`);

    if (completion_histories === null || completion_histories === undefined) {
        throw new RangeError("Error getting completed workouts");
    }

    res.send({
        histories: completion_histories.map(h => {
            const completionDate = new Date(h.completion_date);
            const localCompletionDate = completionDate.toLocaleString(); // Convert to local time

            return {
                workout_name: h.workout_name,
                completion_date: localCompletionDate
            };
        })
    });
});

module.exports = router;
