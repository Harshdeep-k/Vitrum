// SuccessPage.js
import styles from '@/styles/app.module.css';

import React from 'react';

function SuccessPage() {
  return (
    <div className={styles.pagebody}>
      <h2 className={styles.pageHeader}>Thank you for voting.</h2>
      <h2 className={styles.pageHeader}>Your vote has been received.</h2>
    </div>
  );
}

export default SuccessPage;
