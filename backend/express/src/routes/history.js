const express = require('express');
const router = express.Router();
const queryDb = require('../databases/db.js').queryDb;


router.post('/history', async (req, res) => {
    const completion_histories = await queryDb(`SELECT * FROM History WHERE uid='${req.body.uid}';`);
	
    if(completion_histories === null ||
       completion_histories === undefined) {
		throw new RangeError("Error getting completed workouts");
    }

    res.send({
		histories: completion_histories.map(h => {
			return {
				workout_name: h.workout_name,
				completion_date: h.completion_date
			}
		})
    });
});

module.exports = router;
