import Link from 'next/link';

import styles from '@/styles/app.module.css';

export const Landing = () => {
  return (
    <div className={styles.grid}>

      <Link
        href="/survey"
        className={styles.card}
        rel="noopener noreferrer"
      >
        <h2>
         Begin
        </h2>
        <h1>TESTING</h1>
      </Link>

    </div>
  );
};