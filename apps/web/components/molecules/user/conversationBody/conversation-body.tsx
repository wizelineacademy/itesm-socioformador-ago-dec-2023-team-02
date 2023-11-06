/**
 * ConversationBody component that displays a chat interface and handles user input and AI responses.
 * @returns JSX.Element
 */
"use client";
import React, { useState, useEffect } from 'react';
import MessageList from './message-list';
import PromptTextInput from './prompt-text-input';
import { useChat, } from "ai/react"
import type { Message } from "ai/react"
import { Sender, type Message as WizepromptMessage } from "@prisma/client";
import type { UseChatOptions } from "ai";
import { convertToGptMessage } from '@/lib/helper/gpt/convert-message-type';
import { saveMessage } from '@/lib/helper/data-handles';
import { toast } from 'sonner';
import { useParams } from 'next/navigation';
import ConversationHeader from '../conversationHeader/conversation-top-header';
import { Spinner } from '@nextui-org/react';
import { ConversationUpdateData } from '@/types/conversation-types';

const providerImage =
    "https://avatars.githubusercontent.com/u/86160567?s=200&v=4"; // URL de la imagen del remitente

const userImage = "https://ui-avatars.com/api/?background=007CFF&color=fff&name=David";

const idConv = 23;

/**
 * Extended options for the useChat hook.
 */
interface ExtendedUseChatOptions extends UseChatOptions {
    /**
     * The id of the conversation.
     */
    idConversation: number;
    /**
     * An array of messages to be displayed in the conversation body.
     */
    messages: Message[];

    body: {
        /**
         * The temperature of the conversation, represented as a number.
         */
        temperature: number;
        /**
         * Custom instructions for the conversation.
         */
        customInstructions: string;
        /**
         * Image size
         */
        size: string;
    }
    
}

interface Parameters {
    userContext?: string;
    responseContext?: string;
    temperature?: number;
    size?: string;
}

/**
 * Saves a message to the server.
 * @param message The message to be saved.
 * @returns A Promise that resolves when the message is successfully saved, or rejects if an error occurs.
 */
async function handleSaveMessage(idConversation: number, model: string, sender: Sender, input: string, size: string): Promise<void> {
    try {
        await saveMessage(idConversation, model, sender, input, size);
        toast.success("Model message saved");

    } catch {
        console.log("Error ocurred while saving message.")
        toast.error("Error ocurred while saving message of model.");
    }
}

export default function ConversationBody(): JSX.Element {
    const [messageData, setMessageData] = useState<Message[]>([])
    const [size, setSize] = useState<string>("1024x1024")
    const [isMounted, setIsMounted] = useState<boolean>(false);
    const model = 'dalle';

    const params = useParams();
    const idConversation = Number(params.id);

    // Function that fetches data from messages api route and 
    // sets the content of a message to the first content instance
    async function getData(): Promise<void> {
        const response: Response = await fetch(`/api/conversations/${idConversation}`);
        const data: any = await response.json()
        const messages: WizepromptMessage[] = data.messages;
        const processedData: Message[] = messages.map(convertToGptMessage);

        const parameters: Parameters = data.parameters

        setSize(parameters.size || "1024x1024")
        setMessageData(processedData);
    };

    async function saveParameters(updatedParameters: Parameters): Promise<void> {
    //create objecto for update
    const updatedInfo: ConversationUpdateData = {
      parameters: {
        userContext: updatedParameters.userContext,
        responseContext: updatedParameters.responseContext,
        temperature: updatedParameters.temperature,
        size: updatedParameters.size,
      },
    };

    try {
      // Making a fetch request to the API endpoint.
      const response = await fetch(`/api/conversations/${idConversation}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedInfo),
      });

      // Checking if the response is ok (status code 200-299),
      if (!response.ok) {
        throw new Error("Failed to save parameters");
      }

      // Parsing the JSON response from the API.
      /*
      const result: Parameters = await response.json();
      console.log('result', result);

      setUserContext(result.userContext);
      setResponseContext(result.responseContext);
      setTemperature(result.temperature);
      */
      setIsMounted(false);

      toast.success("Parameters saved");
    } catch (error) {
      console.error("Error saving parameters:", error);
      toast.error("Error saving parameters");
    }
  }

    useEffect(() => {
        void getData();
        setIsMounted(true)
    }, [isMounted, size])

    const options: ExtendedUseChatOptions = {
        idConversation: idConv,
        api: `/api/ai/openai/${model}?size=${size}`,
        initialMessages: messageData,
        messages: messageData,
        body: {
            temperature: 0.5,
            customInstructions: "",
            size
        },
        // onFinish callback function that runs when the response stream is finished
        // Saves the message generated by the model
        onFinish(message) {
            if (model === "dalle") 
                message.content = message.content.replaceAll('"', '')
            void handleSaveMessage(idConv, model, Sender.MODEL, message.content, size)
        },
    };

    // set api route that handleSubmit will use and load initial messages
    const {
        input, // The current value of the input field.
        handleInputChange, // Handler for the onChange event of the input field to control the input's value.
        handleSubmit, // Form submission handler that automatically resets the input field and appends a user message.
        messages, // The current array of chat messages.
        error, // An error object returned by SWR, if any.
        isLoading, // Boolean flag indicating whether a request is currently in progress.
       /*
       stop, // Function that aborts the current request
       reload,//Function to reload the last AI chat response for the given chat history.
       append, //append(message: Message | CreateMessage, chatRequestOptions: { options: { headers, body } }) Function to append a message to the chat, triggering an API call for the AI response.
       */
    } = useChat(options);

    return (
        <div className="pb-36 pt-14">
            <ConversationHeader 
                saveParameters={saveParameters}
                size={size}
            />
            <MessageList messages={messages} providerImage={providerImage} userImage={userImage} model={model} />
            { isLoading ?
                <Spinner label="Generating image" color="danger" className="flex items-center mt-3"/>
                :
                <></>
            }

            {error ?
                <div className="w-full fixed bottom-0 pb-4 z-10 gradient-shadow-light dark:gradient-shadow-dark py-0" role="alert">
                    {error.message}
                </div> :
                <PromptTextInput input={input} handleInputChange={handleInputChange} handleSubmit={handleSubmit} />
            }
        </div>
    );
}
