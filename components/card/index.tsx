'use client';

import { useState } from 'react';
import { LinkType } from '../types/types';
import { useModal } from '../../hooks/useModal/useModal';
import Image from 'next/image';
import styles from './index.module.css';
import getTimeDifference from '../../utils/time-checker';
import ModalDeleteLink from '../modal/delete-link';
import ModalAddLink from '../modal/add-link';

type props = {
  link: LinkType;
  forShare?: boolean;
};

export default function Card({ link, forShare }: props) {
  const { Modal, openModal, closeModal } = useModal();
  const [isPopOver, setIsPopOver] = useState(false);

  const handlePopOver = () => {
    setIsPopOver((prev) => !prev);
  };

  const handleImageClick = () => {
    let url = link.url;
    if (!/^https?:\/\//i.test(url)) {
      url = `https://${url}`;
    }
    window.open(url, '_blank');
  };

  return (
    <div className={styles.container}>
      <div className={styles.imageBox} onClick={handleImageClick}>
        <Image
          className={link.image_source ? '' : styles.default}
          src={link.image_source ? link.image_source : '/icons/logo.svg'}
          width={340}
          height={200}
          alt='링크 이미지'
        />
      </div>
      <div className={styles.textBox}>
        <div>
          <h5>{getTimeDifference(link.created_at)}</h5>
          {!forShare && (
            <Image src='/icons/kebab.svg' width={21} height={17} alt='케밥아이콘' onClick={handlePopOver} />
          )}{' '}
          {isPopOver && (
            <div className={styles.popOver}>
              <h5 onClick={() => openModal('delete-link')}>삭제하기</h5>
              <h5 onClick={() => openModal('add-link')}>폴더에 추가</h5>
            </div>
          )}
        </div>
        <p>{link.description ? link.description : link.url}</p>
        <h6>{link.created_at.slice(0, 10)}</h6>
      </div>
      {!forShare && (
        <div>
          <Modal name='delete-link' title='링크 삭제'>
            <ModalDeleteLink id={link.id} url={link.url} closeModal={closeModal} />
          </Modal>
          <Modal name='add-link' title='폴더에 추가'>
            <ModalAddLink url={link.url} closeModal={closeModal} />
          </Modal>
        </div>
      )}
    </div>
  );
}
