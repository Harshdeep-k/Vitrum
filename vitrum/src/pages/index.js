import styles from '@/styles/app.module.css';
import {Landing} from '@/components/landing';

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.grid}>
        <Landing />
      </div>
    </main>
  );
}