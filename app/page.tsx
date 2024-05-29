import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.css';
import Header from '../components/header';
import Footer from '../components/footer';

export default function Main() {
  return (
    <div className={styles.container}>
      <Header />

      <main className={styles.main}>
        <div>
          <h1>
            <span>세상의 모든 정보</span>를<br />
            쉽게 저장하고
            <br className={styles.mainBr} /> 관리해 보세요
          </h1>
          <Link href='/sign-up'>
            <div className={styles.button}>링크 추가하기</div>
          </Link>
          <Image src='/images/main-image.png' width={1118} height={659} alt='메인이미지' className={styles.image} />
        </div>
      </main>

      <section className={`${styles.section} ${styles.section1}`}>
        <div>
          <div className={styles.textBox}>
            <h2>
              <span>원하는 링크</span>를 저장하세요
            </h2>
            <p>나중에 읽고 싶은 글, 다시 보고 싶은 영상, 사고 싶은 옷, 기억하고 싶은 모든 것을 한 공간에 저장하세요.</p>
          </div>
          <Image
            src='/images/section-image1.png'
            width={550}
            height={450}
            alt='섹션이미지1'
            className={styles.sectionImage}
          />
        </div>
      </section>

      <section className={`${styles.section} ${styles.section2}`}>
        <div>
          <Image
            src='/images/section-image2.png'
            width={550}
            height={450}
            alt='섹션이미지2'
            className={styles.sectionImage}
          />
          <div className={styles.textBox}>
            <h2>
              링크를 폴더로 <span>관리</span>하세요
            </h2>
            <p>나만의 폴더를 무제한으로 만들고 다양하게 활용할 수 있습니다.</p>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.section3}`}>
        <div>
          <div className={styles.textBox}>
            <h2>
              저장한 링크를 <span>공유</span>해 보세요
            </h2>
            <p>여러 링크를 폴더에 담고 공유할 수 있습니다. 가족, 친구, 동료들에게 쉽고 빠르게 링크를 공유해 보세요.</p>
          </div>
          <Image
            src='/images/section-image3.png'
            width={570}
            height={469}
            alt='섹션이미지3'
            className={styles.sectionImage}
          />
        </div>
      </section>

      <section className={`${styles.section} ${styles.section4}`}>
        <div>
          <Image
            src='/images/section-image4.png'
            width={550}
            height={450}
            alt='섹션이미지4'
            className={styles.sectionImage}
          />
          <div className={styles.textBox}>
            <h2>
              저장한 링크를 <span>검색</span>해 보세요
            </h2>
            <p>중요한 정보들을 검색으로 쉽게 찾아보세요.</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
