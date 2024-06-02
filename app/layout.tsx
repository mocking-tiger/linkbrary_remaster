import { Metadata } from 'next';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: {
    template: 'Linkbrary | %s',
    default: 'Linkbrary',
  },
  description: '세상의 모든 정보를 쉽게 저장하고 관리해 보세요.',
  openGraph: {
    images: '/images/meta-thumbnail.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ko'>
      <body>{children}</body>
    </html>
  );
}
