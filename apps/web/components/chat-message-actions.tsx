"use client";

import { type Message } from "ai";
import { Button } from "@nextui-org/react";
import { IconCheck, IconCopy } from "@/components/ui/icons";
import { useCopyToClipboard } from "@/lib/hooks/use-copy-to-clipboard";
import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";

interface ChatMessageActionsProps extends React.ComponentProps<"div"> {
  message: Message;
}

export function ChatMessageActions({
  message,
  className,
  ...props
}: ChatMessageActionsProps): JSX.Element {
  const { isCopied, copyToClipboard } = useCopyToClipboard({ timeout: 2000 });

  const onCopy = (): void => {
    if (isCopied) return;
    copyToClipboard(message.content);
  };

  return (
    <>
      {/* <div
        className={cn(
          "flex items-center justify-end transition-opacity group-hover:opacity-100 md:opacity-0",
          className
        )}
        {...props}
      >
        <Button isIconOnly onClick={onCopy} variant="ghost">
          {isCopied ? <IconCheck /> : <IconCopy />}
          <span className="sr-only">Copy message</span>
        </Button>
      </div> */}
      <Button isIconOnly onClick={onCopy} variant="ghost">
        {isCopied ? <IconCheck /> : <IconCopy />}
        <span className="sr-only">Copy message</span>
      </Button>
    </>
  );
}
