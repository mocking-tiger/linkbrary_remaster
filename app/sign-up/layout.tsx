export const metadata = {
  title: '회원가입',
};

export default function SignUpLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ko'>
      <body>{children}</body>
    </html>
  );
}
