import '../styles/globals.css';

export const metadata = {
  title: {
    template: 'Linkbrary | %s',
    default: 'Linkbrary',
  },
  description: '세상의 모든 정보를 쉽게 저장하고 관리해 보세요.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ko'>
      <head>
        <meta property='og:image' content='/images/meta-thumbnail.png' />
      </head>
      <body>{children}</body>
    </html>
  );
}
