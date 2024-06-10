import styles from './index.module.css';
import Image from 'next/image';

const TitleBox = ({ title, openModal }: { title: string; openModal: (name: string) => void }) => {
  return (
    <div className={styles.titleBox}>
      <h2 className={styles.folderTitle}>{title}</h2>
      {title !== '전체' && (
        <div className={styles.tools}>
          <h3 onClick={() => openModal('folder-share')}>
            <Image src='/icons/folder-share.svg' width={18} height={18} alt='공유아이콘' />
            공유
          </h3>
          <h3 onClick={() => openModal('folder-edit')}>
            <Image src='/icons/folder-edit.svg' width={18} height={18} alt='공유아이콘' />
            이름 변경
          </h3>
          <h3 onClick={() => openModal('folder-delete')}>
            <Image src='/icons/folder-delete.svg' width={18} height={18} alt='공유아이콘' />
            삭제
          </h3>
        </div>
      )}
    </div>
  );
};

export default TitleBox;
