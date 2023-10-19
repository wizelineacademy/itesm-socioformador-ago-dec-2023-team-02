"use client";

/**
 * Provides context providers for the app.
 * @param children - The child components to be wrapped by the providers.
 * @param themeProps - The theme provider props.
 * @returns The JSX element containing the wrapped child components.
 */

import * as React from "react";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes/dist/types";
//import { UserProvider } from "@auth0/nextjs-auth0/client";

export interface ProvidersProps {
  children: JSX.Element | JSX.Element[];
  themeProps?: ThemeProviderProps;
}

export function Providers({
  children,
  themeProps,
}: ProvidersProps): JSX.Element {
  return (
    //<UserProvider>
      <NextUIProvider>
        <NextThemesProvider {...themeProps} enableSystem>
          {children}
        </NextThemesProvider>
      </NextUIProvider>
    //</UserProvider>
  );
}
