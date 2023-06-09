import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

interface Workout {
  uid: number;
  w_id: number,
  plan_name: string, 
  days_of_the_week: string[],
  exercises: Exercise[]
}

interface Exercise {
  e_id: number,
  exercise_name: string,
  sets: number,
  reps: number,
  weight: number
}

const WorkoutsList: React.FC = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');


  const fetchRef = useRef(false);

useEffect(() => {
  if (!fetchRef.current) {
    const fetchDataInitially = async () => {
      try {
        let my_res_data = await submituid();
        setWorkouts(my_res_data);
        //console.log('FETCHDATA INITIALLY CALLED!');
      } catch (error) {
        console.log(error);
      }
    };

    fetchDataInitially();
    fetchRef.current = true;
  }
}, []);

  const handleWorkoutChange = (workout: Workout) => {
    setSelectedWorkout(workout);
  };

  const handleSearch = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);

    /*
    try {
    let my_res_data = await submituid();
    setPresets(my_res_data); 
    } catch (error) {
      console.log(error);
    }
    */
  };

  const filteredWorkouts = workouts.filter((workout) =>
    workout.plan_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // FUNCTION THAT CONNECTS AND RETURNS THE USER'S WORKOUTS
  async function submituid() { //forsearch: string

    type uidobject = {
      uid: number;
      //search: string;
    };

    if ( sessionStorage.getItem('uid') === undefined ||
        sessionStorage.getItem('uid') === null ) {
      throw new RangeError('NULL or Undefined uid; Check Login!');
    }

    const uid_holder: uidobject = {
      uid: Number(sessionStorage.getItem('uid'))
      //search: forsearch
    };

    let m_res_data: Workout[] = [];

    await axios.post('http://localhost:3001/get-workouts', uid_holder).then(
      res => {
        //let m_res_data: Preset[] = [];
        //m_res_data = res.data;
        
        //console.log(res.data);

        //let m_res_data: Preset[] = [];

        res.data.forEach((w_row: any) => {

          let m_mult_exercises: Exercise[] = [];

          w_row.exercises.forEach((e_row: any) => {
            
            const curr_exercise = {
              e_id: e_row.exercise_id,
              exercise_name: e_row.exercise_name,
              sets: e_row.sets,
              reps: e_row.reps,
              weight: e_row.weight
            };
            
            m_mult_exercises.push(curr_exercise);

          });

          const curr_workout = {
            uid: w_row.uid,
            w_id: w_row.workout_id,
            plan_name: w_row.workout_name,
            days_of_the_week: w_row.days_of_the_week,
            exercises: m_mult_exercises
          };

          m_res_data.push(curr_workout);

        });

        //console.log(m_res_data);
        //setPresets(m_res_data);
    });
    
    return m_res_data;

  }

  const handleCompleteWorkout = async () => {
    try {
      if (selectedWorkout) {
        const u_id = sessionStorage.getItem('uid');
        const { uid, w_id } = selectedWorkout;
        await axios.post('http://localhost:3001/complete-workout', { uid: u_id, wid: w_id });
        console.log('Workout completed successfully');
        window.alert('Workout Completed');
      } else {
        console.log('No workout selected');
      }
    } catch (error) {
      console.log('Error completing workout:', error);
    }
  };

  const handleDeleteWorkout = async () => {
    try {
      if (selectedWorkout) {
        const u_id = sessionStorage.getItem('uid');
        const { uid, w_id } = selectedWorkout;
        await axios.post('http://localhost:3001/delete-workout', { uid: u_id, wid: w_id });
        console.log('Workout deleted successfully');
        window.location.reload();
      } else {
        console.log('No workout selected');
      }
    } catch (error) {
      console.log('Error deleting workout:', error);
    }
  };

  return (
    <div className="container h-100">
      <div className="row h-100">
        <div className="col-4">
          <div className="workouts-list h-100 d-flex flex-column justify-content-center align-items-center" > 
            <h2>Search Workouts</h2>
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={handleSearch}
              className="form-control mb-4"
              style={{ width: '100%' }}
            />
            <div className="border overflow-auto w-100" style={{ maxHeight: '60vh' }}>
              <ul className="list-group list-group-flush" style={{ flexWrap: 'nowrap' }}>
                {filteredWorkouts.map((workout) => (
                  <li
                    key={workout.w_id}
                    className={`list-group-item ${
                      selectedWorkout !== null && selectedWorkout.w_id === workout.w_id
                        ? 'list-group-item-primary'
                        : 'list-group-item-secondary'
                    }`}
                    onClick={() => handleWorkoutChange(workout)}
                    style={{ cursor: 'pointer', width: '100%', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
                  >
                    <span title={workout.plan_name}>{workout.plan_name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="col-8">
  <div className="selectedworkout-contents h-100 d-flex flex-column align-items-center justify-content-center">
    <h2>Selected Workout</h2>
    {selectedWorkout ? (
      <div className="border rounded p-4 overflow-auto" style={{ maxHeight: '60vh', width: '100%', outline: 'none' }}>
        <h3>{selectedWorkout.plan_name}</h3>
        <p>Days of the week: {String(selectedWorkout.days_of_the_week)}</p>
        <h4>Exercises:</h4>
        <div className="list-group">
          {selectedWorkout.exercises.map((exercise, index) => (
            <div key={index} className="list-group-item rounded p-3 mb-3">
              <p className="mb-1">Exercise Name: {exercise.exercise_name}</p>
              <p className="mb-1">Sets: {exercise.sets}</p>
              <p className="mb-1">Reps: {exercise.reps}</p>
              <p className="mb-1">Weight: {exercise.weight}</p>
            </div>
          ))}
        </div>
      </div>
    ) : (
      <p className="text-muted">No workout selected</p>
    )}
    {selectedWorkout && (
      <div className="mt-3">
        <button className="btn btn-primary mr-2" onClick={handleCompleteWorkout}>
          Complete Workout
        </button>
        <button className="btn btn-danger" onClick={handleDeleteWorkout}>
          Delete Workout
        </button>
      </div>
    )}
  </div>
</div>

      </div>
    </div>
  );
  
};  

export default WorkoutsList;