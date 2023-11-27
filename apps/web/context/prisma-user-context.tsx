"use client";

import type { User } from "@prisma/client";
import { createContext, useState } from "react";

export interface PrismaUserContextShape {
  prismaUser: User;
  setPrismaUser: React.Dispatch<React.SetStateAction<User>>;
  creditsRemaining?: number;
}

export const PrismaUserContext = createContext<PrismaUserContextShape | null>(
  null
);

interface PrismaUserContextProviderProps {
  children: JSX.Element;
  initialPrismaUser: User;
}

export function PrismaUserContextProvider({
  children,
  initialPrismaUser,
}: PrismaUserContextProviderProps): JSX.Element {
  const [prismaUser, setPrismaUser] = useState<User>(initialPrismaUser);

  return (
    <PrismaUserContext.Provider value={{ prismaUser, setPrismaUser }}>
      {children}
    </PrismaUserContext.Provider>
  );
}
