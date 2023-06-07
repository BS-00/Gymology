import React, { ChangeEvent, useEffect, useState } from 'react';
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


function ExerciseDisplay(props: {exercise: ExerciseType}): React.ReactElement {
    return (
		<div className="row border-bottom">
			<p className="col-4"> {String(props.exercise.name)} </p>
			<p className="col"> {String(props.exercise.sets)} </p>
			<p className="col"> {String(props.exercise.reps)} </p>
			<p className="col"> {String(props.exercise.weight)} </p>
	    </div>
    );
}

function CreateWorkout(): React.ReactElement {
	const storedTheme = localStorage.getItem('theme');
  	const [theme, setTheme] = useState(storedTheme || 'light');

  	useEffect(() => {
    	document.body.className = theme;
  	}, [theme]);


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
		const workout: WorkoutType = {
			name: workoutName,
			days: days,
			exercises: exercises
		};
		
		await Axios.post('http://localhost:3001/create-workout', workout);
	}
	
	return (
		<>
			<h1 className="display-5 text-center">Create Workout</h1>
			<div className="d-flex">
				<div className="w-50 d-flex flex-row h-75 border-end">
					<form className="container-fluid w-100">
						<div className="my-2 form-group">
							<label htmlFor="workout-name-input" className="form-label">Name</label>
							<input onChange={e => setWorkoutName(String(e.target.value))} id="workout-name-input" type="text" className="form-control" placeholder="Name"/>
						</div>
						<DaysOfWeekSelector onChange={selectedDays => setDays(selectedDays)} id="1"/>
						<button type="submit" onClick={e => submitWorkout(e)} className="btn btn-primary">Create</button>
						<div className="my-5"></div>
						<div className="exercise-input">
							<div className="my-2 form-group">
								<label htmlFor="exercise-name-input" className="form-label">Exercise Name</label>
								<input onChange={e => setExerciseName(String(e.target.value))} id="exercise-name-input" type="text" className="form-control" placeholder="Exercise Name"/>
							</div>
							<IncNumInput onChange={val => setSets(val)} id="sets-input" label="Sets" minVal={1} />
							<IncNumInput onChange={val => setReps(val)} id="reps-input" label="Reps" minVal={1} />
							<IncNumInput onChange={val => setWeight(val)} id="weight-input" label="Weight (lbs)" minVal={0} amnt={10}/>
						</div>
						<button className="btn btn-primary" onClick={e => addExercise(e)}>Add Exercise</button>
					</form>
        		</div>
				<div className="m-3 w-50 h-75">
					<h3 className="text text-center">Exercises</h3>  
			        <div className="h-75 overflow-auto container">
						<div className="row border-bottom border-2">
							<h6 className="h6 col-4">Name</h6>
							<h6 className="h6 col">Sets</h6>
							<h6 className="h6 col">Reps</h6>
							<h6 className="h6 col">Weight</h6>
						</div>
						{exercises.map(exercise => <ExerciseDisplay exercise={exercise} />)}
					</div>
				</div>
      		</div>
    	</>
  	);
}

export default CreateWorkout;
