import type { Tag } from "@prisma/client";
import type { MultipleSelectionListItem } from "@/types/component-types";

export function tagsToListItems(tags: Tag[]): MultipleSelectionListItem[] {
    return tags.map(tag => {
        return {key: tag.id.toString(), name: tag.name}
    })
}