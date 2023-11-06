"use client";

import * as React from "react";

export interface UseCopyToClipboardProps {
  timeout?: number;
}

export function useCopyToClipboard({
  timeout = 2000,
}: UseCopyToClipboardProps): {
  isCopied: boolean;
  copyToClipboard: (value: string) => void;
} {
  const [isCopied, setIsCopied] = React.useState<boolean>(false);

  const copyToClipboard = (value: string): void => {
    if (typeof window === "undefined" || !navigator.clipboard?.writeText) {
      return;
    }

    if (!value) {
      return;
    }

    navigator.clipboard
      .writeText(value)
      .then(() => {
        setIsCopied(true);

        setTimeout(() => {
          setIsCopied(false);
        }, timeout);
      })
      .catch((err) => {
        console.error("Error al copiar el texto: ", err);
      });
  };

  return { isCopied, copyToClipboard };
}
