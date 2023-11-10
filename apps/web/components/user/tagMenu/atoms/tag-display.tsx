import { Badge, Chip } from "@nextui-org/react";
import type { MouseEventHandler } from "react";
import { MdEdit } from "react-icons/md";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { colorLuminance } from "@/helpers/color-helpers";

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

    const tagTextColor: string = colorLuminance(tagColor) > 0.5 ? "black" : "white"

    return (
        <button className="m-1" onClick={handleTagPress} type="button">
            <Badge content={isBeingEdited ? <MdEdit/> : <IoMdCheckmarkCircle/>}  disableOutline isDot isInvisible={!isBeingEdited && !isSelected} isOneChar variant="faded">
                <Chip
                className={isSelected ? "opacity-100" : "opacity-50 hover:opacity-70"}
                style={{backgroundColor: tagColor, color: tagTextColor}}>
                    <p className={isSelected ? "font-medium" : "font-normal"}>{tagName}</p>
                </Chip>
            </Badge>
        </button>
    ); 
}