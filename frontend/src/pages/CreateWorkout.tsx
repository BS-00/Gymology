import React, { ChangeEvent, useState } from 'react';
import IncNumInput from '../modules/IncNumInput';
import DaysOfWeekSelector from '../modules/DaysOfWeekSelector';

function ExerciseDisplay(props: {name: String}): React.ReactElement {
    return (
	<>
	    <p>{props.name}</p>
	</>
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
  function addExercise(e: ChangeEvent<EventTarget>) {
    e.preventDefault();
    
    const nameInput = document.getElementById('exercise-name-input') as HTMLInputElement | null;
    if (nameInput === null) return;

    setExerciseDisplays(oldExerciseDisplays => {
	const element: React.ReactElement = <ExerciseDisplay name={nameInput.value} key={oldExerciseDisplays.length}/>;
	return [...oldExerciseDisplays, element];
    })
  }

    return (
    <>
      <div className="h-25">
        <h1 className="display-5 text-center">New workout</h1>
      </div>
      <div className="d-flex flex-row h-75">
        <div className="w-50">
          <WorkoutForm/>
        </div>
        <div className="m-3 w-50 h-75">
	  <h3 className="text text-center">Exercises</h3>
	  <button className="btn btn-secondary" onClick={e => addExercise(e)}>Add Exercise</button>  
	  <div className="h-75 overflow-auto">
	    {exerciseDisplays}
          </div>
        </div>
       </div>
     </>
  );
}

export default CreateWorkout;
