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
import { Divider, Button, Spinner } from "@nextui-org/react";
import { AiOutlineArrowDown } from "react-icons/ai";
import MessageItem from "@/components/user/conversationBody/molecules/message-item";

export default function MessageList({
  messages,
  userImage,
  providerImage,
  modelName,
  isLoading,
}: {
  messages: Message[];
  userImage: string;
  providerImage: string;
  modelName: string;
  isLoading: boolean;
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
    scrollToBottom(); //scroll to bottom when new message is added
  }, [autoScroll, messages]);

  return (
    <div className="pb-32">
      {/* Messages display */}
      {messages.map((message, index) => (
        <div key={index}>
          <MessageItem
            key={index}
            message={message}
            modelName={modelName}
            senderImage={message.role === "user" ? userImage : providerImage}
            //creditsUsed={message.creditsUsed}
          />
          <Divider className="my-0" />
        </div>
      ))}
      <div ref={messagesEndRef}>
        {isLoading ? 
          <Spinner className="flex items-center mt-2" color="danger" label="Generating response"/>
        :
          <div/>
        }
      </div>
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
    </div>
  );
}
