import { Input, Button } from "@nextui-org/react";
import type { ColorChangeHandler} from "react-color";
import { SliderPicker } from "react-color";
import { AiFillDelete } from "react-icons/ai";

interface TagEditorProps {
    isNew: boolean;
    tagName: string;
    tagColor: string;
    onTagNameChange: (editedTagName: string) => void;
    onTagColorChange: (editedTagColor: string) => void;
    onDeletePress: () => void;
}

export function TagEditor({isNew, tagName, tagColor, onTagNameChange, onTagColorChange, onDeletePress}: TagEditorProps): JSX.Element {
    const handleTagNameChange: (newTagName: string) => void = (newTagName) => {
        onTagNameChange(newTagName)
    }

    const handleTagColorChange: ColorChangeHandler = (color, _) => {
        onTagColorChange(color.hex)
    }

    const handleDeletePress: (e: any) => void = (_) => {
        if (!isNew){
            onDeletePress()
        }
    }

    return (
        <div className="flex flex-col justify-start items-center space-y-3 p-3">
            <div className="relative flex flex-row justify-start items-center w-full">
                <p className="text-lg text-black dark:text-white font-semibold">{!isNew ? "Edit tag" : "Create tag"}</p>

                {!isNew ? 
                <Button className="absolute right-0" color="danger" isIconOnly onPress={handleDeletePress} size="sm">
                    <AiFillDelete/>
                </Button>
                : 
                null}
            </div>

            <div className="space-y-2 flex flex-col items-start">
                <p className="text-sm text-black dark:text-white">Name</p>
                <Input className="h-15" fullWidth onValueChange={handleTagNameChange} value={tagName}/>
            </div>

            <div className="space-y-2 flex flex-col items-start w-full h-full">
                <p className="text-sm text-black dark:text-white">Color</p>
                <SliderPicker className="w-full" color={tagColor} onChange={handleTagColorChange}/>
            </div>
        </div>
    );
}