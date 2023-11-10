"use client";
import React from 'react';
import { Button } from '@nextui-org/react';
import { AiOutlineSetting, AiOutlineUserAdd } from 'react-icons/ai';

// Define the prop types for the GroupHeader component using an interface
interface GroupHeaderProps {
  groupName: string;          // The name of the group
  groupDescription: string;   // A brief description of the group
}

// GroupHeader component definition with explicit return type JSX.Element
export const GroupHeader: React.FC<GroupHeaderProps> = ({ 
  groupName, 
  groupDescription 
}): JSX.Element => {
  return (
    // Outer container with flex layout, adjusting for screen size with responsive classes
    <div className="flex flex-wrap items-center justify-between p-4">
      {/* Left side container holding the group name and description */}
      <div className="w-full sm:w-1/2">
        {/* Tailwind classes used for styling the group name as a heading */}
        <h3 className="text-3xl font-bold">{groupName}</h3>
        {/* Paragraph for the group description */}
        <p className="text-gray-600">{groupDescription}</p>
      </div>
      
      {/* Right side container for action buttons, aligning items to the end */}
      <div className="w-full sm:w-1/2 flex justify-end space-x-2">
        {/* Button to navigate to group settings */}
        <Button auto icon={<AiOutlineSetting />} className="text-white bg-blue-500 hover:bg-blue-600">
          Group Settings
        </Button>
        
        {/* Button to add a new user to the group */}
        <Button auto icon={<AiOutlineUserAdd />} className="text-white bg-green-500 hover:bg-green-600">
          Add User
        </Button>
        
        {/* Button to modify the group's credits */}
        <Button auto className="text-white bg-red-500 hover:bg-red-600">
          Modify Credits
        </Button>
      </div>
    </div>
  );
};
