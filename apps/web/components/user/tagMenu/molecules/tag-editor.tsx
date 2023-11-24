import { Input } from "@nextui-org/react";
import type { ColorChangeHandler} from "react-color";
import { SliderPicker } from "react-color";

interface TagEditorProps {
    tagName: string;
    tagColor: string;
    onTagNameChange: (editedTagName: string) => void;
    onTagColorChange: (editedTagColor: string) => void;
}

export function TagEditor({tagName, tagColor, onTagNameChange, onTagColorChange}: TagEditorProps): JSX.Element {
    const handleTagNameChange: (newTagName: string) => void = (newTagName) => {
        onTagNameChange(newTagName)
    }

    const handleTagColorChange: ColorChangeHandler = (color, _) => {
        onTagColorChange(color.hex)
    }

    return (
        <div className="flex flex-col justify-start items-center gap-3 pb-3">
            <div className="gap-2 flex flex-col items-start">
                <p className="text-sm text-black dark:text-white">Name</p>
                <Input fullWidth isClearable onValueChange={handleTagNameChange} value={tagName}/>
            </div>

            <div className="flex flex-col gap-3 items-start w-full h-full">
                <p className="text-sm text-black dark:text-white">Color</p>
                <SliderPicker className="w-full" color={tagColor} onChange={handleTagColorChange}/>
            </div>
        </div>
    );
}