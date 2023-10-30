import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import { useState } from "react";
import type { MultipleSelectionListItem } from "@/types/component-types";

interface MultipleSelectionListProps {
    children: JSX.Element;
    listItems: MultipleSelectionListItem[];
    selectedListItems: string[];
    onCloseAction: (selectedListItems: string[])=>void;
}

export default function MultipleSelectionList({children, listItems, selectedListItems, onCloseAction}: MultipleSelectionListProps): JSX.Element {
    const [selectedItems, setSelectedItems] = useState<string[]>(selectedListItems)


    const handleItemPress: (pressedItemKey: string) => void = (pressedItemKey) => {
        const selectedItemsOriginalLength: number = selectedItems.length
        const filteredSelectedItems: string[] = selectedItems.filter(key => key !== pressedItemKey)

        if (selectedItemsOriginalLength === filteredSelectedItems.length){
            setSelectedItems([...selectedItems, pressedItemKey])
        } else {
            setSelectedItems(filteredSelectedItems)
        }
    }

    const handleClosing: ()=>void = () => {
        onCloseAction(selectedListItems)
    }

    return (
        <Dropdown onClose={handleClosing}>
            <DropdownTrigger>
                {children}
            </DropdownTrigger>
            <DropdownMenu closeOnSelect={false} selectedKeys={Object.keys(selectedItems)} selectionMode="multiple">
                {listItems.map(item => (
                    <DropdownItem className={item.style || ""} key={item.key} onPress={(_) => { handleItemPress(item.key); }}>
                        {item.name}
                    </DropdownItem>
                ))}                
            </DropdownMenu>
      </Dropdown>
    );
}