'use client';

import { useModal } from '../../hooks/useModal/useModal';
import Image from 'next/image';
import styles from './index.module.css';
import ModalAddLink from '../modal/add-link';
import { useState } from 'react';

export default function AddBar() {
  const { Modal, openModal, closeModal } = useModal();
  const [url, setUrl] = useState('');

  return (
    <div className={styles.container}>
      <Image src='/icons/link.svg' width={20} height={20} alt='링크 아이콘' />
      <input type='text' placeholder='링크를 추가해 보세요' onChange={(e) => setUrl(e.target.value)} />
      <button onClick={url !== '' ? () => openModal('add-link') : () => alert('추가할 url을 입력해주세요')}>
        추가하기
      </button>
      <Modal name='add-link' title='폴더에 추가'>
        <ModalAddLink url={url} closeModal={closeModal} />
      </Modal>
    </div>
  );
}
