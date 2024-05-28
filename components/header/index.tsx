import Link from 'next/link';
import styles from './index.module.css';
import Image from 'next/image';

export default function Header() {
  return (
    <header className={styles.header}>
      <div>
        <Link href="/">
          <Image
            src="/icons/logo.svg"
            width={133}
            height={24}
            alt="로고"
            className={styles.logo}
          />
        </Link>
        <Link href="/sign-in">
          <div className={styles.button}>로그인</div>
        </Link>
      </div>
    </header>
  );
}
