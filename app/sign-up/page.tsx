'use client';

import Image from 'next/image';
import style from './page.module.css';
import Link from 'next/link';

export default function SignUp() {
  const WIP = () => {
    alert('개발중입니다.');
  };

  return (
    <div className={style.container}>
      <div className={style.contents}>
        <div className={style.logoBox}>
          <Link href='/'>
            <Image src='/icons/logo.svg' width={218} height={78} alt='로고' />
          </Link>
          <span>
            이미 회원이신가요? <Link href='/sign-in'>로그인 하기</Link>
          </span>
        </div>
        <div className={style.inputBox}>
          <h2>이메일</h2>
          <input type='text' />
          <h2>비밀번호</h2>
          <input type='password' />
          <h2>비밀번호 확인</h2>
          <input type='password' />
        </div>
        <div className={style.buttonBox}>
          <div className={style.loginButton} onClick={WIP}>
            회원가입
          </div>
          <div className={style.socialLoginBox}>
            <h2>다른 방식으로 가입하기</h2>
            <div>
              <Image src='/icons/login-google.svg' width={42} height={42} alt='소셜로그인 아이콘-구글' onClick={WIP} />
              <Image src='/icons/login-kakao.svg' width={42} height={42} alt='소셜로그인 아이콘-구글' onClick={WIP} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
