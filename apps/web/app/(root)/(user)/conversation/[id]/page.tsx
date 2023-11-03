import ConversationBody from "@/components/molecules/user/conversationBody/conversation-body";
/*
import { getConversationById } from "@/lib/conversation";
import { getAllMessages } from "@/lib/message";
import { Conversation, Message as WizepromptMessage } from "@prisma/client";
import { convertToGptMessage } from "@/lib/helper/gpt/convert-message-type";
import { Message } from "ai";
import ConversationHeader from "@/components/molecules/user/conversationHeader/conversation-top-header";
import PromptTextInput from "@/components/molecules/user/conversationBody/prompt-text-input";
import MessageList from "@/components/molecules/user/conversationBody/message-list";
import { JsonObject, JsonValue } from "@prisma/client/runtime/library";

const providerImage =
  "https://avatars.githubusercontent.com/u/86160567?s=200&v=4"; // URL de la imagen del remitente

const userImage =
  "https://ui-avatars.com/api/?background=007CFF&color=fff&name=David";

interface ConversationParameters {
  userContext: String;
  responseContext: String;
  temperature: Number;
}
*/
export default function ConversationPage(): JSX.Element {
  /*
  //get conversation data from api
  const conversationData = await getConversationById(id);

  //get messages of conversation
  const messagesData = await getAllMessages(id);

  //validate data


  //convert messages to gpt messages
  const wizePromptMessages: WizepromptMessage[] = messagesData.data || [];
  const messages: Message[] = wizePromptMessages.map(convertToGptMessage);

  //set parameters
  const conversation = conversationData.data || {} as Conversation;
  const parameters = conversation.parameters || {userContext: "", responseContext: "", temperature: 0.5} as ConversationParameters;
  //const userContextParameters = parameters.userContext || "";
  */

  return (
    <ConversationBody/>
  );
}