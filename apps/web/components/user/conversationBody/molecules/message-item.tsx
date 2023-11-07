/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable prefer-named-capture-group */
/* eslint-disable @typescript-eslint/prefer-optional-chain */
/* eslint-disable react/no-unstable-nested-components */
/**
 * Renders a message item component with sender's image, message content and copy message button.
 * @param message - The message object containing the message content and role (user or model).
 * @param senderImage - The URL of the sender's image.
 * @returns A JSX element representing the message item component.
 */
"use client";
import type { Message } from "ai";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { Card, CardBody, Image } from "@nextui-org/react";
import React from "react";
import { MemoizedReactMarkdown } from "@/components/markdown";
import { CodeBlock } from "@/components/ui/codeblock";
import { ChatMessageActions } from "@/components/chat-message-actions";

// Define the MessageItem component
export default function MessageItem({
  message,
  //Callback,
  senderImage, //creditsUsed,
}: {
  message: Message; //este podría ser content y solo ser un string, de todos modos este string sería el que copiemos
  //Callback: any;
  senderImage: string;
  //creditsUsed: number;
}): JSX.Element {
  return (
    <Card
      className={`${
        message.role === "user" ? "senderUser-bg" : "senderModel-bg"
      } w-full justify-center border-none border-bottom rounded-none shadow-none py-3`}
    >
      <div className="justify-center grid md:grid-cols-[auto,.7fr,auto] xl:grid-cols-[.25fr,.5fr,.25fr] grid-cols-1 gap-4 p-4">
        {/* Left column: Sender's image */}
        <div className="flex items-start md:justify-end justify-start">
          <Image
          className="p-1"
          sizes="sm"
            alt="Sender Image"
            height={40}
            radius="md"
            src={senderImage}
            width={35}
          />
        </div>

        {/* Middle column: Message content */}
        <CardBody className="flex items-center max-w-[800px] w-full p-0">
          <MemoizedReactMarkdown
            className="prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0"
            components={{
              p({ children }: { children: React.ReactNode }) {
                return <p className="mb-2 last:mb-0">{children}</p>;
              },
              code({
                _node,
                inline,
                className,
                children,
                ...props
              }: any): JSX.Element {
                if (children.length) {
                  if (children[0] === "▍") {
                    return (
                      <span className="mt-1 cursor-default animate-pulse">
                        ▍
                      </span>
                    );
                  }

                  children[0] = (children[0] as string).replace("`▍`", "▍");
                }

                const match = /language-(\w+)/.exec(className || "");

                if (inline) {
                  return (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                }

                return (
                  <CodeBlock
                    key={Math.random()}
                    language={(match && match[1]) || ""}
                    value={String(children).replace(/\n$/, "")}
                    {...props}
                  />
                );
              },
            }}
            remarkPlugins={[remarkGfm, remarkMath]}
          >
            {message.content}
          </MemoizedReactMarkdown>
        </CardBody>

        {/* Right column: Copy Message button */}
        <div className="flex items-start md:justify-start justify-end p-0 m-0">
          <ChatMessageActions message={message} />
        </div>
      </div>
    </Card>
  );
}
