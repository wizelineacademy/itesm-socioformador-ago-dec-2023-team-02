import { SliderPicker, type ColorChangeHandler, CompactPicker } from "react-color";

interface ColorPickerProps {
    showFirstPicker: boolean;
    color: string;
    onColorChange: (newColor: string) => void;
}

export default function ColorPicker({showFirstPicker, color, onColorChange}: ColorPickerProps): JSX.Element {
    const handleColorChange: ColorChangeHandler = (reactColor, _) => {
        onColorChange(reactColor.hex)
    }

    return (
        <div className="overflow-hidden flex flex-col justify-center items-center w-full h-[90px]">
            {showFirstPicker ? 
            <SliderPicker className="w-[95%]" color={color} onChange={handleColorChange}/>
            : 
            <CompactPicker className="w-[95%] h-[50%] text-black dark:text-white bg-white dark:bg-black" color={color} onChange={handleColorChange}/>
            }
        </div>
    );
}