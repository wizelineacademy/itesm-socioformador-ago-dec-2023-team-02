import { useState } from "react";
import { Chip, Divider } from "@nextui-org/react";
import { MdEdit } from "react-icons/md"
import type { Tag } from "@prisma/client";
import { IoMdCheckmarkCircle } from "react-icons/io";
import SearchBar from "@/components/shared/molecules/search-bar";
import { filterTags } from "@/helpers/tag-helpers";
import { addItemToSet, removeItemFromSet} from "@/helpers/set-helpers";
import { addItem, editItemWithId, removeItemWithId } from "@/helpers/array-helpers";
import TagDisplay from "../atoms/tag-display";
import TagEditorPopover from "./tag-editor-popover";

interface TagMenuProps {
    tags: Tag[]; 
    selectedTags: Set<number>;
    isEditingTags: boolean; 
    onTagsChange: ((newTags: Tag[]) => void) | null;
    onSelectedTagsChange: (newSelectedTags: Set<number>) => void;
}

export default function TagMenu({tags, selectedTags, isEditingTags, onTagsChange, onSelectedTagsChange}: TagMenuProps): JSX.Element {
    const [searchText, setSearchText] = useState<string>("")

    const handleSearchTextChange: (text: string) => void = (text) => {setSearchText(text)}

    const handleTagPress: (pressedTag: Tag) => void = (pressedTag) => {
        const tagIsSelected: boolean = selectedTags.has(pressedTag.id)
        onSelectedTagsChange(tagIsSelected ? removeItemFromSet<number>(pressedTag.id, selectedTags) : addItemToSet<number>(pressedTag.id, selectedTags))
    }

    const handleTagDeletion: (deletedTag: Tag) => void = (deleteTag) => {
        if (onTagsChange){
            onTagsChange(removeItemWithId<Tag>(deleteTag, tags))
        }
        onSelectedTagsChange(removeItemFromSet<number>(deleteTag.id, selectedTags))
    }

    const handleTagEdition: (editedTag: Tag) => void = (editedTag) => {
        if (onTagsChange){
            onTagsChange(editItemWithId<Tag>(editedTag, tags))
        }
    }

    const handleTagEditionNewTag: (editedTag: Tag) => void = (editedTag) => {
        if (onTagsChange){
            onTagsChange(addItem<Tag>(editedTag, tags))
        }
    }

    const newTagChip: JSX.Element = <Chip className="m-1" variant="bordered">New tag +</Chip>
    
    const noTagsLabel: JSX.Element = <div><p className="text-sm opacity-40">No tags to display</p></div>

    const filteredTags: Tag[] = filterTags(tags, searchText)

    return (
        <div className="flex flex-col justify-start items-start space-y-4 w-full">
            <div className="flex flex-row space-x-2 items-center w-full">
                <SearchBar onTextChange={handleSearchTextChange} overridingStyle="w-3/5" placeholder="Search tags" text={searchText}/>
            </div>

            <Divider/>

            <div className="min-h-[150px] max-h-[450px] overflow-y-auto">
                <div className="flex flex-row flex-wrap">
                    {filteredTags.map((tag) => (                    
                        isEditingTags ? 
                        <TagEditorPopover initialTagColor={tag.color} initialTagName={tag.name} key={tag.id} onTagDeletion={handleTagDeletion} onTagEdition={handleTagEdition} placement="top" tagId={tag.id}>
                            <button type="button">
                                <TagDisplay badgeContent={<MdEdit/>} isActive tagColor={tag.color} tagName={tag.name}/>
                            </button>
                        </TagEditorPopover>
                        :
                        <TagDisplay badgeContent={<IoMdCheckmarkCircle/>} isActive={selectedTags.has(tag.id)} key={tag.id} onPress={()=>{handleTagPress(tag)}} tagColor={tag.color} tagName={tag.name} />
                    ))}

                    {filteredTags.length === 0 ? noTagsLabel : null}

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
        </div>
    );
}