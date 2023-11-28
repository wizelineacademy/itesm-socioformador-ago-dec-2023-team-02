"use client";
import { useContext, useState } from "react";
import { Button, Card, CardBody } from "@nextui-org/react";
import { MdDeleteOutline } from "react-icons/md";
import { BiCoinStack } from "react-icons/bi"
import { toast } from "sonner";
import ThemeButton from "@/components/theme-button";
import { PrismaUserContext, type PrismaUserContextShape } from "@/context/prisma-user-context";
import { roundUsersCredits } from "@/helpers/user-helpers";
import { ConversationsContext, type ConversationsContextShape } from "@/context/conversations-context";
import { ConversationsActionType } from "@/helpers/sidebar-conversation-helpers";
import ConfirmDeleteModal from "./confirm-delete-modal";

// function ClearAll(handleDelete: any): JSX.Element {
//   return (
//     <Button
//       className="bg-red-500 text-gray-50"
//       isIconOnly
//       startContent={<MdDeleteOutline />}
//       type="button"
//       onClick={handleDelete}
//     />
//   );
// }

export default function General(): JSX.Element {
  const prismaUserContext = useContext<PrismaUserContextShape | null>(PrismaUserContext);
  const prismaUser = prismaUserContext?.prismaUser;
  const conversationsContext = useContext<ConversationsContextShape | null>(ConversationsContext)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [confirmDeleteModalIsOpen, setConfirmDeleteModalIsOpen] = useState<boolean>(false)

  const deleteIsDisabled = conversationsContext?.conversations.length === 0

  const handleDeleteButtonPress: () => void = () => {
    setConfirmDeleteModalIsOpen(true)
  }

  const handleConfirmDeleteModalClosing: (confirm: boolean) => void = (confirm) => {
    if (confirm) {
      setIsLoading(true)
      handleDeleteAllConversations()
    }
    setConfirmDeleteModalIsOpen(false)
  }

  const handleDeleteAllConversations: () => void = () => {
    const fetchOptions: RequestInit = { method: "PATCH" };
    fetch(`/api/conversations/user/${prismaUser?.id}`, fetchOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok")
      }
      toast.success("All conversations were deleted")
      conversationsContext?.conversationsDispatch({
        type: ConversationsActionType.DeleteAll,
        conversationId: 0,
      })
    })
    .catch((_) => {
      toast.error("Conversations couldn't be deleted")
    })
    .finally(() => {
      setIsLoading(false)
    })
  }

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
            {/* <ClearAll handleDelete={handleDeleteAllConversations}/> */}
            <Button
              className="bg-red-500 text-gray-50"
              isDisabled={deleteIsDisabled || isLoading}
              isIconOnly
              onClick={handleDeleteButtonPress}
              startContent={<MdDeleteOutline />}
              type="button"
            />
          </div>
        </CardBody>
      </Card>

      <ConfirmDeleteModal 
        isOpen={confirmDeleteModalIsOpen}
        modalText="conversation history"
        onModalClose={handleConfirmDeleteModalClosing}
      />

    </div>
  );
}
