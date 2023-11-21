"use client";
import React, { useState } from "react";
import { Button } from "@nextui-org/react";
import { AiOutlineSetting } from "react-icons/ai";
import ThemeButton from "@/components/theme-button";
import ModifyCreditsModal from "./modify-credits-modal";
import { User } from "@prisma/client";

interface GroupData {
  id: number;
  name: string;
  description: string;
  creditsAssigned: number;
  users: User[];
}

// Define the prop types for the GroupHeader component using an interface
interface GroupHeaderProps {
  groupName: string; // The name of the group
  // groupDescription: string;   // A brief description of the group
  creditsAssigned: number; // The number of credits assigned to the group
  groupData: GroupData
}

// GroupHeader component definition with explicit return type JSX.Element
export function GroupHeader({
  groupName,
  // groupDescription ,
  creditsAssigned,
  groupData
}: GroupHeaderProps): JSX.Element {
  const [creditsModalIsOpen, setCreditsModalIsOpen] = useState<boolean>(false)
  
  const handleModalClose: () => void = () => {
    setCreditsModalIsOpen(false)
  }

  const handleModifyCreditsButtonPress: (e: any) => void = (_) => {
    setCreditsModalIsOpen(true)
  }

  return (
    <div className="flex flex-wrap items-start justify-between my-2">
      {/* Adjust the order of items for XS screens */}
      <div className="w-full sm:w-1/2 order-2 sm:order-1">
        <h3 className="text-3xl font-bold">{groupName}</h3>

        {/* Placeholder for credits information below the group name */}
        <p className="text-default-600  text-sm mt-1">
          {creditsAssigned} credits assigned
        </p>
        {/* Added padding between group name and description */}
        {/* <div className='overflow-scroll h-10 my-2'>
          <p className="text-gray-600 text-sm">{groupDescription}</p>
        </div> */}
      </div>

      {/* Adjust the order and padding of buttons container for XS screens */}
      <div className="w-full sm:w-1/2 flex justify-end space-x-2 order-1 sm:order-2 pb-2 sm:pb-0">
        <ThemeButton />

        <Button size="sm" variant="flat" onPress={handleModifyCreditsButtonPress}>
          Modify Credits
        </Button>

        <Button endContent={<AiOutlineSetting />} size="sm" variant="flat">
          Group Settings
        </Button>
      </div>

      <ModifyCreditsModal
        isOpen={creditsModalIsOpen}
        onModalClose={handleModalClose}
        groupData={groupData}
    />
    </div>
  );
}
