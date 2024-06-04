'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import AddBar from '../../../components/add-bar';
import styles from './page.module.css';

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem('accessToken')) {
      router.push('/');
    }
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.addBox}>
        <AddBar />
      </div>
      <main className={styles.dashboard}>
        <input type='text' placeholder='링크를 검색해 보세요' className={styles.searchBar} />
        <div className={styles.empty}>저장된 링크가 없습니다</div>
        {/* <div className={styles.folderBox}>
          <div className={styles.folder}>전체</div>
        </div> */}
      </main>
    </div>
  );
}
