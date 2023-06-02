
import React, { useEffect, useState } from 'react';

interface Preset {
  plan_name: string;
  days_of_the_week: string[];
  workouts: Workout[];
}

interface Workout {
  workout_name: string;
  sets: number;
  reps: number;
  weight: number;
}

const PresetsList: React.FC = () => {
  const [presets, setPresets] = useState<Preset[]>([]);
  const [selectedPreset, setSelectedPreset] = useState<Preset | null>(null);

  useEffect(() => {
    const availablePresets: Preset[] = [
      {
        plan_name: 'Beginner',
        days_of_the_week: ['Monday', 'Wednesday', 'Friday'],
        workouts: [
          {
            workout_name: 'Squats',
            sets: 3,
            reps: 10,
            weight: 50,
          },
          {
            workout_name: 'Push-ups',
            sets: 3,
            reps: 10,
            weight: 0,
          },
        ],
      },
      {
        plan_name: 'Intermediate',
        days_of_the_week: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        workouts: [
          {
            workout_name: 'Bench Press',
            sets: 4,
            reps: 8,
            weight: 80,
          },
          {
            workout_name: 'Deadlifts',
            sets: 4,
            reps: 8,
            weight: 100,
          },
          {
            workout_name: 'Pull-ups',
            sets: 4,
            reps: 6,
            weight: 0,
          },
        ],
      },
      {
        plan_name: 'Advanced',
        days_of_the_week: ['Monday', 'Wednesday', 'Friday', 'Saturday'],
        workouts: [
          {
            workout_name: 'Squat Clean',
            sets: 5,
            reps: 5,
            weight: 120,
          },
          {
            workout_name: 'Snatch',
            sets: 5,
            reps: 5,
            weight: 100,
          },
          {
            workout_name: 'Handstand Push-ups',
            sets: 5,
            reps: 8,
            weight: 0,
          },
          {
            workout_name: 'Plank',
            sets: 3,
            reps: 30,
            weight: 0,
          },
        ],
      },
    ];

    setPresets(availablePresets);
  }, []);

  const handlePresetChange = (preset: Preset) => {
    setSelectedPreset(preset);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-6">
          <div className="presets-list">
            <h2>Presets</h2>
            <ul>
              {presets.map((preset) => (
                <li key={preset.plan_name}>
                  <input
                    type="checkbox"
                    checked={selectedPreset && (selectedPreset.plan_name === preset.plan_name) ? true : false}
                    onChange={() => handlePresetChange(preset)}
                  />
                  <label>{preset.plan_name}</label>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="col-6">
          <div className="selectedpreset-contents">
            <h2>Selected Preset</h2>
            {selectedPreset ? (
              <div>
                <h3>{selectedPreset.plan_name}</h3>
                <p>
                  Days of the week: {selectedPreset.days_of_the_week.join(', ')}
                </p>
                <h4>Workouts:</h4>
                <ul>
                  {selectedPreset.workouts.map((workout, index) => (
                    <li key={index}>
                      <p>Workout Name: {workout.workout_name}</p>
                      <p>Sets: {workout.sets}</p>
                      <p>Reps: {workout.reps}</p>
                      <p>Weight: {workout.weight}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p>No preset selected</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PresetsList;

/*
import React, { useState } from 'react';

function PresetsList(): React.ReactElement {
  const [presets, setPresets] = useState<string[]>(['Beginner', 'Intermediate', 'Advanced']);
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);

  // adding custom plans to the presets
  function addtoPresets(newcustom: string): void {
    const nextPresets = [...presets, newcustom];
    setPresets(nextPresets);
  }

  // handling the selection of a preset plan
  const handlePresetSelection = (preset: string): void => {
    if (preset === selectedPreset) {
      setSelectedPreset(null);
    } else {
      setSelectedPreset(preset);
    }
  };

  return (
    <div>
      {presets.map((preset) => (
        <div key={preset}>
          <label>
            {preset}
            <input
              type="checkbox"
              checked={selectedPreset === preset}
              onChange={() => handlePresetSelection(preset)}
            />
          </label>
        </div>
      ))}
    </div>
  );
}

export default PresetsList;
*/