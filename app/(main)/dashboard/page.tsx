'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { MouseEvent, useEffect, useRef, useState } from 'react';
import { getFolders } from '../../../api/folderApi';
import { FolderType } from '../../../types/common-types';
import { LinkType } from '../../../components/types/types';
import { getLinks } from '../../../api/linkApi';
import { useModal } from '../../../hooks/useModal/useModal';
import AddBar from '../../../components/add-bar';
import styles from './page.module.css';
import LoadingScreen from '../../../components/loading-screen';
import ModalEditFolder from '../../../components/modal/edit-folder';
import ModalShareFolder from '../../../components/modal/share-folder';
import ModalDeleteFolder from '../../../components/modal/delete-folder';
import ModalAddFolder from '../../../components/modal/add-folder';
import checkAddBarVisibility from '../../../utils/addbar-checker';
import FolderBox from '../../../components/folder-box';
import TitleBox from '../../../components/title-box';
import CardBox from '../../../components/card-box';

export default function Dashboard() {
  const router = useRouter();
  const addBarRef = useRef(null);
  const searchParams = useSearchParams();
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
      router.push(`/dashboard?folder=${encodeURIComponent(target.innerText)}`);
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

  useEffect(() => {
    const folderName = searchParams.get('folder');
    if (folders && folderName) {
      const selectedFolder = folders.find((folder) => folder.name === folderName);
      if (selectedFolder) {
        setTitle(selectedFolder.name);
        setSelectedFolderId(selectedFolder.id);
      }
    }
  }, [folders, searchParams]);

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
        <FolderBox title={title} handleSelectedFolder={handleSelectedFolder} folders={folders} openModal={openModal} />
        <TitleBox title={title} openModal={openModal} />
        <CardBox filteredData={filteredData} title={title} selectedFolderId={selectedFolderId} />
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
