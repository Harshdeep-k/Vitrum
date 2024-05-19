import Link from 'next/link';

import styles from '@/styles/app.module.css';

export const Landing = () => {
  return (
    <div className={styles.pagebody}>
      <div>
        <h1> The easy way to vote.</h1>
        <h2>By clicking BEGIN, I agree and confirm to vote in confidentiality.</h2>
      </div>
      <Link href="/survey" className={styles.card} rel="noopener noreferrer" >
        <h2>BEGIN</h2>
      </Link>

    </div>
  );
};