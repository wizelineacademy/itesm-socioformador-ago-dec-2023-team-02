import { useState } from "react";
import { Button } from "@nextui-org/react";
import { AiOutlineEdit } from "react-icons/ai";
import { MdCancel } from "react-icons/md"
import type { SidebarTag } from "@/types/sidebar-tag-types";
import SearchBar from "@/components/shared/molecules/search-bar";
import { filterTags } from "@/helpers/sidebar-tag-helpers";
import { addItemToSet, removeItemFromSet} from "@/helpers/set-helpers";
import { addItem, editItemWithId } from "@/helpers/array-helpers";
import TagDisplay from "../atoms/tag-display";
import TagEditorPopover from "./tag-editor-popover";

interface TagMenuProps {
    tags: SidebarTag[]; 
    selectedTags: Set<number>;
    onTagsChange: (newTags: SidebarTag[]) => void;
    onSelectedTagsChange: (newSelectedTags: Set<number>) => void;
    allowEditing: boolean; 
}

export default function TagMenu({tags, selectedTags, onTagsChange, onSelectedTagsChange, allowEditing}: TagMenuProps): JSX.Element {
    const [isEditingTags, setIsEditingTags] = useState<boolean>(false)
    const [searchText, setSearchText] = useState<string>("")

    const handleSearchTextChange: (text: string) => void = (text) => {setSearchText(text)}
    const handleEditButtonPress: (e: any) => void = (_) => {setIsEditingTags(!isEditingTags)}

    const handleTagPress: (pressedTag: SidebarTag) => void = (pressedTag) => {
        const tagIsSelected: boolean = selectedTags.has(pressedTag.id)
        onSelectedTagsChange(tagIsSelected ? removeItemFromSet<number>(pressedTag.id, selectedTags) : addItemToSet<number>(pressedTag.id, selectedTags))
    }

    const handleEditingPopoverClose: (editedTag: SidebarTag) => void = (editedTag) => {
        onTagsChange(editItemWithId<SidebarTag>(tags, editedTag))
    }

    const handleCreatingPopoverClose: (editedTag: SidebarTag) => void = (editedTag) => {
        onTagsChange(addItem<SidebarTag>(tags, editedTag))
    }

    const editButtonIcon: JSX.Element = isEditingTags ? <MdCancel/> : <AiOutlineEdit/>

    return (
        <div className="inline-block flex flex-col justify-start items-start p-2 space-y-4">
            <div className="flex flex-row space-x-2 items-center">
                <SearchBar onTextChange={handleSearchTextChange} placeholder="Search tags" takeFullWidth/>

                {allowEditing ? <Button isIconOnly onPress={handleEditButtonPress}>{editButtonIcon}</Button> : null}
            </div>

            <div className="flex flex-row flex-wrap">
                {filterTags(tags, searchText).map((tag) => (                    
                    isEditingTags ? 
                    <TagEditorPopover initialTagColor={tag.color} initialTagName={tag.name} key={tag.id} onPopoverClose={handleEditingPopoverClose} placement="top" tagId={tag.id}>
                        <button type="button">
                            <TagDisplay isBeingEdited  isSelected tagColor={tag.color} tagName={tag.name}/>
                        </button>
                    </TagEditorPopover>
                    :
                    <TagDisplay isBeingEdited={false} isSelected={selectedTags.has(tag.id)} key={tag.id} onPress={()=>{handleTagPress(tag)}} tagColor={tag.color} tagName={tag.name} />
                ))}

                {isEditingTags ?  
                <TagEditorPopover initialTagColor={null} initialTagName={null} onPopoverClose={handleCreatingPopoverClose} placement="top" tagId={null}>
                    <button type="button">
                        <TagDisplay isBeingEdited={false} isSelected tagColor="#8c8b87" tagName="New tag +"/>
                    </button>
                </TagEditorPopover>
                :
                null}
            </div>
        </div>
    );
}