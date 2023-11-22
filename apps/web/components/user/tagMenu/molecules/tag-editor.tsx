import { Input } from "@nextui-org/react";
import type { ColorChangeHandler} from "react-color";
import { SliderPicker } from "react-color";
import { CgToggleSquare, CgToggleSquareOff } from "react-icons/cg";
import { useState } from "react";
import ColorPicker from "./color-picker";

interface TagEditorProps {
    tagName: string;
    tagColor: string;
    onTagNameChange: (editedTagName: string) => void;
    onTagColorChange: (editedTagColor: string) => void;
}

export function TagEditor({tagName, tagColor, onTagNameChange, onTagColorChange}: TagEditorProps): JSX.Element {
    const [showFirstPicker, setShowFirstPicker] = useState<boolean>(true)

    const handleTagNameChange: (newTagName: string) => void = (newTagName) => {
        onTagNameChange(newTagName)
    }

    const handleTagColorChange: (newColor: string) => void = (newColor) => {
        onTagColorChange(newColor)
    }

    const onColorPickerTogglerPress: (e: any) => void = (_) => {
        setShowFirstPicker(!showFirstPicker)
    }

    return (
        <div className="flex flex-col justify-start items-center gap-3">
            <div className="gap-2 flex flex-col items-start">
                <p className="text-sm text-black dark:text-white">Name</p>
                <Input className="h-15" fullWidth onValueChange={handleTagNameChange} value={tagName}/>
            </div>

            <div className="space-y-2 flex flex-col items-start w-full h-full">
                <div className="flex flex-row justify-start items-center w-full gap-2">
                    <p className="text-sm text-black dark:text-white">Color</p>

                    <button  onClick={onColorPickerTogglerPress} type="button">
                        {showFirstPicker ? <CgToggleSquare /> : <CgToggleSquareOff />}
                    </button>
                </div>
                <ColorPicker color={tagColor} onColorChange={handleTagColorChange} showFirstPicker={showFirstPicker}/>
            </div>
        </div>
    );
}