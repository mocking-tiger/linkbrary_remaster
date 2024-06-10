import styles from './index.module.css';
import Card from '../card';
import { LinkType } from '../types/types';

type CardBoxType = {
  filteredData: LinkType[] | undefined;
  title: string;
  selectedFolderId: number | undefined;
};

const CardBox = ({ filteredData, title, selectedFolderId }: CardBoxType) => {
  return (
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
  );
};

export default CardBox;
