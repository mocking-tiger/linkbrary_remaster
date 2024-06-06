import { useState } from 'react';
import ModalButton from '../../modal-button';
import styles from './index.module.css';
import LoadingScreen from '../../loading-screen';
import { deleteFolder } from '../../../api/folderApi';

const ModalDeleteFolder = ({
  selectedFolderId,
  closeModal,
  title,
}: {
  selectedFolderId: number | undefined;
  closeModal: () => void;
  title: string;
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteFolder = async () => {
    setIsLoading(true);
    await deleteFolder(selectedFolderId as number);
    closeModal();
    setIsLoading(false);
    location.reload();
  };

  return (
    <div className={styles.container}>
      {isLoading && <LoadingScreen />}
      <h6>{title}</h6>
      <ModalButton onClick={handleDeleteFolder} type='red'>
        삭제하기
      </ModalButton>
    </div>
  );
};

export default ModalDeleteFolder;
