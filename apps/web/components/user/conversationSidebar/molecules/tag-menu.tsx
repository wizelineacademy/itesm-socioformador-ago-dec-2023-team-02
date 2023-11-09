import { useState } from "react";
import { Button, Chip } from "@nextui-org/react";
import { AiOutlineEdit } from "react-icons/ai";
import { MdCancel } from "react-icons/md"
import type { Tag } from "@prisma/client";
import SearchBar from "@/components/shared/molecules/search-bar";
import { filterTags } from "@/helpers/tag-helpers";
import { addItemToSet, removeItemFromSet} from "@/helpers/set-helpers";
import { addItem, editItemWithId, removeItemWithId } from "@/helpers/array-helpers";
import TagDisplay from "../atoms/tag-display";
import TagEditorPopover from "./tag-editor-popover";

interface TagMenuProps {
    tags: Tag[]; 
    selectedTags: Set<number>;
    onTagsChange: (newTags: Tag[]) => void;
    onSelectedTagsChange: (newSelectedTags: Set<number>) => void;
    allowEditing: boolean; 
}

export default function TagMenu({tags, selectedTags, onTagsChange, onSelectedTagsChange, allowEditing}: TagMenuProps): JSX.Element {
    const [isEditingTags, setIsEditingTags] = useState<boolean>(false)
    const [searchText, setSearchText] = useState<string>("")

    const handleSearchTextChange: (text: string) => void = (text) => {setSearchText(text)}
    const handleEditButtonPress: (e: any) => void = (_) => {setIsEditingTags(!isEditingTags)}

    const handleTagPress: (pressedTag: Tag) => void = (pressedTag) => {
        const tagIsSelected: boolean = selectedTags.has(pressedTag.id)
        onSelectedTagsChange(tagIsSelected ? removeItemFromSet<number>(pressedTag.id, selectedTags) : addItemToSet<number>(pressedTag.id, selectedTags))
    }

    const handleTagDeletion: (deletedTag: Tag) => void = (deleteTag) => {
        onTagsChange(removeItemWithId<Tag>(deleteTag, tags))
        onSelectedTagsChange(removeItemFromSet<number>(deleteTag.id, selectedTags))
    }

    const handleTagEdition: (editedTag: Tag) => void = (editedTag) => {
        onTagsChange(editItemWithId<Tag>(editedTag, tags))
    }

    const handleTagEditionNewTag: (editedTag: Tag) => void = (editedTag) => {
        onTagsChange(addItem<Tag>(editedTag, tags))
    }

    const editButtonIcon: JSX.Element = isEditingTags ? <MdCancel/> : <AiOutlineEdit/>

    const newTagChip: JSX.Element = (
        <Chip className="m-1" variant="bordered">
            New tag +
        </Chip>)

    return (
        <div className="flex flex-col justify-start items-start p-2 space-y-4 w-full">
            <div className="flex flex-row space-x-2 items-center">
                <SearchBar onTextChange={handleSearchTextChange} placeholder="Search tags" takeFullWidth/>

                {allowEditing ? <Button isIconOnly onPress={handleEditButtonPress}>{editButtonIcon}</Button> : null}
            </div>

            <div className="flex flex-row flex-wrap">
                {filterTags(tags, searchText).map((tag) => (                    
                    isEditingTags ? 
                    <TagEditorPopover initialTagColor={tag.color} initialTagName={tag.name} key={tag.id} onTagDeletion={handleTagDeletion} onTagEdition={handleTagEdition} placement="top" tagId={tag.id}>
                        <button type="button">
                            <TagDisplay isBeingEdited isSelected tagColor={tag.color} tagName={tag.name}/>
                        </button>
                    </TagEditorPopover>
                    :
                    <TagDisplay isBeingEdited={false} isSelected={selectedTags.has(tag.id)} key={tag.id} onPress={()=>{handleTagPress(tag)}} tagColor={tag.color} tagName={tag.name} />
                ))}

                {isEditingTags ?  
                <TagEditorPopover initialTagColor={null} initialTagName={null} onTagDeletion={handleTagDeletion} onTagEdition={handleTagEditionNewTag} placement="top" tagId={null}>
                    <button type="button">
                        {newTagChip}
                    </button>
                </TagEditorPopover>
                :
                null}
            </div>
        </div>
    );
}