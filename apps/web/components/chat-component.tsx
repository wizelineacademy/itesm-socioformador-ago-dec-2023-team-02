"use client";
import { Button } from "@nextui-org/react";
import { useChat } from "ai/react";
import type { Message } from "ai/react";
import { useState, useEffect } from "react";

// Interface that includes the Message schemas attributes, as well as the Message type from ai/react
interface WizepromptMessage {
  id: string;
  createdAt?: Date;
  content: string;
  role: "system" | "user" | "assistant" | "function";
  name?: string;
  function_call?: string | { arguments?: string; name?: string };
  sender?: string;
  creditsUsed?: number;
  idConversation?: number;
}

export default function ChatComponent(): JSX.Element {
  const [messageData, setMessageData] = useState<Message[]>([]);

  // Function that fetches data from messages api route and
  // sets the content of a message to the first content instance
  const getData: () => Promise<void> = async () => {
    const response: Response = await fetch("/api/messages/conversation/2");
    const data: Message[] = await response.json(); // Explicitly set the type here
    const processedData: Message[] = data.map((item: Message): Message => {
      return {
        ...item,
        content: item.content[0],
      };
    });
    setMessageData(processedData);
  };

  useEffect(() => {
    void getData();
  }, []);

  // function that will use the post method in messages api route
  // sets the sender of a message before saving
  function saveMessage(messages: WizepromptMessage[]): void {
    messages.forEach((message: WizepromptMessage) => {
      message.sender = message.role === "user" ? "USER" : "MODEL";
    });
  }

  // set api route that handleSubmit will use and load initial messages
  const { input, handleInputChange, handleSubmit, messages } = useChat({
    api: "/api/ai/openai",
    initialMessages: messageData,
  });

  saveMessage(messages);

  return (
    <div>
      {messages.map((message: Message): JSX.Element => {
        return (
          <div key={message.id}>
            {/*Displays the name of the person who sent a message*/}
            {message.role === "assistant" ? (
              <h3 className="text-lg font-semibold mt-2 px-1">GPT-3.5-turbo</h3>
            ) : (
              <h3 className="text-lg font-semibold mt-2 px-1">User</h3>
            )}

            {/* Formatting the message */}
            {message.content
              .split("\n")
              .map((currentTextBlock: string, index: number) => {
                if (currentTextBlock === "") {
                  return <p className="px-1" key={message.id + index} />;
                }
                return (
                  <p className="px-1" key={message.id + index}>
                    {currentTextBlock}
                  </p>
                );
              })}
          </div>
        );
      })}

      <form className="mt-12" onSubmit={handleSubmit}>
        <p className="p-1">Users Message</p>
        <textarea
          className="mt-2 w-full bg-textarea p-2 rounded-md text-slate-300"
          onChange={handleInputChange}
          placeholder="What are data structures and algorithms?"
          value={input}
        />
        {/* <button className="rounded-md bg-wizelinered p-2 mt-2" type="submit">
                    Send message
                </button> */}
        <Button type="submit">Send message</Button>
      </form>
    </div>
  );
}
