import { MouseEvent } from 'react';
import styles from './index.module.css';
import Image from 'next/image';
import { FolderType } from '../../types/common-types';

type FolderBoxType = {
  title: string;
  handleSelectedFolder: (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>, id?: number) => void;
  folders: FolderType[] | undefined;
  openModal: (name: string) => void;
};

const FolderBox = ({ title, handleSelectedFolder, folders, openModal }: FolderBoxType) => {
  return (
    <div className={styles.folderBox}>
      <div
        className={`${styles.folder} ${title === '전체' ? styles.selected : ''}`}
        onClick={(e) => handleSelectedFolder(e)}
      >
        전체
      </div>
      {folders &&
        folders
          .slice()
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((folder) => (
            <div
              className={`${styles.folder} ${title === folder.name ? styles.selected : ''}`}
              onClick={(e) => handleSelectedFolder(e, folder.id)}
              key={folder.id}
            >
              {folder.name}
            </div>
          ))}
      <Image
        src='/icons/folder-add.svg'
        width={16}
        height={16}
        alt='폴더추가아이콘'
        onClick={() => openModal('folder-add')}
      />
      <div className={styles.floatingActionButton} onClick={() => openModal('folder-add')}>
        폴더 추가 +
      </div>
    </div>
  );
};

export default FolderBox;
