import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import type { SingleSelectionListItem } from "@/types/component-types";

interface SingleSelectionDropdownProps {
    children: JSX.Element;
    dropdownItems: SingleSelectionListItem[];
}

export default function SingleSelectionDropdown({children, dropdownItems}: SingleSelectionDropdownProps): JSX.Element {    
    return (
        <Dropdown>
            <DropdownTrigger>
                {children}
            </DropdownTrigger>
            <DropdownMenu>
                {dropdownItems.map(item => (
                    <DropdownItem className={item.style || ""} key={item.key} onPress={(_)=>{item.action()}}>
                        {item.name}
                    </DropdownItem>
                ))}
            </DropdownMenu>
      </Dropdown>
    ); 
}