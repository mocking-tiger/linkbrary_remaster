import AddBar from '../../../components/add-bar';
import styles from './page.module.css';

export default function Dashboard() {
  return (
    <div className={styles.container}>
      <div className={styles.addBox}>
        <AddBar />
      </div>
      <main className={styles.dashboard}>gd</main>
    </div>
  );
}
