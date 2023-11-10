
export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}): any {
  return (
    <html lang="es" suppressHydrationWarning>
      <body>
        {children}
      </body>
    </html>
  );
}
  