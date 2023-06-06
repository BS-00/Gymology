import React, { ChangeEvent, useState } from 'react';
import IncNumInput from '../modules/IncNumInput';
import DaysOfWeekSelector from '../modules/DaysOfWeekSelector';
import Axios from 'axios';


type ExerciseType = {
	name: String;
	sets: Number;
	reps: Number;
	weight: Number;
};

type WorkoutType = {
	name: String;
	days: Array<String>;
	exercises: Array<ExerciseType>;
};


function ExerciseDisplay(props: {name: String}): React.ReactElement {
    return (
      <div className="text-center">
	      <p>{props.name}</p>
	    </div>
    );
}

function WorkoutForm(): React.ReactElement {
  return (
      <form className="container-fluid w-100">
        <DaysOfWeekSelector id="1"/>
        <div className="my-2 form-group">
          <label htmlFor="workout-name-input" className="form-label">Name</label>
          <input id="workout-name-input" type="text" className="form-control" placeholder="Name"/>
        </div>

        <div className="exercise-input">
	  <div className="my-2 form-group">
            <label htmlFor="exercise-name-input" className="form-label">Exercise Name</label>
            <input id="exercise-name-input" type="text" className="form-control" placeholder="Exercise Name"/>
	  </div>
	  <IncNumInput id="sets-input" label="Sets" minVal={1} />
          <IncNumInput id="reps-input" label="Reps" minVal={1} />
          <IncNumInput id="weight-input" label="Weight (lbs)" minVal={0} amnt={10}/>
        </div>
        <button type="submit" className="my-5 btn btn-primary">Create</button>
      </form>
  );
}

function CreateWorkout(): React.ReactElement {
	const [exerciseDisplays, setExerciseDisplays] = useState<Array<React.ReactElement>>([]);

  const [workoutName, setWorkoutName] = useState<string>("");
  const [days, setDays] = useState<Array<string>>([]);

	const [exercises, setExercises] = useState<Array<ExerciseType>>([]);
  const [exerciseName, setExerciseName] = useState<string>("");
  const [sets, setSets] = useState<number>(1);
  const [reps, setReps] = useState<number>(1);
  const [weight, setWeight] = useState<number>(1);

  function addExercise(e: ChangeEvent<EventTarget>) {
    e.preventDefault();

    const exercise: ExerciseType = {
      name: exerciseName,
      sets: sets,
      reps: reps,
      weight: weight
    };

    setExercises(oldExercises => [...oldExercises,  exercise]);
  }

  async function submitWorkout(e: ChangeEvent<EventTarget>) {
    e.preventDefault();

    const workout: WorkoutType = {
      name: workoutName,
      days: days,
      exercises: exercises
    };

    let res = await Axios.post('http://localhost:3001/create-workout', workout);
    console.log(res.data);
  }

  return (
    <>
      <div className="h-25">
        <h1 className="display-5 text-center">New workout</h1>
      </div>
      <div className="d-flex">
        <div className="w-50 d-flex flex-row h-75">
          <form className="container-fluid w-100">
            <DaysOfWeekSelector onChange={selectedDays => {setDays(selectedDays)}} id="1"/>
            <div className="my-2 form-group">
              <label htmlFor="workout-name-input" className="form-label">Name</label>
              <input onChange={e => setWorkoutName(String(e.target.value))} id="workout-name-input" type="text" className="form-control" placeholder="Name"/>
            </div>
            <div className="exercise-input">
              <div className="my-2 form-group">
                <label htmlFor="exercise-name-input" className="form-label">Exercise Name</label>
                <input onChange={e => setExerciseName(String(e.target.value))} id="exercise-name-input" type="text" className="form-control" placeholder="Exercise Name"/>
              </div>
              <IncNumInput onChange={val => setSets(val)} id="sets-input" label="Sets" minVal={1} />
              <IncNumInput onChange={val => setReps(val)} id="reps-input" label="Reps" minVal={1} />
              <IncNumInput onChange={val => setWeight(val)} id="weight-input" label="Weight (lbs)" minVal={0} amnt={10}/>
            </div>
            <button type="submit" onClick={e => submitWorkout(e)} className="my-5 btn btn-primary">Create</button>
          </form>
        </div>
        <div className="m-3 w-50 h-75">
	  <h3 className="text text-center">Exercises</h3>
	  <button className="btn btn-primary" onClick={e => addExercise(e)}>Add Exercise</button>  
	  <div className="h-75 overflow-auto">
	    {exerciseDisplays}
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateWorkout;