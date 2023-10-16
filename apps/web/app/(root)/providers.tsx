"use client";

import * as React from "react";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes/dist/types";
import { UserProvider } from "@auth0/nextjs-auth0/client";

export interface ProvidersProps {
  children: JSX.Element | JSX.Element[];
  themeProps?: ThemeProviderProps;
}

export function Providers({
  children,
  themeProps,
}: ProvidersProps): JSX.Element {
  return (
    <UserProvider>
      <NextUIProvider>
        <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
      </NextUIProvider>
    </UserProvider>
  );
}
