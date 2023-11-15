"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Button } from "@/components/ui/button";

export default function Home(): JSX.Element {
  const { user } = useUser();
  const router = useRouter();

  return (
    <section>
      <Image
        alt="Wizeline Office"
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        // quality={100}
        src="/assets/wizeline-background.jpeg"
        style={{ position: "absolute", top: 0, left: 0 }}
      />
      <div
        className="flex flex-col min-h-screen bg-transparent absolute top-0 left-0 right-0 bottom-0 overflow-hidden"
        key="1"
      >
        <header className="p-4 lg:p-6 flex items-center justify-between">
          <Image
            alt="Logo"
            height={48}
            src="./assets/wizeline.svg"
            width={48}
          />
        </header>
        <main className="h-screen relative">
          <section className="flex flex-col justify-center items-center text-center px-4 md:px-6 mt-20 md:mt-32 lg:mt-48">
            <h1 className="text-3xl sm:text-5xl font-bold text-gray-100">
              Welcome to&nbsp;
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E83D45] to-[#892329] shadow-md dark:from-[#E83D45] dark:to-[#892329] dark:shadow-md">
                WizePrompt
              </span>
            </h1>
            <p className="text-xl sm:text-2xl mt-4 text-gray-300">
              The centralised platform for all your AI needs.
            </p>
            {!user ? (
              <Button
                className="w-20 mt-8 px-6 py-3 text-base font-medium rounded-md text-white bg-gray-800 hover:bg-gray-700"
                onClick={() => {
                  router.push("/api/auth/login");
                }}
              >
                Login
              </Button>
            ) : (
              <Button
                className="w-30 mt-8 px-6 py-3 text-base font-medium rounded-md text-white bg-gray-800 hover:bg-gray-700"
                onClick={() => {
                  router.push("/conversation/new");
                }}
              >
                Get Started
              </Button>
            )}
          </section>
        </main>
      </div>
    </section>
  );
}
