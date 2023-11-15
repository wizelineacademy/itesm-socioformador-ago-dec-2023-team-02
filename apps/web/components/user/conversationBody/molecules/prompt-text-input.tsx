/**
 * A component that renders a text input field and a send button for the user to send messages.
 * @param input - The current value of the text input field.
 * @param handleInputChange - A function that handles changes to the text input field.
 * @param handleSubmit - A function that handles the submission of the text input field.
 * @returns A React component that renders a text input field and a send button.
 */

"use client";
import React from "react";
import { Textarea, Button, Spinner } from "@nextui-org/react";
import { IoMdSend } from "react-icons/io";
import { Sender } from "@prisma/client";
import { toast } from "sonner";
import CreditsBadge from "@/components/user/conversationBody/atoms/credits-badge";
import { calculateTokens } from "@/lib/helper/gpt/credits-and-tokens";
import { saveMessage } from "@/lib/helper/data-handles";

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
    toast.success("User message saved");
  } catch {
    console.log("Error ocurred while saving message.");
    toast.error("Error ocurred while saving message of user.");
  }
}


export default function PromptTextInput({
  idConversation,
  model,
  input,
  handleInputChange,
  handleSubmit,
  isLoading,
}: {
  idConversation: number;
  model: string;
  input: string;
  handleInputChange: any;
  handleSubmit: any;
  isLoading: boolean;
}): JSX.Element {
  return (
    <div className="flex justify-center w-full z-30 bg-black">
      <div className="lg:w-3/6 md:w-4/6 w-11/12 fixed bottom-0 pb-4 py-0 z-30">
        <div className="flex flex-col justify-center items-center max-w-[750px] md:w-11/12 mx-auto p-2">
          <div className="flex justify-between items-center w-full mt-2 mb-1">
            {/* Tokens Placeholder */}
            <div className={`${!input ? "hidden" : ""} ml-2`}>
              <CreditsBadge creditsUsed={calculateTokens(input)} />
            </div>
          </div>
          <form
            className="flex items-center w-full rounded-xl"
            onSubmit={handleSubmit}
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
            {
              isLoading 
                ? 
                <Spinner 
                  className="flex items-center ml-1"
                  color="danger"
                />
                :
                <Button
                  className={`${
                    !input
                      ? "bg-black bg-opacity-10 dark:bg-white dark:bg-opacity-10"
                      : "bg-danger"
                  } text-white  rounded-r-xl`}
                  disabled={!input}
                  isIconOnly
                  onClick={() => {
                    void handleSaveMessage(
                      idConversation,
                      model,
                      Sender.USER,
                      input
                    );
                  }}
                  size="lg"
                  type="submit"
                  // Saves user's message when the send button is clicked
                  variant="flat"
                >
                  <IoMdSend className="text-lg" />
                </Button>
            }

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
