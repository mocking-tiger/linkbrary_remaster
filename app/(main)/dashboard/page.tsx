'use client';

import { useRouter } from 'next/navigation';
import { MouseEvent, useEffect, useState } from 'react';
import { getFolders } from '../../../api/folderApi';
import { FolderType } from '../../../types/common-types';
import AddBar from '../../../components/add-bar';
import styles from './page.module.css';
import LoadingScreen from '../../../components/loading-screen';
import Image from 'next/image';

export default function Dashboard() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [folders, setFolders] = useState<FolderType[] | undefined>();
  const [title, setTitle] = useState('전체');

  const handleFoldersInfo = async () => {
    setIsLoading(true);
    const response = await getFolders();
    setFolders(response);
    console.log(response);
    setIsLoading(false);
  };

  const handleSelectedFolder = (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
    const target = e.target as HTMLDivElement;
    if (target && target.innerText) {
      setTitle(target.innerText);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem('accessToken')) {
      router.push('/');
    } else {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    handleFoldersInfo();
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.addBox}>
        <AddBar />
      </div>
      <main className={styles.dashboard}>
        <input type='text' placeholder='링크를 검색해 보세요' className={styles.searchBar} />
        <div className={styles.folderBox}>
          <div className={styles.folder} onClick={(e) => handleSelectedFolder(e)}>
            전체
          </div>
          <div className={styles.folder} onClick={(e) => handleSelectedFolder(e)}>
            ⭐️ 즐겨찾기
          </div>
          {folders &&
            folders
              .slice()
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((folder) => (
                <div className={styles.folder} onClick={(e) => handleSelectedFolder(e)} key={folder.id}>
                  {folder.name}
                </div>
              ))}
        </div>
        <div className={styles.titleBox}>
          <h2 className={styles.folderTitle}>{title}</h2>
          {title !== '전체' ? (
            <div className={styles.tools}>
              <h3>
                <Image src='/icons/folder-share.svg' width={18} height={18} alt='공유아이콘' />
                공유
              </h3>
              <h3>
                <Image src='/icons/folder-edit.svg' width={18} height={18} alt='공유아이콘' />
                이름 변경
              </h3>
              <h3>
                <Image src='/icons/folder-delete.svg' width={18} height={18} alt='공유아이콘' />
                삭제
              </h3>
            </div>
          ) : (
            ''
          )}
        </div>
        <div className={styles.empty}>저장된 링크가 없습니다</div>
      </main>
    </div>
  );
}
