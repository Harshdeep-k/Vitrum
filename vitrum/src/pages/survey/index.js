import React, { useState } from 'react';
import styles from '@/styles/app.module.css';

import SuccessPage from '@/pages/success';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

function SurveyForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    dob: '',
  });



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    //Add that the person has recorded a transaction

  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
    window.location = '/choices';
  };


  return (
    <div className={styles.pagebody}>
      <h2 className={styles.pageHeader}>Verify your ID</h2>
      <form className={styles.formlayout} onSubmit={handleSubmit}>
        <div className={styles.nameEntry}>
          <div>
            <input
              className={styles.inputField}
              type="text"
              id="firstName"
              name="firstName"
              placeholder='First Name'
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <input
              className={styles.inputField}
              type="text"
              id="middleName"
              name="middleName"
              placeholder='Middle Name (if applicable)'
              value={formData.middleName}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              className={styles.inputField}
              type="text"
              id="lastName"
              name="lastName"
              placeholder='Last Name'
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className={styles.center}>
          {/* <label htmlFor="address">Address:</label> */}
          <input
            className={styles.inputlargeField}
            id="address"
            name="address"
            placeholder='Enter your full Address:'
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.center}>
          {/* <label htmlFor="dob">Date of Birth:</label> */}
          <input
            className={styles.inputlargeField}
            type="date"
            id="dob"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className={styles.submit}>Submit</button>
        {/* if the user can't be found, print a message stating so, so that they can edit info again and hit enter again */}
      </form>
    </div>
  );
}

export default SurveyForm;
