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