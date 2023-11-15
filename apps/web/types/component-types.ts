/**
 * Types defining the shape of data passed between components. Decoupled from the application`s data model . 
 */


/**
 * Describes an object passed down to a single selection dropdown component, to be displayed.
 */
export interface SingleSelectionDropdownItem {
    key: string;
    name: string;
    action: ()=>void;
    style?: string;
}

/**
 * Describes an object passed down to a multiple selection dropdown component, to be displayed.
 */
export interface MultipleSelectionDropdownItem {
    key: string;
    name: string;
    style?: string;
}

/**
 * A type that describes the different ways a popover can be placed around its trigger. 
 */
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

/**
 * The direction in which items in a list are sequentially displayed.
 */
export type ListDirection = "vertical" | "horizontal"