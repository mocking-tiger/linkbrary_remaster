import { LinkType } from '../types/types';
import Image from 'next/image';
import styles from './index.module.css';
import getTimeDifference from '../../utils/time-checker';

type props = {
  link: LinkType;
};

export default function Card({ link }: props) {
  return (
    <div className={styles.container}>
      <div className={styles.imageBox} onClick={() => window.open(link.url)}>
        <Image
          className={link.image_source ? '' : styles.default}
          src={link.image_source ? link.image_source : '/icons/logo.svg'}
          width={340}
          height={200}
          alt='링크 이미지'
        />
      </div>
      <div className={styles.textBox}>
        <div>
          <h5>{getTimeDifference(link.created_at)}</h5>
          <Image src='/icons/kebab.svg' width={21} height={17} alt='케밥아이콘' />
        </div>
        <p>{link.description ? link.description : link.url}</p>
        <h6>{link.created_at.slice(0, 10)}</h6>
      </div>
    </div>
  );
}
