import styles from './index.module.css';

const ModalButton = ({ children, onClick, type }: { children: string; onClick: () => void; type: string }) => {
  return (
    <div>
      <div className={`${styles.button} ${styles[type]}`} onClick={onClick}>
        {children}
      </div>
    </div>
  );
};

export default ModalButton;
