
const express = require('express');
const router = express.Router();
const queryDb = require('../databases/db.js').queryDb;


/* REQ FORMAT
{
name: string
days: ['M', 'TU', 'W', 'TH', 'F', 'SA', 'SU'] (each of type string, only one of these options)
exercises: [] (each of type exercise)
}

exercise format
{
name: string
sets: positive int
reps: positive int
weight: positive int
}
*/

/*
async function test(req, res) {
    //console.log(req.body);

    //let mult_workouts = [];

    queryDb(`SELECT * FROM Workouts WHERE uid = ${req.body.uid};`, //AND LOWER(name) LIKE CONCAT('%', ${req.body.search}, '%')
    async (workout_rows) => {
        //console.log(workout_rows);

        let mult_workouts = [];

        await workout_rows.forEach(async (w_row) => {

            let mult_exercises = [];

            await queryDb(`SELECT * FROM Exercises WHERE wid = ${w_row.wid};`,
            async (exercise_rows) => {
                //console.log(exercise_rows);
                //console.log("SEPARATION");

                await exercise_rows.forEach(async (e_row) => {
                    const exercise = {
                        exercise_name: e_row.name,
                        sets: e_row.sets,
                        reps: e_row.reps,
                        weight: e_row.weight
                    };
                    
                    mult_exercises.push(exercise);
                    //console.log(exercise);
                });
                
                //console.log(mult_exercises);
                //console.log("SEPARATION");

                const workout = {
                    workout_name: w_row.name,
                    days_of_the_week: w_row.days,
                    exercises: mult_exercises
                  };

                //console.log(workout);
                //console.log("SEPARATION");

                mult_workouts.push(workout);

            });

            console.log(mult_workouts);
        });

        //console.log("PRESET: ", Workouts);
    
    //console.log(Workouts);
    //console.log(Workouts[0].workouts);
    //console.log(Workouts[1].workouts);
    //console.log(Workouts[2].workouts);
    

    //console.log(mult_workouts);

    });
}

router.post('/get-workouts', (req, res) => {
    test(req, res);
});

module.exports = router;
*/

let mult_workouts = [];

router.post('/get-workouts', (req, res) => {
    //console.log(req.body);

    queryDb(`SELECT * FROM Workouts WHERE uid = ${req.body.uid};`, //AND LOWER(name) LIKE CONCAT('%', ${req.body.search}, '%')
    (workout_rows) => {
        
        //console.log(workout_rows);

        //let mult_workouts = [];

        workout_rows.forEach((w_row) => {

            let mult_exercises = [];

            queryDb(`SELECT * FROM Exercises WHERE wid = ${w_row.wid};`,
            (exercise_rows) => {
                //console.log(exercise_rows);
                //console.log("SEPARATION");

                exercise_rows.forEach((e_row) => {
                    const exercise = {
                        exercise_id: e_row.eid,
                        exercise_name: e_row.name,
                        sets: e_row.sets,
                        reps: e_row.reps,
                        weight: e_row.weight
                    };
                    
                    mult_exercises.push(exercise);
                    console.log(exercise);
                });
                
                //console.log(mult_exercises);
                //console.log("SEPARATION");

                const workout = {
                    workout_id: w_row.wid,
                    workout_name: w_row.name,
                    days_of_the_week: w_row.days,
                    exercises: mult_exercises
                  };

                //console.log(workout);
                //console.log("SEPARATION");

                mult_workouts.push(workout);

            });

            //console.log(mult_workouts);

        });


        //console.log("PRESET: ", Workouts);
    
    //console.log(Workouts);
    //console.log(Workouts[0].workouts);
    //console.log(Workouts[1].workouts);
    //console.log(Workouts[2].workouts);  

    //console.log(mult_workouts);
    //console.log("division");
    //mult_workouts = [];

    });

    console.log(mult_workouts);
    console.log("division");
    res.send(mult_workouts);
    mult_workouts = [];

    //res.send()

});

module.exports = router;



/*
const express = require('express');
const router = express.Router();
const queryDb = require('../databases/db.js').queryDb;

router.get('/user/:email', (req, res) => {
  const email = req.params.email;

  // Fetch user data from the database based on email
  const userQuery = 'SELECT * FROM Users WHERE email = ?'; //+ email;
  queryDb(userQuery, (userResults) => {
    if (userResults.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user = userResults[0];

    // Fetch associated workouts for the user
    const workoutQuery = 'SELECT * FROM Workouts WHERE uid = ?' //+ user.uid;
    queryDb(workoutQuery, (workoutResults) => {
      const workouts = workoutResults;

      // Fetch associated exercises for each workout
      const associatedExercises = workouts.map((workout) => {
        return new Promise((resolve, reject) => {
          const exerciseQuery = 'SELECT * FROM Exercises WHERE wid = ?' //+ workout.wid;
          queryDb(exerciseQuery, (exerciseResults) => {
            resolve({ ...workout, exercises: exerciseResults });
          });
        });
      });

      Promise.all(associatedExercises)
        .then((workoutsWithExercises) => {
          const userData = {
            user,
            workouts: workoutsWithExercises,
          };
          res.json(userData);
        })
        .catch((error) => {
          console.error(error);
          res.status(500).json({ error: 'Internal server error' });
        });
    });
  });
});

module.exports = router;
*/

/*
const express = require('express');
const router = express.Router();
const queryDb = require('../databases/db.js').queryDb;

// Define the API endpoint for /api/user/:email
router.get('/user/:email', (req, res) => {
  const email = req.params.email;

  // Fetch user data from the database based on email
  const query = 'SELECT * FROM Users WHERE email = ?';
  queryDb(query, [email], (userResults, error) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (userResults.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user = userResults[0];

    // Fetch associated workouts for the user
    const workoutQuery = 'SELECT * FROM Workouts WHERE uid = ?';
    queryDb(workoutQuery, [user.uid], (workoutResults, error) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
      }

      const workouts = workoutResults;

      // Fetch associated exercises for each workout
      const associatedExercises = workouts.map((workout) => {
        return new Promise((resolve, reject) => {
          const exerciseQuery = 'SELECT * FROM Exercises WHERE wid = ?';
          queryDb(exerciseQuery, [workout.wid], (exerciseResults, error) => {
            if (error) {
              console.error(error);
              reject(error);
            } else {
              resolve({ ...workout, exercises: exerciseResults });
            }
          });
        });
      });

      Promise.all(associatedExercises)
        .then((workoutsWithExercises) => {
          const userData = {
            user,
            workouts: workoutsWithExercises,
          };
          res.json(userData);
        })
        .catch((error) => {
          console.error(error);
          res.status(500).json({ error: 'Internal server error' });
        });
    });
  });
});

// Export the router
module.exports = router;
*/