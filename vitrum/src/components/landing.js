import Link from 'next/link';
import styles from '@/styles/app.module.css';


export const Landing = () => {
  return (
    <div className={styles.grid}>
      <h1 style={{alignContent:"left", color:"black"}}>The easy way to vote.</h1><br/>
      <h5 style={{alignContent:"left", color:"black"}}>By clicking begin, I agree and confirm to vote in confidentiality.</h5><br/>
      <Link
        href="/survey"
        className={styles.card}
        rel="noopener noreferrer"
      >
        <h2 style={{alignContent:"center", color:"black"}}>
         Begin
        </h2>
      </Link>

    </div>
  );
};