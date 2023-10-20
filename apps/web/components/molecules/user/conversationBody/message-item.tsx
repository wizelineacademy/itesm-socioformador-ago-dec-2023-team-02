"use client";
import { Card, CardBody, Image, Button, Divider} from "@nextui-org/react";
import { Message } from "@prisma/client";
import React from "react";
import { BsClipboard } from "react-icons/bs";

// Define the MessageItem component
export default function MessageItem({
  message,
  //Callback,
  senderImage,
}: {
  message: Message; //este podría ser content y solo ser un string, de todos modos este string sería el que copiemos
  //Callback: any;
  senderImage: string;
}): JSX.Element {

  return (
    <>
    <Card
      className={`${message.sender === 'USER' ? 'senderUser-bg' : 'senderModel-bg'} w-full justify-center border-none border-bottom rounded-none shadow-none`}
    >
      <div className="justify-center grid md:grid-cols-[.2fr,.6fr,.2fr] grid-cols-1 gap-4 p-4">
        {/* Left column: Sender's image and Credits used*/}
        <div className="grid md:grid-cols-[.5fr,.5fr] grid-cols-1">

            {/* Credits used*/}
            <div className="flex items-center justify-end">
            credits
            </div>

            {/* Sender's image */}
            <div className="flex items-start md:justify-end justify-start">
            <Image
            alt="Sender Image"
            height={40}
            radius="md"
            src={senderImage}
            width={40}
          />
            </div>
        </div>

        {/* Middle column: Message content */}
        <CardBody className="flex items-center max-w-[800px] w-full p-0">
          <p className="w-full p-0">{message.content}</p>
        </CardBody>

        {/* Right column: Copy Message button */}
        <div className="flex items-start md:justify-start justify-end p-0">
          <Button
            isIconOnly
            className="hover:bg-opacity-100 bg-inherit opacity-50 hover:opacity-100"
          >
            <BsClipboard className="text-md" />
          </Button>
        </div>
      </div>
    </Card>
    <Divider className="my-0" />
    </>
  );
}
