export const metadata = {
  title: '로그인',
};

export default function SignInLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ko'>
      <body>{children}</body>
    </html>
  );
}
