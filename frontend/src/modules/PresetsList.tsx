import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

interface Preset {
  uid: number;
  w_id: number,
  plan_name: string, 
  days_of_the_week: string[],
  workouts: Workout[]
}

interface Workout {
  e_id: number,
  workout_name: string,
  sets: number,
  reps: number,
  weight: number
}

const PresetsList: React.FC = () => {
  const [presets, setPresets] = useState<Preset[]>([]);
  const [selectedPreset, setSelectedPreset] = useState<Preset | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');


  const fetchRef = useRef(false);

useEffect(() => {
  if (!fetchRef.current) {
    const fetchDataInitially = async () => {
      try {
        let my_res_data = await submituid();
        setPresets(my_res_data);
        //console.log('FETCHDATA INITIALLY CALLED!');
      } catch (error) {
        console.log(error);
      }
    };

    fetchDataInitially();
    fetchRef.current = true;
  }
}, []);

  const handlePresetChange = (preset: Preset) => {
    setSelectedPreset(preset);
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

  const filteredPresets = presets.filter((preset) =>
    preset.plan_name.toLowerCase().includes(searchQuery.toLowerCase())
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

    let m_res_data: Preset[] = [];

    await axios.post('http://localhost:3001/get-workouts', uid_holder).then(
      res => {
        //let m_res_data: Preset[] = [];
        //m_res_data = res.data;
        
        //console.log(res.data);

        //let m_res_data: Preset[] = [];

        res.data.forEach((w_row: any) => {

          let m_mult_exercises: Workout[] = [];

          w_row.exercises.forEach((e_row: any) => {
            
            const curr_exercise = {
              e_id: e_row.exercise_id,
              workout_name: e_row.exercise_name,
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
            workouts: m_mult_exercises
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
      if (selectedPreset) {
        const u_id = sessionStorage.getItem('uid');
        const { uid, w_id } = selectedPreset;
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
      if (selectedPreset) {
        const u_id = sessionStorage.getItem('uid');
        const { uid, w_id } = selectedPreset;
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
          <div className="presets-list h-100 d-flex flex-column justify-content-center align-items-center" > 
            <h2>Search Workouts</h2>
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={handleSearch}
              className="form-control mb-4"
              style={{ width: '100%' }}
            />
            <div className="border overflow-auto" style={{ width: '100%' }}>
              <ul className="list-group list-group-flush" style={{ flexWrap: 'nowrap' }}>
                {filteredPresets.map((preset) => (
                  <li
                    key={preset.w_id}
                    className={`list-group-item ${
                      selectedPreset !== null && selectedPreset.w_id === preset.w_id
                        ? 'list-group-item-primary'
                        : 'list-group-item-secondary'
                    }`}
                    onClick={() => handlePresetChange(preset)}
                    style={{ cursor: 'pointer', width: '100%', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
                  >
                    <span title={preset.plan_name}>{preset.plan_name}</span>
                  </li>
                ))}
              </ul>
            </div>


          </div>
        </div>
  
        <div className="col-8">
          <div className="selectedpreset-contents h-100 d-flex flex-column align-items-center justify-content-center">
            <h2>Selected Workout</h2>
            {selectedPreset ? (
              <div className="border p-4 overflow-auto" style={{ maxHeight: '60vh', width: '100%' }}>
                <h3>{selectedPreset.plan_name}</h3>
                <p>Days of the week: {String(selectedPreset.days_of_the_week)}</p>
                <h4>Workouts:</h4>
                <ul className="list-group list-group-flush">
                  {selectedPreset.workouts.map((workout, index) => (
                    <li key={index} className="list-group-item">
                      <p>Workout Name: {workout.workout_name}</p>
                      <p>Sets: {workout.sets}</p>
                      <p>Reps: {workout.reps}</p>
                      <p>Weight: {workout.weight}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className="text-muted">No workout selected</p>
            )}
             {selectedPreset && (
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

export default PresetsList;