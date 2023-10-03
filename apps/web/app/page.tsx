import Image from "next/image";
import Link from "next/link";
import ChatComponent from "./components/chatComponent";

// Prisma does not support Edge without the Data Proxy currently
// export const runtime = 'edge'
export const preferredRegion = "home";
export const dynamic = "force-dynamic";

export default function Home(): JSX.Element {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center">
      <div className="bg-fuchsia-950 p-3 w-[800px] rounded-md text-white">
      <h2 className= "text-2xl"> WIZEPROMPT {"\n"}</h2>
      <h2 className= "text-2x1">GPT-3.5-Turbo Streaming Application</h2>
      <ChatComponent/>
      </div>
    </main>
  );
}
