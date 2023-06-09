import React, { ChangeEvent, useEffect, useState } from 'react';
import IncNumInput from '../modules/IncNumInput';
import DaysSelector from '../modules/DaysSelector';
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


function ExerciseDisplay(props: {index: number, exercise: ExerciseType, removeExercise: (i: number, e: ChangeEvent<EventTarget>) => void}): React.ReactElement {
    return (
		<div className="row overflow-hidden border-bottom">
			<p className="col-4"> {String(props.exercise.name)} </p>
			<p className="col"> {String(props.exercise.sets)} </p>
			<p className="col"> {String(props.exercise.reps)} </p>
			<p className="col"> {String(props.exercise.weight)} </p>
			<button onClick={e => props.removeExercise(props.index, e)} className="fs-3 p-0 m-0 col-sm btn btn-primary" style={{ backgroundColor: 'red' }} ><strong>-</strong></button>
	    </div>
    );
}

function CreateWorkout(): React.ReactElement {
	const storedTheme = localStorage.getItem('theme');
  	const [theme, setTheme] = useState(storedTheme || 'light');

  	useEffect(() => {
    	document.body.className = theme;
  	}, [theme]);

	const [workoutName, setWorkoutName] = useState<string>(""); //If this is "" it's invalid for Create
	const [days, setDays] = useState<Array<string>>([]); //If this is [] it's invalid for Create

	const [exercises, setExercises] = useState<Array<ExerciseType>>([]); //If this is [] it's invalid for Create
	const [exerciseName, setExerciseName] = useState<string>(""); //If this is "" for add workouts it's invalid for Add Exercise
	const [sets, setSets] = useState<number>(1);
	const [reps, setReps] = useState<number>(1);
	const [weight, setWeight] = useState<number>(0);
	
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

	function removeExercise(i: number, e: ChangeEvent<EventTarget>) {
		e.preventDefault();
		setExercises(oldExercises => oldExercises.filter((e, ei) => ei != i));
	}
	
	async function submitWorkout(e: ChangeEvent<EventTarget>) {
		if (sessionStorage.getItem('uid') == null || 
			sessionStorage.getItem('uid') == undefined) {
			throw new RangeError('Uid is null or undefined');
		}

		const uid = sessionStorage.getItem('uid');
		const workout: WorkoutType = {
			name: workoutName,
			days: days,
			exercises: exercises
		};
		
		await Axios.post(process.env.REACT_APP_API_URL+'/create-workout',
						 {uid: uid, workout: workout});
	}


	return (
		<>
			<h1 className="display-5 text-center">Create Workout</h1>
			<div className="d-flex">
				<div className="mx-1 w-50 d-flex flex-row h-75 border-end">
					<form className="container-fluid w-100">
						<div className="my-2 form-group">
							<label htmlFor="workout-name-input" className="form-label">Name</label>
							<input onChange={e => setWorkoutName(String(e.target.value))} id="workout-name-input" type="text" className="form-control" placeholder="Name"/>
						</div>
						<DaysSelector onChange={selectedDays => setDays(selectedDays)} id="1"/>
						<button type="submit" onClick={ e => {
							if (workoutName === '') {
								e.preventDefault();
    							console.error('No Workout Name Provided! Please try again.');
    							window.alert('No Workout Name Provided! Please try again.');
							}
							else if (days.length === 0) {
								e.preventDefault();
    							console.error('No Days of the Week Provided! Please try again.');
    							window.alert('No Days of the Week Provided! Please try again.');
							}
							else if (exercises.length === 0) {
								e.preventDefault();
    							console.error('No Exercises Added! Please try again.');
    							window.alert('No Exercises Added! Please try again.');
							}
  							else submitWorkout(e);
						}} className="btn btn-primary">Create</button>
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
						<button className="btn btn-primary" onClick={ e => {
							if (exerciseName === '') {
								e.preventDefault();
								console.error('No Exercise Name Provided! Please try again.');
								window.alert('No Exercise Name Provided! Please try again.');
							} else {
								addExercise(e);
							}
						}} >Add Exercise</button>
					</form>
        		</div>
				<div className="m-4 w-50 h-75">
					<h3 className="text text-center">Exercises</h3>  
			        <div className="h-75 overflow-auto container">
						<div className="row overflow-hidden border-bottom border-2">
							<h6 className="h6 col-4">Name</h6>
							<h6 className="h6 col">Sets</h6>
							<h6 className="h6 col">Reps</h6>
							<h6 className="h6 col">Weight</h6>
							<h6 className="h6 col">      </h6>
						</div>
						<div className="overflow-y" style={{ maxHeight: "50vh" }}>
							{exercises.map((exercise, i) => 
								<ExerciseDisplay key={i} index={i} removeExercise={removeExercise} exercise={exercise} />
							)}
						</div>
					</div>
				</div>
      		</div>
    	</>
  	);
}

export default CreateWorkout;
