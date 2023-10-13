"use client"
import { useChat,  } from "ai/react"
import type {Message} from "ai/react"
import type { Sender, Message as WizepromptMessage } from "@prisma/client";
import { useState, useEffect } from "react";
import { UseChatOptions } from "ai";


interface ExtendedUseChatOptions extends UseChatOptions {
    messages: Message[];
    temperature: number;
    customInstructions: string;
}
  

export default function ChatComponent() : JSX.Element {
    const [messageData, setMessageData] = useState<Message[]>([])


    function convertToGptMessage(item: WizepromptMessage): Message {
      let role: "function" | "user" | "assistant" | "system" = item.sender === "USER" ? "user" : "assistant";
      return {
        id: String(item.id),
        role: role,
        content: item.content,
      };
    }
    
    function convertToWizepromptMessage(item: Message): WizepromptMessage {
      let sender: Sender = item.role === "user" ? "USER" : "MODEL";
      return {
        id: Number(item.id),
        idConversation: 1,  // Set this value as needed
        sender: sender,
        content: item.content,
        creditsUsed: 0,  // Set this value as needed
        createdAt: new Date(),  // Set this value as needed
      };
    }


    // Function that fetches data from messages api route and 
    // sets the content of a message to the first content instance
    const getData: () => Promise<void> = async () => {
      const response: Response = await fetch('/api/messages/conversation/1');
      const data: WizepromptMessage[] = await response.json();
      const processedData: Message[] = data.map(convertToGptMessage);
      setMessageData(processedData);
    };

      
    useEffect(() => {
      void getData()
    }, [])

      const options: ExtendedUseChatOptions= {
        api: '/api/ai/openai/gpt-4',
        messages: messageData,
        temperature: 0.5, 
        customInstructions: "",
      };
    
    // set api route that handleSubmit will use and load initial messages
    const {input, handleInputChange, handleSubmit, messages} = useChat(options);


    return (
        <div>
            {messages.map((message : Message) : JSX.Element => {
                return (
                    <div key={message.id}>
                        {/*Displays the name of the person who sent a message*/}
                        {
                            message.role ==="assistant" 
                            ?
                            <h3 className= "text-lg font-semibold mt-2 px-1">
                                GPT-3.5-turbo
                            </h3>
                            :
                            <h3 className= "text-lg font-semibold mt-2 px-1">
                                User
                            </h3>
                        }

                        {/* Formatting the message */}
                        {message.content.split("\n").map((currentTextBlock: string, index : number) => {
                            if(currentTextBlock === ""){
                                return <p className="px-1" key={message.id + index}  />
                            }
                            return <p className="px-1" key={message.id + index} >{currentTextBlock}</p>
                        })}
                    </div>
                )
             })}

            <form className= "mt-12" onSubmit={handleSubmit}>
                <p className="p-1">Users Message</p>
                <textarea 
                    className="mt-2 w-full bg-textarea p-2 rounded-md text-slate-300"
                    onChange={handleInputChange}
                    placeholder="What are data structures and algorithms?"
                    value={input}

                />
                <button className="rounded-md bg-wizelinered p-2 mt-2" type="submit">
                    Send message
                </button>
            </form>
        </div>
    )
}