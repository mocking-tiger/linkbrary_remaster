'use client';

import { useEffect, useState } from 'react';
import { signUp } from '../../api/authApi';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import style from './page.module.css';
import Link from 'next/link';
import LoadingScreen from '../../components/loading-screen';

export default function SignUp() {
  const router = useRouter();
  const [isVisivle, setIsVisivle] = useState([false, false]);
  const [isInvalidEmail, setIsInvalidEmail] = useState(false);
  const [isInvalidPassword, setIsInvalidPassword] = useState(false);
  const [isInvalidPasswordRepeat, setIsInvalidPasswordRepeat] = useState(false);
  const [typeOfEmailError, setTypeOfEmailError] = useState('');
  const [typeOfPasswordError, setTypeOfPasswordError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const handleIsVisible = (index: number) => {
    setIsVisivle((current) => current.map((visibility, idx) => (idx === index ? !visibility : visibility)));
  };

  const handleInputWarning = (e: React.FocusEvent<HTMLInputElement>) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    const value = e.target.value;

    if (e.target.name === 'email') {
      if (value === '') {
        setIsInvalidEmail((current) => !current);
        setTypeOfEmailError('이메일을 입력해주세요.');
      } else if (!emailRegex.test(value)) {
        setIsInvalidEmail((current) => !current);
        setTypeOfEmailError('올바른 이메일 주소가 아닙니다.');
      }
    } else if (e.target.name === 'password') {
      if (value === '') {
        setIsInvalidPassword((current) => !current);
        setTypeOfPasswordError('비밀번호를 입력해주세요.');
      } else if (!passwordRegex.test(value)) {
        setIsInvalidPassword((current) => !current);
        setTypeOfPasswordError('비밀번호는 영문, 숫자 조합 8자 이상 입력해 주세요.');
      }
    } else if (e.target.name === 'password-repeat') {
      if (value !== password) {
        setIsInvalidPasswordRepeat(true);
      }
    }
    if (password === passwordRepeat) {
      setIsInvalidPasswordRepeat(false);
    } else {
      setIsInvalidPasswordRepeat(true);
    }
  };

  const handleEnterKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      WIP();
    }
  };

  const handleSignUp = async () => {
    setIsLoading(true);
    const response = await signUp(email, password);
    if (response) {
      alert('회원가입이 완료되었습니다.');
      router.push('/');
    }
    setIsLoading(false);
  };

  const WIP = () => {
    alert('개발중입니다.');
  };

  useEffect(() => {
    setIsLoading(true);
    if (localStorage.getItem('accessToken')) {
      router.push('/dashboard');
    } else {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className={style.container} onKeyDown={(e) => handleEnterKey(e)}>
      {isLoading && <LoadingScreen />}
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
          <label htmlFor='email'>
            <h2>이메일</h2>
            <input
              id='email'
              type='text'
              name='email'
              onBlur={(e) => handleInputWarning(e)}
              onFocus={() => setIsInvalidEmail(false)}
              onChange={(e) => setEmail(e.target.value)}
              className={isInvalidEmail ? style.invalidate : ''}
            />
          </label>
          <h6 className={isInvalidEmail ? '' : style.disabled}>{isInvalidEmail && typeOfEmailError}</h6>
          <label htmlFor='password'>
            <h2>비밀번호</h2>
            <input
              id='password'
              type={isVisivle[0] ? 'text' : 'password'}
              name='password'
              onBlur={(e) => handleInputWarning(e)}
              onFocus={() => setIsInvalidPassword(false)}
              onChange={(e) => setPassword(e.target.value)}
              className={isInvalidPassword ? style.invalidate : ''}
            />
            <Image
              src={isVisivle[0] ? '/icons/eye-on.svg' : '/icons/eye-off.svg'}
              width={16}
              height={16}
              alt='비밀번호 노출 아이콘'
              onClick={() => handleIsVisible(0)}
            />
          </label>
          <h6 className={isInvalidPassword ? '' : style.disabled}>{isInvalidPassword && typeOfPasswordError}</h6>
          <label htmlFor='password-repeat'>
            <h2>비밀번호 확인</h2>
            <input
              id='password-repeat'
              type={isVisivle[1] ? 'text' : 'password'}
              name='password-repeat'
              onBlur={(e) => handleInputWarning(e)}
              onFocus={() => setIsInvalidPasswordRepeat(false)}
              onChange={(e) => setPasswordRepeat(e.target.value)}
              className={isInvalidPasswordRepeat ? style.invalidate : ''}
            />
            <Image
              src={isVisivle[1] ? '/icons/eye-on.svg' : '/icons/eye-off.svg'}
              width={16}
              height={16}
              alt='비밀번호 노출 아이콘'
              onClick={() => handleIsVisible(1)}
            />
          </label>
          <h6 className={isInvalidPasswordRepeat ? '' : style.disabled}>
            {isInvalidPasswordRepeat ? '비밀번호가 일치하지 않아요.' : ''}
          </h6>
        </div>
        <div className={style.buttonBox}>
          <button
            className={style.loginButton}
            onClick={handleSignUp}
            disabled={
              email === '' || password === '' || passwordRepeat === '' || password !== passwordRepeat ? true : false
            }
          >
            회원가입
          </button>
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
