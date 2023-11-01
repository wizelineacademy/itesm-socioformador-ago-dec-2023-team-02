import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import { useState } from "react";
import type { MultipleSelectionDropdownItem } from "@/types/component-types";

interface MultipleSelectionDropdownProps {
    children: JSX.Element;
    dropdownItems: MultipleSelectionDropdownItem[];
    selectedDropdownItems: string[];
    onCloseAction: (selectedDropdownItems: string[])=>void;
}

export default function MultipleSelectionDropdown({children, dropdownItems, selectedDropdownItems, onCloseAction}: MultipleSelectionDropdownProps): JSX.Element {
    const [selectedItems, setSelectedItems] = useState<string[]>(selectedDropdownItems)

    const handleItemPress: (pressedItemKey: string) => void = (pressedItemKey) => {
        const filteredSelectedItems: string[] = selectedItems.filter(key => key !== pressedItemKey)

        if (selectedItems.length === filteredSelectedItems.length){
            setSelectedItems([...selectedItems, pressedItemKey])
        } else {
            setSelectedItems(filteredSelectedItems)
        }
    }

    const handleClosing: ()=>void = () => {
        onCloseAction(selectedItems)
    }

    return (
        <Dropdown onClose={handleClosing}>
            <DropdownTrigger>
                {children}
            </DropdownTrigger>
            <DropdownMenu closeOnSelect={false} selectedKeys={selectedItems} selectionMode="multiple">
                {dropdownItems.map(item => (
                    <DropdownItem className={item.style || ""} key={item.key} onPress={(_) => { handleItemPress(item.key); }}>
                        {item.name}
                    </DropdownItem>
                ))}                
            </DropdownMenu>
      </Dropdown>
    );
}