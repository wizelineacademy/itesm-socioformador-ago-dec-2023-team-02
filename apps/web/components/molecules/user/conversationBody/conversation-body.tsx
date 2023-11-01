/**
 * ConversationBody component that displays a chat interface and handles user input and AI responses.
 * @returns JSX.Element
 */
"use client";
import React, { useState, useEffect } from "react";
import MessageList from "./message-list";
import PromptTextInput from "./prompt-text-input";
import { useChat } from "ai/react";
import type { Message } from "ai/react";
import { Sender, type Message as WizepromptMessage } from "@prisma/client";
import type { UseChatOptions } from "ai";
import { convertToGptMessage } from "@/lib/helper/gpt/convert-message-type";
import { saveMessage } from "@/lib/helper/data-handles";
import { toast } from "sonner";
import ConversationHeader from "../conversationHeader/conversation-top-header";
import { useParams } from "next/navigation";

const providerImage =
  "https://avatars.githubusercontent.com/u/86160567?s=200&v=4"; // URL de la imagen del remitente

const userImage =
  "https://ui-avatars.com/api/?background=007CFF&color=fff&name=David";

/**
 * Extended options for the useChat hook.
 */
interface ExtendedUseChatOptions extends UseChatOptions {
  /**
   * An array of messages to be displayed in the conversation body.
   */
  messages: Message[];

  body:{
    /**
   * The user context for a conversation.
   */
  userContext: string;
  /**
   * The response context for a conversation
   */
  responseContext: string;
  /**
   * The temperature of the conversation, represented as a number.
   */
  temperature: number;
  }
}

interface Parameters {
  userContext: string;
  responseContext: string;
  temperature: number;
}

/**
 * Saves a message to the server.
 * @param message The message to be saved.
 * @returns A Promise that resolves when the message is successfully saved, or rejects if an error occurs.
 */
async function handleSaveMessage(
  idConversation: number,
  model: string,
  sender: Sender,
  input: string
): Promise<void> {
  try {
    await saveMessage(idConversation, model, sender, input);
    toast.success("Model message saved");
  } catch {
    console.log("Error ocurred while saving message.");
    toast.error("Error ocurred while saving message of user.");
  }
}

export default function ConversationBody(): JSX.Element {
  // initialMessages: Message[],
  //parameters: any
  const [messageData, setMessageData] = useState<Message[]>([]);
  const [userContext, setUserContext] = useState<string>("");
  const [responseContext, setResponseContext] = useState<string>("");
  const [temperature, setTemperature] = useState<number>(0.7);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const model = "gpt-4";

  const params = useParams();
  const idConversation = Number(params.id);

  // Function that fetches data from messages api route and
  // sets the content of a message to the first content instance
  // Function to fetch conversation data from the API
  // and update component state with the fetched data.
  async function getData(): Promise<void> {
    /*
    const response: Response = await fetch('/api/messages/conversation/1');
    const data: WizepromptMessage[] = await response.json();
    const processedData: Message[] = data.map(convertToGptMessage);
    setMessageData(processedData);
    */
    const response: Response = await fetch(
      `/api/conversations/${idConversation}`
    );
    // Checking if the response is ok (status code 200-299),
    // otherwise throwing an error.
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }

    // Parsing the JSON response from the API.
    const data: any = await response.json();

    // Extracting the messages from the conversation object.
    const messages: WizepromptMessage[] = data.messages;
    // Processing the messages data.
    const processedData: Message[] = messages.map(convertToGptMessage);

    // Extracting the context parameters from the conversation object.
    const parameters: Parameters = data.parameters;

    // Updating the component state with the processed messages data
    setUserContext(parameters.userContext);
    setResponseContext(parameters.responseContext);
    setTemperature(parameters.temperature);
    setMessageData(processedData);
  }
  /*
    try {
      // Making a fetch request to the API endpoint.
      const response: Response = await fetch(
        `/api/conversation/${idConversation}`
      );

      // Checking if the response is ok (status code 200-299),
      // otherwise throwing an error.
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }

      // Parsing the JSON response from the API.
      const data: any = await response.json();

      // Extracting the messages from the conversation object.
      const messages: WizepromptMessage[] = data.messages;
      // Processing the messages data.
      const processedData: Message[] = messages.map(convertToGptMessage);

      // Extracting the context parameters from the conversation object.
      const parameters: Parameters = data.parameters;

      // Updating the component state with the processed messages data
      setUserContext(parameters.userContext);
      setResponseContext(parameters.responseContext);
      setTemperature(parameters.temperature);
      setMessageData(processedData);
    } catch (error) {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    }
  }
  */

  //podria actualizarse solo cuando messages se actualice
  useEffect(() => {
    void getData();
    setIsMounted(true);
  }, [isMounted]);

  const options: ExtendedUseChatOptions = {
    api: `/api/ai/openai/${model}?userContext=${userContext}&responseContext=${responseContext}&temperature=${temperature}`,
    initialMessages: messageData,
    messages: messageData, 
    body:{
      userContext: userContext,
      responseContext: responseContext,
      temperature: temperature,
    },

    // onFinish callback function that runs when the response stream is finished
    // Saves the message generated by the model
    onFinish(message) {
      void handleSaveMessage(
        idConversation,
        model,
        Sender.MODEL,
        message.content
      );
    },
  };

  // set api route that handleSubmit will use and load initial messages
  const {
    input, // The current value of the input field.
    handleInputChange, // Handler for the onChange event of the input field to control the input's value.
    handleSubmit, // Form submission handler that automatically resets the input field and appends a user message.
    messages, // The current array of chat messages.
    error, // An error object returned by SWR, if any.

    /*
       isLoading, // Boolean flag indicating whether a request is currently in progress.
       stop, // Function that aborts the current request
       reload,//Function to reload the last AI chat response for the given chat history.
       append, //append(message: Message | CreateMessage, chatRequestOptions: { options: { headers, body } }) Function to append a message to the chat, triggering an API call for the AI response.
       */
  } = useChat(options);

  return (
    <div className="pb-36">
      <ConversationHeader
        userContext={userContext}
        responseContext={responseContext}
        temperature={temperature}
      />

      <MessageList
        messages={messages}
        providerImage={providerImage}
        userImage={userImage}
      />

      {error ? (
        <div
          className="w-full fixed bottom-0 pb-4 z-10 gradient-shadow-light dark:gradient-shadow-dark py-0"
          role="alert"
        >
          {error.message}
        </div>
      ) : (
        <PromptTextInput
          idConversation={idConversation}
          input={input}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  );
}
