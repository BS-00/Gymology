import React from 'react';
import IncNumInput from '../modules/IncNumInput';
import DaysOfWeekSelector from '../modules/DaysOfWeekSelector';

function NewWorkoutForm(): React.ReactElement {
  return (
    <form className="container-fluid w-50">
      <DaysOfWeekSelector id="1"/>
      <div className="my-2 form-group">
        <label htmlFor="name-input" className="form-label">Name</label>
        <input id="name-input" type="text" className="form-control" placeholder="Name"/>
      </div>
      <IncNumInput id="sets-input" label="Sets" minVal={1} />
      <IncNumInput id="reps-input" label="Reps" minVal={1} />
      <IncNumInput id="weight-input" label="Weight (lbs)" minVal={0} amnt={10}/>
      <button type="submit" className="my-5 btn btn-primary">Create</button>
    </form>
  );
}

function CreateWorkout(): React.ReactElement {
  return (
    <>
      <h1 className="display-5 text-center">New workout</h1>
      <NewWorkoutForm/>
    </>
  );
}

export default CreateWorkout;