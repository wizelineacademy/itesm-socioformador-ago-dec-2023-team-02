import ChatComponent from "./components/chat-component";

// Prisma does not support Edge without the Data Proxy currently
// export const runtime = 'edge'
export const preferredRegion = "home";
export const dynamic = "force-dynamic";

export default function Home(): JSX.Element {
  return (
    <main className="relative flex min-h-screen flex-col bg-background items-center justify-center">
      <div className="bg-chatbg p-3 w-[800px] rounded-md text-white">
      <h2 className= "text-2xl text-center"> WizePrompt {"\n"}</h2>
      <h2 className= "text-2x1 text-center">GPT-3.5-Turbo</h2>
      <ChatComponent/>
      </div>
    </main>
  );
}
