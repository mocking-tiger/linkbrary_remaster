import Link from 'next/link';
import styles from './index.module.css';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.contents}>
        <div className={styles.contentLeft}>
          <h3>©링크브러리 리마스터 프로젝트 - 2024</h3>
        </div>
        <div className={styles.contentCenter}>
          <Link href='/privacy-policy'>
            <h3>Privacy Policy</h3>
          </Link>
          <Link href='/faq'>
            <h3>FAQ</h3>
          </Link>
        </div>
        <div className={styles.contentRight}>
          <Link href='https://facebook.com' target='_blank'>
            <Image src='/icons/footer-facebook.svg' width={20} height={20} alt='페이스북 아이콘' />
          </Link>
          <Link href='https://twitter.com' target='_blank'>
            <Image src='/icons/footer-twitter.svg' width={20} height={20} alt='트위터 아이콘' />
          </Link>
          <Link href='https://youtube.com' target='_blank'>
            <Image src='/icons/footer-youtube.svg' width={20} height={20} alt='유튜브 아이콘' />
          </Link>
          <Link href='https://instagram.com' target='_blank'>
            <Image src='/icons/footer-instagram.svg' width={20} height={20} alt='인스타그램 아이콘' />
          </Link>
        </div>
      </div>
    </footer>
  );
}
