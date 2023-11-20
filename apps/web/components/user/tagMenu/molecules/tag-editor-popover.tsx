import { Button, Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import { toast } from "sonner";
import { useContext, useState } from "react";
import type { Tag, User } from "@prisma/client";
import {  MdOutlineCancel, MdSaveAlt} from "react-icons/md"
import { AiFillDelete } from "react-icons/ai";
import type { PopoverPlacement } from "@/types/component-types";
import ButtonWithIcon from "@/components/shared/atoms/button-with-icon";
import { imposeMaxLength, trimLeadingSpaces } from "@/helpers/string-helpers";
import { PrismaUserContext } from "@/context/prisma-user-context";
import { TagEditor } from "./tag-editor";

interface TagEditorPopoverProps {
    children: JSX.Element;
    tagId: number | null;
    initialTagName: string | null;
    initialTagColor: string | null;
    placement: PopoverPlacement;
    onTagDeletion: (deletedTag: Tag) => void;
    onTagEdition: (editedTag: Tag) => void;
}

export default function TagEditorPopover({children, tagId, initialTagName, initialTagColor, placement, onTagDeletion, onTagEdition}: TagEditorPopoverProps): JSX.Element {
    const prismaUserContext: User | null = useContext<User | null>(PrismaUserContext)
    const [tagName, setTagName] = useState<string>(initialTagName || "")
    const [tagColor, setTagColor] = useState<string>(initialTagColor || "#bf4042")
    const [popoverIsOpen, setPopoverIsOpen] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const tagNameMaxLength = 15 
    const isNewTag: boolean = tagId === null

    const resetTagState: () => void = () => {
        setTagName(initialTagName || "")
        setTagColor(initialTagColor || "")
    }

    const handleTagNameChange: (editedTagName: string) => void = (editedTagName) => {
        setTagName(imposeMaxLength(trimLeadingSpaces(editedTagName), tagNameMaxLength))
    }

    const handleTagColorChange: (editedTagColor: string) => void = (editedTagColor) => {
        setTagColor(editedTagColor)
    }

    const handleDeletePress: () => void = () => {
        deleteTag()
    }

    const handleCancelButtonPress: () => void = () => {setPopoverIsOpen(false)}

    const handleSaveButtonPress: () => void = () => {
        setIsLoading(true)

        if (isNewTag && prismaUserContext) {
            createTag()
        } else {
            editTag()
        }
    }

    const handleOpenChange: (isOpen: boolean) => void = (isOpen) => {
        setPopoverIsOpen(isOpen)
        resetTagState()
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
            onTagEdition(updatedTag as Tag)
            toast.success("Tag edited.")
            setPopoverIsOpen(false)
            setIsLoading(false)
          })
        .catch((_) => {
            toast.error("The editing of the tag failed.")
        });
    }

    const createTag: () => void = () => {
        const fetchOptions: RequestInit = {method: "POST", headers: {"Content-Type": "application/json",}, body: JSON.stringify({
            idUser: prismaUserContext?.id,
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
            onTagEdition(createdTag as Tag)
            toast.success("Tag created.")
            setPopoverIsOpen(false)
            setIsLoading(false)
        })
        .catch((_) => {
            toast.error("The creation of the tag failed.")
            resetTagState()
        });
    } 

    const deleteTag: () => void = () => {
        setIsLoading(true)
        const fetchOptions: RequestInit = {method: "DELETE", headers: {"Content-Type": "application/json"}}
        fetch(`/api/tags/${tagId}`, fetchOptions)
        .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok")
            }
            return response.json()
          })
        .then((deletedTag) => {
            onTagDeletion(deletedTag as Tag)
            toast.success("Tag deleted.")
            setPopoverIsOpen(false)
            setIsLoading(false)
          })
        .catch((_) => {
            toast.error("The deletion of the tag failed.")
        });
    }

    const tagHasChanged: boolean = initialTagName !== tagName || initialTagColor !== tagColor
    const disableSaveButton: boolean = !tagHasChanged || tagName.length === 0 || isLoading
    
    return (
        <Popover backdrop="opaque" isOpen={popoverIsOpen} onOpenChange={handleOpenChange} placement={placement} showArrow>
            <PopoverTrigger>
                {children}
            </PopoverTrigger>
            <PopoverContent>
                <div className="flex flex-col items-center justify-center gap-5 p-4">
                    <div className="relative flex flex-row justify-start items-center w-full">
                        <p className="text-lg text-black dark:text-white font-semibold">{!isNewTag ? "Edit tag" : "Create tag"}</p>

                        {!isNewTag ? 
                        <Button className="absolute right-0" color="danger" isDisabled={isLoading} isIconOnly onPress={handleDeletePress} size="sm" id="tag-delete">
                            <AiFillDelete/>
                        </Button>
                        : 
                        null}
                    </div>

                    <TagEditor
                        onTagColorChange={handleTagColorChange}
                        onTagNameChange={handleTagNameChange}
                        tagColor={tagColor}
                        tagName={tagName}
                    />

                    <div className="flex flex-row w-full items-center justify-center gap-2">
                        <ButtonWithIcon icon={<MdOutlineCancel color="white"/>} isDisabled={false} isLoading={false} onPress={handleCancelButtonPress} style="bg-red-700" text="Cancel"/>
                        <ButtonWithIcon icon={<MdSaveAlt color="white"/>} isDisabled={disableSaveButton} isLoading={isLoading} onPress={handleSaveButtonPress} style="bg-sky-700" text="Save"/>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
}