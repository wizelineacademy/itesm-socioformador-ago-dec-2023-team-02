"use client";
import React, { useState } from "react";
import { Button } from "@nextui-org/react";
import { AiOutlineSetting } from "react-icons/ai";
import ThemeButton from "@/components/theme-button";
import ModifyCreditsModal from "./modify-credits-modal";

// Define the prop types for the GroupHeader component using an interface
interface GroupHeaderProps {
  groupName: string; // The name of the group
  // groupDescription: string;   // A brief description of the group
  creditsAssigned: number; // The number of credits assigned to the group
  onGroupsSettingsPress: () => void;
  groupdId: number;
  setUpdatedUsers: any
}

// GroupHeader component definition with explicit return type JSX.Element
export function GroupHeader({
  groupName,
  // groupDescription ,
  creditsAssigned,
  onGroupsSettingsPress,
  groupdId,
  setUpdatedUsers
}: GroupHeaderProps): JSX.Element {
  const handleGroupSettingsPress: (e: any) => void = (_) => {
    onGroupsSettingsPress()
  }

  const [creditsModalIsOpen, setCreditsModalIsOpen] = useState<boolean>(false)
  
  const handleModalClose: () => void = () => {
    setCreditsModalIsOpen(false)
  }

  const handleModifyCreditsButtonPress: (e: any) => void = (_) => {
    setCreditsModalIsOpen(true)
  }

  return (
    <div className="flex flex-wrap items-start justify-between my-2 sm:ml-10 mt-0 pt-0">
      {/* Adjust the order of items for XS screens */}
      <div className="w-full sm:w-1/2 order-2 sm:order-1 text-start">
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

        <Button size="sm" onPress={handleModifyCreditsButtonPress} variant="flat">
          Modify Credits
        </Button>

        <Button endContent={<AiOutlineSetting />} onPress={handleGroupSettingsPress} size="sm" variant="flat">
          Group Settings
        </Button>
      </div>

      <ModifyCreditsModal
        id={groupdId}
        isOpen={creditsModalIsOpen}
        onModalClose={handleModalClose}
        setUpdatedUsers={setUpdatedUsers}
    />
    </div>
  );
}
