import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import React from "react";
import {AiOutlineEdit} from "react-icons/ai"

interface ConversationEditDropdownProps {
    actions: ConversationEditDropdownActions
}

export interface ConversationEditDropdownActions {
    editTitle: () => void;
    editTags: () => void;
    remove: () => void;
    [key: string]: () => void;
}

export default function ConversationEditDropdown({actions}: ConversationEditDropdownProps): JSX.Element {
    const handleItemSelection: (key: React.Key) => void = (key) => {actions[key]()}

    return (
        <Dropdown>
          <DropdownTrigger>
            <p>...</p>
            {/*<AiOutlineEdit/>*/}
          </DropdownTrigger>
          <DropdownMenu aria-label="Static Actions" onAction={handleItemSelection}>
            <DropdownItem key="editTitle">Edit Title</DropdownItem>
            <DropdownItem key="editTags">Edit Tags</DropdownItem>
            <DropdownItem className="text-danger" color="danger" key="remove">Remove</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      );
}