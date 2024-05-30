import Image from 'next/image';
import style from './page.module.css';
import Link from 'next/link';

export default function SignIn() {
  return (
    <div className={style.container}>
      <div className={style.contents}>
        <div className={style.logoBox}>
          <Image src='/icons/logo.svg' width={218} height={78} alt='로고' />
          <span>
            회원이 아니신가요? <Link href='/sign-up'>회원가입 하기</Link>
          </span>
        </div>
        <div className={style.inputBox}>
          <h2>이메일</h2>
          <input type='text' />
          <h2>비밀번호</h2>
          <input type='password' />
        </div>
        <div className={style.buttonBox}>
          <div>로그인</div>
          <div>
            소셜로그인
            <div>
              <Image src='/icons/login-google.svg' width={42} height={42} alt='소셜로그인 아이콘-구글' />
              <Image src='/icons/login-kakao.svg' width={42} height={42} alt='소셜로그인 아이콘-구글' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
