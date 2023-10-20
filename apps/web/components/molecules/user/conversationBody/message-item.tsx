"use client";
import { Card, CardBody, Image, Button } from "@nextui-org/react";
import { Message } from "@prisma/client";
import React from "react";
import { BsClipboard } from "react-icons/bs";

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
      className={`${message.sender === "USER" ? "senderUser-bg" : "senderModel-bg"
        } w-full justify-center border-none border-bottom rounded-none shadow-none py-3`}
    >

      <div className="justify-center grid md:grid-cols-[.1fr,.8fr,.1fr] xl:grid-cols-[.25fr,.5fr,.25fr]   grid-cols-1 gap-4 p-4">

        {/*



        /*
        <div className="grid md:grid-cols-[.5fr,.5fr] grid-cols-1">
          <div className="flex items-center justify-end">
            <Chip size="sm" radius="sm" avatar={<TbCoins />}>{creditsUsed}</Chip>
          </div>


          <div className="flex items-start md:justify-end justify-start">
            <Image
              alt="Sender Image"
              height={30}
              radius="sm"
              src={senderImage}
              width={30}
            />
          </div>
          

        </div>
        */}

        {/* Left column: Sender's image */}

        <div className="flex items-start md:justify-end justify-start">
          <Image
            alt="Sender Image"
            height={30}
            radius="sm"
            src={senderImage}
            width={30}

          />
        </div>

        {/* Middle column: Message content */}
        <CardBody className="flex items-center max-w-[800px] w-full p-0">
          <p className="w-full p-0 text-sm text-slate-600 dark:text-slate-200 wizeline-brand:text-slate-200">{message.content}</p>
        </CardBody>

        {/* Right column: Copy Message button */}
        <div className="flex items-start md:justify-start justify-end p-0 m-0">
          <Button
            isIconOnly
            className="hover:bg-opacity-100 bg-inherit opacity-50 hover:opacity-100 p-0"
            size="sm"
          >
            <BsClipboard className="text-md" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
