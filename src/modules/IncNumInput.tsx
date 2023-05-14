import React, { useRef } from 'react';

function IncNumInput(props: {minVal: number, id: string, label: string}): React.ReactElement {
  let inputRef = useRef<HTMLInputElement>(null);
  
  function addVal(val: number) {
    if (inputRef.current !== null) {
      const newVal: number = Number(inputRef.current.value)+val;
      if (newVal < props.minVal) return;
      inputRef.current.value = String(newVal);
    }
  }
  
  return (
    <div className="my-2 form-group">
      <label htmlFor={props.id} className="form-label">{props.label}</label>
      <div className="input-group">
        <button type="button" className="btn btn-outline-danger" onClick={() => addVal(-1)}>-</button>
        <input ref={inputRef} id={props.id} type="number" min={props.minVal} className="form-control" defaultValue={props.minVal}/>
        <button type="button" className="btn btn-outline-success" onClick={() => addVal(1)}>+</button>
      </div>
    </div>
  );
}

export default IncNumInput;