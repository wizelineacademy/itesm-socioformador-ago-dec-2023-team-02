"use client";
import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/react";

export default function LoginButton(user: any): JSX.Element {
  const router = useRouter();

  return (
    <>
      {!user ? (
        <Button
          className="w-20 mt-8 px-6 py-3"
          onClick={() => {
            router.push("/api/auth/login");
          }}
        >
          Login
        </Button>
      ) : (
        <Button
          className="w-30 mt-8 px-6 py-3"
          onClick={() => {
            router.push("/conversation/new");
          }}
        >
          Get Started
        </Button>
      )}
    </>
  );
}
