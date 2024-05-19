import styles from '@/styles/app.module.css';
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
    <div className={styles.pagebody}>
      <h2 className={styles.pageHeader}>Cast your vote</h2>

      <div className={styles.choiceList}>
        {/* a scrollable div that will display the names of all candidates. only one is allowed to be selected. */}
        {/*  */}
      </div>
      <ChoiceButtons choices={choices} onSelect={handleChoiceSelect} />
      {selectedChoice && <p>You selected: {selectedChoice}</p>}
      
    </div>
  );
}

export default Choice;
