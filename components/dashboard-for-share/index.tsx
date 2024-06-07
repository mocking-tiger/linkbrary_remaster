'use client';

import { useState } from 'react';
import styles from './index.module.css';
import { LinkType } from '../types/types';
import Card from '../card';

type SearchType = {
  links: LinkType[];
};

const DashboardForShare = ({ links }: SearchType) => {
  const [filteredData, setFilteredData] = useState(links);

  const handleFilteredData = (word: string) => {
    const lowerCaseWord = word.toLowerCase();
    const filteredLinks = links.filter((link) => {
      return (
        link.description?.toLowerCase().includes(lowerCaseWord) ||
        link.title.toLowerCase().includes(lowerCaseWord) ||
        link.url.toLowerCase().includes(lowerCaseWord)
      );
    });
    if (word === '') {
      setFilteredData(links);
    } else {
      setFilteredData(filteredLinks);
    }
  };

  return (
    <main className={styles.dashboard}>
      <input
        type='text'
        placeholder='링크를 검색해 보세요'
        className={styles.searchBar}
        onChange={(e) => handleFilteredData(e.target.value)}
      />
      <div className={styles.cardBox}>
        {filteredData.length === 0 ? (
          <div className={styles.empty}>저장된 링크가 없습니다</div>
        ) : (
          filteredData.map((link: LinkType) => <Card link={link} key={link.id} forShare />)
        )}
      </div>
    </main>
  );
};

export default DashboardForShare;
