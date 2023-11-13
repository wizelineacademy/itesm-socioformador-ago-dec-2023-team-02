import type { Tag } from "@prisma/client";
import { RxCross2 } from "react-icons/rx"
import TagDisplay from "../atoms/tag-display";

interface TagListDisplayProps {
    emptyListLabel: string;
    tags: Tag[];
    onTagPress: (pressedTagId: number) => void;
}

export default function TagListDisplay({emptyListLabel, tags, onTagPress}: TagListDisplayProps): JSX.Element {
    const noTagsLabel: JSX.Element = (
        <div>
            <p className="text-sm opacity-40">{emptyListLabel}</p>
        </div>
    )
    
    return (
        <div className="min-h-[80px] max-h-[200px] overflow-y-auto">
            <div className="w-full flex flex-row flex-wrap">
                {tags.map((tag) => (
                    <TagDisplay badgeContent={<RxCross2/>} isActive  key={tag.id} onPress={()=>{onTagPress(tag.id)}} tagColor={tag.color} tagName={tag.name}/>
                ))}

                {tags.length === 0 ? noTagsLabel : null}
            </div>
        </div>
    );
}