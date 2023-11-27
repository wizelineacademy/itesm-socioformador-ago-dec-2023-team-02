/* eslint-disable no-nested-ternary*/

/**
 * A component that renders a text input field and a send button for the user to send messages.
 * @param input - The current value of the text input field.
 * @param handleInputChange - A function that handles changes to the text input field.
 * @param handleSubmit - A function that handles the submission of the text input field.
 * @returns A React component that renders a text input field and a send button.
 */

"use client";
import React, { useContext } from "react";
import { Textarea, Button, Spinner } from "@nextui-org/react";
import { IoMdSend } from "react-icons/io";
import type { User } from "@prisma/client";
import { Sender } from "@prisma/client";
import { toast } from "sonner";
import CreditsBadge from "@/components/user/conversationBody/atoms/credits-badge";
import { calculateTokens, creditsToTokens } from "@/lib/helper/gpt/credits-and-tokens";
import { saveMessage } from "@/lib/helper/data-handles";
import type { PrismaUserContextShape } from "@/context/prisma-user-context";
import { PrismaUserContext } from "@/context/prisma-user-context";

/**
 * Saves a message to the server.
 * @param message The message to be saved.
 * @returns A Promise that resolves when the message is successfully saved, or rejects if an error occurs.
 */
async function handleSaveMessage(
  idConversation: number,
  idUser: number | undefined,
  model: string,
  sender: Sender,
  input: string,
  onUserCreditsReduction: (updatedUser: User) => void,
  size?: string,
): Promise<void> {
  try {
    // Save sent user message if the user's information is available. 
    if (idUser !== undefined){
      await saveMessage(idConversation, idUser, model, sender, input, size || "", onUserCreditsReduction);
      toast.success("User message saved");
    }
  } catch {
    console.log("Error ocurred while saving message.");
    toast.error("Error ocurred while saving message of user.");
  }
}

// check to see if the prompt button should be disabled based on if an image can be generated
function checkDalle(credits: number, size: string): boolean {
  const totalImages = creditsToTokens(credits, "dalle", size)
  // return false if an image can be generated
  if (totalImages === 0)
    return true
  return false
}

function checkGPT(credits: number, model: string, input: string): boolean {
  const totalTokens = creditsToTokens(credits, model)
  const inputTokens = calculateTokens(input)
  // return false if a prompt can be generated
  if (totalTokens === 0 || totalTokens <= inputTokens)
    return true
  return false
}

export default function PromptTextInput({
  idConversation,
  model,
  input,
  handleInputChange,
  handleSubmit,
  isLoading,
  creditsRemaining,
  size,
}: {
  idConversation: number;
  model: string;
  input: string;
  handleInputChange: any;
  handleSubmit: any;
  isLoading: boolean;
  creditsRemaining: number;
  size: string;
}): JSX.Element {
  const prismaUserContext = useContext<PrismaUserContextShape | null>(PrismaUserContext)

  // Function to run after a message, from the user or the responding model, has been stored
  // and the number of credits of the current user has been decremented. 
  const HandleUserCreditsReduction: (updatedUser: User) => void = (updatedUser) => {
    prismaUserContext?.setPrismaUser(updatedUser)
  }

  // const handleSubmitCheckGPT = (input: string, credits?: number) : any => {
  //   const totalTokens = creditsToTokens(credits!, model)
  //   const inputTokens = calculateTokens(input)
  //   if (totalTokens > inputTokens && totalTokens > 4096 + inputTokens || totalTokens > inputTokens && totalTokens < 4096) {
  //     handleSubmit
  //   } else if (totalTokens < inputTokens  || totalTokens === 0) {
  //     toast.error("Insufficient credits to send a prompt")
  //   }
  // }

  return (
    <div className="flex justify-center w-full z-30 bg-black">
      <div className="lg:w-3/6 md:w-4/6 w-11/12 fixed bottom-0 pb-4 py-0 z-30">
        <div className="flex flex-col justify-center items-center max-w-[750px] md:w-11/12 mx-auto p-2">
          <div className="flex justify-between items-center w-full mt-2 mb-1">
            {/* Tokens Placeholder */}
            {
              model === "dalle" && checkDalle(creditsRemaining, size)
              ?
              <div className="ml-2">
                <p>Insufficient credits</p>
              </div>
              :
              model === "dalle" 
              ?
              <></>
              :
              <div className={`flex flex-row ${!input ? "hidden" : ""} ml-2 gap-2`}>
                <CreditsBadge creditsUsed={calculateTokens(input)} text={checkGPT(creditsRemaining, model, input) ? "Insufficient credits" : "Tokens being used"}/>
              </div>
            }
          </div>
          <form
            className="flex items-center w-full rounded-xl"
            onSubmit={handleSubmit}
            // handleSubmitCheckGPT(input, prismaUserContext?.prismaUser.creditsRemaining)
          >
            {/* Textarea field */}
            <Textarea
              className="flex-grow p-0 mr-2"
              maxRows={2}
              onChange={handleInputChange}
              placeholder="Send Message"
              value={input}
              variant="faded"
            />
            {/* Check if a response is being generated to show a spinner or submit button*/}
            {isLoading ? (
              <Spinner className="flex items-center ml-1" color="danger" />
            ) : (
              <Button
                className={`${
                  (!input || model === "dalle" ? checkDalle(creditsRemaining, size) : checkGPT(creditsRemaining, model, input))
                    ? "bg-black bg-opacity-10 dark:bg-white dark:bg-opacity-10"
                    : "bg-danger"
                } text-white  rounded-r-xl`}
                disabled={!input || (model === "dalle") ? checkDalle(creditsRemaining, size) : checkGPT(creditsRemaining, model, input)}
                isIconOnly
                onClick={() => {
                  //const totalTokens = creditsToTokens(prismaUserContext?.prismaUser.creditsRemaining!, model)
                  //const inputTokens = calculateTokens(input)
                  //if (totalTokens > inputTokens && totalTokens >= 4096 + inputTokens || totalTokens > inputTokens && totalTokens < 4096) {
                    void handleSaveMessage(
                      idConversation,
                      prismaUserContext?.prismaUser?.id,
                      model,
                      Sender.USER,
                      input,
                      HandleUserCreditsReduction
                    );
                  //}
                }}
                size="lg"
                type="submit"
                // Saves user's message when the send button is clicked
                variant="flat"
              >
                <IoMdSend className="text-lg" />
              </Button>
            )}
          </form>
          {/* Footer */}
          <div className=" w-full text-center bg-white dark:bg-black pb-0">
            <p className="p-0 m-0 text-xs text-slate-400 dark:text-slate-400 wizeline-brand:text-slate-200 text-center">
              © 2023 Team SAM, developed by Wizeline.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
