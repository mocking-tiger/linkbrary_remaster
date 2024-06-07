import { Metadata } from 'next';
import '../styles/globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://linkbrary-remaster.vercel.app/'),
  title: {
    template: 'Linkbrary | %s',
    default: 'Linkbrary',
  },
  description: '세상의 모든 정보를 쉽게 저장하고 관리해 보세요.',
  openGraph: {
    images: [
      {
        url: '/images/meta-thumbnail.png',
        alt: '링크브러리 오픈그래프 이미지',
      },
    ],
  },
  twitter: {
    images: [
      {
        url: '/images/meta-thumbnail.png',
        alt: '링크브러리 트위터 이미지',
      },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ko'>
      <head>
        <script src='https://developers.kakao.com/sdk/js/kakao.js'></script>
      </head>
      <body>{children}</body>
    </html>
  );
}
