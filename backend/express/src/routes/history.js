const express = require('express');
const router = express.Router();
const queryDb = require('../databases/db.js').queryDb;


router.post('/history', async (req, res) => {
	const user_completion_history = await queryDb(`SELECT name, completion_date FROM Workouts WHERE uid = ${req.body.uid} AND completion_date IS NOT NULL`);
	
	if(user_completion_history === null ||
        user_completion_history === undefined) {
		throw new RangeError("Error getting completed workouts");
	}

    console.log(user_completion_history);
    res.send({
        
    });
});

module.exports = router;
