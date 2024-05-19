import styles from '@/styles/app.module.css';

import React from 'react';

function Accessible() {
  return (
    <div className={styles.pagebody}>
      <h2 className={styles.pageHeader}>Accessibility Page.</h2>
      <h2 className={styles.pageHeader}>Currently not Available.</h2>
    </div>
  );
}

export default Accessible;
