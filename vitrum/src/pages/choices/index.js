import React, { useState } from 'react';

function ChoiceButtons({ choices, onSelect }) {
  const handleSelect = (choice) => {
    onSelect(choice);
  };

  return (
    <div>
      {choices.map((choice, index) => (
        <button key={index} onClick={() => handleSelect(choice)}>
          {choice}
        </button>
      ))}
    </div>
  );
}

function Choice() {
  const [selectedChoice, setSelectedChoice] = useState(null);

  const handleChoiceSelect = (choice) => {
    setSelectedChoice(choice);
   //Putting content in the db
   window.location = '/success';
  };

  const choices = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];

  return (
    <div>
      <h1>Select a choice:</h1>
      <ChoiceButtons choices={choices} onSelect={handleChoiceSelect} />
      {selectedChoice && <p>You selected: {selectedChoice}</p>}
      
    </div>
  );
}

export default Choice;
