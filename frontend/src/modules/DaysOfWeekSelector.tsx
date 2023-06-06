import React from 'react';

function DayCheck(props: { id: string, val: string }): React.ReactElement {
  return (
    <div className="col justify-content-center p-0 form-group">
      <input id={props.id} type="checkbox" className="btn-check" autoComplete="off"/>
      <label className="btn w-100 btn-outline-primary rounded-0" style={{borderColor: 'white', color: 'white'}} htmlFor={props.id}>{props.val}</label><br/>
    </div>
  );
}

function DaysOfWeekSelector(props: { id: string }): React.ReactElement {
  const days: Array<string> = ["M", "T", "W", "R", "F", "S", "Y"];

  return (
    <div className="row px-0 mx-0 my-2">
      {days.map(val => (
        <DayCheck key={val} id={props.id+"-"+val} val={val} />
      ))}
    </div>
  );
}

export default DaysOfWeekSelector;