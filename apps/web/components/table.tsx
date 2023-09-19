import Image from "next/image";
import type { users as Users } from "@prisma/client";
import prisma from "@/lib/prisma";
import { timeAgo } from "@/lib/utils";
import RefreshButton from "./refresh-button";

export default async function Table(): Promise<JSX.Element> {
  const startTime = Date.now();
  const users: Users[] = await prisma.users.findMany();
  const duration = Date.now() - startTime;

  return (
    <div className="bg-white/30 p-12 shadow-xl ring-1 ring-gray-900/5 rounded-lg backdrop-blur-lg max-w-xl mx-auto w-full">
      <div className="flex justify-between items-center mb-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold">Recent Users</h2>
          <p className="text-sm text-gray-500">
            Fetched {users.length} users in {duration}ms
          </p>
        </div>
        <RefreshButton />
      </div>
      <div className="divide-y divide-gray-900/5">
        {users.map((user: Users) => (
          <div
            className="flex items-center justify-between py-3"
            key={user.name}
          >
            <div className="flex items-center space-x-4">
              <Image
                alt={user.name}
                className="rounded-full ring-1 ring-gray-900/5"
                height={48}
                src={user.image}
                width={48}
              />
              <div className="space-y-1">
                <p className="font-medium leading-none">{user.name}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>
            <p className="text-sm text-gray-500">{timeAgo(user.createdAt)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
