/**
 * Renders a message item component with sender's image, message content and copy message button.
 * @param message - The message object containing the message content and role (user or model).
 * @param senderImage - The URL of the sender's image.
 * @returns A JSX element representing the message item component.
 */
"use client";
import { Card, CardBody, Image } from "@nextui-org/react";
import type { Message } from "ai";
import React from "react";

/**
 * Copies the given content to the clipboard.
 * @param content - The text to be copied to the clipboard.
 */
// function handleCopy(content:string) {;
//   navigator.clipboard.writeText(content).then(() => {
//       console.log('Texto copiado al portapapeles');
//       toast('Message copied to clipboard.',{ duration: 1000})

//   }).catch(err => {
//       console.error('Error al copiar el texto: ', err);
//       toast('Error copying message to clipboard.',{ duration: 1000, style: { backgroundColor: "red"} })
//   });
// }

// Define the MessageItem component
export default function MessageItemImage({
  message,
  //Callback,
  senderImage, //creditsUsed,
}: {
  message: Message; //este podría ser content y solo ser un string, de todos modos este string sería el que copiemos
  //Callback: any;
  senderImage: string;
  //creditsUsed: number;
}): JSX.Element {
  return (
    <Card
      className={`${
        message.role === "user" ? "senderUser-bg" : "senderModel-bg"
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
          <Image
            alt="Generated image"
            height={300}
            src={`data:image/png;base64,${message.content.replaceAll('"', "")}`}
            width={300}
          />
        </CardBody>
      </div>
    </Card>
  );
}
