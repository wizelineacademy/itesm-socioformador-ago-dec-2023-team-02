import type { Tag } from "@prisma/client";
import { Divider, Input } from "@nextui-org/react";
import { MdAddCircle } from "react-icons/md";
import type { ModelWithProvider } from "@/types/moder-with-provider-types";
import { imposeMaxLength, trimLeadingSpaces } from "@/helpers/string-helpers";
import { mapTagIdsToTags } from "@/helpers/tag-helpers";
import { removeItemFromSet, setToArray } from "@/helpers/set-helpers";
import TagMenuPopover from "../../tagMenu/molecules/tag-menu-popover";
import TagListDisplay from "../../tagMenu/molecules/tag-list-display";
import ModelSelector from "./model-selector";

interface NewConversationMenuProps {
    conversationName: string;
    conversationModelId: number | null;
    conversationTags: Set<number>;
    models: ModelWithProvider[];
    userTags: Tag[];
    onConversationNameChange: (newName: string) => void;
    onConversationModelIdChange: (newModelId: number | null) => void;
    onConversationTagsChange: (newTags: Set<number>) => void;
}

export default function NewConversationMenu(props: NewConversationMenuProps): JSX.Element {
    const conversationNameMaxLength = 25

    const handleConversationNameChange: (newTitle: string) => void = (newTitle) => {
       props.onConversationNameChange(imposeMaxLength(trimLeadingSpaces(newTitle), conversationNameMaxLength))
    }

    const handleConversationModelChange: (newModelId: number | null) => void = (newModelId) => {
        props.onConversationModelIdChange(newModelId)
    }

    const handleTagMenuPopoverClose: (newSelectedTags: Set<number>) => void = (newSelectedTags) => {
        props.onConversationTagsChange(newSelectedTags)
    }

    const handleTagPress: (pressedTagId: number) => void = (pressedTagId) => {
        props.onConversationTagsChange(removeItemFromSet<number>(pressedTagId, props.conversationTags))
    }

    return (
        <div className="flex flex-col items-center justify-start gap-5">
            <div className="flex flex-col items-start gap-2 w-full">
                <p>Name</p>
                <Input className="h-15 w-80" isClearable onValueChange={handleConversationNameChange} placeholder="Chat name" value={props.conversationName}/>
            </div>

            <div className="flex flex-col justify-center items-start gap-2 w-full">
                <p>Model</p>
                <ModelSelector models={props.models} onModelSelection={handleConversationModelChange}/>
            </div>

            <div className="flex flex-col justify-center items-start gap-2 w-full">
                <div className="flex flex-row gap-2 items-center">
                    <p>Tags</p>
                    <TagMenuPopover
                        initialSelectedTags={props.conversationTags}
                        onPopoverClose={handleTagMenuPopoverClose}
                        placement="top"
                        tags={props.userTags}
                    >
                        <button type="button" id="add-tag">
                            <MdAddCircle size="1.2em"/>
                        </button>
                    </TagMenuPopover>    
                </div>

                <Divider/>

                <TagListDisplay emptyListLabel="No chosen tags" onTagPress={handleTagPress} tags={mapTagIdsToTags(setToArray(props.conversationTags), props.userTags)}/>
            </div>
        </div>
    );
}