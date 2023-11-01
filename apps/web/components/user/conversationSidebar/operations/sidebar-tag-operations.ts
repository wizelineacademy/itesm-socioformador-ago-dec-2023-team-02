/**
 * Various  functions for operating on arrays of Tag objects. 
 */

import type { MultipleSelectionDropdownItem } from "@/types/component-types";
import type { SidebarTag } from "@/types/sidebar-tag-types";

/**
 * Converts an array of Tag objects into an array of MultipleSelectionDropdownItem objects. 
 * @param tags - An array of object that conform to the Tag interface.
 * @returns A array of MultipleSelectionDropdownItem objects, which could be fed into a MultipleSelectionLDropdown component. 
 */
export function tagsToListItems(tags: SidebarTag[]): MultipleSelectionDropdownItem[] {
    return tags.map(tag => {
        return {key: tag.id.toString(), name: tag.name}
    })
}