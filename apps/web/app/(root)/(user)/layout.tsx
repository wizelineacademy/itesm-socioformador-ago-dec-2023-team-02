export default function UserRootLayout({
  children,
}: {
  children: React.ReactNode;
}): any {
  return (
    <html lang="es" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
