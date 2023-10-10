"use client"
import { useChat,  } from "ai/react"
import type {Message} from "ai/react"
import { useState, useEffect } from "react";

interface WizepromptMessage {
    id: string;
    createdAt?: Date;
    content: string;
    role: 'system' | 'user' | 'assistant' | 'function';
    name?: string;
    function_call?: string | {arguments?: string, name?: string};
    sender?: string;
    creditsUsed?: number;
    idConversation?: number;
}

export default function ChatComponent(){
    const [messageData, setMessageData] = useState<Message[]>([])


    const getData = async () => {
        const response = await fetch('/api/messages/conversation/2');
        const data: Message[] = await response.json(); // Explicitly set the type here
        const processedData: Message[] = data.map((item: Message) => {
          return {
            ...item,
            content: item.content[0],
          };
        });
        setMessageData(processedData);
      };

      
    
    useEffect(() => {
      void getData()
    }, [])



    function saveMessage(messages: WizepromptMessage[]) {
        messages.forEach((message: WizepromptMessage) => {
          message.sender = message.role === 'user' ? 'USER' : 'MODEL';
        });
      }
    
    // Vercerl AI SDK (ai package) use chat()
    // useChat -> handles the part of messages for us, handles user inputs, handling user submits, etc.
    const {input, handleInputChange, handleSubmit, messages} = useChat({
        api: '/api/ai/openai',
        initialMessages: messageData
    });
    //messages -> (uses asks a question, gpt-4 response, users asks again, gpt-4 keeps responding)
    // console.log(messages);
    // console.log(input)

    console.log('last:', messages[messages.length - 1])
    saveMessage(messages)

    return (
        <div>
            {messages.map((message : Message) => {
                return (
                    <div key={message.id}>
                        {/*Name of the person talking */}
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
                                return <p key={message.id + index} className="px-1"></p> // " "
                            }
                            else {
                                return <p key={message.id + index} className="px-1">{currentTextBlock}</p>
                            }
                        })}
                    </div>
                )
             })}

            <form className= "mt-12" onSubmit={handleSubmit}>
                <p className="p-1">Users Message</p>
                <textarea 
                    className="mt-2 w-full bg-textarea p-2 rounded-md text-slate-300"
                    placeholder={"What are data structures and algorithms?"}
                    value={input}
                    onChange={handleInputChange}

                />
                <button className="rounded-md bg-wizelinered p-2 mt-2">
                    Send message
                </button>
            </form>
        </div>
    )
}

