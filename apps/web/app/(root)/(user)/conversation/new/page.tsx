import ChatComponent from "@/components/chat-component";
// Prisma does not support Edge without the Data Proxy currently
// export const runtime = 'edge'
export const preferredRegion = "home";
export const dynamic = "force-dynamic";

function HomePage(): any {
  return (
    <div>
      <ChatComponent />
    </div>
  );
}

export default HomePage;
