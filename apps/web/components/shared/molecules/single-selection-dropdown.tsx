import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import type { PopoverPlacement, SingleSelectionDropdownItem } from "@/types/component-types";

interface SingleSelectionDropdownProps {
    children: JSX.Element;
    dropdownItems: SingleSelectionDropdownItem[];
    placement: PopoverPlacement;
}

export default function SingleSelectionDropdown({children, dropdownItems, placement}: SingleSelectionDropdownProps): JSX.Element {    
    return (
        <Dropdown placement={placement}>
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