import { Badge, Chip } from "@nextui-org/react";
import type { MouseEventHandler } from "react";
import { MdEdit } from "react-icons/md";

interface TagDisplayProps {
    tagName: string;
    tagColor: string;
    isSelected: boolean;
    isBeingEdited: boolean;
    onPress?: () => void;
}

export default function TagDisplay({tagName, tagColor, isSelected, isBeingEdited, onPress}: TagDisplayProps): JSX.Element {
    const handleTagPress: MouseEventHandler<HTMLButtonElement> = (_) => {
        if (onPress) {
            onPress()
        }
    }

    return (
        <button className="m-1" onClick={handleTagPress} type="button">
            <Badge content={<MdEdit/>} disableOutline isDot isInvisible={!isBeingEdited} isOneChar variant="faded">
                <Chip className={isSelected ? "opacity-100" : "opacity-60 hover:opacity-80"} style={{backgroundColor: tagColor}} variant={isSelected ? "solid" : "bordered"}>
                    {tagName}
                </Chip>
            </Badge>
        </button>
    ); 
}