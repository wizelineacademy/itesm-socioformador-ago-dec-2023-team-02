/**
 * Types defining the shape of data passed between components. Decoupled from the application`s data model . 
 */

export interface SingleSelectionDropdownItem {
    key: string;
    name: string;
    action: ()=>void;
    style?: string;
}

export interface MultipleSelectionDropdownItem {
    key: string;
    name: string;
    style?: string;
}

export type PopoverPlacement =
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

export type ListDirection = "vertical" | "horizontal"