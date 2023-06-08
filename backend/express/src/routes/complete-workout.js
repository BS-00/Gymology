const express = require('express');
const router = express.Router();
const queryDb = require('../databases/db.js').queryDb;


router.post('/complete-workout', async (req, res) => {
    const { uid, wid } = req.body;
	const query_res = await queryDb(`UPDATE Workouts SET completion_date=NOW() WHERE uid=${uid} AND wid=${wid};`);
	
	if(query_res === null ||
        query_res === undefined) {
		throw new Error("Error setting the completion time of the workout");
	}

    console.log(query_res);
    res.sendStatus(201);
});

module.exports = router;