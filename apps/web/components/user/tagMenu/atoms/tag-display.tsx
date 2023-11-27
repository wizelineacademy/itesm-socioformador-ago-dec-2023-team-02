import { Badge, Chip } from "@nextui-org/react";
import type { MouseEventHandler } from "react";
import { colorLuminance } from "@/helpers/color-helpers";

interface TagDisplayProps {
    tagName: string;
    tagColor: string;
    badgeContent: JSX.Element;
    isActive: boolean;
    onPress?: () => void;
}

export default function TagDisplay({tagName, tagColor, badgeContent, isActive, onPress}: TagDisplayProps): JSX.Element {
    const handleTagPress: MouseEventHandler<HTMLButtonElement> = (_) => {
        if (onPress) {
            onPress()
        }
    }

    const tagTextColor: string = colorLuminance(tagColor) > 0.5 ? "black" : "white"

    return (
        <button className="m-1" onClick={handleTagPress} type="button">
            <Badge content={badgeContent} isDot isInvisible={!isActive} isOneChar showOutline={false} variant="faded">
                <Chip
                className={isActive ? "opacity-100" : "opacity-50 hover:opacity-70"}
                style={{backgroundColor: tagColor, color: tagTextColor}}>
                    <p className={isActive ? "font-medium" : "font-normal"}>{tagName}</p>
                </Chip>
            </Badge>
        </button>
    ); 
}