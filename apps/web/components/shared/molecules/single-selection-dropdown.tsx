import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import type { SingleSelectionDropdownItem } from "@/types/component-types";

type PopoverPlacement =
  | "top"
  | "bottom"
  | "right"
  | "left"
  | "top-start"
  | "top-end"
  | "bottom-start"
  | "bottom-end"
  | "left-start"
  | "left-end"
  | "right-start"
  | "right-end";

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