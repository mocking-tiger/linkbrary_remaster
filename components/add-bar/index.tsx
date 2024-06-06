'use client';

import { useModal } from '../../hooks/useModal/useModal';
import Image from 'next/image';
import styles from './index.module.css';
import ModalAddLink from '../modal/add-link';

export default function AddBar() {
  const { Modal, openModal } = useModal();

  return (
    <div className={styles.container}>
      <Image src='/icons/link.svg' width={20} height={20} alt='링크 아이콘' />
      <input type='text' placeholder='링크를 추가해 보세요' />
      <button onClick={() => openModal('add-link')}>추가하기</button>
      <Modal name='add-link' title='폴더에 추가'>
        <ModalAddLink />
      </Modal>
    </div>
  );
}
