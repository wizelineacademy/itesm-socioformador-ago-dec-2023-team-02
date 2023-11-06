import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import { useState } from "react";
import { toast } from "sonner";
import type { SidebarTag } from "@/types/sidebar-tag-types";
import type { PopoverPlacement } from "@/types/component-types";
import { TagEditor } from "./tag-editor";

interface TagEditorPopoverProps {
    children: JSX.Element;
    tagId: number | null;
    initialTagName: string | null;
    initialTagColor: string | null;
    placement: PopoverPlacement;
    onPopoverClose: (editedTag: SidebarTag) => void;
}

export default function TagEditorPopover({children, tagId, initialTagName, initialTagColor, placement, onPopoverClose}: TagEditorPopoverProps): JSX.Element {
    const [tagName, setTagName] = useState<string>(initialTagName || "")
    const [tagColor, setTagColor] = useState<string>(initialTagColor || "")

    const handleTagNameChange: (newTagName: string) => void = (newTagName) => {
        setTagName(newTagName)
    }

    const handleTagColorChange: (newTagColor: string) => void = (newTagColor) => {
        setTagColor(newTagColor)
    }

    const handlePopoverClose: () => void = () => {
        if (tagId) {
            editTag()
        } else {
            createTag()
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
        });
    } 
    
    return (
        <Popover onClose={handlePopoverClose} placement={placement}>
        <PopoverTrigger>
            {children}
        </PopoverTrigger>
        <PopoverContent>
            <TagEditor onTagColorChange={handleTagColorChange} onTagNameChange={handleTagNameChange} tagColor={tagColor} tagName={tagName}/>
        </PopoverContent>
    </Popover>
    );
}