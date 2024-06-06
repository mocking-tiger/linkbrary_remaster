'use client';

import { useCallback, useState, useEffect } from 'react';
import { ReactNode } from 'react';
import ReactDOM from 'react-dom';
import styles from './useModal.module.css';
import Image from 'next/image';

interface ModalProps {
  name: string;
  children: ReactNode;
  title: string;
}

export const useModal = () => {
  const [modalName, setModalName] = useState('');
  const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const root = document.getElementById('modal-root') as HTMLElement;
    setModalRoot(root);
  }, []);

  const openModal = (name: string) => {
    setModalName(name);
  };

  const closeModal = () => {
    setModalName('');
  };

  const Modal = useCallback(
    ({ name, children, title }: ModalProps) => {
      return ReactDOM.createPortal(
        name === modalName ? (
          <div className={styles.outside} onClick={closeModal}>
            <div className={styles.content} onClick={(e) => e.stopPropagation()}>
              <Image
                className={styles.close}
                src='/icons/modal-close.svg'
                width={24}
                height={24}
                alt='모달닫기버튼'
                onClick={closeModal}
              />
              <h1 className={styles.title}>{title}</h1>
              {children}
            </div>
          </div>
        ) : null,
        modalRoot as HTMLElement,
      );
    },
    [modalName, modalRoot],
  );

  return { Modal, openModal };
};
