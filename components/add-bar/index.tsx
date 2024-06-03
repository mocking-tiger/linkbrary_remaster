'use client';

import Image from 'next/image';
import styles from './index.module.css';

export default function AddBar() {
  const WIP = () => {
    alert('개발중입니다.');
  };

  return (
    <div className={styles.container}>
      <Image src='/icons/link.svg' width={20} height={20} alt='링크 아이콘' />
      <input type='text' placeholder='링크를 추가해 보세요' />
      <button onClick={WIP}>추가하기</button>
    </div>
  );
}
