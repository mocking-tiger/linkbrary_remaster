import { useState } from 'react';
import { editFolderName } from '../../../api/folderApi';
import ModalButton from '../../modal-button';
import styles from './index.module.css';
import LoadingScreen from '../../loading-screen';

const ModalEditFolder = ({
  selectedFolderId,
  closeModal,
}: {
  selectedFolderId: number | undefined;
  closeModal: () => void;
}) => {
  const [title, setTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleEditFolderName = async () => {
    setIsLoading(true);
    await editFolderName(selectedFolderId, title);
    closeModal();
    setIsLoading(false);
    location.reload();
  };

  return (
    <div className={styles.container}>
      {isLoading && <LoadingScreen />}
      <input type='text' onChange={(e) => setTitle(e.target.value)} />
      <ModalButton onClick={handleEditFolderName} type='blue'>
        폴더공유
      </ModalButton>
    </div>
  );
};

export default ModalEditFolder;
