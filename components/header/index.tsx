'use client';

import { useUserStore } from '../../zustand/userStore';
import Link from 'next/link';
import styles from './index.module.css';
import Image from 'next/image';

export default function Header() {
  const user = useUserStore((state) => state.userInfo);
  console.log(user);

  return (
    <header className={styles.header}>
      <div>
        <Link href='/'>
          <Image src='/icons/logo.svg' width={133} height={24} alt='로고' className={styles.logo} />
        </Link>
        {user ? (
          <div className={styles.userBox}>
            <Image src={user.image_source} width={28} height={28} alt='프로필 이미지' />
            <p>{user.email}</p>
          </div>
        ) : (
          <Link href='/sign-in'>
            <div className={styles.button}>로그인</div>
          </Link>
        )}
      </div>
    </header>
  );
}
