import ModalButton from '../../modal-button';
import styles from './index.module.css';

const ModalEditFolder = () => {
  return (
    <div className={styles.container}>
      dfdf
      <ModalButton onClick={() => alert('버튼')} type='blue'>
        폴더공유
      </ModalButton>
    </div>
  );
};

export default ModalEditFolder;
