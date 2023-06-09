const express = require('express');
const router = express.Router();
const queryDb = require('../databases/db.js').queryDb;


router.post('/complete-workout', async (req, res) => {
    const { uid, wid } = req.body;
    const workout_name = (await queryDb(`SELECT name FROM Workouts WHERE uid=${uid} AND wid=${wid};`))[0].name;
    const query_res = await queryDb(`INSERT INTO History(uid, workout_name, completion_date) VALUES('${uid}', '${workout_name}', NOW());`);
	
    if(query_res === null ||
       query_res === undefined) {
	throw new Error("Error inserting workout into history");
    }

    res.sendStatus(201);
});

module.exports = router;
