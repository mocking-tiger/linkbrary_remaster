import Header from '../components/header';
import styles from './page.module.css';

export default function Main() {
  return (
    <div className={styles.container}>
      <Header />
      <h1>메인페이지</h1>
    </div>
  );
}
