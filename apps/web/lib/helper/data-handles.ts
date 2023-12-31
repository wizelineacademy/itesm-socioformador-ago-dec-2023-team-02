import type { User } from "@prisma/client";
import { Sender } from "@prisma/client";
import type { MessageDataInput } from "@/lib/message";
import { calculateCredits, calculateTokens } from "./gpt/credits-and-tokens";

/**
 * Asynchronously saves a message to the server.
 * @param {number} idConversation - The ID of the conversation to which the message belongs.
 * @param {string} model - The model used, e.g., 'gpt-4'.
 * @param {Sender} sender - The sender of the message (either USER or MODEL).
 * @param {string} input - The content of the message.
 * @returns {Promise<void>} - A Promise that resolves when the message is successfully saved.
 * @throws Will throw an error if the fetch request fails.
 */
export async function saveMessage(
  idConversation: number,
  idUser: number,
  model: string,
  sender: Sender,
  input: string,
  size: string,
  onUserCreditsReduction: (updatedUser: User) => void
): Promise<void> {
  // Calculate the number of tokens in the message content.
  const tokens: number = calculateTokens(input);

  // Construct the message data object to be saved.
  const messageInfo: MessageDataInput = {
    idConversation,
    content: input,
    sender,
    // Determine the credits used based on the sender (User or Model).
    creditsUsed: calculateCredits(tokens, model, sender === Sender.USER, size),
  };

  // Make a POST request to save the message data to the server.
  // If the fetch request fails, an error will be thrown and needs to be caught by the calling code.
  await fetch("/api/messages", {
    method: "POST",
    body: JSON.stringify(messageInfo),
  });

  // Update the current conversation's createdAt property, which is used to indicate when it was last interacted with. 
  if (sender === Sender.MODEL){
    await fetch(`/api/conversations/${idConversation}`, {
      method: "PATCH",
      body: JSON.stringify({updateCreatedAt: true}),
    });
  }

  if (messageInfo.creditsUsed > 0){
    // Reduce the current user's remaining credits. 
    const creditReductionFetchOptions: RequestInit = {
      method: "PATCH",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({creditReduction: messageInfo.creditsUsed})
    }
    
    fetch(`/api/users/removeCredits/${idUser}`, creditReductionFetchOptions)
    .then((response) => {
      if (!response.ok){
        throw new Error("Network response was not ok")
      }
      return response.json()
    })
    .then((updatedUser) => {
      console.log(updatedUser.creditsRemaining)
      onUserCreditsReduction(updatedUser as User)
    })
    .catch((_) => {
      console.log("Failed to update user's remaining credits")
    })
  }
}
// Example calling code:
/*
try {
    // Attempt to save a user message to the server.
    // If an error occurs during the fetch request, it will be caught and logged below.
    await saveMessage(1, 'gpt-4', Sender.USER, 'some user input');
} catch (error) {
    // Log any error that occurs while trying to save the message.
    console.log("Error occurred while saving message:", error);
}
*/
