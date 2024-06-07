import Image from 'next/image';
import styles from './index.module.css';
import { shareKakao } from '../../../utils/share-kakao';

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

  const shareFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${URL}`,
      '페이스북 공유하기',
      'width=400,height=500,location=no,status=no,scrollbars=yes',
    );
    closeModal();
  };

  return (
    <div className={styles.container}>
      <h2>{title}</h2>
      <div className={styles.imageBox}>
        <div
          onClick={() => {
            shareKakao(URL, title);
            closeModal();
          }}
        >
          <Image src='/images/kakao.png' width={42} height={42} alt='' />
          <h3>카카오톡</h3>
        </div>
        <div onClick={shareFacebook}>
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
