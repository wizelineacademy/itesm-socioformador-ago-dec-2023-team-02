// Prisma does not support Edge without the Data Proxy currently
// export const runtime = 'edge'
export const preferredRegion = "home";
export const dynamic = "force-dynamic";

export default function Home(): JSX.Element {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center">
      <a href="/api/auth/login">login</a>
    </main>
  );
}
