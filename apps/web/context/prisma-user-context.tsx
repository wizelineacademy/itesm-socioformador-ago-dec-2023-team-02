"use client";

import type { User } from "@prisma/client";
import { createContext } from "react";

export const PrismaUserContext = createContext<User | null>(null)

interface PrismaUserContextProviderProps {
    children: JSX.Element;
    prismaUser: User | null;
}

export function PrismaUserContextProvider({children, prismaUser}: PrismaUserContextProviderProps): JSX.Element {

    return (
        <PrismaUserContext.Provider value={prismaUser}>
            {children}
        </PrismaUserContext.Provider>
    );
}