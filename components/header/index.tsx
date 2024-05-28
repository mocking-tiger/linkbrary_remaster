import Link from 'next/link';

export default function Header() {
  return (
    <header>
      헤더입니다.
      <Link href="/sign-in">로그인</Link>
    </header>
  );
}
