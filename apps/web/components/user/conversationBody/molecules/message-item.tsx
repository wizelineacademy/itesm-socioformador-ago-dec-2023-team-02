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
  modelName,
}: {
  message: Message; //este podría ser content y solo ser un string, de todos modos este string sería el que copiemos
  //Callback: any;
  senderImage: string;
  modelName: string;
  //creditsUsed: number;
}): JSX.Element {
  let avatarBackgroundColor = "";
  if (modelName === "gpt-4") {
    avatarBackgroundColor = "dark:bg-purple-400 dark:bg-opacity-80 bg-purple-600 bg-opacity-80";
  } else if (modelName === "dalle") {
    avatarBackgroundColor = "dark:bg-sky-400 dark:bg-opacity-80 bg-sky-600 bg-opacity-80";
  } else {
    avatarBackgroundColor = "dark:bg-green-400 dark:bg-opacity-80 bg-green-600 bg-opacity-80";
  }

  return (
    <Card
      className={`${
        message.role === "user" ? "senderUser-bg" : "senderModel-bg"
      } w-full justify-center border-none border-bottom rounded-none shadow-none py-3`}
    >
      <div className="justify-center grid md:grid-cols-[auto,.6fr,auto] xl:grid-cols-[auto,.5fr,auto] grid-cols-1 gap-4 p-4">
        {/* Left column: Sender's image */}
        <div className="flex items-start md:justify-end justify-start">
          <Image
            alt="Sender Image"
            className={`${
              message.role === "user" ? "" : `p-1 ${avatarBackgroundColor}`
            }`}
            height={40}
            radius="md"
            sizes="sm"
            src={senderImage}
            width={35}
          />
        </div>

        {/* Middle column: Message content */}
        <CardBody className="flex items-start max-w-[800px] w-full p-0">
          <MemoizedReactMarkdown
            className="w-full prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0"
            components={{
              p({ children }: { children: React.ReactNode }) {
                return (
                  <p className="mb-2 text-sm text-slate-800 dark:text-slate-200 last:mb-0">
                    {children}
                  </p>
                );
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
                      <span className="w-full text-sm text-slate-800 dark:text-slate-200 mt-1 cursor-default animate-pulse">
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
                    className="text-xs text-slate-800 dark:text-slate-200 mt-1"
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
