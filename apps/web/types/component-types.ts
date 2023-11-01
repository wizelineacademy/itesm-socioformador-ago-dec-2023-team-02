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