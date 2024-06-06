import { useEffect, useState } from 'react';
import { useUserStore } from '../../../zustand/userStore';
import { FolderDetailType } from '../../types/types';
import LoadingScreen from '../../loading-screen';
import styles from './index.module.css';
import { getFolderDetail } from '../../../api/folderApi';
import ModalButton from '../../modal-button';
import Image from 'next/image';
import { addLink } from '../../../api/linkApi';

const ModalAddLink = ({ url, closeModal }: { url: string; closeModal: () => void }) => {
  const user = useUserStore((state) => state.userInfo);
  const [isLoading, setIsLoading] = useState(false);
  const [folders, setFolders] = useState<FolderDetailType[] | undefined>();
  const [selectedId, setSelectedId] = useState<number>();
  console.log(user);

  const setFolderDetail = async () => {
    setIsLoading(true);
    const response = await getFolderDetail(user.id);
    setFolders(response);
    console.log(response);
    setIsLoading(false);
  };

  const handleAddLink = async () => {
    setIsLoading(true);
    await addLink(selectedId, url);
    closeModal();
    setIsLoading(false);
    location.reload();
  };

  useEffect(() => {
    setFolderDetail();
  }, []);

  return (
    <div className={styles.container}>
      {isLoading && <LoadingScreen />}
      <h6>{url}</h6>
      <div className={styles.folderBox}>
        {folders &&
          folders.map((folder) => (
            <div
              key={folder.id}
              className={`${styles.folder} ${folder.id === selectedId ? styles.selected : ''}`}
              onClick={() => setSelectedId(folder.id)}
            >
              <h2>{folder.name}</h2>
              <h3>{folder.link.count}개 링크</h3>
              {folder.id === selectedId && <Image src='/icons/check.svg' width={14} height={14} alt='체크아이콘' />}
            </div>
          ))}
      </div>
      <ModalButton type='blue' onClick={handleAddLink}>
        추가하기
      </ModalButton>
    </div>
  );
};

export default ModalAddLink;
