'use client';

import { useRouter } from 'next/navigation';
import { MouseEvent, useEffect, useRef, useState } from 'react';
import { getFolders } from '../../../api/folderApi';
import { FolderType } from '../../../types/common-types';
import { LinkType } from '../../../components/types/types';
import { getLinks } from '../../../api/linkApi';
import { useModal } from '../../../hooks/useModal/useModal';
import AddBar from '../../../components/add-bar';
import styles from './page.module.css';
import LoadingScreen from '../../../components/loading-screen';
import Image from 'next/image';
import Card from '../../../components/card';
import ModalEditFolder from '../../../components/modal/edit-folder';
import ModalShareFolder from '../../../components/modal/share-folder';
import ModalDeleteFolder from '../../../components/modal/delete-folder';
import ModalAddFolder from '../../../components/modal/add-folder';

export default function Dashboard() {
  const router = useRouter();
  const addBarRef = useRef(null);
  const { Modal, openModal, closeModal } = useModal();
  const [isAddBarVisible, setIsAddBarVisible] = useState(true);
  const [isBottom, setIsBottom] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [folders, setFolders] = useState<FolderType[] | undefined>();
  const [links, setLinks] = useState<LinkType[] | []>([]);
  const [title, setTitle] = useState('전체');
  const [filteredData, setFilteredData] = useState<LinkType[]>();
  const [selectedFolderId, setSelectedFolderId] = useState<number | undefined>(undefined);

  const handleFoldersInfo = async () => {
    setIsLoading(true);
    const folderResponse = await getFolders();
    setFolders(folderResponse);
    const linkResponse = await getLinks();
    setLinks(linkResponse);
    setFilteredData(linkResponse);
    setIsLoading(false);
  };

  const handleSelectedFolder = (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>, folderId?: number) => {
    const target = e.target as HTMLDivElement;
    if (target && target.innerText) {
      setTitle(target.innerText);
      setSelectedFolderId(folderId);
    }
  };

  const handleFilteredData = (word: string) => {
    const lowerCaseWord = word.toLowerCase();
    const filteredLinks = links.filter((link) => {
      return (
        link.description?.toLowerCase().includes(lowerCaseWord) ||
        link.title.toLowerCase().includes(lowerCaseWord) ||
        link.url.toLowerCase().includes(lowerCaseWord)
      );
    });
    if (word !== '') {
      setFilteredData(filteredLinks);
    } else {
      setFilteredData(links);
    }
  };

  const checkAddBarVisibility = (addBar: HTMLDivElement) => {
    const rect = addBar.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    return rect.bottom >= 0 && rect.top <= windowHeight;
  };
  //cp
  useEffect(() => {
    if (!localStorage.getItem('accessToken')) {
      router.push('/');
    } else {
      setIsLoading(false);
    }
    handleFoldersInfo();
    const handleScroll = () => {
      const addBar = addBarRef.current;
      if (addBar) {
        const isVisible = checkAddBarVisibility(addBar);
        setIsAddBarVisible(isVisible);
      }
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        setIsBottom(true);
      } else {
        setIsBottom(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.addBox} ref={addBarRef}>
        <AddBar />
      </div>
      <main className={styles.dashboard}>
        <input
          type='text'
          placeholder='링크를 검색해 보세요'
          className={styles.searchBar}
          onChange={(e) => {
            handleFilteredData(e.target.value);
          }}
        />
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
        <div className={styles.titleBox}>
          <h2 className={styles.folderTitle}>{title}</h2>
          {title !== '전체' && (
            <div className={styles.tools}>
              <h3 onClick={() => openModal('folder-share')}>
                <Image src='/icons/folder-share.svg' width={18} height={18} alt='공유아이콘' />
                공유
              </h3>
              <h3 onClick={() => openModal('folder-edit')}>
                <Image src='/icons/folder-edit.svg' width={18} height={18} alt='공유아이콘' />
                이름 변경
              </h3>
              <h3 onClick={() => openModal('folder-delete')}>
                <Image src='/icons/folder-delete.svg' width={18} height={18} alt='공유아이콘' />
                삭제
              </h3>
            </div>
          )}
        </div>
        <div className={styles.cardBox}>
          {filteredData && title === '전체'
            ? filteredData.map((link) => <Card link={link} key={link.id} />)
            : filteredData &&
              filteredData.map((link) => link.folder_id === selectedFolderId && <Card link={link} key={link.id} />)}
          {filteredData &&
            title !== '전체' &&
            filteredData.find((link) => link.folder_id === selectedFolderId) === undefined && (
              <div className={styles.empty}>저장된 링크가 없습니다</div>
            )}
          {title === '전체' && filteredData?.length === 0 && <div className={styles.empty}>저장된 링크가 없습니다</div>}
        </div>
      </main>
      {!isAddBarVisible && !isBottom && (
        <div className={`${styles.addBox} ${styles.fixed}`}>
          <AddBar />
        </div>
      )}
      <Modal name='folder-share' title='폴더 공유'>
        <ModalShareFolder selectedFolderId={selectedFolderId} closeModal={closeModal} title={title} />
      </Modal>
      <Modal name='folder-edit' title='폴더 이름 변경'>
        <ModalEditFolder selectedFolderId={selectedFolderId} closeModal={closeModal} />
      </Modal>
      <Modal name='folder-delete' title='폴더 삭제'>
        <ModalDeleteFolder selectedFolderId={selectedFolderId} closeModal={closeModal} title={title} />
      </Modal>
      <Modal name='folder-add' title='폴더 추가'>
        <ModalAddFolder closeModal={closeModal} />
      </Modal>
    </div>
  );
}
