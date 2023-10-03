"use client"
import { getAllMessages } from "@/lib/message";
import { useChat, Message, useCompletion } from "ai/react"


export default function ChatComponent(){
    // Vercerl AI SDK (ai package) use chat()
    // useChat -> handles the part of messages for us, handles user inputs, handling user submits, etc.
    const {input, handleInputChange, handleSubmit, isLoading, messages} = useChat({
        api: '/api/ai/openai'
    });
    //messages -> (uses asks a question, gpt-4 response, users asks again, gpt-4 keeps responding)
    console.log(messages);
    console.log(input)

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

                        {/* 
                            Soup is a n international food

                            It´s made in many culinary areas

                            You should eat some.

                            ["Soup is a n international food","", "It´s made in many culinary areas", "", "You should eat some."]

                        */}
                    </div>
                )
             })}
               
            {/*<div>
                <h3 className= "text-lg font-semibold mt-2">GPT-3.5</h3>
                <p>I am the creator of the Soup Kingdom GPT-3.5</p>
            </div>
            <div>
                <h3 className= "text-lg font-semibold mt-2">User</h3>
                <p>I am a user of the soup knowledge</p>
            </div>*/}
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