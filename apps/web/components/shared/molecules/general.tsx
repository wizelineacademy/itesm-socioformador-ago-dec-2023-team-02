"use client";
import { useContext } from "react";
import {
  Button,
  Card,
  CardBody,
} from "@nextui-org/react";
import { MdDeleteOutline } from "react-icons/md";
import ThemeButton from "@/components/theme-button";
import { PrismaUserContext } from "@/context/prisma-user-context";

function ClearAll(): JSX.Element {
  return (
    <Button
    isIconOnly
      className="bg-red-500 text-gray-50"
      startContent={<MdDeleteOutline />}
      type="button"
    >
    </Button>
  );
}

export default function General(): JSX.Element {

  const prismaUser = useContext(PrismaUserContext);



  return (
    <div className="flex flex-col space-y-4">
      {/* Credits Card */}
      <Card radius="sm" shadow="sm">
        {" "}
        <CardBody>
          <div className="flex items-center justify-between space-y-2 pr-3">
            <p>Credits Remaining</p>
            <p>{prismaUser?.creditsRemaining}</p>
          </div>
        </CardBody>{" "}
      </Card>

      {/* Theme Options */}
      <Card radius="sm" shadow="sm">
        {" "}
        <CardBody>
          <div className="flex justify-between items-center">
            <p>Theme</p>
            <ThemeButton />
          </div>
        </CardBody>
      </Card>

      {/* Clear all chats Options */}
      <Card radius="sm" shadow="sm">
        {" "}
        <CardBody>
          <div className="flex justify-between items-center pr-3">
            <p>Delete all conversations</p>
            <ClearAll />
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
