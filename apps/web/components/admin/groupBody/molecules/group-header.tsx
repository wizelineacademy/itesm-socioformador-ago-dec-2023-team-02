"use client";
import React from 'react';
import { Button } from '@nextui-org/react';
import { AiOutlineSetting } from 'react-icons/ai';
import ThemeButton from '@/components/theme-button';

// Define the prop types for the GroupHeader component using an interface
interface GroupHeaderProps {
  groupName: string;          // The name of the group
  // groupDescription: string;   // A brief description of the group
  creditsAssigned: number;    // The number of credits assigned to the group
}

// GroupHeader component definition with explicit return type JSX.Element
export const GroupHeader: React.FC<GroupHeaderProps> = ({ 
  groupName, 
  // groupDescription ,
  creditsAssigned
}): JSX.Element => {
  return (
    <div className="flex flex-wrap items-start justify-between my-2">
      {/* Adjust the order of items for XS screens */}
      <div className="w-full sm:w-1/2 order-2 sm:order-1">
        <h3 className="text-3xl font-bold">{groupName}</h3>

        {/* Placeholder for credits information below the group name */}
        <p className="text-default-600  text-sm mt-1">{creditsAssigned} credits assigned</p>
        {/* Added padding between group name and description */}
        {/* <div className='overflow-scroll h-10 my-2'>
          <p className="text-gray-600 text-sm">{groupDescription}</p>
        </div> */}
      </div>

      {/* Adjust the order and padding of buttons container for XS screens */}
      <div className="w-full sm:w-1/2 flex justify-end space-x-2 order-1 sm:order-2 pb-2 sm:pb-0">
        <ThemeButton />

        <Button auto variant='flat' size='sm'>
          Modify Credits
        </Button>

        <Button auto variant='flat' size='sm' endContent={<AiOutlineSetting />}>
          Group Settings
        </Button>
      </div>
    </div>
  );
};