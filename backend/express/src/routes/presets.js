
const express = require('express');
const router = express.Router();
const queryDb = require('../databases/db.js').queryDb;

async function get_exercises(wid) {
  let exercises = [];
  const exercise_rows = await queryDb(`SELECT * FROM Exercises WHERE wid = ${wid};`);
  exercise_rows.forEach(e_row => {
    exercises.push({
      exercise_id: e_row.eid,
      exercise_name: e_row.name,
      sets: e_row.sets,
      reps: e_row.reps,
      weight: e_row.weight
    });
  });

  return exercises;
}

async function get_workouts(uid) {
  let workouts = [];
  const workout_rows = await queryDb(`SELECT * FROM Workouts WHERE uid = ${uid};`);

  for(const w_row of workout_rows) {
    console.log(w_row.wid);
    const t = await get_exercises(w_row.wid);

    workouts.push({
      workout_id: w_row.wid,
      workout_name: w_row.name,
      days_of_the_week: w_row.days,
      exercises: t
    });
  }
  return workouts;
}

router.post('/get-workouts', async (req, res) => {
  const w = await get_workouts(req.body.uid);
  console.log(w);
  res.send(w);
});

module.exports = router;