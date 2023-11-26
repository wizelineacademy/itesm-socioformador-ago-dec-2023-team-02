"use client";
import React, { useState } from "react";
import { Button } from "@nextui-org/react";
import { AiOutlineSetting } from "react-icons/ai";
import { LuInfo } from "react-icons/lu";
import type { GroupData } from "@/types/group-types";
import TextDescriptionModal from "@/components/shared/molecules/text-description-modal";
import ModifyCreditsModal from "./modify-credits-modal";

// Define the prop types for the GroupHeader component using an interface
interface GroupHeaderProps {
  groupData: GroupData;
  onGroupsSettingsPress: () => void;
  setUpdatedUsers: any
}

// GroupHeader component definition with explicit return type JSX.Element
export function GroupHeader({
  groupData,
  onGroupsSettingsPress,
  setUpdatedUsers
}: GroupHeaderProps): JSX.Element {
  const [creditsModalIsOpen, setCreditsModalIsOpen] = useState<boolean>(false)
  const [descriptionModalIsOpen, setDescriptionModalIsOpen] = useState<boolean>(false)

  const handleGroupSettingsPress: (e: any) => void = (_) => {
    onGroupsSettingsPress()
  }

  const handleModalClose: () => void = () => {
    setCreditsModalIsOpen(false)
  }

  const handleModifyCreditsButtonPress: (e: any) => void = (_) => {
    setCreditsModalIsOpen(true)
  }

  const handleGroupNameClick: (e: any) => void = (_) => {
    setDescriptionModalIsOpen(true)
  }

  const handleDescriptionModalClosing: () => void = () => {
    setDescriptionModalIsOpen(false)
  }

  return (
    <div className="flex flex-wrap items-start justify-between my-2 sm:ml-10 mt-0 pt-0">
      {/* Adjust the order of items for XS screens */}
      <div className="w-full sm:w-1/2 order-2 sm:order-1 text-start">
        <button className="flex flex-row justify-center items-center gap-3" onClick={handleGroupNameClick} type="button">
          <h3 className="text-3xl font-bold">{groupData.name}</h3>
          <LuInfo size="0.8rem"/>
        </button>

        {/* Placeholder for credits information below the group name */}
        <p className="text-default-600  text-sm mt-1">
          {groupData.creditsAssigned} credits assigned
        </p>
        {/* Added padding between group name and description */}
        {/* <div className='overflow-scroll h-10 my-2'>
          <p className="text-gray-600 text-sm">{groupDescription}</p>
        </div> */}
      </div>

      {/* Adjust the order and padding of buttons container for XS screens */}
      <div className="w-full sm:w-1/2 flex justify-end space-x-2 order-1 sm:order-2 pb-2 sm:pb-0">
        <Button onPress={handleModifyCreditsButtonPress} size="sm" variant="flat">
          Modify Credits
        </Button>

        <Button endContent={<AiOutlineSetting />} onPress={handleGroupSettingsPress} size="sm" variant="flat">
          Group Settings
        </Button>
      </div>

      <ModifyCreditsModal
        groupData={groupData}
        isOpen={creditsModalIsOpen}
        onModalClose={handleModalClose}
        setUpdatedUsers={setUpdatedUsers}
      />

      <TextDescriptionModal
        description={groupData.description}
        isOpen={descriptionModalIsOpen}
        onModalClose={handleDescriptionModalClosing}
      />

    </div>
  );
}
