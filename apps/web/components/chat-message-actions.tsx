"use client";

import { type Message } from "ai";
import { Button } from "@nextui-org/react";
import { IconCheck, IconCopy } from "@/components/ui/icons";
import { useCopyToClipboard } from "@/lib/hooks/use-copy-to-clipboard";

interface ChatMessageActionsProps extends React.ComponentProps<"div"> {
  message: Message;
}

export function ChatMessageActions({
  message,
}: ChatMessageActionsProps): JSX.Element {
  const { isCopied, copyToClipboard } = useCopyToClipboard({ timeout: 2000 });

  const onCopy = (): void => {
    if (isCopied) return;
    copyToClipboard(message.content);
  };

  return (
    <Button isIconOnly onClick={onCopy} size="sm" variant="light">
      {isCopied ? <IconCheck /> : <IconCopy />}
      <span className="sr-only">Copy message</span>
    </Button>
  );
}
