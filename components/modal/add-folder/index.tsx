import { useState } from 'react';
import ModalButton from '../../modal-button';
import styles from './index.module.css';
import LoadingScreen from '../../loading-screen';
import { addFolder } from '../../../api/folderApi';

const ModalAddFolder = ({ closeModal }: { closeModal: () => void }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState('');

  const handleAddFolder = async () => {
    setIsLoading(true);
    await addFolder(title);
    closeModal();
    setIsLoading(false);
    location.reload();
  };

  return (
    <div className={styles.container}>
      {isLoading && <LoadingScreen />}
      <input type='text' onChange={(e) => setTitle(e.target.value)} placeholder='내용 입력' />
      <ModalButton type='blue' onClick={handleAddFolder}>
        추가하기
      </ModalButton>
    </div>
  );
};

export default ModalAddFolder;
