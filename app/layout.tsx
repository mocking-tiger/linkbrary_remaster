import '../styles/globals.css';

export const metadata = {
  title: {
    template: 'Linkbrary | %s',
    default: 'Linkbrary',
  },
  description: '세상의 모든 정보를 쉽게 저장하고 관리해 보세요.',
  keyword: ['link', 'linkbrary', '즐겨찾기', '바로가기', '링크', '링크브러리', '공유', '편리', '정보'],
  ogImage: '/images/meta-thumbnail.png',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ko'>
      <body>{children}</body>
    </html>
  );
}
