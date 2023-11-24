"use client";
import { useContext } from "react";
import { Button, Card, CardBody } from "@nextui-org/react";
import { MdDeleteOutline } from "react-icons/md";
import { BiCoinStack } from "react-icons/bi"
import ThemeButton from "@/components/theme-button";
import { PrismaUserContext, type PrismaUserContextShape } from "@/context/prisma-user-context";
import { roundUsersCredits } from "@/helpers/user-helpers";

function ClearAll(): JSX.Element {
  return (
    <Button
      className="bg-red-500 text-gray-50"
      isIconOnly
      startContent={<MdDeleteOutline />}
      type="button"
    />
  );
}

export default function General(): JSX.Element {
  const prismaUserContext = useContext<PrismaUserContextShape | null>(PrismaUserContext);
  const prismaUser = prismaUserContext?.prismaUser;

  return (
    <div className="flex flex-col space-y-4">
      {/* Credits Card */}
      <Card radius="sm" shadow="sm">
        {" "}
        <CardBody>
          <div className="flex items-center justify-between space-y-2 pr-3">
            <p>Credits Remaining</p>
            <div className="flex flex-row items-center gap-1">
              <p className="p-0 m-0"><BiCoinStack/></p>
              <p>{roundUsersCredits(prismaUser)}</p>
            </div>
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
