/**
 * Renders a message item component with sender's image, message content and copy message button.
 * @param message - The message object containing the message content and role (user or model).
 * @param senderImage - The URL of the sender's image.
 * @returns A JSX element representing the message item component.
 */
"use client";
import { Card, CardBody, Image, Button } from "@nextui-org/react";
import { Message } from 'ai';
import React from "react";
import { BsClipboard } from "react-icons/bs";


/**
 * Copies the given content to the clipboard.
 * @param content - The text to be copied to the clipboard.
 */
function handleCopy(content:string) {
  navigator.clipboard.writeText(content).then(() => {
      console.log('Texto copiado al portapapeles');
  }).catch(err => {
      console.error('Error al copiar el texto: ', err);
  });
}

// Define the MessageItem component
export default function MessageItem({
  message,
  //Callback,
  senderImage,
  //creditsUsed,
}: {
  message: Message; //este podría ser content y solo ser un string, de todos modos este string sería el que copiemos
  //Callback: any;
  senderImage: string;
  //creditsUsed: number;
}): JSX.Element {
  return (
    <Card
      className={`${message.role === "user" ? "senderUser-bg" : "senderModel-bg"
        } w-full justify-center border-none border-bottom rounded-none shadow-none py-3`}
    >

      <div className="justify-center grid md:grid-cols-[.1fr,.8fr,.1fr] xl:grid-cols-[.25fr,.5fr,.25fr] grid-cols-1 gap-4 p-4">

        {/* Left column: Sender's image */}
        <div className="flex items-start md:justify-end justify-start">
          <Image
            alt="Sender Image"
            height={40}
            radius="md"
            src={senderImage}
            width={35}

          />
        </div>

        {/* Middle column: Message content */}
        <CardBody className="flex items-center max-w-[800px] w-full p-0">
          {/* <p className="w-full p-0 text-sm text-slate-600 dark:text-slate-200 wizeline-brand:text-slate-200">{message.content}</p> */}
          {message.content.split("\n").map((currentTextBlock: string, index: number) => {
                            if (currentTextBlock === "") {
                                return <p className="w-full p-0 text-sm text-slate-600 dark:text-slate-200 wizeline-brand:text-slate-200" key={message.id + index} />
                            }
                            return <p className="w-full p-0 text-sm text-slate-800 dark:text-slate-200 wizeline-brand:text-slate-200" key={message.id + index} >{currentTextBlock}</p>
                        })}
        </CardBody>

        {/* Right column: Copy Message button */}
        <div className="flex items-start md:justify-start justify-end p-0 m-0">
          <Button
          variant="solid"
            isIconOnly
            className="hover:bg-opacity-100 bg-inherit opacity-50 hover:opacity-100 p-0"
            size="sm"
            onClick={() => {handleCopy(message.content)}}
          >
            <BsClipboard />
          </Button>
        </div>
      </div>
    </Card>
  );
}
