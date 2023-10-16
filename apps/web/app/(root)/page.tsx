"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button, Spinner } from "@nextui-org/react";

export default function Home(): JSX.Element {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <section className="w-full h-screen py-[50%] md:py-24 lg:py-32 xl:py-48 bg-black relative">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 items-center">
          <div className="flex flex-col justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-heading1-bold font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
                WizePrompt
              </h1>
              <h2 className="max-w-[600px] text-zinc-200 md:text-xl dark:text-zync-100 mx-auto">
                Enterprise Centralized AI Platform
              </h2>
            </div>
            <div className="w-full max-w-sm space-y-2 mx-auto">
              {isLoading ? (
                <Spinner />
              ) : (
                <Button
                  onClick={() => {
                    setIsLoading(true);
                    router.push("/api/auth/login");
                    setIsLoading(false);
                  }}
                >
                  Sign in
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
      <footer className="absolute bottom-10 w-full text-center">
        <p className="text-xs text-zinc-400">Version 1.0.0</p>
      </footer>
    </section>
  );
}
