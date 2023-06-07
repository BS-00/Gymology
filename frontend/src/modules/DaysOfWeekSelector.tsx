import React, { useState, useEffect } from 'react';

function DayCheck(props: {onChange: (val: string) => void, id: string, val: string}): React.ReactElement {
	return (
		<div className="col justify-content-center p-0 form-group">
			<input onChange={() => {props.onChange(String(props.val))}} id={props.id} type="checkbox" className="btn-check" autoComplete="off"/>
			<label className="btn w-100 btn-outline-primary rounded-0" style={{borderColor: 'white', color: 'white'}} htmlFor={props.id}>{props.val}</label><br/>
		</div>
	);
}

function DaysOfWeekSelector(props: {onChange: (days: Array<string>) => void, id: string}): React.ReactElement {
	const days: Array<string> = ["M", "TU", "W", "TH", "F", "SA", "SU"];
	const [selectedDays, setSelectedDays] = useState<Array<string>>([]);

	useEffect(() => {
		props.onChange(selectedDays);
	}, [selectedDays]);
	
	function updateSelectedDays(val: string) {
		//Day is already selected
		if(selectedDays.includes(val)) {
			//Removes day from selected
			setSelectedDays(oldSelectedDays => oldSelectedDays.filter(day => day !== val));
		} else {
			//Adds day to selected
			setSelectedDays(oldSelectedDays => [...oldSelectedDays, val]);
		}
	}
	
	return (
		<div className="row px-0 mx-0 my-2">
			{days.map(val => (
				<DayCheck onChange={updateSelectedDays} key={val} id={props.id+"-"+val} val={val} />
			))}
		</div>
	);
}

export default DaysOfWeekSelector;
