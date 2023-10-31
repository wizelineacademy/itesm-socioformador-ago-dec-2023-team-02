/**
 * Renders a list of messages in the conversation body.
 * @param messages - An array of Message objects to be displayed.
 * @param userImage - The URL of the image for the user's profile.
 * @param providerImage - The URL of the image for the provider's profile.
 * @returns A JSX element containing the list of messages.
 */

"use client";
import React, { useEffect, useRef, useState } from "react";
import type { Message } from "ai";
import { Divider, Button } from "@nextui-org/react";
import { AiOutlineArrowDown } from "react-icons/ai";
import MessageItem from "@/components/molecules/user/conversationBody/message-item";

export default function MessageList({
  messages,
  userImage,
  providerImage,
}: {
  messages: Message[];
  userImage: string;
  providerImage: string;
}): JSX.Element {
  const [autoScroll, setAutoScroll] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = (): void => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (autoScroll) {
      scrollToBottom();
      setAutoScroll(false);
    }
  }, [autoScroll]);

  return (
    <>
      {/* Messages display */}
      {messages.map((message, index) => (
        <>
          <MessageItem
            key={index}
            message={message}
            senderImage={message.role === "user" ? userImage : providerImage}
            //creditsUsed={message.creditsUsed}
          />
          <Divider className="my-0" />
        </>
      ))}
      <div ref={messagesEndRef} />
      {/* Scroll to bottom button */}
      <div className="fixed z-20 bottom-28 right-5">
        <Button
          isIconOnly
          onClick={() => {
            setAutoScroll(true);
            scrollToBottom();
          }}
          radius="lg"
          size="sm"
        >
          <AiOutlineArrowDown />
        </Button>
      </div>
    </>
  );
}
