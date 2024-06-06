'use client';

import { useUserStore } from '../../zustand/userStore';
import Link from 'next/link';
import styles from './index.module.css';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter();
  const user = useUserStore((state) => state.userInfo);
  const logOut = useUserStore((state) => state.clearUserInfo);
  const [isPopOver, setIsPopOver] = useState(false);

  const handlePopOver = () => {
    setIsPopOver((prev) => !prev);
  };

  const handleLogOut = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    logOut();
    router.push('/');
  };
  return (
    <header className={styles.header}>
      <div>
        <Link href={user.id === 0 ? '/' : '/dashboard'}>
          <Image src='/icons/logo.svg' width={133} height={24} alt='로고' className={styles.logo} />
        </Link>
        {user.id !== 0 ? (
          <div className={styles.userBox} onClick={handlePopOver}>
            <Image src={user.image_source} width={28} height={28} alt='프로필 이미지' />
            <p>{user.email}</p>
            {isPopOver && (
              <div className={styles.popover} onClick={handleLogOut}>
                로그아웃
              </div>
            )}
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
