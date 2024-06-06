import { useState } from 'react';
import { deleteLink } from '../../../api/linkApi';
import LoadingScreen from '../../loading-screen';
import ModalButton from '../../modal-button';
import styles from './index.module.css';

const ModalDeleteLink = ({ id, closeModal, url }: { id: number; closeModal: () => void; url: string }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteLink = async () => {
    setIsLoading(true);
    await deleteLink(id);
    closeModal();
    setIsLoading(false);
    location.reload();
  };

  return (
    <div className={styles.container}>
      {isLoading && <LoadingScreen />}
      <h6>{url}</h6>
      <ModalButton type='red' onClick={handleDeleteLink}>
        삭제하기
      </ModalButton>
    </div>
  );
};

export default ModalDeleteLink;
