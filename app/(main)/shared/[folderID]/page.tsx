import { getFolderForShare } from '../../../../api/folderApi';
import { getLinkForShare } from '../../../../api/linkApi';
import { getUserForShare } from '../../../../api/userApi';
import { LinkType } from '../../../../components/types/types';
import Image from 'next/image';
import styles from './page.module.css';
import SearchBar from '../../../../components/search-bar';
import Card from '../../../../components/card';

interface PropsType {
  params: {
    folderID: string;
  };
}

async function getFolder(id: string) {
  const response = await getFolderForShare(Number(id));
  return response?.data.data[0];
}

async function getUser(id: number) {
  const response = await getUserForShare(id);
  return response?.data.data[0];
}

async function getLinks(folder: number, user: number) {
  const response = await getLinkForShare(folder, user);
  return response?.data.data;
}

export default async function Shared(props: PropsType) {
  const folder = await getFolder(props.params.folderID);
  const user = await getUser(folder.user_id);
  const links = await getLinks(folder.id, folder.user_id);
  console.log(folder);
  console.log(user);
  console.log(links);
  return (
    <div className={styles.container}>
      <div className={styles.folderInfo}>
        <Image src={user.image_source} width={60} height={60} alt='프로필이미지' />
        <p>@{user.name}</p>
        <h1>{folder.name}</h1>
      </div>
      <main className={styles.dashboard}>
        <SearchBar />
        <div className={styles.cardBox}>
          {links.length === 0 ? (
            <div className={styles.empty}>저장된 링크가 없습니다</div>
          ) : (
            links.map((link: LinkType) => <Card link={link} key={link.id} forShare />)
          )}
        </div>
      </main>
    </div>
  );
}
