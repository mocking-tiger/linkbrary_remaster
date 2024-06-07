import Image from 'next/image';
import styles from './index.module.css';

const ModalShareFolder = ({
  selectedFolderId,
  closeModal,
  title,
}: {
  selectedFolderId: number | undefined;
  closeModal: () => void;
  title: string;
}) => {
  const URL = `https://linkbrary-remaster.vercel.app/shared/${selectedFolderId}`;

  const copyClipboard = () => {
    navigator.clipboard.writeText(URL);
    alert('클립보드에 복사되었습니다');
    closeModal();
  };

  return (
    <div className={styles.container}>
      <h2>{title}</h2>
      <div className={styles.imageBox}>
        <div>
          <Image src='/images/kakao.png' width={42} height={42} alt='' />
          <h3>카카오톡</h3>
        </div>
        <div>
          <Image src='/images/facebook.png' width={42} height={42} alt='' />
          <h3>페이스북</h3>
        </div>
        <div onClick={copyClipboard}>
          <div>
            <Image src='/images/clipboard.png' width={42} height={42} alt='' />
          </div>
          <h3>링크 복사</h3>
        </div>
      </div>
    </div>
  );
};

export default ModalShareFolder;
