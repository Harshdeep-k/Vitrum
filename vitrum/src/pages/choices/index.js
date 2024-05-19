import styles from '@/styles/app.module.css';
import React, { useState } from 'react';

function ChoiceButtons({ choices, onSelect }) {
  const handleSelect = (choice) => {
    onSelect(choice);
  };

  return (
    <div>
      {choices.map((choice, index) => (
        <button className={styles.options} key={index} onClick={() => handleSelect(choice)}>
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

  const choices = ['HARSHDEEP KAUR', 'SAQIF ABRAR', 'SAMEER MIAN', 'SHAIZA HASHMI'];

  return (
    <div className={styles.pagebody}>
      <h2 className={styles.pageHeader}>Cast your vote</h2>

      <div className={styles.choiceList}>
        {/* a scrollable div that will display the names of all candidates. only one is allowed to be selected. */}
        {/*  */}
        <ChoiceButtons choices={choices} onSelect={handleChoiceSelect} />
      {selectedChoice && <p>You selected: {selectedChoice}</p>}
      </div>
     
      
    </div>
  );
}

export default Choice;
