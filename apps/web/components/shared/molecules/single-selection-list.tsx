import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import type { SingleSelectionListItem } from "@/types/component-types";

interface SingleSelectionListProps {
    children: JSX.Element;
    listItems: SingleSelectionListItem[];
}

export default function SingleSelectionList({children, listItems}: SingleSelectionListProps): JSX.Element {    
    return (
        <Dropdown>
            <DropdownTrigger>
                {children}
            </DropdownTrigger>
            <DropdownMenu>
                {listItems.map(item => (
                    <DropdownItem className={item.style || ""} key={item.key} onPress={(_)=>{item.action()}}>
                        {item.name}
                    </DropdownItem>
                ))}
            </DropdownMenu>
      </Dropdown>
    ); 
}