import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import { toast } from "sonner";
import { useState } from "react";
import type { SidebarTag } from "@/types/sidebar-tag-types";
import type { PopoverPlacement } from "@/types/component-types";
import { isValidTagColor, isValidTagName } from "@/types/tag-types";
import { TagEditor } from "./tag-editor";

interface TagEditorPopoverProps {
    children: JSX.Element;
    tagId: number | null;
    initialTagName: string | null;
    initialTagColor: string | null;
    placement: PopoverPlacement;
    onTagDeletion: (deletedTag: SidebarTag) => void;
    onPopoverClose: (editedTag: SidebarTag) => void;
}

export default function TagEditorPopover({children, tagId, initialTagName, initialTagColor, placement, onTagDeletion, onPopoverClose}: TagEditorPopoverProps): JSX.Element {
    const [tagName, setTagName] = useState<string>(initialTagName || "")
    const [tagColor, setTagColor] = useState<string>(initialTagColor || "#0313fc")

    const resetTagState: () => void = () => {
        setTagName(initialTagName || "")
        setTagColor(initialTagColor || "")
    }

    const handleTagNameChange: (editedTagName: string) => void = (editedTagName) => {
        setTagName(editedTagName)
    }

    const handleTagColorChange: (editedTagColor: string) => void = (editedTagColor) => {
        setTagColor(editedTagColor)
    }

    const handleDeletePress: () => void = () => {
        const fetchOptions: RequestInit = {method: "DELETE", headers: {"Content-Type": "application/json"}}
        fetch(`/api/tags/${tagId}`, fetchOptions)
        .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok")
            }
            return response.json()
          })
        .then((deletedTag) => {
            onTagDeletion(deletedTag as SidebarTag)
            toast.success("Tag deleted.")
          })
        .catch((_) => {
            toast.error("The deletion of the tag failed.")
            resetTagState()
        });
    }

    const handlePopoverClose: () => void = () => {
        const tagHasChanged: boolean = tagName !== initialTagName || tagColor !== initialTagColor
        const isValidTag: boolean = isValidTagName(tagName) && isValidTagColor(tagColor)

        console.log(tagColor)

        if (isValidTag && tagHasChanged){
            if (tagId) {
                editTag()
            } else {
                createTag()
            }
        }
    }

    const editTag: () => void = () => {
        const fetchOptions: RequestInit = {method: "PATCH", headers: {"Content-Type": "application/json",}, body: JSON.stringify({
            name: tagName,
            color: tagColor
        })}
        fetch(`/api/tags/${tagId}`, fetchOptions)
        .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok")
            }
            return response.json()
          })
        .then((updatedTag) => {
            onPopoverClose(updatedTag as SidebarTag)
            toast.success("Tag edited.")
          })
        .catch((_) => {
            toast.error("The editing of the tag failed.")
            resetTagState()
        });
    }

    const createTag: () => void = () => {
        const fetchOptions: RequestInit = {method: "POST", headers: {"Content-Type": "application/json",}, body: JSON.stringify({
            idUser: 1,
            name: tagName,
            color: tagColor
        })}
        fetch(`/api/tags`, fetchOptions)
        .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok")
            }
            return response.json()
        })
        .then((createdTag) => {
            onPopoverClose(createdTag as SidebarTag)
            toast.success("Tag created.")
        })
        .catch((_) => {
            toast.error("The creation of the tag failed.")
            resetTagState()
        });
    } 
    
    return (
        <Popover backdrop="opaque" onClose={handlePopoverClose} placement={placement} showArrow>
        <PopoverTrigger>
            {children}
        </PopoverTrigger>
        <PopoverContent>
            <TagEditor isNew={tagId === null} onDeletePress={handleDeletePress} onTagColorChange={handleTagColorChange} onTagNameChange={handleTagNameChange} tagColor={tagColor} tagName={tagName}/>
        </PopoverContent>
    </Popover>
    );
}