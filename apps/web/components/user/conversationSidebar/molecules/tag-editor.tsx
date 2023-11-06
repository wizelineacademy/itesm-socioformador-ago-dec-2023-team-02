import { Input } from "@nextui-org/react";
import type { ColorChangeHandler} from "react-color";
import { SliderPicker } from "react-color";

interface TagEditorProps {
    tagName: string;
    tagColor: string;
    onTagNameChange: (newTagName: string) => void;
    onTagColorChange: (newTagColor: string) => void;
}

export function TagEditor({tagName, tagColor, onTagNameChange, onTagColorChange}: TagEditorProps): JSX.Element {
    const handleTagNameChange: (newTagName: string) => void = (newTagName) => {
        onTagNameChange(newTagName)
    }

    const handleTagColorChange: ColorChangeHandler = (color, _) => {
        onTagColorChange(color.hex)
    }

    return (
        <div className="flex flex-col justify-center items-center space-y-2">
            <Input className="h-15" fullWidth onValueChange={handleTagNameChange} value={tagName}/>

            <SliderPicker color={tagColor} onChange={handleTagColorChange}/>
        </div>
    );
}