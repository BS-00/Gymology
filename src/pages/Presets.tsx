import React from 'react';
import PresetsList from '../modules/PresetsList';

// Reminder to make Bootstrap enhancements here

function Presets(): React.ReactElement {
  return (
    <div className="presets-page">
      <PresetsList />
    </div>
  );
}

export default Presets;